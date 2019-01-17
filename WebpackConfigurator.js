/** resolving local file addresses */
const path = require('path');
/** other scripts for handling local file */
const fs = require('fs-extra');

const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const underscore = require('underscore');

const config = require('config');
const filePaths = require('./config/FilePaths');

//-- leverage the same babelrc file within our webpack config
const babelConfig = fs.readFileSync(path.resolve(__dirname, '.babelrc'), 'utf8');

/**
 * determines a list of all the app files
 * @param {string} appPath - the path of where the main script files are
 * @return {object} - list of fileNames for all apps under /src/siteSrc/script/app/*.js
 */
function listAppFiles(appPath){
  const results = [];

  if (!fs.existsSync(appPath)) {
    console.error('appDir does not exist');
    throw new Error('appDir does not exist');
  }
  const appFiles = fs.readdirSync(appPath);
  const jsMatcher = /(.*)\.js$/;
  let match;
  for ( const fileName of appFiles) {
    // console.log('appFile:' + fileName);
    if (fileName) {
      match = fileName.match(jsMatcher);
      if (match) {
        results.push(match[1]);
      }
    }
  }

  return results;
}

/**
 * Generate the base webpack configuration
 * @param {object} configParams - set of parameters to configure webpack with {eslint:boolean, node_env:string, watch:boolean}
 * @return {object} - the final webpack configuration to be used.
 */
function configureWebpack(configParams) {
  const configSettings = underscore.defaults(configParams, {
    eslint: true,
    node_env: config.NODE_ENV,
    watch: false,
    debug: false
  });

  var copyWebpackPluginDebug = null;
  if (configSettings.debug) {
    copyWebpackPluginDebug = 'debug';
  }
  
  const webpackConfig = {
    //-- entries are defined dynamically down below based on the script/app folder
    entry: {},
    output: {
      path: filePaths.serverPublicPath,
      filename: '[name].js',
    },
    
    // context: filePaths.siteSrcPath,

    /** include sourcemaps for debugging */
    devtool: 'source-map',

    /** Current development mode.
     * Overwritten by node_env passed by config
     * */
    mode: 'development',

    /**
     * Whether to continually build based on watch.
     * Overwritten by watch passed by config
     */
    watch: configSettings.watch,

    /**
     * Look for index files at the base directory
     */
    resolve: {
      mainFiles: ['index']
    },

    /** build rules */
    module: {
      rules: [
        //-- load any url files in raw
        {
          test: /\.html$/,
          loader: ['raw'],
        },
        //-- audio
        {
          test: /\.mp3$/,
          loader: ['url-loader']
        },
        //-- if the files are below a given size, then base64 them in
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=8192'
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        //-- transpile code from es6 to something that the browser understands
        //-- note: include properties in es6 classes through class-properties
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
          options: babelConfig,
        }
      ],
    },
    //-- include any other resources within the resources folder
    //-- to the public folder as-is
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            from: 'resources/**/*'
          }
        ],
        { debug: copyWebpackPluginDebug, copyUnmodified: false }
      )
    ]
  };

  //-- dynamically include any routes based on script/apps
  const appFilesPath = filePaths.siteAppPath;
  const appFiles = listAppFiles(appFilesPath);
  let appFile;
  for (appFile of appFiles) {
    webpackConfig.entry[appFile] = path.resolve( appFilesPath, appFile + '.js');
  }

  /*
  @POSTCONDITION: the routes are based off the name of the files under script/app
  ex: entry: {
    exampleReact: './script/app/exampleReact.js',
    exampleJavascript: './script/app/exampleJavascript.js'
  },
  */

  //-- set the mode the same as NODE_ENV
  webpackConfig.mode = configSettings.node_env;

  //-- include eslint configs if eslint param was sent
  if (configSettings.eslint) {
    const esLintPath = filePaths.eslintConfig;

    webpackConfig.module.rules.push({
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: [/node_modules/, /lib/],
      enforce: 'pre',
      options: {
        formatter: eslintFriendlyFormatter,
        configFile: path.resolve(__dirname, esLintPath),
        cache: false,
      },
    });
  }

  // console.log('Webpack config generated. To see the values run `npm run view-webpack-config`');

  return webpackConfig;
}

module.exports = {
  configureWebpack,
};
