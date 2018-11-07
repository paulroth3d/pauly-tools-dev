/**
 * Collection of utility methods used by the title page.
 */

/**
 * Handle the express request
 * @param {Object} request - express request
 * @param {Object} response - express response 
 * @returns {Object} - the express response
 */
function handleExpressRequest(request, response) {
  var pageParams = {
    title: getExpressTitleParam(request),
    showHelp: getExpressHelpParam(request)
  };

  var {hour, minute, alarmStr, runTimer} = getExpressAlarmParam(request);
  pageParams.hour = hour;
  pageParams.minute = minute;
  pageParams.alarmStr = alarmStr;
  pageParams.runTimer = runTimer;

  response.render('pages/title', pageParams);
}

/**
 * Determines the title from the express request
 * @param {Object} request - express request
 * @return {string} - the title to use from the request
 */
function getExpressTitleParam(request) {
  var title = null;

  try {
    title = request.query.title;
  } catch (err) {
    console.error('could not find req.query.title');
    console.error(err);
  }

  if (!title) {
    title='ExampleTitle';
  }

  return title;
}

/**
 * Determines if the help should be shown
 * @param {Object} request - express request
 * @return {boolean} - whether it should be shown (true) or not (false)
 */
function getExpressHelpParam(request) {
  var results = true;

  if (request.query.help === false || request.query.help === 'false') {
    results = false;
  }

  return results;
}

/**
 * Determines the alarm information from the express request
 * @param {Object} request - express request
 * @return {Object} - the info about the alarm {hour:int, minute:int, str:string}
 */
function getExpressAlarmParam(request){
  var results = {
    hour: 0,
    minute: 0,
    str: '',
    runTimer: false
  };

  if (request.query.alarm){
    var alarmMatch = request.query.alarm.match(/(\d+):(\d+)\s*([aApP][mM])?/);
    if (alarmMatch){
      results.hour = parseInt(alarmMatch[1]);
      results.minute = parseInt(alarmMatch[2]);
      results.alarmStr = request.query.alarm;

      var amPm = alarmMatch[3];
      if (amPm && amPm.toUpperCase() === 'PM' &&
        results.hour < 12
      ){
        results.hour += 12;
      }

      //-- round to the nearest next 15
      results.minute += 15 - (results.minute % 15);

      if (results.minute >= 60) {
        results.hour += Math.floor(results.minute/60);
        results.minute = results.minute % 60;
      }

      results.runTimer = true;
    }
  }

  return results;
}

module.exports = {
  handleExpressRequest: handleExpressRequest,
  _getExpressAlarmParam: getExpressAlarmParam,
  _getExpressHelpParam: getExpressHelpParam,
  _getExpressTitleParam: getExpressTitleParam
};