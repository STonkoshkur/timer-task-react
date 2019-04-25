import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store';
import { ROUTES } from './helpers/constants';

/**
 * Components
 */
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import NotFound from './pages/NotFound';

/**
 * Styles
 */
import './App.css';

const store = initStore();

function App() {
    return (
        <Provider store={store}>
          <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to={ROUTES.tasksLogs} />)} />
              <Route path={ROUTES.tasksLogs} component={Home} />
              <Route path={ROUTES.tasksChart} component={Home} />
              <Route path={`${ROUTES.taskDetails}/:id`} component={TaskDetails} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
}

export default App;
