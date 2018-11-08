import React, {Component} from 'react';
import PropTypes from 'prop-types';

const NotificationUtil = require('../../common/NotificationUtil');

class TitleAlarm extends Component {

  constructor(props) {
    super();

    const now = new Date();
    const targetDate = props.alarmInfo.targetDate;
    this.targetDateStr = targetDate.toLocaleString();
    
    this.runTimer = props.alarmInfo.runTimer;
    if (this.runTimer) {
      NotificationUtil.scheduleNotification(props.alarmInfo.hour, props.alarmInfo.minute);
    }

    this.handleClick = this.handleClick.bind(this);
    this.setAlarmHandler = props.setAlarmHandler;
  }

  handleClick(evt){
    console.log('alarm was clicked');
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
      </div>
    );
  }
}

TitleAlarm.propTypes = {
  alarmInfo: PropTypes.object,
  setAlarmHandler: PropTypes.function
};

export default TitleAlarm