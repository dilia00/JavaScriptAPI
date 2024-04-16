const scheduleLsKey = 'schedule';
const workoutLsKey = 'workouts';

const initialSchedule = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 8
    }
];

function getWorkouts() {
    const workouts = localStorage.getItem(workoutLsKey);
    if (!workouts) {
        return [];
    }
    return JSON.parse(workouts);
};

function getSchedule() {
    const schedule = localStorage.getItem(scheduleLsKey);
    if (!schedule) {
        localStorage.setItem(scheduleLsKey, JSON.stringify(initialSchedule));
    }
    return JSON.parse(schedule);
};

function saveСhange(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getSchedule, saveСhange, getWorkouts };