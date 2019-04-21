import { DateTime } from 'luxon';
import { getChartData } from '../components/TasksChart';

describe('Tasks chart', () => {
    const generateTasksData = (from, to) => {
        return [
            {
                id: 42,
                name: 'Test task name',
                start: DateTime.fromObject(from).toISO(),
                end: DateTime.fromObject(to).toISO(),
            },
        ];
    };

    const checkValue = (chartData, hour, compareValue) => {
        const hourlyData = chartData.find(item => item.hour === hour);
        expect(hourlyData.tasksTime).toBe(compareValue);
    };

    // 1 hour interval
    let tasksData = generateTasksData({ hour: 8, minute: 15 }, { hour: 8, minute: 45 });

    describe('1. Test with the 1 hour interval', () => {
        const chartData = getChartData(tasksData);

        it('#1', () => {
            checkValue(chartData, 8, 30);
        });
    });

    // 2 hours interval
    tasksData = generateTasksData({ hour: 8, minute: 55 }, { hour: 9, minute: 30 });

    describe('2. Test with the 2 hours interval', () => {
        const chartData = getChartData(tasksData);

        it('#1', () => {
            checkValue(chartData, 8, 5);
        });

        it('#2', () => {
            checkValue(chartData, 9, 30);
        });
    });

    // 3 hours interval
    tasksData = generateTasksData({ hour: 10, minute: 10 }, { hour: 12, minute: 45 });

    describe('3. Test with the 3 hours interval', () => {
        const chartData = getChartData(tasksData);

        it('#1', () => {
            checkValue(chartData, 10, 50);
        });

        it('#2', () => {
            checkValue(chartData, 11, 60);
        });

        it('#3', () => {
            checkValue(chartData, 12, 45);
        });
    });

    // previous day interval
    tasksData = generateTasksData(
        DateTime.fromObject({ hour: 8, minute: 20 })
            .minus({ day: 1})
            .toObject(),
        DateTime.fromObject({ hour: 8, minute: 50 })
            .minus({ day: 1})
            .toObject(),
    );

    describe('4. Test with the previous day interval', () => {
        const chartData = getChartData(tasksData);

        it('#1', () => {
            checkValue(chartData, 8, 0);
        });
    });

    // end of day interval
    tasksData = generateTasksData(
        { hour: 23, minute: 35 },
        DateTime.fromObject({ hour: 0, minute: 50 })
            .plus({ day: 1})
            .toObject(),
    );

    describe('5. Test with the end of day interval', () => {
        const chartData = getChartData(tasksData);

        it('#1', () => {
            checkValue(chartData, 23, 25);
        });

        it('#2', () => {
            checkValue(chartData, 0, 0);
        });
    });
});
