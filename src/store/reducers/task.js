import { taskTypes } from '../actions/types';
import { task as INITIAL_STATE } from '../initial-state';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case taskTypes.CREATE_TASK:
        case taskTypes.STORE_TASK:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload,
                ],
            };
        case taskTypes.REMOVE_TASK:
            return {
                ...state,
                list: state.list.filter(task => task.id !== action.payload),
            };
        case taskTypes.STORE_TASKS_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case taskTypes.REMOVE_TASKS_LIST:
            return {
                ...state,
                list: INITIAL_STATE.list,
            };
        case taskTypes.SET_TASK_DETAILS:
            return {
                ...state,
                task: action.payload,
            };
        case taskTypes.CLEAR_TASK_DETAILS:
            return {
                ...state,
                task: INITIAL_STATE.task,
            };
        default:
            return state;
    }
}