import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TitleBar from './TitleBar';

import ColorUtil from '../../common/ColorUtil';
import NotificationUtil from '../../common/NotificationUtil';

import UrlUtil from '../../common/UrlUtil';

class App extends Component {

  constructor(props) {
    super();

    var expressParams = props.expressParams || {};

    var randomColor = ColorUtil.getRandomColor();
    randomColor = ColorUtil.correctBrightness(randomColor, 15);

    const urlParams = UrlUtil.convertQueryToObject();
    const title = urlParams.title || expressParams.defaultTitle;

    this.state = {
      title: title,
      color: randomColor.toHexString()
    };
  }

  render() {
    return (
      <div className='App'>
        <TitleBar title={this.state.title} color={this.state.color} />
      </div>
    );
  }
}

App.propTypes = {
  expressParams: PropTypes.object
};

export default App