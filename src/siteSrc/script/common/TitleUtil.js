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

export default {
  resizeTitle: resizeTitle,
  resizeColorBlock: resizeColorBlock
}