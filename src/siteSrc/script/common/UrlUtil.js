/**
 * Class for working with url parameters.
 */

import QueryParse from 'query-parse';

/**
 * Determines the query of the current URL
 * @returns {string} - ex: https://www.google.com?q=hello&p1=10 returns q=hello&p1=10
 */
function getUrlQuery() {
  var query = window.location.search;
  if (query.indexOf('?') > -1) {
    query = query.slice(query.indexOf('?')+1);
  }
  return query;
}

/**
 * Returns an object of the 
 * @param {string} urlQuery - ex: first=name&last=name
 * @returns {object} - object of the url parameters
 */
function convertQueryToObject(urlQuery) {
  if (!urlQuery) {
    urlQuery = getUrlQuery();
  }
  var params = QueryParse.toObject(urlQuery);
  return params;
}

export default {
  getUrlQuery: getUrlQuery,
  convertQueryToObject: convertQueryToObject
}