/* global document */

require('../../style/title-page.scss');

const currentTime = require('../common/displayTime');

const message = 'Hello, world.';
const displayTime = `The current time is: ${currentTime}`;

// debugger;
// document.getElementById('clock').innerHTML = currentTime;

document.write(`<div id='title' class="clock">${message}</div>`);
document.write(`<div class='clock'>${displayTime}</div>`);
