const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

gulp.task('watch', function(){
    gulp.watch('src/siteSrc/stylesheets/**/*.scss', gulp.series('sass'));
    gulp.watch('src/siteSrc/**/*.js', gulp.series(['eslint','webpack']));
});

gulp.task('webpack', (done) => {
    console.log('trying to run webpack');

    let webpackConfig = {
        entry: './script/page/titlePage.js',
        output: {
            path: path.resolve(__dirname, "./src/public/"),
            filename: 'bundle.js'
        },
        context: path.resolve(__dirname, "./src/siteSrc/"),
        devtool: 'source-map',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: [ /node_modules/ ], //, '/src/siteSrc/script/lib/'
                    enforce: 'pre',
                    options: {
                        formatter: eslintFriendlyFormatter,
                        configFile: path.resolve(__dirname, './eslint.json'),
                        cache: false,
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: [ /node_modules/ ], //, '/src/siteSrc/script/lib/'
                }
            ]
        }
    };
    
    //-- make any tweaks between production and development...
    const node_env = process.env.NODE_ENV || 'development';
    webpackConfig.mode = node_env;

    console.log(JSON.stringify(webpackConfig));

    webpack(webpackConfig, (err, stats) => {
        if (err){
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
        'src/siteSrc/**/*.js',
        '!src/siteSrc/script/lib/**/*.js'
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
        'src/siteSrc/style/**/*.scss'
    ])
    .pipe(plumber({
        errorHandler: function( error ){
            console.error(error.message);
            this.emit('end');
        }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/public/style'));
})

//-- chains
//-- https://fettblog.eu/gulp-4-parallel-and-series/

//-- include series once we have a good set of linters.
gulp.task('lint', gulp.series('eslint','sass'));
gulp.task('default', gulp.series('watch'));