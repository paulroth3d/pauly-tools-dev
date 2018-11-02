const gulp = require('gulp');
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
/** nodemon server - used for watch */
const Nodemon = require('nodemon');

const config = require('config');

//-- the server port is something special - get it so we can tell the user where to go
const SERVER_PORT = process.env.PORT || config.DEFAULT.PORT;

/** Configurator to generate Webpack configurations */
const WebpackConfigurator = require('./WebpackConfigurator');
/** configuration for live reload
 *  <p>see here for the livereload config settings and startup</p>
 *  <p>https://www.npmjs.com/package/livereload</p>
 **/
const LiveReloadConfig = require('./liveReload.config');
/** nodemon config */
const NodemonConfig = require('./nodemon.json');

let webpackServer;
let LiveReloadServer;

//-- deprecated plugins no longer needed
// const sass = require('gulp-sass');
// const webpackStream = require('webpack-stream');

/*
gulp.task('test-webpack', (done) => {
  console.log('checking the webpack config');
  const webpackConfig = WebpackConfigurator.configureWebpack();
  console.log(JSON.stringify(webpackConfig, null, 2));
  done();
});
*/

//-- useful for verifying a command running
//-- support async completion
//-- https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
/*
gulp.task('say-hello', (done) => {
  console.log('hello');
  done();
});
*/

const gulpConfig = {
  //-- server public files used for watching when to reload
  serverSrcPublic: 'src/serverSrc/public/**/*',

  //-- js files used in setting things up - but not running the server
  internalJS: './*.js',

  //-- js files used in the server
  serverJS: 'src/serverSrc/**/*.js',

  //-- local modules
  localModulesJS: 'src/local_modules/**/*.js',

  //-- location of the styleguide config
  styleGuideConfig: './styleguide.config'
};
gulpConfig.serverSrcPublicPath = path.resolve(__dirname, gulpConfig.serverSrcPublic);
gulpConfig.esLintConfigPath = 'eslint.json';

//-- start of scripts

gulp.task('view-webpack-config', (done) => {
  const webpackConfig = WebpackConfigurator.configureWebpack();
  console.log(JSON.stringify(webpackConfig, null, 2));
  done();
});

gulp.task('view-livereload-config', (done) => {
  console.log(JSON.stringify(LiveReloadConfig, null, 2));
  done();
});

gulp.task('view-nodemon-config', (done) => {
  console.log(JSON.stringify(NodemonConfig, null, 2));
  done();
});

gulp.task('view-styleguide-config', (done) => {
  console.log(JSON.stringify(require(gulpConfig.styleGuideConfig), null, 2));
  done();
});

gulp.task('webpack', (done) => {
  console.log('trying to run webpack');

  const webpackConfig = WebpackConfigurator.configureWebpack();
  console.log(JSON.stringify(webpackConfig));

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error('Webpack', err);
      done();
    } else {
      console.log(stats.toString());
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
  console.log('run webpack with watch');

  const webpackConfig = WebpackConfigurator.configureWebpack({
    watch: true,
  });
  console.log(JSON.stringify(webpackConfig));

  const webpackPromise = new Promise((resolve, reject) => {
    webpackServer = webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error('Webpack', err);
        reject('Error loading webpack...');
      } else {
        console.log('Webpack completed compiling...');
        console.log(stats.toString());

        resolve('Everything loaded');
      }
    });
  });

  const liveReloadPromise = new Promise((resolve, reject) => {
    liveReloadServer = LiveReload.createServer({},
      () => {
        console.log('liveReloadServer ready');
        // console.log(arguments);
        resolve('live reload server loaded');
      }
    );
    liveReloadServer.watch(gulpConfig.serverSrcPublicPath);
  });

  const nodemonPromise = new Promise((resolve, reject) => {
    nodemonServer = Nodemon(NodemonConfig);
    nodemonServer.on('start', () => {
      console.log('nodemon started');

      //-- for some reason the restart is calling the start to get called again.
      //-- so we listen for start
      setTimeout(()=>{
        liveReloadServer.refresh("");
      }, 1000);

      resolve('nodemon has started');
    }).on('quit', () => {
      console.log('nodemon has quit');
    }).on('restart', (files) => {
      console.log('nodemon restart');
    });
  })

  Promise.all([webpackPromise, liveReloadPromise, nodemonPromise])
    .then((message) => {
      console.log('Everything has loaded:');
      console.log(' * linting files in src/siteSrc');
      console.log(' * linting express files in src/serverSrc');
      console.log(' * running liveReload for changes in either');
      console.log('To see the webpack config - run `npm run view-webpack-config`');
      console.log('To see the liveReload config - run `npm run view-livereload-config');
      console.log('To view the nodemon config - run `npm run view-nodemon-config');
      console.log(`You can now browse to your site on http://localhost:${SERVER_PORT}/`);
      done();
    })
    .catch((message) => {
      console.log('Error occurred when loading liveserver and webpack.');
      console.log(message);
      console.log('\n\n\nYou will likely need to Exit (Ctrl-C) and restart.');
      done();
    })
});

//-- run a linter against javascript
gulp.task(
  'lint-internal',
  () => {
    const scriptStream = gulp.src([gulpConfig.internalJS])
      .pipe(plumber({
        errorHandler: (error) => {
          console.error(error.message);
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
      [gulpConfig.internalJS],
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
        '!' + gulpConfig.serverSrcPublic,
        gulpConfig.localModulesJS
      ])
      .pipe(plumber({
        errorHandler: (error) => {
          console.error(error.message);
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
        '!' + gulpConfig.serverSrcPublic,
        gulpConfig.localModulesJS
      ],
      gulp.series(['lint-server'])
    );

    return scriptStream;
  }
);

//-- chains
//-- https://fettblog.eu/gulp-4-parallel-and-series/

//-- include series once we have a good set of linters.
gulp.task('lint-site', gulp.series('webpack'));
gulp.task('lint', gulp.series('lint-site','lint-server'));
gulp.task('compile', gulp.series('webpack'));
gulp.task('default', gulp.series('webpack'));
