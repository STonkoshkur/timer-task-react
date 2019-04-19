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

export default {
    addTask,
    removeTask,
    createTasksList,
    clearTasksList,
};
