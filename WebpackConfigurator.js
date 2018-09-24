const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
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
    entry: './script/page/titlePage.js',
    output: {
      path: path.resolve(__dirname, './src/public/'),
      filename: 'bundle.js',
    },
    context: path.resolve(__dirname, './src/siteSrc/'),
    devtool: 'source-map',
    mode: 'development',
    watch: configSettings.watch,
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
        },
      ],
    },
  };

  //-- make any tweaks between production and development...
  webpackConfig.mode = configSettings.node_env;

  console.log(`eslint: ${configSettings.eslint}`);
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
