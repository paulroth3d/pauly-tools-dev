/**
 * Module for stubbing out the site.
 */

const fs = require('fs-extra');
const path = require('path');
const log = require('fancy-log');

/**
 * Writes an EJS and JS app page
 * @param {pageName} pageName - name of the page to make
 * @return {object} - the path of the ejs and app pages
 */
function createPage(pageName) {
  var results = {
    ejs: null,
    app: null
  };

  try {
    results.ejs = createEJS(pageName);
  } catch(err) {
    log.error(`unable to write ejs file:${pageName}`);
    return;
  }

  try {
    results.app = createJSApp(pageName);
  } catch(err) {
    log.error(`unable to write js app:${pageName}`);
    return;
  }

  return results;
}

/**
 * Generates the EJS file using a template
 * @param {string} pageName - the short name of the page to create
 * @returns {string} - body of the new EJS file
 */
function generateEJS(pageName) {
  const ejsBody = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <% include ../partials/liveReload.ejs %>
    <title>${pageName}</title>
  </head>
  <body>
      <div id="app"></div>
      <script src="/${pageName}.js"></script>
  </body>
</html>`;

  return ejsBody;
}

/**
 * Determines the path of where the EJS file should go with a given pageName
 * @param {string} pageName - the path of where the ejs page should go
 * @returns {string} - path for where the ejs file should go
 */
function determineEJSPath(pageName) {
  const targetPath = path.resolve(__dirname, `../serverSrc/pages/${pageName}.ejs`);
  return targetPath;
}

/**
 * Creates a new EJS page
 * @param {string} pageName - the name of the page
 * @return {string} - path of the file written
 */
function createEJS(pageName) {
  console.log('writing out a new ejs page:' + pageName);

  var ejsBody = generateEJS(pageName);
  const targetPath = determineEJSPath(pageName);

  fs.writeFileSync(targetPath, ejsBody);

  return targetPath;
}

/**
 * Generates the default body of a new JS App with a given app name.
 * @param {string} appName - short name of the app
 * @returns {string} - body of a new JS App file
 */
function generateJSApp(appName) {
  const appBody = `//-- place your javascript down below.
`;
  return appBody;
}

/**
 * Determines the path for where a new JS App should be placed.
 * @param {string} appName - short name of the app
 * @returns {string} - path where the JSApp should go
 */
function determineJSAppPath(appName) {
  const appPath = path.resolve(__dirname, `../siteSrc/script/app/${appName}.js`);
  return appPath;
}

/**
 * Creates a new javascript app page
 * @param {string} appName - the name of the app
 * @return {string} - path of the file written
 */
function createJSApp(appName) {

  const appBody = generateJSApp(appName);
  const appPath = determineJSAppPath(appName);
  fs.writeFileSync(appPath, appBody);
  console.log('wrote file to', appPath);

  return appPath;
}

module.exports = {
  createEJS: createEJS,
  createJSApp: createJSApp,
  createPage: createPage,

  _generateEJS: generateEJS,
  _determineEJSPath: determineEJSPath,
  _generateJSApp : generateJSApp,
  _determineJSAppPath : determineJSAppPath
};