import React from 'react';
import PropTypes from 'prop-types';

const ColorBar = (props) => {

  var blockStyles = {
    backgroundColor: props.color,
    height: props.size + 'em'
  }

  return (
    <div className='color-block' style={blockStyles} />
  );
}

ColorBar.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number
};

export default ColorBar;
