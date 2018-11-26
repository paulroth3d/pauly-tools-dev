/**
 * Represents a list of redux todo items.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReduxTodoItem from './ReduxTodoItem';

const ReduxTodoList = ({todos, onTodoClick}) => {
  return (
    <ul>
      {todos.map((todo, index) => {
        return (
          <ReduxTodoItem key={todo.id} {...todo} onClick={() =>onTodoClick(todo.id)} />
        )
      })}
    </ul>
  );
}

ReduxTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default ReduxTodoList;
