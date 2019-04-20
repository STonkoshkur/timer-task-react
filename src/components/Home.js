import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import {
    ROUTERS,
    HOMEPAGE_LOGS_TAB_VALUE,
    HOMEPAGE_CHART_TAB_VALUE,
} from '../helpers/constants';

/**
 * Components
 */
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AlertDialog from './AlertDialog';
import TimerTask from './TimerTask';
import TasksLogs from './TasksLogs';

/**
 * Styles
 */
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Home extends Component {
    constructor(props) {
        super(props);

        const { location } = props;
        const selectedTab =(
            location
            && location.pathname
            && location.pathname === ROUTERS.tasksChart
            && HOMEPAGE_CHART_TAB_VALUE
        ) || HOMEPAGE_LOGS_TAB_VALUE;

        this.state = {
            selectedTab,
            isAlertShown: false,
        };

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleAlertOpen = this.handleAlertOpen.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    handleStateChange(name, value) {
        this.setState({
            [name]: value,
        });
    }

    handleTabChange(event, value) {
        this.handleStateChange('selectedTab', value);
    }

    handleAlertOpen() {
        this.handleStateChange('isAlertShown', true);
    }

    handleAlertClose() {
        this.handleStateChange('isAlertShown', false);
    }

    render() {
        const { classes } = this.props;
        const { selectedTab, isAlertShown } = this.state;

        return (
            <div className={classes.homepageContainer}>
                <Grid
                    container
                    justify="center"
                >
                    <Grid
                        item
                        xs={12}
                        lg={10}
                    >
                        <TimerTask
                            onEmtyTaskError={this.handleAlertOpen}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={10}
                    >
                        <section>
                            <AppBar position="relative">
                                <Tabs
                                    onChange={this.handleTabChange}
                                    value={selectedTab}
                                    className={classes.tabsWrapper}
                                    variant="fullWidth"
                                >
                                    <Tab
                                        label="Tasks logs"
                                        value={HOMEPAGE_LOGS_TAB_VALUE}
                                        className={classes.tab}
                                        component={RouterLink}
                                        to={ROUTERS.tasksLogs}
                                    />
                                    <Tab
                                        label="Tasks chart"
                                        value={HOMEPAGE_CHART_TAB_VALUE}
                                        className={classes.tab}
                                        component={RouterLink}
                                        to={ROUTERS.tasksChart}
                                    />
                                </Tabs>
                            </AppBar>
                            { selectedTab === HOMEPAGE_CHART_TAB_VALUE
                                ? 'CHART'
                                : <TasksLogs />
                            }
                        </section>
                    </Grid>
                </Grid>

                <AlertDialog
                    title='Empty task name'
                    message='You are trying close your task without name, enter the title and try again!'
                    closeButtonText='Close'
                    isShown={!!isAlertShown}
                    onAlertClose={this.handleAlertClose}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Home));
