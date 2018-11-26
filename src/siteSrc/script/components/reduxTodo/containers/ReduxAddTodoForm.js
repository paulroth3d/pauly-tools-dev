/**
 * Context aware component for adding in todo items.
 */

import {connect} from 'react-redux';
import {addTodo} from '../actions';
import ReduxAddTodo from '../presentation/ReduxAddTodo';

const mapStateToProps = (state, ownProps) => {
  return ({
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    addItemCallback: (title) => {
      dispatch(addTodo(title))
    }
  })
};

const ReduxAddTodoForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxAddTodo);

export default ReduxAddTodoForm;
