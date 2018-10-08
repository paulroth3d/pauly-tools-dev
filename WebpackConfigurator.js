/** resolving local file addresses */
const path = require('path');
/** other scripts for handling local file */
const fs = require('fs-extra');

const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const underscore = require('underscore');

const config = require('config');

/**
 * determines a list of all the app files
 */
function listAppFiles(){
  const results = [];

  const appPath = './src/siteSrc/script/app';
  if (!fs.existsSync(appPath)) {
    console.error('appDir does not exist');
    throw new Error('appDir does not exist');
  }
  const appFiles = fs.readdirSync(appPath);
  const jsMatcher = /(.*)\.js$/;
  let match;
  let filename;
  for ( fileName of appFiles) {
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
 * @return Object
 */
function configureWebpack(configParams) {
  const configSettings = underscore.defaults(configParams, {
    eslint: true,
    node_env: process.env.NODE_ENV || 'development',
    watch: false,
  });
  
  const webpackConfig = {
    //-- entries are defined dynamically down below based on the script/app folder
    entry: {},
    output: {
      path: path.resolve(__dirname, './src/serverSrc/public/'),
      filename: '[name].js',
    },
    context: path.resolve(__dirname, './src/siteSrc/'),

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

    /** build rules */
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: ['raw'],
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
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
          options: {
            presets: ['env', 'react'],
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          {
            test: /\.png$/,
            from: './src/siteSrc/public/**/*',
            to: './src/serverSrc/public',
            force: true
          }
        ],
        { debug: 'debug', copyUnmodified: true }
      )
    ]
  };

  //-- dynamically include any routes based on script/apps
  const appFiles = listAppFiles();
  const appPath = './script/app/';
  let appFile;
  for (appFile of appFiles) {
    webpackConfig.entry[appFile] = appPath + appFile + '.js';
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
    let esLintPath = './eslint.json';
    if (configSettings.node_env === 'production') {
      esLintPath = './eslint.prod.json';
    }

    webpackConfig.module.rules.push({
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: [/node_modules/],
      enforce: 'pre',
      options: {
        formatter: eslintFriendlyFormatter,
        configFile: path.resolve(__dirname, esLintPath),
        cache: false,
      },
    });
  }

  //console.log('Webpack config generated. To see the values run `npm run view-webpack-config`');

  return webpackConfig;
}

module.exports = {
  configureWebpack,
};
