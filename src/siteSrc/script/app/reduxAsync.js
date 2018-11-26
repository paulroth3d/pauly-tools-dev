/**
 * Async redux app with async callouts.
 **/

/**
 * Example redux app
 **/

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {DEFAULT_STATE, ReduxAsync} from '../components/reduxAsync/ReduxAsyncReducers';
import ReduxAsyncApp from '../components/reduxAsync/ReduxAsyncApp';

const store = createStore(ReduxAsync, DEFAULT_STATE);
window.store = store;

render(
  <Provider store={store}>
    <ReduxAsyncApp />
  </Provider>,
  document.getElementById('app')
);

