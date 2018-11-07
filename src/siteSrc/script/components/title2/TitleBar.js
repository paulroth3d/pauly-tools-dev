import React from 'react';
import propTypes from 'prop-types';

import ColorBar from './ColorBar';
import TitleBarTitle from './TitleBarTitle';

import TitleUtil from '../../common/TitleUtil';

const TitleBar = (props) => {

  const titleSize = TitleUtil.resizeTitle(props.title);
  const barSize = TitleUtil.resizeColorBlock(props.title);

  const titleStyle = {
    fontSize: titleSize
  };

  const colorBlockStyle = {
    backgroundColor: props.color,
    height: barSize + 'em'
  }

  return (
    <div className='title-bar'>
      <div className='jumbotron text-center'>
        <div className='container' style={titleStyle}>
          <h1 id='title' style={titleStyle}>{props.title}</h1>
          <div className='color-block' style={colorBlockStyle} />
        </div>
      </div>
    </div>
  );
}

TitleBar.propTypes = {
  title: propTypes.string,
  color: propTypes.string
};

export default TitleBar;

// export resizeTitle;
