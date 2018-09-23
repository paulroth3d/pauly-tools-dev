/* global document */

const currentTime = require('./displayTime');
const titlePageStyles = require('../../style/title-page.scss');

document.write(`Hello, world. The current time is: ${currentTime}`);
