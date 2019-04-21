export const task = {
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

export const timer = {
    timer: {
        isActive: false,
        name: '',
        startDateTime: null,
    },
};

export default {
    task,
    timer,
};
