/**
 * Utility for working with colors
 */

const TinyColor = require('../../lib/tinycolor');

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

export default {
  getRandomColor: getRandomColor,
  correctBrightness: correctBrightness
};