const moment = require('moment');

const result = moment().format('dddd, MMMM D, YYYY, h:mm:ss a');

module.exports = result;

/*
define(['moment'], function(moment) {
  return moment().format('dddd, MMMM D, YYYY, h:mm:ss a');
});
*/
