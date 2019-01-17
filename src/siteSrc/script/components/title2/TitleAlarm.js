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

    this.handleAddAlarmClick = this.handleAddAlarmClick.bind(this);
    this.handleRemoveAlarmClick = this.handleRemoveAlarmClick.bind(this);
    this.setAlarmHandler = props.setAlarmHandler;
  }

  componentDidMount(){
    const alarmBeepElement = this.refs.alarm_beep;

    if (this.runTimer) {
      NotificationUtil.scheduleNotification(this.props.alarmInfo.hour, this.props.alarmInfo.minute, null, alarmBeepElement);
    }
  }

  handleAddAlarmClick(evt){
    console.log('add alarm was clicked');
    this.props.setAlarmHandler();
  }

  handleRemoveAlarmClick(evt){
    console.log('remove alarm was clicked');
    this.props.removeAlarmHandler();
  }

  render() {
    return (
      <div className='notification-block'>
        { this.runTimer ?
          <span>
            <p>Setting notification for: {this.targetDateStr}</p>
            <a onClick={this.handleRemoveAlarmClick}>Remove Alarm</a>
          </span>
          :
          <a onClick={this.handleAddAlarmClick}>Set an alarm for: {this.targetDateStr}</a>
        }
        <audio id='alarm_beep' ref='alarm_beep' preload='none'>
          <source src={beep} type='audio/mpeg' />
        </audio>
      </div>
    );
  }
}

TitleAlarm.propTypes = {
  alarmInfo: PropTypes.object,
  setAlarmHandler: PropTypes.any,
  removeAlarmHandler: PropTypes.any
};

export default TitleAlarm