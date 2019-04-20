import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { findTask, clearTaskDetails } from '../actions/task';
import { ROUTERS } from '../helpers/constants';

/**
 * Components
 */
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core';
import styles from '../styles';

class TaskDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { match, findTask } = this.props;

        if (match.params.id) {
            findTask(match.params.id);
        }
    }

    componentWillUnmount() {
        const { clearTask } = this.props;

        clearTask();
    }

    render() {
        const { task, classes } = this.props;

        if (task.isFailed) {
            return <Redirect to={ROUTERS.notFound} />
        }

        let taskStartDateTime = DateTime.fromISO(task.startDateTime);
        let taskEndDateTime = DateTime.fromISO(task.endDateTime);
        const taskDuration = Interval.fromDateTimes(taskStartDateTime, taskEndDateTime)
            .toDuration()
            .toFormat('hh:mm:ss');

        taskStartDateTime = taskStartDateTime.toFormat('HH:mm:ss');
        taskEndDateTime = taskEndDateTime.toFormat('HH:mm:ss');

        return (
            <Grid
                container
                justify="center"
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <Card className={classes.cardPageContainer}>
                        <CardContent
                            className={classes.textAlignLeft}
                        >
                            <Typography
                                color="textSecondary"
                                variant="h5"
                                gutterBottom
                            >
                                {task.name}
                            </Typography>
                            <Typography>
                                Time:
                            </Typography>
                            <Typography color="textSecondary">
                                {`${taskStartDateTime} - ${taskEndDateTime}`}
                            </Typography>
                            <Typography>
                                Duration:
                            </Typography>
                            <Typography color="textSecondary">
                                {taskDuration}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                className={classes.button}
                                size="small"
                                component={RouterLink}
                                to={ROUTERS.tasksLogs}
                            >Go back</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default connect(
    ({ task }) => ({
        task : task.task,
    }),
    dispatch => ({
       findTask: taskId => dispatch(findTask(taskId)),
       clearTask: () => dispatch(clearTaskDetails()),
    }),
)(withStyles(styles)(TaskDetails));
