/* global document */

//-- handle either requires or imports
require('../../style/exampleJavascript.scss');
import yayIcon from '../../img/yay.png';

//-- library for calculating the time to display
const currentTime = require('../common/displayTime');


//-- set an image through javascript
var yayEl = document.getElementById('yay');
yayEl.src = yayIcon;


const message = 'Hello, world!';
const displayTime = `The current time is: ${currentTime}`;
document.write(`<div id='title' class="clock">${message}</div>`);
document.write(`<div class='clock'>${displayTime}</div>`);

