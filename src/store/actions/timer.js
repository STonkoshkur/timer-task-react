import { timerTypes } from './types';

export function startTimer({ name, start }) {
    return {
        type: timerTypes.HANDLE_TIMER_START,
        payload: {
            isActive: true,
            name,
            startDateTime: start,
        },
    };
}

export function storeTimer(timer) {
    return { type: timerTypes.STORE_TIMER, payload: timer };
}

export function updateName(taskName) {
    return { type: timerTypes.HANDLE_TIMER_NAME_UPDATE, payload: taskName };
}

export function setTimerName(taskName) {
    return { type: timerTypes.UPDATE_NAME, payload: taskName };
}

export function stopTimer() {
    return { type: timerTypes.HANDLE_TIMER_STOP };
}

export function removeTimer() {
    return { type: timerTypes.REMOVE_TIMER };
}

export default {
    startTimer,
    storeTimer,
    updateName,
    setTimerName,
    stopTimer,
    removeTimer,
};
