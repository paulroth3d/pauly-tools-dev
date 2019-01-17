import React, {Component} from 'react';
import PropTypes from 'prop-types';

const NotificationUtil = require('../../common/NotificationUtil');

const beep = require('../../../resources/beeps/49165_296628-lq.mp3');

class TitleAlarm extends Component {

  constructor(props) {
    super();

    const now = new Date();
    const targetDate = props.alarmInfo.targetDate;
    this.targetDateStr = targetDate.toLocaleString();

    this.runTimer = props.alarmInfo.runTimer;

    this.handleClick = this.handleClick.bind(this);
    this.setAlarmHandler = props.setAlarmHandler;
  }

  componentDidMount(){
    console.log('component mounted');

    console.log('schedule alarm');
    const alarmBeepElement = this.refs.alarm_beep;

    if (this.runTimer) {
      NotificationUtil.scheduleNotification(this.props.alarmInfo.hour, this.props.alarmInfo.minute, null, alarmBeepElement);
    }
  }

  handleClick(evt){
    console.log('alarm was clicked');
    const alarmBeepElement = this.refs.alarm_beep;
    alarmBeepElement.play();
    this.setAlarmHandler();
  }

  render() {
    return (
      <div className='notification-block'>
        { this.runTimer ?
          <p>Setting notification for: {this.targetDateStr}</p>
          :
          <a onClick={this.handleClick}>Set an alarm for: {this.targetDateStr}</a>
        }
        <audio id='alarm_beep' ref='alarm_beep' src={beep} type='audio/mpeg' />
      </div>
    );
  }
}

TitleAlarm.propTypes = {
  alarmInfo: PropTypes.object,
  setAlarmHandler: PropTypes.function
};

export default TitleAlarm