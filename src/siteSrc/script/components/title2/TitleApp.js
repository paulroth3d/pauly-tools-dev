import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TitleBar from './TitleBar';

import ColorUtil from '../../common/ColorUtil';
import NotificationUtil from '../../common/NotificationUtil';

const TitleUtil = require('../../../../local_modules/TitleUtil');

/**
 * Base application for the TitleApp
 */
class App extends Component {

  constructor(props) {
    super();

    var urlParams = props.urlParams || {};

    var randomColor = ColorUtil.getRandomColor();
    randomColor = ColorUtil.correctBrightness(randomColor, 15);

    const title = TitleUtil.getExpressTitleParam(urlParams);
    const showHelp = TitleUtil.getExpressHelpParam(urlParams);
    const alarm = TitleUtil.getExpressAlarmParam(urlParams);

    this.state = {
      title: title,
      color: randomColor.toHexString(),
      showHelp: showHelp,
      alarm: alarm
    };
  }

  render() {
    return (
      <div className='App'>
        <TitleBar title={this.state.title} color={this.state.color} showHelp={this.state.showHelp} />
      </div>
    );
  }
}

App.propTypes = {
  /** Object of the url parameters sent to the page */
  urlParams: PropTypes.object
};

export default App