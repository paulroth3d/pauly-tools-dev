/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

// import reactCourse from '../components/reactCourse';
// const ShoppingList = reactCourse.ShoppingList;

import {ShoppingList} from '../components/reactCourse';

const title = 'This is built from react';

ReactDOM.render(
  <div>{title} - <ShoppingList /></div>,
  document.getElementById('app')
);
