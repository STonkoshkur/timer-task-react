import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import initialState from './initial-state';

import BaseProxy from '../api/BaseProxy';

function getPreloadedState() {
    const apiProxy = new BaseProxy();

    const cachedTimer = apiProxy.find('timer');
    const cachedTasksLog = apiProxy.find('tasksLog');

    return {
        ...initialState,
        timer: {
            ...initialState.timer,
            timer: cachedTimer || initialState.timer.timer,
        },
        task: {
            ...initialState.task,
            list: cachedTasksLog || initialState.task.list,
        },
    };
}

export default function initStore() {
    const store = createStore(
        reducers,
        getPreloadedState(),
        composeWithDevTools(
            applyMiddleware(),
        ),
    );

    return store;
}
