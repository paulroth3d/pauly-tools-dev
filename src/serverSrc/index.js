const log = require('fancy-log');
const express = require('express');
const path = require('path');
const config = require('config');

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

/**
 * Handle the title page
 * @param {object} req - express request
 * @param {object} resp - express response
 * @return {object} - page
 */
function handleTitlePage(req, resp) {
  var title = 'Send title as get param';

  try {
    title = req.query.title;
  } catch (err) {
    console.error('could not find req.query.title');
    console.error(err);
  }

  var pageConfig = {
    title: title,
    showHelp: true,
    hour: null,
    minute: null,
    alarmStr: '',
    runTimer: false
  };

  if (req.query.help === 'false') {
    pageConfig.showHelp = false;
  }

  if (req.query.alarm){
    var alarmMatch = req.query.alarm.match(/(\d+):(\d+)\s*([aApP][mM])?/);
    if (alarmMatch){
      pageConfig.hour = parseInt(alarmMatch[1]);
      pageConfig.minute = parseInt(alarmMatch[2]);

      var amPm = alarmMatch[3];
      if (amPm && amPm.toUpperCase() === 'PM' &&
        pageConfig.hour < 12
      ){
        pageConfig.hour += 12;
      }

      pageConfig.runTimer = true;
      pageConfig.alarmStr = req.query.alarm;
    }
  }

  log('pageConfig:', JSON.stringify(pageConfig));

  resp.render('pages/title', pageConfig);
}

const expressServer = express()
  .use(express.static(path.resolve(__dirname, 'public')))
  .set('views', path.join(__dirname, './'))
  .set('view engine', 'ejs')
  .get('/', handleBaseRedirect)
  .get('/heroku', (req, res) => res.render('pages/heroku'))
  .get('/javascript', (req, res) => res.render('pages/exampleJavascript'))
  .get('/react', (req, res) => res.render('pages/exampleReact'))
  .get('/title', handleTitlePage);

//-- anything more than providing a renderer to a page should be handled in its own separate module.

expressServer.listen(PORT, () => log(`Listening on ${PORT}`));