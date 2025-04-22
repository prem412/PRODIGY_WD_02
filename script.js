let startTime;
let endTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector('.display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const Resetbtn = document.getElementById('Resetbtn');
const lap = document.getElementById('lap');
const laplist = document.getElementById('laplist');
const lapResetBtn = document.querySelector('.lapReset');
var lapReset = document.getElementById('lapReset');

function showResetBtn() {
    if (laplist.childElementCount >> 0)  {
        lapReset.style.display = 'block';
    } else {
        lapReset.style.display = 'none';
    }
}

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10); 
    return (
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0') + '.' + 
        String(milliseconds).padStart(2, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(endTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - endTime;
        timerInterval = setInterval(function() {
            endTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    pauseTimer();
    endTime = 0;
    updateDisplay();
    laplist.innerHTML = '';
}

function recordLap() {
    if (isRunning || endTime > 0) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(endTime);
        laplist.prepend(lapTime);
    }
}

function resetLaps() {
    laplist.innerHTML = '';
    showResetBtn();
    lapReset.style.display = 'none';
}


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
Resetbtn.addEventListener('click', resetTimer);
lap.addEventListener('click', recordLap);
lapReset.addEventListener('click', resetLaps);


updateDisplay(); 