/**
 * Container for all he different types of filter links.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import ReduxFilterLink from '../containers/ReduxFilterLink';
import { VISIBILITY_FILTERS } from '../actions';

const ReduxFooter = (props) => {
  return (
    <p>
      Show:
      <ReduxFilterLink filter={VISIBILITY_FILTERS.SHOW_ALL}>All</ReduxFilterLink>
      -
      <ReduxFilterLink filter={VISIBILITY_FILTERS.SHOW_ACTIVE}>Active</ReduxFilterLink>
      -
      <ReduxFilterLink filter={VISIBILITY_FILTERS.SHOW_COMPLETED}>Completed</ReduxFilterLink>
    </p>
  );
}

ReduxFooter.propTypes = {
};

export default ReduxFooter;
