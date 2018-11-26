/**
 * Reducers that take the actions and convert them to state.
 * <p>Or if no action is provided, sets the initial state</p>
 */

import {combineReducers} from 'redux';

import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VISIBILITY_FILTERS
} from '../actions';

const DEFAULT_VISIBILITY = VISIBILITY_FILTERS.SHOW_ALL;

/** global counter */
let UUID = 1;

/**
 * calculate the state of records
 * @param {array} state - current state
 * @param {object} action - action to process
 * @returns {*} - updated state
 */
function reduceTodos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          title: action.text,
          id: UUID++,
          isComplete: action.completed
        }
      ];
    case TOGGLE_TODO:
      return state.map((record, index) => {
        if (record.id === action.id) {
          return Object.assign({}, record, {
            isComplete: !record.isComplete
          });
        }
        return record;
      });
    default:
      return state;
  }
}

/**
 * Generate the visibility filter based on current state and action
 * @param {string} state - current state
 * @param {object} action - redux action
 * @returns {string} - current state
 */
function reduceVisibilityFilter(state=DEFAULT_VISIBILITY, action){
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.newVisibilityFilter;
    default:
      return state;
  }
}

/**
 * reducer for the entire app
 * @param {*} state - current state
 * @param {object} action - action to perform
 * @returns {*} - updated state
 */
const ReduxTodo = function reducer(state = {}, action) {
  return {
    records: reduceTodos(state.records, action),
    visibilityFilter: reduceVisibilityFilter(state.visibilityFilter, action)
  };
}

export default ReduxTodo;
