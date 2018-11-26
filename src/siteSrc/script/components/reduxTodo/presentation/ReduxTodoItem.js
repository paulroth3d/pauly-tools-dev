import React from 'react';
import PropTypes from 'prop-types';

const ReduxTodoItem = ({title, isComplete, onClick}) => {
  return (
    <li
      style={{ textDecoration: (isComplete?'line-through':'') }}
      onClick={onClick}
    >
      {title}
    </li>
  );
}

ReduxTodoItem.propTypes = {
  /** The title of the todo item */
  title: PropTypes.string.isRequired,
  /** Whether the item is complete or not */
  isComplete: PropTypes.bool,
  /** action when someone clicks on the todo item */
  onClick: PropTypes.func
};

export default ReduxTodoItem;
