import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import initialState, { timer, task } from './initial-state';
import reducers from './reducers';

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
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    getPreloadedState(),
    composeWithDevTools(applyMiddleware(
        sagaMiddleware,
    ))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
