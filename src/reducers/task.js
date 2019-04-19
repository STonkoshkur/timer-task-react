import { taskTypes } from '../actions/types';

export const INITIAL_STATE = {
    task: {
        id: 0,
        name: '',
        startDateTime: null,
        endDateTime: null,
        durationTime: null,
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
        default:
            return state;
    }
}