export const taskTypes = {
    HANDLE_TASK_CREATE: 'HANDLE_TASK_CREATE',
    STORE_TASK: 'STORE_TASK',
    HANDLE_TASK_REMOVE: 'HANDLE_TASK_REMOVE',
    REMOVE_TASK: 'REMOVE_TASK',
    HANDLE_TASKS_LIST_CREATE: 'HANDLE_TASKS_LIST_CREATE',
    STORE_TASKS_LIST: 'STORE_TASKS_LIST',
    HANDLE_TASKS_LIST_REMOVE: 'HANDLE_TASKS_LIST_REMOVE',
    REMOVE_TASKS_LIST: 'REMOVE_TASKS_LIST',
    FIND_TASK_DETAILS: 'FIND_TASK_DETAILS',
    SET_TASK_DETAILS: 'SET_TASK_DETAILS',
    CLEAR_TASK_DETAILS: 'CLEAR_TASK_DETAILS',
};

export const timerTypes = {
    HANDLE_TIMER_START: 'HANDLE_TIMER_START',
    STORE_TIMER: 'STORE_TIMER',
    HANDLE_TIMER_NAME_UPDATE: 'HANDLE_TIMER_NAME_UPDATE',
    UPDATE_NAME: 'UPDATE_NAME',
    HANDLE_TIMER_STOP: 'HANDLE_TIMER_STOP',
    REMOVE_TIMER: 'REMOVE_TIMER',
};

export default {
    taskTypes,
    timerTypes,
};