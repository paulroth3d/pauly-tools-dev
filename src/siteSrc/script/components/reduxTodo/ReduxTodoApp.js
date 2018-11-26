import React from 'react';
import PropTypes from 'prop-types';

import ReduxFooter from './presentation/ReduxFooter';
import ReduxAddTodoForm from './containers/ReduxAddTodoForm';
import ReduxTodos from './containers/ReduxTodos';

const ReduxTodoApp = (props) => {
  return (
    <div>
      <ReduxAddTodoForm />
      <ReduxTodos />
      <ReduxFooter />
    </div>
  );
}

ReduxTodoApp.propTypes = {
};

export default ReduxTodoApp;
