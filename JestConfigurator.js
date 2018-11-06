
const underscore = require('underscore');

/**
 * Creates a jest configuration
 * @param {object} configOptions - meta options for configuring jest
 * @returns {object} - jest configuration
 */
function configureJest(configOptions){
  const results = {
    "verbose": true,
    "modulePaths": [
      "<rootDir>/src/"
    ],
    "modulePathIgnorePatterns": [
      "<rootDir>/src/serverSrc/public",
      "<rootDir>/src/siteSrc/lib",
    ]
  };

  return results;
}

module.exports = {
  configureJest
};