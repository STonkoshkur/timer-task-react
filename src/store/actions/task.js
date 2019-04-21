import { taskTypes } from './types';

export function addTask(task) {
    return { type: taskTypes.HANDLE_TASK_CREATE, payload: task };
}

export function storeTask(task) {
    return { type: taskTypes.STORE_TASK, payload: task };
}

export function removeTask(taskId) {
    return { type: taskTypes.HANDLE_TASK_REMOVE, payload: taskId };
}

export function removeTaskFromList(taskId) {
    return { type: taskTypes.REMOVE_TASK, payload: taskId };
}

export function createTasksList(tasksList) {
    return { type: taskTypes.HANDLE_TASKS_LIST_CREATE, payload: tasksList };
}

export function storeTasksList(tasksList) {
    return { type: taskTypes.STORE_TASKS_LIST, payload: tasksList };
}

export function clearTasksList() {
    return { type: taskTypes.HANDLE_TASKS_LIST_REMOVE };
}

export function removeTasksList() {
    return { type: taskTypes.REMOVE_TASKS_LIST };
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
    storeTask,
    removeTask,
    removeTaskFromList,
    createTasksList,
    storeTasksList,
    clearTasksList,
    removeTasksList,
    findTask,
    setTaskDetails,
    clearTaskDetails,
};
