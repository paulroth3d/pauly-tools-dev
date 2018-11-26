/**
 * List of Redux actions
 **/

//-- note: you can also split actions into other files
//-- and then include them in an index.js file like this:
//-- export * from './ProductActions';

//-- any constants
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

/**
 * Creates an addTodo action
 * @param {string} subReddit - the subreddit to ask information for
 * @returns {object} - redux action {type:string,...}
 */
export function requestSubreddit(subReddit) {
  return {type: FETCH_POST_REQUEST, subReddit};
}

/**
 * Creates an addTodo action
 * @param {string} msg - Error message
 * @returns {object} - redux action {type:string,...}
 */
export function fetchPostErrorAction(msg) {
  return {type: FETCH_POST_ERROR, msg};
}

/**
 * Creates an addTodo action
 * @param {any} response - response from the action
 * @returns {object} - redux action {type:string,...}
 */
export function fetchPostSuccessAction(response) {
  return {type: FETCH_POST_SUCCESS, response};
}