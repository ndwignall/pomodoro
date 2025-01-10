let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const themeToggle = document.getElementById('theme-toggle');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = 25 * 60;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    statusText.textContent = 'Work Time';
    updateDisplay();
}

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.checked = isDark;
}

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem('darkMode');
setTheme(savedTheme === null ? true : savedTheme === 'true');

themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked);
    localStorage.setItem('darkMode', e.target.checked);
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 