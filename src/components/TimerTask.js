import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

/**
 * Components
 */
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { addTask } from '../store/actions/task';
import { startTimer, stopTimer, updateName } from '../store/actions/timer';
import Timer from './Timer';

class TimerTask extends Component {
  constructor(props) {
    super(props);

    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleEmptyTaskError = this.handleEmptyTaskError.bind(this);
  }

  getTaskNextId() {
    const { taskList } = this.props;

    return taskList && taskList.length ? Number(taskList.length) + 1 : 1;
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
  }

  handleTimerStop() {
    const { timer = {}, stopTaskTimer, addTaskToLog } = this.props;

    if (!timer.name || String(timer.name).trim().length === 0) {
      this.handleEmptyTaskError();
      return false;
    }

    stopTaskTimer();

    addTaskToLog({
      id: this.getTaskNextId(),
      name: timer.name,
      start: timer.startDateTime,
      end: DateTime.local().toISO()
    });

    return true;
  }

  handleEmptyTaskError() {
    const { onEmptyTaskError } = this.props;

    onEmptyTaskError();
  }

  render() {
    const { timer = {}, classes } = this.props;

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
          <Timer
            isTimerActive={!!timer.isActive}
            startDateTime={DateTime.fromISO(timer.startDateTime)}
          />
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
