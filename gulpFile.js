const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

gulp.task('watch', function(){
    gulp.watch('src/public/stylesheets/**/*.scss', gulp.series('sass'));
    gulp.watch('src/**/*.js', gulp.series('eslint'));
});

gulp.task('webpack', function() {
    return gulp.src('src/entry.js')
        .pipe(webpack())
        .pipe(gulp.dest('dist/'));
});

//-- useful for verifying a command running
//-- support async completion
//-- https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
gulp.task('say-hello', function(done){
    console.log('hello');
    done();
});

//-- run a linter against javascript
gulp.task('eslint', function(){
    return gulp.src([
        'src/**/*.js',
        '!src/public/scripts/lib/**/*.js'
    ])
    .pipe(plumber({
        errorHandler: function( error ){
            console.error(error.message);
            this.emit('end');
        }
    }))
    .pipe(eslint({
        configFile: 'eslint.json'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//-- converts sass (scss) files to css
gulp.task('sass', function(){
    return gulp.src([
        'src/public/stylesheets/**/*.scss'
    ])
    .pipe(plumber({
        errorHandler: function( error ){
            console.error(error.message);
            this.emit('end');
        }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/public/stylesheets'));
})

//-- chains
//-- https://fettblog.eu/gulp-4-parallel-and-series/

//-- include series once we have a good set of linters.
gulp.task('lint', gulp.series('eslint','sass'));
gulp.task('default', gulp.series('watch'));