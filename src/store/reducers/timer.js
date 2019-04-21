import { timerTypes } from '../actions/types';
import { timer as INITIAL_STATE } from '../initial-state';

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