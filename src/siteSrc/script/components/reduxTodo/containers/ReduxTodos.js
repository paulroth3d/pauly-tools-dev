/**
 * Context aware list of todos
 **/

import {connect} from 'react-redux';
import {toggleTodo, VISIBILITY_FILTERS} from '../actions';
import ReduxTodoList from '../presentation/ReduxTodoList';

const calculatePropFromState = (todos, visibilityFilter) => {
  var results = [];
  if (visibilityFilter === VISIBILITY_FILTERS.SHOW_COMPLETED) {
    console.log('something here');
    results = todos.filter((todo) => {
      return todo.isComplete;
    });
    /*
    todos.forEach((todo, index) => {
      if (todo.isCompleted) {
        results.push(todo);
      }
    });
    */
  } else if (visibilityFilter === VISIBILITY_FILTERS.SHOW_ACTIVE) {
    results = todos.filter((todo) => {
      return !todo.isComplete;
    });
  } else {
    results = todos;
  }
  return results;
}

const mapStateToProps = (state, ownProps) => {
  return ({
    todos: calculatePropFromState(state.records, state.visibilityFilter)
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  })
};

const ReduxTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTodoList);

export default ReduxTodos;
