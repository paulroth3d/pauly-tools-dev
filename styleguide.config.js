/** Styleguidist config */

const filePaths = require('./config/FilePaths');

const WebpackConfigurator = require('./WebpackConfigurator');

const webpackConfig = WebpackConfigurator.configureWebpack({});
// console.log('webpackConfig', JSON.stringify(webpackConfig, null, 2));

module.exports = {
  components : filePaths.siteComponentsPattern,
  webpackConfig : webpackConfig,
  ignore: filePaths.styleguidistIgnorePatterns
};
