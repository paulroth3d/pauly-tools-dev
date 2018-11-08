import React from 'react';
import propTypes from 'prop-types';

const TitleUtil = require('../../../../local_modules/TitleUtil');

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

  let explainSection = null;
  if (props.showHelp) {
    explainSection = (
      <p className='url-explaination'>
        To send a title, send a param for title like:
        <a href='?title=ExampleTitle'>?title=ExampleTitle</a>
      </p>
    );
  }

  return (
    <div className='title-bar'>
      <div className='jumbotron text-center'>
        <div className='container' style={titleStyle}>
          <h1 id='title' style={titleStyle}>{props.title}</h1>
          <div className='color-block' style={colorBlockStyle} />
        </div>
        {explainSection}
      </div>
    </div>
  );
}

TitleBar.propTypes = {
  title: propTypes.string,
  color: propTypes.string,
  showHelp: propTypes.bool
};

export default TitleBar;

// export resizeTitle;
