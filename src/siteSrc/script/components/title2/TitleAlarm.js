import React, {Component} from 'react';
import PropTypes from 'prop-types';

const NotificationUtil = require('../../common/NotificationUtil');

class TitleAlarm extends Component {

  constructor(props) {
    super();

    let now = new Date();
    let targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      props.alarmInfo.hour,
      props.alarmInfo.minute
    );
    this.targetDateStr = targetDate.toLocaleString();

    this.runTimer = props.alarmInfo.runTimer;
    if (this.runTimer) {
      NotificationUtil.scheduleNotification(props.alarmInfo.hour, props.alarmInfo.minute);
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt){
    console.log('alarm was clicked');
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
  alarmInfo: PropTypes.object
};

export default TitleAlarm