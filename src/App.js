import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import initStore from './store';
import { ROUTERS } from './helpers/constants';

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

export default App;
