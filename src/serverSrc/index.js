const log = require('fancy-log');
const express = require('express');
const path = require('path');
const config = require('config');

const filePaths = require('.././../config/FilePaths');

//-- routes
const TitlePageRoute = require('../local_modules/routes/TitlePageRoute');

const PORT = process.env.PORT || config.DEFAULT.PORT;

/**
 * base page redirect
 * @param {object} req - express request
 * @param {object} resp - express response
 * @return {object} - page
 */
function handleBaseRedirect(req, resp) {
  const redirectURL = (process.env.BASE_REDIRECT || config.BASE_REDIRECT);
  resp.redirect(redirectURL);
}

//-- configure express
const expressServer = express()
  .use(express.static(filePaths.serverPublicPath))
  .set('views', filePaths.serverSrcPath)
  .set('view engine', 'ejs');

//-- include any routes
//-- get|post(stringPath, function(request,response))
expressServer
  .get('/', handleBaseRedirect)
  .get('/heroku', (req, res) => res.render('pages/heroku'))
  .get('/javascript', (req, res) => res.render('pages/exampleJavascript'))
  .get('/react', (req, res) => res.render('pages/exampleReact'))
  .get('/reactCourse', (req,res) => res.render('pages/reactCourse'))
  .get('/titleOld', TitlePageRoute.handleExpressRequest)
  .get('/title', (req,res) => res.render('pages/title'))
  .get('/reduxTodo', (req, res) => res.render('pages/reduxTodo'));

//-- anything more than providing a renderer to a page should be handled in its own separate module.

expressServer.listen(PORT, () => log(`Listening on ${PORT}`));