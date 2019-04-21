import { timerTypes } from '../actions/types';
import { timer as INITIAL_STATE } from '../initial-state';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case timerTypes.STORE_TIMER:
            return {
                ...state,
                timer: {
                    ...action.payload,
                    isActive: true,
                },
            };
        case timerTypes.UPDATE_NAME:
            return {
                ...state,
                timer: {
                    ...state.timer,
                    name: action.payload,
                },
            };
        case timerTypes.REMOVE_TIMER:
            return {
                ...state,
                timer: INITIAL_STATE.timer,
            };
        default:
            return state;
    }
}