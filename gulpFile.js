const gulp = require('gulp');
/** logger */
const log = require('fancy-log');
/** Handle errors to avoid watch from breaking */
const plumber = require('gulp-plumber');
/** Support linting */
const eslint = require('gulp-eslint');
/** Compressor (not used for server) */
const webpack = require('webpack');
/** handles paths to files */
const path = require('path');
/** handles any file access info */
const fs = require('fs-extra');
/** Provides JS to refresh the browser on changes (used only for dev) */
const LiveReload = require('livereload');
/** nodemon server - used for watch and telling livereload to fire */
const Nodemon = require('nodemon');
/** jest testing */
const jest = require('gulp-jest').default;

//-- for those cases that absolutely need it
/** allow command line arguments - like stubbing out pages */
const argv = require('yargs').argv;

/** dead simple template engine
 *  @TODO: review whether yeoman would be actually wanted
 */
const TemplateEngine = require('./src/local_modules/TemplateEngine');

const config = require('config');

//-- the server port is something special - get it so we can tell the user where to go
const SERVER_PORT = process.env.PORT || config.DEFAULT.PORT;

/** Configurator to generate Webpack configurations */
const WebpackConfigurator = require('./WebpackConfigurator');
/** configuration for live reload
 *  <p>see here for the livereload config settings and startup</p>
 *  <p>https://www.npmjs.com/package/livereload</p>
 **/
/** configurator for Jest */
const JestConfigurator = require('./JestConfigurator');
/** config for live reload */
const LiveReloadConfig = require('./liveReload.config');
/** nodemon config */
const NodemonConfig = require('./nodemon.json');

let webpackServer;
let liveReloadServer;
let nodemonServer;

//-- deprecated plugins no longer needed
// const sass = require('gulp-sass');
// const webpackStream = require('webpack-stream');

/*
gulp.task('test-webpack', (done) => {
  log('checking the webpack config');
  const webpackConfig = WebpackConfigurator.configureWebpack();
  log(JSON.stringify(webpackConfig, null, 2));
  done();
});
*/

//-- useful for verifying a command running
//-- support async completion
//-- https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
/*
gulp.task('say-hello', (done) => {
  log('hello');
  done();
});
*/

const gulpConfig = {}

//-- source for all the server side code
gulpConfig.serverSrcDir = 'src/serverSrc';
//-- place for all files to be served (public directory)
gulpConfig.serverPublicDir = `${gulpConfig.serverSrcDir}/public`;
//-- source for all client side code
gulpConfig.siteSrcDir = 'src/siteSrc';
//-- place for all non-code resources used in the client side
gulpConfig.sitePublicDir = `${gulpConfig.siteSrcDir}/public`;


//-- server public files used for watching when to reload
gulpConfig.serverSrcPublicAllFiles = `${gulpConfig.serverPublicDir}/**/*`;
//-- full path for all server public files
gulpConfig.serverSrcPublicPath = path.resolve(__dirname, gulpConfig.serverSrcPublicAllFiles);

//-- js files used in setting things up - but not running the server
gulpConfig.internalJS = './*.js';
//-- js files used in the server
gulpConfig.serverJS = './src/serverSrc/**/*.js';

//-- local modules
gulpConfig.localModulesJS = './src/local_modules/**/*.js';

//-- location of the styleguide config
gulpConfig.styleGuideConfig = './styleguide.config';

//-- path to the eslint configuration file
gulpConfig.esLintConfigPath = 'eslint.json';

//-- test patterns
gulpConfig.testPattern = './src/**/*test.js';
//-- collection of all the current test patterns
gulpConfig.testPatterns = [gulpConfig.testPattern];





//#    #    #    #    #    #    #    #    #    #    #    #
//-- start of scripts
//#    #    #    #    #    #    #    #    #    #    #    #





gulp.task('view-webpack-config', (done) => {
  const webpackConfig = WebpackConfigurator.configureWebpack();
  log(JSON.stringify(webpackConfig, null, 2));
  done();
});

gulp.task('view-livereload-config', (done) => {
  log(JSON.stringify(LiveReloadConfig, null, 2));
  done();
});

gulp.task('view-nodemon-config', (done) => {
  log(JSON.stringify(NodemonConfig, null, 2));
  done();
});

gulp.task('view-jest-config', (done) => {
  const jestConfig = JestConfigurator.configureJest();
  log(JSON.stringify(jestConfig, null, 2));
  done();
});

gulp.task('view-styleguide-config', (done) => {
  log(JSON.stringify(require(gulpConfig.styleGuideConfig), null, 2));
  done();
});

gulp.task('webpack', (done) => {
  log('trying to run webpack');

  const webpackConfig = WebpackConfigurator.configureWebpack();
  log(JSON.stringify(webpackConfig));

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      log.error('Webpack', err);
      done();
    } else {
      log(stats.toString());
      done();
    }
  });
  
  /*
  //-- unfortunately, webpack-stream requires
  //-- we send in specific configurations from gulp
  //-- overwriting configs in webpack config
  
  return gulp.src('./src/serverSrc/public/entry.js')
    .pipe(webpackStream( require('./webpack.config.js')))
    .pipe(gulp.dest('./src/serverSrc/public/'));
  */
});


gulp.task('watch', (done) => {
  log('run webpack with watch');

  const webpackConfig = WebpackConfigurator.configureWebpack({
    watch: true,
  });
  log(JSON.stringify(webpackConfig));

  const webpackPromise = new Promise((resolve, reject) => {
    webpackServer = webpack(webpackConfig, (err, stats) => {
      if (err) {
        log.error('Webpack', err);
        reject('Error loading webpack...');
      } else {
        log('Webpack completed compiling...');
        log(stats.toString());

        resolve('Everything loaded');
      }
    });
  });

  const liveReloadPromise = new Promise((resolve, reject) => {
    liveReloadServer = LiveReload.createServer({},
      () => {
        log('liveReloadServer ready');
        // log(arguments);
        resolve('live reload server loaded');
      }
    );
    liveReloadServer.watch(gulpConfig.serverSrcPublicPath);
  });

  const nodemonPromise = new Promise((resolve, reject) => {
    nodemonServer = Nodemon(NodemonConfig);
    nodemonServer.on('start', () => {
      log('nodemon started');

      //-- for some reason the restart is calling the start to get called again.
      //-- so we listen for start
      setTimeout(()=>{
        liveReloadServer.refresh("");
      }, 1000);

      resolve('nodemon has started');
    }).on('quit', () => {
      log('nodemon has quit');
    }).on('restart', (files) => {
      log('nodemon restart');
    });
  })

  Promise.all([webpackPromise, liveReloadPromise, nodemonPromise])
    .then((message) => {
      log('Everything has loaded:');
      log(' * linting files in src/siteSrc');
      log(' * linting express files in src/serverSrc');
      log(' * running liveReload for changes in either');
      log('To see the webpack config - run `npm run view-webpack-config`');
      log('To see the liveReload config - run `npm run view-livereload-config');
      log('To view the nodemon config - run `npm run view-nodemon-config');
      log(`You can now browse to your site on http://localhost:${SERVER_PORT}/`);
      done();
    })
    .catch((message) => {
      log('Error occurred when loading liveserver and webpack.');
      log(message);
      log('\n\n\nYou will likely need to Exit (Ctrl-C) and restart.');
      done();
    })
});

//-- run a linter against javascript
gulp.task(
  'lint-internal',
  () => {
    const scriptStream = gulp.src([gulpConfig.internalJS, gulpConfig.localModulesJS])
      .pipe(plumber({
        errorHandler: (error) => {
          log.error(error.message);
          scriptStream.emit('end');
        },
      }))
      .pipe(eslint({
        configFile: gulpConfig.esLintConfigPath,
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());

    return scriptStream;
  }
);

gulp.task(
  'watch-internal',
  () => {
    const scriptStream = gulp.watch(
      [gulpConfig.internalJS, gulpConfig.localModulesJS],
      gulp.series(['lint-internal'])
    );

    return scriptStream;
  }
);


gulp.task(
  'lint-server',
  () => {
    const scriptStream = gulp.src([
        gulpConfig.serverJS,
        '!' + gulpConfig.serverSrcPublicAllFiles,
        gulpConfig.localModulesJS
      ])
      .pipe(plumber({
        errorHandler: (error) => {
          log.error(error.message);
          scriptStream.emit('end');
        },
      }))
      .pipe(eslint({
        configFile: 'eslint.json',
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());

    return scriptStream;
  }
);

gulp.task(
  'watch-server',
  () => {
    const scriptStream = gulp.watch(
      [
        gulpConfig.serverJS,
        '!' + gulpConfig.serverSrcPublicAllFiles,
        gulpConfig.localModulesJS
      ],
      gulp.series(['lint-server'])
    );

    return scriptStream;
  }
);

gulp.task('test', (done) => {
  const jestConfig = JestConfigurator.configureJest();

  const scriptStream = gulp.src(['src']) //-- @TODO: the files to be run are actually in the jest config
    .pipe(jest(jestConfig));
  
  return scriptStream;
});

gulp.task('watch-test', () => {
  const scriptStream = gulp.watch(
    [
      ...gulpConfig.testPatterns,
      gulpConfig.serverJS,
      '!' + gulpConfig.serverSrcPublic,
      gulpConfig.localModulesJS
    ],
    gulp.series(['test'])
  );

  return scriptStream;
});

gulp.task('create-page', (done) => {
  //-- check if the page name was sent
  if (!argv.pageName) {
    log.error('cannot execute task create-page');
    log.error('--pageName [[camel case name of page]] : is required');
    done();
    return;
  }

  const pageName = argv.pageName;

  const pagePaths = TemplateEngine.createPage(pageName);

  //-- do not automatically add the route yet
  const routerPath = path.resolve(__dirname, './src/serverSrc/index.js');

  log(`
completed writing ejs file:${pagePaths.ejs}
completed writing app file:${pagePaths.app}

Note you will need to add a route to make this page acessible.
${routerPath}`)

  done();
});

//-- chains
//-- https://fettblog.eu/gulp-4-parallel-and-series/

//-- include series once we have a good set of linters.
gulp.task('lint-site', gulp.series('webpack'));
gulp.task('lint', gulp.series('lint-site','lint-server'));
gulp.task('compile', gulp.series('webpack'));
gulp.task('default', gulp.series('webpack'));
