'use strict';

import { getSchedule, saveСhange, getWorkouts } from "./storage.js";

const contentEl = document.querySelector('.content');

creatSchedule();

contentEl.addEventListener('click', ({ target }) => {
    const workoutEl = target.closest('.workout');
    const workoutId = workoutEl.dataset.id;
    const currentParticipantsEl = workoutEl.querySelector('.current-participants');
    const messageEl = workoutEl.querySelector('.message');
    const schedule = getSchedule();
    const workouts = getWorkouts();
    const editingWorkout = schedule.find((workout) => workout.id === Number(workoutId));
    const foundedIndexWorkout = workouts.findIndex((workout) => workout === editingWorkout.name);

    if (editingWorkout.currentParticipants !== editingWorkout.maxParticipants) {

        if (target.closest('.sign_up')) {
            switchButtons(target, workoutEl, ".sign_up", ".cancel");
            if (foundedIndexWorkout === -1) {
                workouts.push(editingWorkout.name);
                saveСhange('workouts', workouts);
                editingWorkout.currentParticipants++;
                saveСhange('schedule', schedule);
                getMessage(messageEl, "Вы записались на тренировку");
                currentParticipantsEl.textContent = `Записаны сейчас: ${editingWorkout.currentParticipants}`;
            } else {
                getMessage(messageEl, "Вы уже записаны на эту тренировку");
            }
        }

        if (target.closest('.cancel')) {
            switchButtons(target, workoutEl, ".cancel", ".sign_up");
            if (foundedIndexWorkout !== -1) {
                workouts.splice(foundedIndexWorkout, 1);
                saveСhange('workouts', workouts);
                editingWorkout.currentParticipants--;
                saveСhange('schedule', schedule);
                getMessage(messageEl, "Вы отписались от тренировки");
                currentParticipantsEl.textContent = `Записаны сейчас: ${editingWorkout.currentParticipants}`;
            }
        }

    } else {
        getMessage(messageEl, "Превышено максимальное количество участников");
    }
});


function getMessage(targetEl, message) {
    targetEl.textContent = message;
    setTimeout(() => {
        targetEl.textContent = "";
    }, 3000);
}
function switchButtons(target, parentEl, class1, class2) {
    target.closest(class1).disabled = true;
    parentEl.querySelector(class2).disabled = false;
}

function creatSchedule() {
    const schedule = getSchedule();
    schedule.forEach((workout) => {
        contentEl.insertAdjacentHTML('beforeend', getScheduleHtml(workout));
    });
}
function getScheduleHtml(workout) {
    return `
        <div class="workout" data-id="${workout.id}">
            <h2 class="workout-name">${workout.name}</h2>
            <h3 class="workout-time">${workout.time}</h3>
            <p class="participants">Количество участников: ${workout.maxParticipants}</p>
            <p class="current-participants">Записаны сейчас: ${workout.currentParticipants}</p>
            <button class="sign_up">Записаться</button>
            <button class="cancel" disabled>Отменить запись</button>
            <div class="message"></div>
        </div>`;
}



