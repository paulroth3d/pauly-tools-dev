/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import ShoppingList from '../components/ShoppingList';

const title = 'This is built from react';

ReactDOM.render(
  <div>{title} - <ShoppingList /></div>,
  document.getElementById('app')
);
