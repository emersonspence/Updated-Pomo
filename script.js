let studyTime = 25 * 60; // Default study time in seconds
let breakTime = 5 * 60;  // Default break time in seconds
let timeRemaining = studyTime;
let isStudySession = true;
let sessionCount = 0;
let timer;

const timerElement = document.getElementById('timer');
const sessionsElement = document.getElementById('sessions');
const studyInput = document.getElementById('study-length');
const breakInput = document.getElementById('break-length');
const backgroundInput = document.getElementById('background-url');

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
}

function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');
    audio.play();
}

function startTimer() {
    if (timer) return; // Prevent multiple timers from starting

    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            timer = null;
            playSound();

            if (isStudySession) {
                sessionCount++;
                sessionsElement.textContent = `Sessions Completed: ${sessionCount}`;
                timeRemaining = breakTime;
                isStudySession = false;
                alert('Time for a break!');
            } else {
                timeRemaining = studyTime;
                isStudySession = true;
                alert('Back to studying!');
            }

            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeRemaining = isStudySession ? studyTime : breakTime;
    updateTimerDisplay();
}

function updateLengths() {
    studyTime = parseInt(studyInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    if (isStudySession) {
        timeRemaining = studyTime;
    } else {
        timeRemaining = breakTime;
    }
    updateTimerDisplay();
}

function changeBackground() {
    const url = backgroundInput.value;
    if (url) {
        document.body.style.background = `url('${url}') no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    } else {
        alert('Please enter a valid URL');
    }
}

updateTimerDisplay();
