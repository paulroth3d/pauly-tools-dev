const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const path = require('path');
const WebpackConfigurator = require('./WebpackConfigurator');
const LiveReload = require('livereload');

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

gulp.task('view-webpack-config', (done) => {
  const webpackConfig = WebpackConfigurator.configureWebpack();
  console.log(JSON.stringify(webpackConfig, null, 2));
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

  //-- see here for the livereload config settings and startup
  //-- https://www.npmjs.com/package/livereload
  const liveReloadConfig = {};

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
    liveReloadServer = LiveReload.createServer(liveReloadConfig,
      () => {
        console.log('liveReloadServer ready');
        // console.log(arguments);
        resolve('live reload server loaded');
      }
    );
    liveReloadServer.watch( path.resolve(__dirname + "/src/serverSrc/public/**/*"));
  });

  Promise.all([webpackPromise, liveReloadPromise])
    .then((message) => {
      console.log('Everything has loaded');
      console.log('Files are available for `heroku local web`');
      console.log('(Likely run in a separate tab)');
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
    const scriptStream = gulp.src(['./*.js', 'src/serverSrc/**/*.js', '!src/serverSrc/public/**/*', 'src/local_modules/**/*.js'])
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
  'watch-internal',
  () => {
    const scriptStream = gulp.watch(
      ['./*.js', 'src/serverSrc/**/*.js', '!src/serverSrc/public/**/*', 'src/local_modules/**/*.js'],
      gulp.series(['lint-internal'])
    );

    return scriptStream;
  }
);

//-- chains
//-- https://fettblog.eu/gulp-4-parallel-and-series/

//-- include series once we have a good set of linters.
gulp.task('lint', gulp.series('webpack'));
gulp.task('compile', gulp.series('webpack'));
gulp.task('default', gulp.series('webpack'));
