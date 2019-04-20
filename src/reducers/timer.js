import { timerTypes } from '../actions/types';

export const INITIAL_STATE = {
    timer: {
        isActive: false,
        name: '',
        startDateTime: null,
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case timerTypes.START_TIMER:
            return {
                ...state,
                timer: action.payload,
            };
        case timerTypes.UPDATE_NAME:
            return {
                ...state,
                timer: {
                    ...state.timer,
                    name: action.payload,
                },
            };
        case timerTypes.STOP_TIMER:
            return {
                ...state,
                timer: INITIAL_STATE.timer,
            };
        default:
            return state;
    }
}