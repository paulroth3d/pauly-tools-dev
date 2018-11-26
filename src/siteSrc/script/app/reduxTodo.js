/**
 * Example redux app
 **/

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ReduxTodo from '../components/reduxTodo/reducers';
import ReduxTodoApp from '../components/reduxTodo/ReduxTodoApp';

const store = createStore(ReduxTodo);
window.store = store;

render(
  <Provider store={store}>
    <ReduxTodoApp />
  </Provider>,
  document.getElementById('app')
);
