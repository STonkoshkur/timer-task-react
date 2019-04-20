import React from 'react';
import { connect } from 'react-redux';
import { DateTime, Interval } from 'luxon';

import { getRandomValue } from '../helpers';
import { RANDOM_TASKS } from '../helpers/constants';

import { createTasksList, clearTasksList } from '../actions/task';

/**
 * Components
 */
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts';

/**
 * Styles
 */
import { withStyles } from "@material-ui/core";
import styles from '../styles';

function getChartData(tasksList) {
    const groupedTasks = [];

    for (let hour = 0; hour <= 23; hour += 1) {
        const startOfHour = DateTime.fromObject({ hour, minute: 0, second: 0 });
        const endOfHour = DateTime.fromObject({ hour, minute: 59, second: 59 });
        const currentHourInterval = Interval.fromDateTimes(startOfHour, endOfHour);

        const foundTasks = tasksList.filter(task =>
            currentHourInterval.intersection(
                Interval.fromDateTimes(
                    DateTime.fromISO(task.start),
                    DateTime.fromISO(task.end),
                )
            )
        );

        // summary value of tasks time in minutes
        let tasksTimeSum = 0;

        if (foundTasks.length > 0) {
            tasksTimeSum = foundTasks.reduce((sum, task) => {
                let tasksMinutes = 60;
                const taskStartDateTime = DateTime.fromISO(task.start);
                const taskEndDateTime = DateTime.fromISO(task.end);

                if (
                    taskStartDateTime.hour === hour
                    && taskEndDateTime.hour === hour
                ) {
                    tasksMinutes = Interval
                        .fromDateTimes(taskStartDateTime, taskEndDateTime)
                        .toDuration('minutes')
                        .toObject()
                        .minutes;
                } else if (taskEndDateTime.hour === hour) {
                    tasksMinutes = taskEndDateTime.minute;
                } else if (taskStartDateTime.hour === hour) {
                    tasksMinutes = 60 - taskStartDateTime.minute;
                }

                sum += Math.round(tasksMinutes);

                return sum;
            }, tasksTimeSum);
        }

        groupedTasks.push({
            hour,
            tasksTime: tasksTimeSum || 0,
        })
    }

    return groupedTasks;
}

function TasksChart(props) {
    const { taskList, clearTasksList, createTasksList, classes } = props;

    function generateRandTasks() {
        const randTasksCount = getRandomValue(RANDOM_TASKS.minCount, RANDOM_TASKS.maxCount);
        const generatedTasks = [];

        let taskDateTime = DateTime.fromObject({ hour: RANDOM_TASKS.startHour });

        for (let i = 0; i < randTasksCount; i += 1) {
            const taskDuration = getRandomValue(RANDOM_TASKS.minDuration, RANDOM_TASKS.maxDuration);
            const breakDuration = getRandomValue(
                RANDOM_TASKS.minBreakDuration,
                RANDOM_TASKS.maxBreakDuration,
            );
            const startTaskTime = taskDateTime.plus({ minutes: breakDuration });
            const endTaskTime = startTaskTime.plus({ minutes: taskDuration });

            taskDateTime = endTaskTime;

            generatedTasks.push({
                id: i + 1,
                name: `New task #${i + 1}`,
                start: startTaskTime.toISO(),
                end: endTaskTime.toISO(),
            });
        }

        clearTasksList();
        createTasksList(generatedTasks);
    }

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={getChartData(taskList)}
                    margin={{ top: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="tasksTime"
                        name="Minutes in this hours"
                        barSize={20}
                        fill="#3248c7"
                    />
                </BarChart>
            </ResponsiveContainer>
            <Grid
                container
                justify="center"
            >
                <Grid
                    item
                    xs={12}
                    className={classes.chartFooterContainer}
                >
                    <Button
                        variant="contained"
                        onClick={generateRandTasks}
                        className={classes.button}
                        size="small"
                    >
                        Generate
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(
    ({ task }) => ({
        taskList: task.list,
    }),
    dispatch => ({
        createTasksList: list => dispatch(createTasksList(list)),
        clearTasksList: () => dispatch(clearTasksList()),
    }),
)(withStyles(styles)(TasksChart));
