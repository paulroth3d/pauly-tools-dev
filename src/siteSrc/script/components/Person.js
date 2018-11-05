import React from 'react';
import PropTypes from 'prop-types';

const Person = (props) => {
  var personMessage = null;
  if (props.children && props.children.length > 0) {
    personMessage = <b>{props.children}</b>;
  }
  return (
    <p>Hello, my name is {props.name}. I am a {props.type} person. {personMessage} <button onClick={props.clickHandler}>Say Hello</button></p>
  );
}

Person.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  clickHandler: PropTypes.func,
  children: PropTypes.any
};

export default Person;