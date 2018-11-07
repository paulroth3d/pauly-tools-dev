/**
 * Configure jest
 */

const filePaths = require('./config/FilePaths');

// const babelJest = require('babel-jest');
// const babelTransformer = babelJest.createTransformer(babelConfig);

/**
 * Creates a jest configuration
 * @param {object} configOptions - meta options for configuring jest
 * @returns {object} - jest configuration
 */
function configureJest(configOptions){
  
  //-- although we can totally use the root dir
  //-- all the paths are held in the FilePaths config file
  //-- to ensure that all the paths are managed from a single spot.
  //-- replacing the need for any rootDir element handled specific to Jest
  
  // const rootDir = '<rootDir>/';
  
  const results = {
    "verbose": true,
    "modulePaths": [
      filePaths.srcPath
    ],
    "modulePathIgnorePatterns": [
      filePaths.serverPublicPath,
      filePaths.siteResourcesPath
    ],
    //-- allow for expectation messages (only if real time values are needed)
    "setupTestFrameworkScriptFile": "jest-expect-message",
    "moduleNameMapper": {
      "^.*[.](jpg|JPG|gif|GIF|png|PNG|less|LESS|css|CSS|scss|SCSS)$": filePaths.testEmptyModulePath,
    },
    "setupTestFrameworkScriptFile": filePaths.testSetupPath
  };

  return results;
}

module.exports = configureJest();