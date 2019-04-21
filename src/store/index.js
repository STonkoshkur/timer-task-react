import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import initialState, { timer, task } from './initial-state';

import BaseProxy from '../api/BaseProxy';

function getPreloadedState() {
  const apiProxy = new BaseProxy();

  const cachedTimer = apiProxy.find('timer');
  const cachedTasksLog = apiProxy.find('tasksLog');

  return {
    ...initialState,
    timer: {
      ...timer,
      timer: cachedTimer || timer.timer
    },
    task: {
      ...task,
      list: cachedTasksLog || task.list
    }
  };
}

export default function initStore() {
  const store = createStore(
    reducers,
    getPreloadedState(),
    composeWithDevTools(applyMiddleware())
  );

  return store;
}
