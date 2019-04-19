import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import {
    addTask,
} from '../actions/task';

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

        this.state = {
            taskName: '',
            isTimerActive: false,
            taskTimer: {},
        };

        this.handleTimerStart = this.handleTimerStart.bind(this);
        this.handleTimerStop = this.handleTimerStop.bind(this);
        this.handleEmptyTaskError = this.handleEmptyTaskError.bind(this);
    }

    getTaskNextId() {
        const { taskList } = this.props;

        return taskList && taskList.length
            ? Number(taskList.length) + 1
            : 1;
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    // FIXME: remove old method
    handleTimerAction() {
        let taskTimer = {};
    };

    handleTimerStart() {
        this.setState({
            isTimerActive: true,
            taskTimer: {
                start: DateTime.local(),
            },
        });
    }

    handleTimerStop() {
        const { addTaskToLog } = this.props;
        const { taskName, taskTimer } = this.state;

        if (!taskName || taskName.length === 0) {
            this.handleEmptyTaskError();
            return false;
        }

        const timerEndTime = DateTime.local();

        this.setState({
            isTimerActive: false,
            taskTimer: {},
            taskName: '',
        });

        addTaskToLog({
            id: this.getTaskNextId(),
            name: taskName,
            start: taskTimer.start,
            end: timerEndTime,
        });
    }

    // FIXME: add prop-type validation
    handleEmptyTaskError() {
        if (this.props.onEmtyTaskError) {
            this.props.onEmtyTaskError();
        }
    }

    render() {
        const { classes } = this.props;
        const { isTimerActive, taskTimer, taskName } = this.state;

        return (
            <div className={classes.timerContainer}>
                <div>
                    <TextField
                        id="task-name"
                        label='Name of your task'
                        placeholder='Name of your task'
                        value={taskName}
                        onChange={this.handleChange('taskName')}
                        className={classes.textInput}
                    />
                </div>
                <div>
                    <div>
                        <Timer
                            isTimerActive={!!isTimerActive}
                            startDateTime={taskTimer && taskTimer.start}
                        />
                    </div>
                    {/*FIXME: remove code below*/}
                    {/*{ `${taskTimer.start || '...'} - ${taskTimer.end || '...'}` }*/}
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={isTimerActive ? this.handleTimerStop : this.handleTimerStart }
                        className={classes.button}
                        size="small"
                    >
                        { isTimerActive ? 'STOP' : 'START' }
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ task }) => ({
        taskList: task.list,
    }),
    dispatch => ({
        addTaskToLog: task => dispatch(addTask(task)),
    }),
)(withStyles(styles)(TimerTask));
