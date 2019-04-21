import { taskTypes } from './types';

export function addTask(task) {
    return { type: taskTypes.CREATE_TASK, payload: task };
}

export function removeTask(taskId) {
    return { type: taskTypes.REMOVE_TASK, payload: taskId };
}

export function createTasksList(tasksList) {
    return { type: taskTypes.CREATE_TASKS_LIST, payload: tasksList };
}

export function clearTasksList() {
    return { type: taskTypes.CLEAR_TASKS_LIST };
}

export function findTask(taskId) {
    return { type: taskTypes.FIND_TASK_DETAILS, payload: taskId };
}

export function setTaskDetails(task) {
    return { type: taskTypes.SET_TASK_DETAILS, payload: task };
}

export function clearTaskDetails() {
    return { type: taskTypes.CLEAR_TASK_DETAILS };
}

export default {
    addTask,
    removeTask,
    createTasksList,
    clearTasksList,
    findTask,
    setTaskDetails,
    clearTaskDetails,
};
