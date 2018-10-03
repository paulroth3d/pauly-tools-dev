/** Styleguidist config */

const WebpackConfigurator = require('./WebpackConfigurator');

const webpackConfig = WebpackConfigurator.configureWebpack({});
//console.log('webpackConfig', JSON.stringify(webpackConfig, null, 2));

module.exports = {
  components : 'src/siteSrc/script/components/**/*.{js,jsx,ts,tsx}',
  webpackConfig : webpackConfig
};


