const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const underscore = require('underscore');

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
    entry: {
      exampleReact: './script/app/exampleReactApp.js',
      exampleJavascript: './script/app/exampleJavascriptApp.js'
    },
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
          { from: './src/siteSrc/public/**/*', to: './src/serverSrc/public' }
        ],
        { copyUnmodified: true }
      )
    ]
  };

  //-- make any tweaks between production and development...
  webpackConfig.mode = configSettings.node_env;

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

  return webpackConfig;
}

module.exports = {
  configureWebpack,
};
