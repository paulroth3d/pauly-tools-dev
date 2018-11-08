/**
 * Collection of utility methods used by the title page.
 */

const TitleUtil = require('../../local_modules/TitleUtil')

/**
 * Handle the express request
 * @param {Object} request - express request
 * @param {Object} response - express response 
 * @returns {Object} - the express response
 */
function handleExpressRequest(request, response) {

  const requestParams = request.query;

  var pageParams = {
    title: TitleUtil.getExpressTitleParam(requestParams),
    showHelp: TitleUtil.getExpressHelpParam(requestParams)
  };

  var {hour, minute, alarmStr, runTimer} = TitleUtil.getExpressAlarmParam(requestParams);
  pageParams.hour = hour;
  pageParams.minute = minute;
  pageParams.alarmStr = alarmStr;
  pageParams.runTimer = runTimer;

  response.render('pages/title', pageParams);
}

module.exports = {
  handleExpressRequest: handleExpressRequest
};