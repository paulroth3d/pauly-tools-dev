/**
 * Utility for working with growl type of notifications
 * in the browser.
 */

/**
 *  Sets a notification at a specific hour, minute with an optional title.
 *  @param {integer} hour - 0-23 hour
 *  @param {integer} minute - 0-60 minute
 *  @param {string} notificationTitle (?) - title to show at the time
 *  @param {audioElement} notificationSound - the sound to play on notification
 *  @visibility - public
 *  @returns {void}
 **/
function scheduleNotification(hour, minute, notificationTitle, notificationSound){
  if (typeof Notification == 'undefined'){
    alert('Notifications are only available in modern versions of Chrome, Firefox, Opera or Safari.');
  }

  if( !notificationTitle ){
    notificationTitle = "";
  }

  if( !notificationSound ){
    notificationSound = null;
  }
  
  Notification.requestPermission(function(permission){
    if( permission !== 'granted' ) return;
    
    executeAtHourMinute( runNotification, hour, minute, [notificationTitle, notificationSound] );
  });
}

/**
 *  Executes a notification
 *  @param {string} notificationTitle - Title to provide notification for
 *  @param {audioElement} notificationSound - sound to play for the notification.
 *  @visibility - protected
 *  @returns {void}
 **/
function runNotification(notificationTitle, notificationSound){
  if( !notificationTitle ){
    notificationTitle = "";
  }

  var notification = new Notification("Alert for: " + notificationTitle, {
    body: "Scheduled alert",
    requireInteraction: true
  });

  playNotificationSound(notificationSound);

  notification.onclick = function(){
    window.focus();
    parent.focus();
    // alert(notificationTitle);
  };
}

/**
 * attempt to play a sound notification
 * @param {soundElement} notificationSoundElement - the sound element to play
 * @returns {void}
 */
function playNotificationSound(notificationSoundElement){
  const retryNotification = function(notificationSoundElement){
    console.error('sound element there, but could not call it. retrying.');
    setTimeout(() => {
      playNotificationSound(notificationSoundElement);
    }, 1000);
  };

  if( notificationSoundElement && ((typeof notificationSoundElement.play) != 'undefined') ){
    try {
      const playPromise = notificationSoundElement.play();
      if( playPromise ){
        playPromise.catch((err) => {
          for( var prop in err){ console.log('notificationSound.err[' + prop + ']:' + (err[prop]));}
          retryNotification(notificationSoundElement);
        });
      }
    } catch(err){
      for( var prop in err){ console.log('notificationSound.err[' + prop + ']:' + (err[prop]));}
      retryNotification(notificationSoundElement);
    }
  }

  return null;
}

/**
 * Determines the time offset to a given hour / minute
 * @param {integer} hour - hour
 * @param {integer} minute - minute
 * @returns {integer} - number of milliseconds to a given hour / minute
 **/
function getTimeOffset(hour,minute){
  
  var hourMinuteDate = new Date();
  hourMinuteDate.setHours(hour);
  hourMinuteDate.setMinutes(minute);
  hourMinuteDate.setSeconds(0);
  hourMinuteDate.setMilliseconds(0);

  var timeTarget = hourMinuteDate.getTime();
  var timeNow = new Date().getTime();
  var offsetMilli = timeTarget - timeNow;
  return(offsetMilli);
}

/**
 *  Executes a function at a given hour minute (with optional arguments)
 *  @param {function} targetFn - function to execute
 *  @param {integer} hour - hour
 *  @param {integer} minute - minute
 *  @param {*} args - array of optional arguments for the target function
 *  @returns {void}
 **/
function executeAtHourMinute(targetFn, hour, minute, args){
  if( !args ){
    args = [];
  }

  var timeOffset = getTimeOffset(hour,minute);
  if( timeOffset <= 0 ){
    targetFn.apply(this, args);
  } else {
    setTimeout( function(){
      targetFn.apply(this, args);
    }, timeOffset );
  }
}
  
module.exports = {
  scheduleNotification: scheduleNotification,
  runNotification: runNotification,
  getTimeOffset: getTimeOffset,
  executeAtHourMinute: executeAtHourMinute
};