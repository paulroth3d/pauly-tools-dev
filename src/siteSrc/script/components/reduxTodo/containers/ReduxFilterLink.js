/**
 * Container component for links
 **/

import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions';
import ReduxLink from '../presentation/ReduxLink';

const mapStateToProps = (state, ownProps) => {
  return ({
    active: (state.visibilityFilter === ownProps.filter)
  });
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  })
};

const ReduxFilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxLink);

export default ReduxFilterLink;
