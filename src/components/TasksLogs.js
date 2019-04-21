import React from 'react';
import { connect } from 'react-redux';
import { removeTask } from '../actions/task';

import { Link as RouterLink } from 'react-router-dom';
import { ROUTERS } from '../helpers/constants';
import { DateTime, Interval } from 'luxon';

/**
 * Components
 */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

/**
 * Styles
 */
import { withStyles } from "@material-ui/core";
import styles from '../styles';

function TasksLogs(props) {
    const { taskList, removeTaskFromLog, classes } = props;
    const removeTask = (taskId) => () => removeTaskFromLog(taskId);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Time start</TableCell>
                    <TableCell>Time end</TableCell>
                    <TableCell>Time spend</TableCell>
                    <TableCell>Info</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { taskList.length === 0 && (
                    <TableRow
                        key="noData"
                        className={classes.tableRow}
                    >
                        <TableCell
                            colSpan={7}
                            className={classes.textAlignCenter}
                        >
                            No tasks to show
                        </TableCell>
                    </TableRow>
                ) }
                { taskList.length > 0 && taskList.map(task => (
                    <TableRow key={task.id}>
                        <TableCell component="th" scope="row">
                            {task.id}
                        </TableCell>
                        <TableCell>
                            {task.name}
                        </TableCell>
                        <TableCell>
                            {DateTime.fromISO(task.start).toFormat('HH:mm:ss')}
                        </TableCell>
                        <TableCell>
                            {DateTime.fromISO(task.end).toFormat('HH:mm:ss')}
                        </TableCell>
                        <TableCell>
                            {
                                Interval
                                    .fromDateTimes(
                                        DateTime.fromISO(task.start), DateTime.fromISO(task.end),
                                    )
                                    .toDuration()
                                    .toFormat('hh:mm:ss')
                            }
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                className={classes.button}
                                size="small"
                                component={RouterLink}
                                to={`${ROUTERS.taskDetails}/${task.id}`}
                            >
                                Info
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                className={classes.button}
                                size="small"
                                onClick={removeTask(task.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default connect(
    ({ task }) => ({
        taskList: task.list,
    }),
    dispatch => ({
        removeTaskFromLog: taskId => dispatch(removeTask(taskId)),
    }),
)(withStyles(styles)(TasksLogs));
