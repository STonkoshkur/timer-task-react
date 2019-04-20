import { timerTypes } from './types';

export function startTimer({ name, start }) {
    return {
        type: timerTypes.START_TIMER,
        payload: {
            isActive: true,
            name,
            startDateTime: start,
        },
    };
}

export function updateName(taskName) {
    return { type: timerTypes.UPDATE_NAME, payload: taskName };
}

export function stopTimer() {
    return { type: timerTypes.STOP_TIMER };
}

export default {
    startTimer,
    updateName,
    stopTimer,
};
