import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store';
import { ROUTERS } from './helpers/constants';

/**
 * Components
 */
import Home from './components/Home';
import TaskDetails from './components/TaskDetails';
import NotFound from './components/NotFound';

/**
 * Styles
 */
import './App.css';

const store = initStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={ROUTERS.tasksLogs} component={Home} />
              <Route path={ROUTERS.tasksChart} component={Home} />
              <Route path={`${ROUTERS.taskDetails}/:id`} component={TaskDetails} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </Provider>

    );
  }
}

export default App;
