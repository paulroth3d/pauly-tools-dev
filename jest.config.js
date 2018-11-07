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
  const rootDir = '<rootDir>/';
  
  const results = {
    "verbose": true,
    "modulePaths": [
      rootDir + 'src/'
    ],
    "modulePathIgnorePatterns": [
      rootDir + filePaths.serverPublicDir,
      rootDir + filePaths.siteResourcesDir
    ],
    //-- allow for expectation messages (only if real time values are needed)
    "setupTestFrameworkScriptFile": "jest-expect-message",
    "moduleNameMapper": {
      "^.*[.](jpg|JPG|gif|GIF|png|PNG|less|LESS|css|CSS|scss|SCSS)$": "<rootDir>/src/local_modules/EmptyModule"
    }
  };

  return results;
}

module.exports = configureJest();