/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

// import reactCourse from '../components/reactCourse';
// const ShoppingList = reactCourse.ShoppingList;

import {ShoppingList} from '../components/reactCourse';

import ShoppingList2 from '../components/reactCourse/ShoppingList2';

const title = 'This is built from react';

ReactDOM.render(
  <div>{title} - <ShoppingList /> - <ShoppingList2 /></div>,
  document.getElementById('app')
);
