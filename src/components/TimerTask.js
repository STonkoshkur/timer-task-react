import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { addTask } from '../actions/task';
import { startTimer, stopTimer, updateName } from '../actions/timer';

/**
 * Components
 */
import TextField from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Timer from './Timer';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class TimerTask extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     taskName: '',
        //     isTimerActive: false,
        //     taskTimer: {},
        // };

        this.handleTimerStart = this.handleTimerStart.bind(this);
        this.handleTimerStop = this.handleTimerStop.bind(this);
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
        this.handleEmptyTaskError = this.handleEmptyTaskError.bind(this);
    }

    getTaskNextId() {
        const { taskList } = this.props;

        return taskList && taskList.length
            ? Number(taskList.length) + 1
            : 1;
    }

    handleTaskNameChange(event) {
        const { updateTaskName } = this.props;

        updateTaskName(event.target.value || '');
    };

    handleTimerStart() {
        const { timer, startTimer } = this.props;

        startTimer({
            name: timer.name || '',
            start: DateTime.local(),
        });
    }

    handleTimerStop() {
        const { timer = {}, stopTimer, addTaskToLog } = this.props;
        // const { taskName, taskTimer } = this.state;

        if (!timer.name || String(timer.name).trim().length === 0) {
            this.handleEmptyTaskError();
            return false;
        }

        stopTimer();

        addTaskToLog({
            id: this.getTaskNextId(),
            name: timer.name,
            start: timer.startDateTime,
            end: DateTime.local(),
        });
    }

    // FIXME: add prop-type validation
    handleEmptyTaskError() {
        if (this.props.onEmtyTaskError) {
            this.props.onEmtyTaskError();
        }
    }

    render() {
        const { timer = {}, classes } = this.props;

        return (
            <div className={classes.timerContainer}>
                <div>
                    <TextField
                        id="task-name"
                        label='Name of your task'
                        placeholder='Name of your task'
                        value={timer.name}
                        onChange={this.handleTaskNameChange}
                        className={classes.textInput}
                    />
                </div>
                <div>
                    <Timer
                        isTimerActive={!!timer.isActive}
                        startDateTime={timer.startDateTime}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={timer.isActive ? this.handleTimerStop : this.handleTimerStart }
                        className={classes.button}
                        size="small"
                    >
                        { timer.isActive ? 'STOP' : 'START' }
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ task, timer }) => ({
        timer: timer.timer,
        taskList: task.list,
    }),
    dispatch => ({
        startTimer: timer => dispatch(startTimer(timer)),
        updateTaskName: taskName => dispatch(updateName(taskName)),
        stopTimer: () => dispatch(stopTimer()),
        addTaskToLog: task => dispatch(addTask(task)),
    }),
)(withStyles(styles)(TimerTask));
