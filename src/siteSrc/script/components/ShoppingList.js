import React from 'react';

class ShoppingList extends React.Component {
  render() {
    return (
      <div className='shopping-list'>
        <h1>Shopping list</h1>
        <ul>
          <li>Item1</li>
          <li>Item2</li>
          <li>Item3</li>
        </ul>
      </div>
    );
  }
}

module.exports = ShoppingList;
