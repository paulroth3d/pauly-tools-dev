/**
 * Config for nodemon.
 * Used only for express side changes
 * (things that are not captured by webpack)
 */

const filePaths = require('./config/FilePaths');

const nodemonConfig = {
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    "public/"
  ],
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "ext": filePaths.nodemonWatchExtensions,
  "verbose": true,
  "watch": [
    filePaths.serverJS,
    filePaths.serverEJS,
    filePaths.localModulesJS
  ]
}

module.exports = nodemonConfig;