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
 * Creates a new EJS page
 * @param {string} pageName - the name of the page
 * @return {string} - path of the file written
 */
function createEJS(pageName) {
  console.log('writing out a new ejs page:' + pageName);

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

  const targetPath = path.resolve(__dirname, `../serverSrc/pages/${pageName}.ejs`);
  console.log('path to write', targetPath);

  console.log('ejsBody', ejsBody);

  fs.writeFileSync(targetPath, ejsBody);

  return targetPath;
}

/**
 * Creates a new javascript app page
 * @param {string} appName - the name of the app
 * @return {string} - path of the file written
 */
function createJSApp(appName) {
  const appPath = path.resolve(__dirname, `../siteSrc/script/app/${appName}.js`);
  console.log('wrote file to', appPath);
  const appBody = `//-- place your javascript down below.
`;
  fs.writeFileSync(appPath, appBody);
  return appPath;
}

module.exports = {
  createEJS: createEJS,
  createJSApp: createJSApp,
  createPage: createPage
};