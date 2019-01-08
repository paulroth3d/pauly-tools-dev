/**
 * Simple utility for any other generic things needed
 * for the titlebar.
 */

/**
 * Resizes the title to something that is legible
 * @param {string} title - the title we want to show
 * @returns {integer} - font size for the new title.
 */
function resizeTitle(title) {
  const topSize = 1500;
  const textLen = title.length;
  var newSize = Math.round( topSize / textLen );
  newSize = Math.min( newSize, 400 );
  newSize = Math.max( newSize, 150 );
  return( newSize );
}

/**
 * Determines teh size of the color block
 * @param {string} title - the title to show
 * @returns {integer} - the size of the color block
 */
function resizeColorBlock(title){
  const titleLen = title ? title.length : 0;
  const colorHeight = 0.18 + (titleLen * 0.006);
  return colorHeight;
}

/**
 * Determines the title from the express request
 * @param {Object} requestParams - express request
 * @return {string} - the title to use from the request
 */
function getExpressTitleParam(requestParams) {
  var title = null;

  try {
    title = requestParams.title;
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
 * @param {Object} requestParams - express request
 * @return {boolean} - whether it should be shown (true) or not (false)
 */
function getExpressHelpParam(requestParams) {
  var results = true;

  if (requestParams.help === false || requestParams.help === 'false') {
    results = false;
  }

  return results;
}

/**
 * Determines the alarm information from the express request
 * @param {Object} requestParams - express request
 * @return {Object} - the info about the alarm {hour:int, minute:int, str:string}
 */
function getExpressAlarmParam(requestParams){
  var results = {
    hour: 0,
    minute: 0,
    alarmStr: '',
    runTimer: false
  };

  const now = new Date();
  let alarmMatch = null;
  if (requestParams.alarm){
    alarmMatch = requestParams.alarm.match(/(\d+):(\d+)\s*([aApP][mM])?/);
  }
  if (alarmMatch){
    results.hour = parseInt(alarmMatch[1]);
    results.minute = parseInt(alarmMatch[2]);
    results.alarmStr = requestParams.alarm;
    results.runTimer = true;
    results.amPm = alarmMatch[3];
  } else {
    results.hour = now.getHours();
    results.minute = now.getMinutes();
    results.alarmStr= `${results.hour}:${results.minute} MT`;
    results.runTimer = false;
    results.amPm = 'MT';
  }

  if (results.amPm && results.amPm.toUpperCase() === 'PM' &&
    results.hour < 12
  ){
    results.hour += 12;
  }

  //-- if the alarm was not set explicitly, round it
  //-- round to the nearest next 15
  if (!alarmMatch) {
    results.minute += 15 - (results.minute % 15);

    if (results.minute >= 60) {
      results.hour += Math.floor(results.minute/60);
      results.minute = results.minute % 60;
    }

    results.alarmStr= `${results.hour}:${results.minute} MT`;
  }

  results.targetDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    results.hour,
    results.minute
  );

  return results;
}

module.exports = {
  resizeTitle: resizeTitle,
  resizeColorBlock: resizeColorBlock,
  getExpressAlarmParam: getExpressAlarmParam,
  getExpressHelpParam: getExpressHelpParam,
  getExpressTitleParam: getExpressTitleParam
}