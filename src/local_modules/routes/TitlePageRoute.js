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

  var alarmInfo = TitleUtil.getExpressAlarmParam(requestParams);
  pageParams = {...pageParams, ...alarmInfo};

  response.render('pages/titleOld', pageParams);
}

module.exports = {
  handleExpressRequest: handleExpressRequest
};