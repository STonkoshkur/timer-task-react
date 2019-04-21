import React, { Component } from 'react';
import { DateTime, Interval, Duration } from 'luxon';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Fab from '@material-ui/core/Fab';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Timer extends Component {
  constructor(props) {
    super(props);

    const { isTimerActive, startDateTime } = props;
    const timeDuration =
      !!isTimerActive && startDateTime
        ? Interval.fromDateTimes(startDateTime, DateTime.local()).toDuration()
        : Duration.fromMillis(0);

    this.state = {
      intervalId: null,
      timeDuration
    };

    this.updateTimerValue = this.updateTimerValue.bind(this);
  }

  componentDidMount() {
    const { isTimerActive } = this.props;

    this.updateTimerStatus(isTimerActive);
  }

  componentDidUpdate(prevProps) {
    const { isTimerActive } = this.props;

    if (isTimerActive !== prevProps.isTimerActive) {
      this.updateTimerStatus(isTimerActive);
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  handleStateChange(name, value) {
    this.setState({ [name]: value });
  }

  updateTimerStatus(timerStatus) {
    const { intervalId } = this.state;

    if (timerStatus) {
      const interval = setInterval(() => {
        this.updateTimerValue();
      }, 1000);

      this.handleStateChange('intervalId', interval);
    } else {
      clearInterval(intervalId);
      this.handleStateChange('timeDuration', Duration.fromMillis(0));
    }
  }

  updateTimerValue() {
    const { startDateTime } = this.props;

    this.handleStateChange(
      'timeDuration',
      Interval.fromDateTimes(startDateTime, DateTime.local()).toDuration()
    );
  }

  render() {
    const { classes } = this.props;
    const { timeDuration } = this.state;
    const formattedTimeDuration =
      timeDuration && timeDuration.isValid
        ? timeDuration.toFormat('hh:mm:ss')
        : '-';

    return <Fab className={classes.timerFab}>{formattedTimeDuration}</Fab>;
  }
}

Timer.propTypes = {
  isTimerActive: PropTypes.bool.isRequired,
  startDateTime: PropTypes.instanceOf(DateTime).isRequired
};

export default withStyles(styles)(Timer);
