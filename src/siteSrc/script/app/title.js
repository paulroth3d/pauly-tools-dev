//-- place your javascript down below.

require('../../style/title-old.scss');

const jQuery = require('../../lib/oldTitle/jquery_2.1.3.min');
require('../../lib/bootstrap-3.3.7-dist/js/bootstrap.min');
require('../../lib/bootstrap-3.3.7-dist/css/bootstrap.css');

/** tinycolor library */
const TinyColor = require('../../lib/tinycolor');

/** library for working with notifications */
const NotificationUtil = require('../common/NotificationUtil');

/**
 * determines a random color
 * @returns {color} - random color
 **/
function getRandomColor() {
  // debugger;
  var randColor = TinyColor.random().saturate(100).setAlpha(1);
  correctBrightness( randColor, 15 );
  return( randColor );
}

/**
 * Resizes the title to something that is legible
 * @returns {integer} - font size for the new title.
 */
function resizeTitle(){
  var topSize = 1500;
  var textLen = jQuery( "#title" ).text().length;
  var newSize = Math.round( topSize / textLen );
  newSize = Math.min( newSize, 400 );
  newSize = Math.max( newSize, 150 );
  return( newSize );
}

/**
 * Detects if the color is too 'muddy' and difficult to read
 * based on an epsilon (+- amount)
 * 
 * @param {color} myColor - color to correct
 * @param {integer} muddyThreshold - the epsilon threshold to use
 * @returns {color} - updated color
 */
function correctBrightness( myColor, muddyThreshold ){
  var brightness = myColor.getBrightness();
  var lower = Math.floor( 255/2 );
  var upper = lower * 1;

  lower -= muddyThreshold;
  upper += muddyThreshold;

  if( brightness >= lower && brightness <= upper ){
    myColor.darken( muddyThreshold );
  }
  return( myColor );
}

/**
 * Initialize the notifications of the page
 * @returns {void}
 */
function initializeNotifications(){
  var {showHelp, hour, minute, runTimer, title } = window.pageParams;

  if (showHelp) {
    var now = new Date();

    //-- default the time if not provided
    if (!isNaN(hour) || isNaN(minute)) {
      hour = now.getHours();
      minute = now.getMinutes();

      //-- round to the nearest 15
      minute += 15 - (minute % 15);

      //-- if near hour, round to the next hour
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

    var notificationEl = '';
    if (runTimer) {
      console.info('setting notification for:' + targetDate.toLocaleString());
      notificationEl = 'Setting notification for:' + targetDate.toLocaleString();

      NotificationUtil.scheduleNotification(hour, minute, title);
    } else {
      notificationEl = `<a href="?title=${title}&alarm=${hour}:${minute}">Add Timer: ${targetDate.toLocaleTimeString()}</a>`;
    }
    
    jQuery('div.notification-block').html(notificationEl);
  }
}

jQuery(document).ready(function(){
  var randColor = getRandomColor();
  jQuery('div.color-block').css('background', randColor.toHexString());

  var titleStr = window.pageParams.title;
  var titleLen = titleStr.length;
  
  var newSize = resizeTitle();
  jQuery('#title').css('font-size', newSize);
  jQuery('.jumbotron .container').css('font-size', newSize);

  var colorHeight = 0.18 + (titleLen * 0.006);
  jQuery( "div.color-block" ).css( "height", "" + colorHeight.toFixed(2) + "em" );
  resizeTitle();

  initializeNotifications();
})