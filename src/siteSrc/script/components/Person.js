import React from 'react';
import PropTypes from 'prop-types';

const Person = (props) => {
  return (
    <p>Hello, my name is {props.name}. I am a {props.type} person. {props.children}</p>
  );
}

Person.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any
};

export default Person;