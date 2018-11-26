/**
 * simple component for adding a todo item
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReduxAddTodo extends Component {

  constructor(props) {
    super();
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    
    const formResponse = this.myInput.value.trim();
    if (!formResponse) {
      return;
    }

    this.myInput.value = '';
    this.props.addItemCallback(formResponse);
  }

  render() {
    return (
      <div className='ReduxAddTodo'>
        <form
          onSubmit={(evt) => {this.handleFormSubmit(evt);}}
        >
          <input
            ref={(element) => {this.myInput = element;}}
            placeholder='What should we do today?'
          />
          <button type='Submit'>Add Todo</button>
        </form>
      </div>
    );
  }
}

ReduxAddTodo.propTypes = {
  addItemCallback: PropTypes.func
};

export default ReduxAddTodo
