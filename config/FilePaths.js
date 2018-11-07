/**
 * A single place to store where things are.
 */

debugger;

const config = require('config');
const path = require('path');

const basePath = path.resolve(__dirname, '..');

const filePaths = {};

//-- post processing
//-- choice was to make all of it post processing
//-- so variables could build upon one another in a logical group
//-- instead of getting separated out and generating more confusion


//    #    #    #    #    #    #    #    #    #    #    #
//-- server side paths
//    #    #    #    #    #    #    #    #    #    #    #

//-- source for all the server side code
filePaths.serverSrcDir = 'src/serverSrc';
//-- place for all files to be served (public directory)
filePaths.serverPublicDir = `${filePaths.serverSrcDir}/public`;
//-- path to the public directory
filePaths.serverPublicPath = path.resolve(basePath, filePaths.serverPublicDir);

//-- server public files used for watching when to reload
filePaths.serverPublicAllFiles = `${filePaths.serverPublicDir}/**/*`;
//-- full path for all server public files
filePaths.serverPublicAllFilesPath = path.resolve(basePath, filePaths.serverPublicAllFiles);
//-- js files used in setting things up - but not running the server
filePaths.internalJS = './*.js';
//-- js files used in the server
filePaths.serverJS = './src/serverSrc/**/*.js';
//-- ejs files used in the server
filePaths.serverEJS = './src/serverSrc/**/*.ejs';
//-- server base
filePaths.serverStartIndex = './src/serverSrc/index.js';
filePaths.serverStartIndexPath = path.resolve(basePath, filePaths.serverStartIndex);


//    #    #    #    #    #    #    #    #    #    #    #
//-- site side paths
//    #    #    #    #    #    #    #    #    #    #    #

//-- source for all client side code
filePaths.siteSrcDir = 'src/siteSrc';
//-- path to the site src folder
filePaths.siteSrcPath = path.resolve(basePath, filePaths.siteSrcDir);
//-- location for all files to be copied as-is
filePaths.siteResourcesDir = `${filePaths.siteSrcDir}/resources`;
filePaths.siteResourcesPath = path.resolve(basePath, filePaths.siteResourcesDir);
//-- location of all base scripts
filePaths.siteAppDir = `${filePaths.siteSrcDir}/script/app`;
//-- path to the base scripts
filePaths.siteAppPath = path.resolve(basePath, filePaths.siteAppDir);
//-- path for all components
filePaths.siteComponents = `${filePaths.siteSrcDir}/script/components`;
//-- pattern for all possible components
filePaths.siteComponentsPattern = `${filePaths.siteComponents}/**/*.{js,jsx,ts,tsx}`;

filePaths.siteResources = `${filePaths.siteSrcDir}/resources`;


//    #    #    #    #    #    #    #    #    #    #    #
//-- local modules
//    #    #    #    #    #    #    #    #    #    #    #

//-- local modules
filePaths.localModulesJS = './src/local_modules/**/*.js';


//    #    #    #    #    #    #    #    #    #    #    #
//-- jest / testing
//    #    #    #    #    #    #    #    #    #    #    #

//-- test patterns
filePaths.testPattern = './src/**/*test.js';
//-- collection of all the current test patterns
filePaths.testPatterns = [filePaths.testPattern];


//    #    #    #    #    #    #    #    #    #    #    #
//-- eslint
//    #    #    #    #    #    #    #    #    #    #    #

//-- production version of eslint
filePaths.eslintProduction = 'eslint.prod.json';
filePaths.eslintDevelopment = 'eslint.json';

//-- path and location of the current esconfig to use
filePaths.eslintConfig = filePaths.eslintDevelopment;
if (config.NODE_ENV == config.PRODUCTION) {
  filePaths.eslintConfig = filePaths.eslintProduction;
}
filePaths.eslintConfigPath = path.resolve(basePath, filePaths.eslintConfig);

//    #    #    #    #    #    #    #    #    #    #    #
//-- nodemon
//    #    #    #    #    #    #    #    #    #    #    #

//-- location of the styleguide config
filePaths.styleGuideConfig = './styleguide.config';

//-- files to monitor for nodemon
filePaths.nodemonWatchPaths = [
  filePaths.serverJS,
  filePaths.serverEJS,
  filePaths.localModulesJS
];

filePaths.nodemonWatchExtensions = '.js,.ejs';

//    #    #    #    #    #    #    #    #    #    #    #
//-- styleguidist
//    #    #    #    #    #    #    #    #    #    #    #

filePaths.styleguidistIgnorePatterns = [
  '**/*.test.js',
  '**/index.js'
];

module.exports = filePaths;