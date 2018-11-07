import React from 'react';
import PropTypes from 'prop-types';

const TitleBarTitle = (props) => {

  const titleStyle = {
    fontSize: props.size
  };

  return (
    <h1 id='title' style={titleStyle}>{props.title}</h1>
  );
}

TitleBarTitle.propTypes = {
  title: PropTypes.number,
  size: PropTypes.number
};

export default TitleBarTitle;
