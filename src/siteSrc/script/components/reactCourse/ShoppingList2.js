import React from 'react';
import PropTypes from 'prop-types';

require('../../../style/smiley.scss');

const ShoppingList2 = (props) => {
  return (
    <div className='shopping-list'>
      <h1>Shopping list</h1>
      <ul>
        <li>Item1 - <img className='smiley' /></li>
        <li>Item2 - <img className='smiley' /></li>
        <li>Item3 - <img className='smiley' /></li>
      </ul>
    </div>
  );
}

ShoppingList2.propTypes = {
  msg: PropTypes.any
};

export default ShoppingList2;
