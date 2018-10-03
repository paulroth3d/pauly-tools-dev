const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const WebpackConfigurator = require('./WebpackConfigurator');
const LiveReload = require('livereload');
let LiveReloadServer;


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
  
  return gulp.src('./src/public/entry.js')
    .pipe(webpackStream( require('./webpack.config.js')))
    .pipe(gulp.dest('./src/public/'));
  */
});

gulp.task('livereload', (done) => {
  console.log('starting livereload');

  const liveReloadConfig = {

  };

  liveReloadServer = LiveReload.createServer(liveReloadConfig,
    () => {
      console.log('liveReloadServer called back');
      // console.log(arguments);
    }
  );
  liveReloadServer.watch( path.resolve(__dirname + "/src/public/**/*"));
  done();
});

gulp.task('watch', (done) => {
  console.log('run webpack with watch');

  const webpackConfig = WebpackConfigurator.configureWebpack({
    watch: true,
  });
  console.log(JSON.stringify(webpackConfig));

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error('Webpack', err);
      done();
    } else {
      console.log('Webpack completed compiling');
      // console.log(stats.toString());
      done();
    }
  });
});

//-- run a linter against javascript
gulp.task(
  'lint-internal',
  () => {
    const scriptStream = gulp.src(['./*.js', 'src/*.js', 'src/local_modules/**/*.js'])
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
      ['./*.js', 'src/*.js', 'src/local_modules/**/*.js'],
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
