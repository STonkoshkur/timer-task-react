import { all, put, takeEvery, select, delay } from 'redux-saga/effects'

import { task as INITIAL_STATE } from '../initial-state';
import { taskTypes, timerTypes } from '../actions/types';
import {
    storeTask,
    removeTaskFromList,
    storeTasksList,
    removeTasksList,
    setTaskDetails,
} from '../actions/task';

import {
    storeTimer,
    setTimerName,
    removeTimer,
} from '../actions/timer';

import BaseProxy from '../../api/BaseProxy';

/**
 * Init api proxy instance
 * @type {BaseProxy}
 */
const apiProxy = new BaseProxy();

/**
 * Fetch task details data with delay
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* fetchTaskDetails(action) {
    const { task: { list : tasksList } } = yield select();
    let taskDetails = INITIAL_STATE.task;

    yield put(setTaskDetails({
        ...taskDetails,
        isLoading: true,
    }));

    yield delay(1000);

    const foundTask = tasksList.find(task => task.id === Number(action.payload));

    if (foundTask) {
        taskDetails = {
            ...INITIAL_STATE.task,
            id: foundTask.id,
            name: foundTask.name,
            startDateTime: foundTask.start,
            endDateTime: foundTask.end,
        };
    } else {
        taskDetails = {
            ...INITIAL_STATE.task,
            isFailed: true,
        };
    }

    yield put(setTaskDetails(taskDetails));
}

/**
 * Create new task and save to localStorage
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* handleTaskCreate(action) {
    yield put(storeTask(action.payload));

    const { task: { list : tasksList } } = yield select();
    apiProxy.store('tasksLog', tasksList);
}

/**
 * Remove task from logs and update localStorage value
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* handleTaskRemove({ payload }) {
    yield put(removeTaskFromList(payload));

    const { task: { list : tasksList } } = yield select();
    apiProxy.store('tasksLog', tasksList);
}

/**
 * Create tasks logs and save it to localStorage
 * @param action
 * @returns {IterableIterator<*>}
 */
export function* handleTasksListCreate({ payload }) {
    yield put(storeTasksList(payload));

    const { task: { list : tasksList } } = yield select();
    apiProxy.store('tasksLog', tasksList);
}

/**
 * Remove tasks logs from state and localStorage
 * @returns {IterableIterator<*>}
 */
export function* handleTasksListRemove() {
    yield put(removeTasksList());
    apiProxy.destroy('tasksLog');
}

/**
 * Create new timer instance and save it to localStorage
 * @returns {IterableIterator<*>}
 */
export function* handleTimerStart(action) {
    yield put(storeTimer(action.payload));

    const { timer: { timer } } = yield select();
    apiProxy.store('timer', timer);
}

/**
 * Update timer task name and update localStorage value
 * @returns {IterableIterator<*>}
 */
export function* handleTimerNameUpdate(action) {
    yield put(setTimerName(action.payload));

    const { timer: { timer } } = yield select();
    apiProxy.store('timer', timer);
}

/**
 * Remove timer data from state and localStorage
 * @returns {IterableIterator<*>}
 */
export function* handleTimerStop() {
    yield put(removeTimer());
    apiProxy.destroy('timer');
}

export default function* rootSaga() {
    yield all([
        // Tasks actions:
        takeEvery(taskTypes.FIND_TASK_DETAILS, fetchTaskDetails),
        takeEvery(taskTypes.HANDLE_TASK_CREATE, handleTaskCreate),
        takeEvery(taskTypes.HANDLE_TASK_REMOVE, handleTaskRemove),
        takeEvery(taskTypes.HANDLE_TASKS_LIST_CREATE, handleTasksListCreate),
        takeEvery(taskTypes.HANDLE_TASKS_LIST_REMOVE, handleTasksListRemove),

        // Timer actions:
        takeEvery(timerTypes.HANDLE_TIMER_START, handleTimerStart),
        takeEvery(timerTypes.HANDLE_TIMER_NAME_UPDATE, handleTimerNameUpdate),
        takeEvery(timerTypes.HANDLE_TIMER_STOP, handleTimerStop),
    ]);
}
