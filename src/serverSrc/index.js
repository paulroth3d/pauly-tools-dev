const log = require('fancy-log');
const express = require('express');
const path = require('path');
const config = require('config');

const PORT = process.env.PORT || config.DEFAULT.PORT;

/**
 * base page redirect
 */
function handleBaseRedirect(req, resp) {
  const redirectURL = (process.env.BASE_REDIRECT || config.BASE_REDIRECT);
  resp.redirect(redirectURL);
}

const expressServer = express()
  .use(express.static(path.resolve(__dirname, 'public')))
  .set('views', path.join(__dirname, './'))
  .set('view engine', 'ejs')
  .get('/', handleBaseRedirect)
  .get('/heroku', (req, res) => res.render('pages/heroku'))
  .get('/javascript', (req, res) => res.render('pages/exampleJavascript'))
  .get('/react', (req, res) => res.render('pages/exampleReact'));

//-- anything more than providing a renderer to a page should be handled in its own separate module.

expressServer.listen(PORT, () => log(`Listening on ${PORT}`));
