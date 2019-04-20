import { taskTypes } from '../actions/types';

export const INITIAL_STATE = {
    task: {
        id: 0,
        name: '',
        startDateTime: null,
        endDateTime: null,
        isLoading: false,
        isFailed: false,
    },
    list: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case taskTypes.CREATE_TASK:
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
        case taskTypes.CREATE_TASKS_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case taskTypes.CLEAR_TASKS_LIST:
            return {
                ...state,
                list: INITIAL_STATE.list,
            };

        case taskTypes.FIND_TASK_DETAILS:
            const foundTask = state.list
                .find(task => task.id === Number(action.payload));

            return {
                ...state,
                task: foundTask
                    ? {
                        ...INITIAL_STATE.task,
                        id: foundTask.id,
                        name: foundTask.name,
                        startDateTime: foundTask.start,
                        endDateTime: foundTask.end,
                        isFailed: false,
                    } : {
                        ...INITIAL_STATE.task,
                        isFailed: true,
                    },
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