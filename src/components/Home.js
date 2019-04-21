import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import {
    ROUTERS,
    HOMEPAGE_TABS,
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
import TasksChart from './TasksChart';

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
            && HOMEPAGE_TABS.chart
        ) || HOMEPAGE_TABS.logs;

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
                            onEmptyTaskError={this.handleAlertOpen}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={10}
                    >
                        <section>
                            <AppBar
                                position="relative"
                                className={classes.tabsWrapper}
                            >
                                <Tabs
                                    onChange={this.handleTabChange}
                                    value={selectedTab}
                                    variant="fullWidth"
                                    TabIndicatorProps={{
                                        className: classes.tabsIndicator,
                                    }}
                                >
                                    <Tab
                                        label="Tasks logs"
                                        value={HOMEPAGE_TABS.logs}
                                        className={classes.tab}
                                        component={RouterLink}
                                        to={ROUTERS.tasksLogs}
                                    />
                                    <Tab
                                        label="Tasks chart"
                                        value={HOMEPAGE_TABS.chart}
                                        className={classes.tab}
                                        component={RouterLink}
                                        to={ROUTERS.tasksChart}
                                    />
                                </Tabs>
                            </AppBar>
                            { selectedTab === HOMEPAGE_TABS.chart
                                ? <TasksChart />
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
