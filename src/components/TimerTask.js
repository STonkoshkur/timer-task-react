import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DateTime, Duration, Interval} from 'luxon';
import PropTypes from 'prop-types';

/**
 * Components
 */
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { addTask } from '../store/actions/task';
import { startTimer, stopTimer, updateName } from '../store/actions/timer';

class TimerTask extends Component {
  constructor(props) {
    super(props);

    const { timer: { isActive: isTimerActive, startDateTime } } = props;

    // calculate default timer duration
    const timeDuration =
        !!isTimerActive && startDateTime
            ? Interval.fromDateTimes(
                  DateTime.fromISO(startDateTime),
                  DateTime.local()
              ).toDuration()
            : Duration.fromMillis(0);

    this.state = {
      intervalId: null,
      timeDuration,
    };

    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleEmptyTaskError = this.handleEmptyTaskError.bind(this);
    this.updateTimerValue = this.updateTimerValue.bind(this);
  }

  componentDidMount() {
    const { timer: { isActive: isTimerActive } } = this.props;

    if (isTimerActive) {
      this.updateTimerStatus(isTimerActive);
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  getTaskNextId() {
    const { taskList } = this.props;

    return taskList && taskList.length
        ? Math.max(...taskList.map(task => task.id)) + 1
        : 1;
  }

  handleStateChange(name, value) {
    this.setState({ [name]: value });
  }

  handleTaskNameChange(event) {
    const { updateTaskName } = this.props;

    updateTaskName(event.target.value || '');
  }

  handleTimerStart() {
    const { timer, startTaskTimer } = this.props;

    startTaskTimer({
      name: timer.name || '',
      start: DateTime.local().toISO()
    });

    this.updateTimerStatus(true);
  }

  handleTimerStop() {
    const { timer = {}, stopTaskTimer, addTaskToLog } = this.props;

    if (!timer.name || String(timer.name).trim().length === 0) {
      this.handleEmptyTaskError();
      return false;
    }

    stopTaskTimer();

    this.updateTimerStatus(false);

    addTaskToLog({
      id: this.getTaskNextId(),
      name: timer.name,
      start: timer.startDateTime,
      end: DateTime.local().toISO()
    });

    return true;
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
    const { timer: { startDateTime } } = this.props;

    this.handleStateChange(
        'timeDuration',
        Interval.fromDateTimes(
            DateTime.fromISO(startDateTime),
            DateTime.local()
        ).toDuration()
    );
  }

  handleEmptyTaskError() {
    const { onEmptyTaskError } = this.props;

    onEmptyTaskError();
  }

  render() {
    const { timer = {}, classes } = this.props;
    const { timeDuration } = this.state;
    const formattedTimeDuration =
        timeDuration && timeDuration.isValid
            ? timeDuration.toFormat('hh:mm:ss')
            : '-';

    return (
      <div className={classes.timerContainer}>
        <div>
          <TextField
            id="task-name"
            label="Name of your task"
            placeholder="Name of your task"
            value={timer.name}
            onChange={this.handleTaskNameChange}
            className={classes.textInput}
          />
        </div>
        <div>
          <Fab className={classes.timerFab}>
            {formattedTimeDuration}
          </Fab>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={
              timer.isActive ? this.handleTimerStop : this.handleTimerStart
            }
            className={classes.button}
            size="small"
          >
            {timer.isActive ? 'STOP' : 'START'}
          </Button>
        </div>
      </div>
    );
  }
}

TimerTask.propTypes = {
  onEmptyTaskError: PropTypes.func.isRequired,
  timer: PropTypes.shape({
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string
  }).isRequired
  // taskList: PropTypes.array,
};

export default connect(
  ({ task, timer }) => ({
    timer: timer.timer,
    taskList: task.list
  }),
  dispatch => ({
    startTaskTimer: timer => dispatch(startTimer(timer)),
    updateTaskName: taskName => dispatch(updateName(taskName)),
    stopTaskTimer: () => dispatch(stopTimer()),
    addTaskToLog: task => dispatch(addTask(task))
  })
)(withStyles(styles)(TimerTask));
