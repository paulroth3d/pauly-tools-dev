/**
 * List of Redux actions
 **/

//-- note: you can also split actions into other files
//-- and then include them in an index.js file like this:
//-- export * from './ProductActions';

//-- any constants
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VISIBILITY_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/**
 * Creates an addTodo action
 * @param {string} text - the text to add for a todo
 * @returns {object} - redux action {type:string,...}
 */
export function addTodo(text) {
  return {type: ADD_TODO, text, completed:false};
}

/**
 * Creates a toggle todo action
 * @param {string} id - the id of the record
 * @returns {object} - a redux action {type:string, ...}
 */
export function toggleTodo(id){
  return {type: TOGGLE_TODO, id};
}

/**
 * Creates a set visibility action
 * @param {string} newVisibilityFilter - new visibility filter
 * @returns {object} - a redux action {type:string, ...}
 */
export function setVisibilityFilter(newVisibilityFilter){
  return {type: SET_VISIBILITY_FILTER, newVisibilityFilter};
}