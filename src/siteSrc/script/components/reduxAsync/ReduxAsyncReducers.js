/**
 * Reducers that take the actions and convert them to state.
 * <p>Or if no action is provided, sets the initial state</p>
 */

import {combineReducers} from 'redux';

import {
  FETCH_POST_REQUEST,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS
} from './ReduxAsyncActions'

/** global counter */
let UUID = 1;

/**
 * Updates and returns a unique identifier
 * @returns {integer} - unique identifier
 */
function updateUUID() {
  return UUID++;
}

/**
 * calculate the state of records
 * @param {array} state - current state
 * @param {object} action - action to process
 * @returns {*} - updated state
 */
/*
function records(state = [], action) {
  switch (action.type) {
    case PERFORM_ACTION:
      return [
        ...state,
        {
          text: action.text,
          id: TODO_UUID++
        }
      ];
    case PERFORM_ANOTHER_ACTION:
      return state.map((record, index) => {
        if (index === action.index) {
          return Object.assign({}, record, {
            text: record.text + '-'
          });
        }
        return record;
      });
    default:
      return state;
  }
}
*/

/**
 * reducer for the entire app
 * @param {*} state - current state
 * @param {object} action - action to perform
 * @returns {*} - updated state
 */
/*
const  = function reducer(state = {}, action) {
  return {
    records: records(state.todos, action)
  };
}
*/
//-- or the equivalent using combine reducers.

/**
 * Main reducer for the app that divides up the state
 */
const ReduxAsyncReducers = combineReducers({
});

export const ReduxAsync = ReduxAsyncReducers;

export const DEFAULT_STATE = {
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: true,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application using React JS and Flux Architecture'
        }
      ]
    }
  }
}