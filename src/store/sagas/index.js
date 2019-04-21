import { all, put, takeEvery, select } from 'redux-saga/effects'

import { taskTypes } from '../actions/types';
import { setTaskDetails } from '../actions/task';
import { task as INITIAL_STATE } from '../initial-state';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// ...

// Our worker Saga: will perform the async increment task
export function* findTaskAsync(action) {
    const { task : taskState } = yield select();
    let taskDetails = INITIAL_STATE.task;

    yield put(setTaskDetails({
        ...taskDetails,
        isLoading: true,
    }));


    yield delay(1000);

    const foundTask = taskState.list.find(task => task.id === Number(action.payload));

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

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* findTask() {
    yield takeEvery(taskTypes.FIND_TASK_DETAILS, findTaskAsync);
}

export default function* rootSaga() {
    yield all([
        findTask(),
    ]);
}
