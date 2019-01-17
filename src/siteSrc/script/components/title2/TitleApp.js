import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ColorUtil from '../../common/ColorUtil';
import NotificationUtil from '../../common/NotificationUtil';

const TitleUtil = require('../../../../local_modules/TitleUtil');

import TitleBar from './TitleBar';
import TitleNotes from './TitleNotes';
import TitleAlarm from './TitleAlarm';

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

    //-- set the document title
    document.title = urlParams.title;

    this.state = {
      title: title,
      color: randomColor.toHexString(),
      showHelp: showHelp,
      alarm: alarm
    };
    
    this.handleSetAlarm = this.handleSetAlarm.bind(this);
    this.handleRemoveAlarm = this.handleRemoveAlarm.bind(this);
  }

  handleSetAlarm() {
    console.log('titleapp found the alarm was clicked');
    const targetUrl=`?title=${this.state.title}&help=${this.state.showHelp?'true':'false'}&alarm=${this.state.alarm.alarmStr}`;
    window.location.href=targetUrl;
  }

  handleRemoveAlarm() {
    console.log('titleapp wants to remove the alarm');
    const targetUrl=`?title=${this.state.title}&help=${this.state.showHelp?'true':'false'}`;
    window.location.href=targetUrl;
  }

  render() {
    return (
      <div className='App'>
        <TitleBar title={this.state.title} color={this.state.color} showHelp={this.state.showHelp} />
        {this.state.showHelp ? <TitleAlarm alarmInfo={this.state.alarm} setAlarmHandler={this.handleSetAlarm} removeAlarmHandler={this.handleRemoveAlarm} /> : null}
        {this.state.showHelp ? <TitleNotes /> : null}
      </div>
    );
  }
}

App.propTypes = {
  /** Object of the url parameters sent to the page */
  urlParams: PropTypes.object
};

export default App