const hand = document.getElementById('hand');
let hours = 0;
let minutes = 0;
let angle = 0; // Start at 12:00 (0 degrees)
let isDragging = false;

// Set the transform origin to the bottom
hand.style.transformOrigin = '50% 100%';
hand.style.transform = `rotate(${angle}deg)`;
console.log(`Initial angle: ${angle} degrees`);

// Add event listeners for dragging
hand.addEventListener('mousedown', startDrag);

function startDrag(event) {
    isDragging = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // Capture the initial angle correctly when dragging starts
    updateAngle(event);
}

function drag(event) {
    if (!isDragging) return;
    updateAngle(event);
}

function stopDrag(event) {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

function updateAngle(event) {
    const rect = hand.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (newAngle < 0) {
        newAngle += 360;
    }
    if (isDragging){
    angle += newAngle;
    hand.style.transform = `rotate(${angle}deg)`;
    console.log(`Updated angle: ${angle} degrees`);

    // Calculate the minutes based on the angle
    minutes = (Math.round(angle / 30) * 5) % 60 ; // 30 degrees per 5 minutes
    hours = Math.floor(minutes / 60);
    document.getElementById('time-display').innerText = `Do you want to set the timer for ${hours} hours and ${minutes} minutes`;
}
}
document.getElementById('start-timer').addEventListener('click', () => {
    document.getElementById('time-display').innerText = `Timer set for ${hours} hours and ${minutes} minutes`;
    startCountdown(hours, minutes);
});

function startCountdown(hours, minutes) {
    let secondsRemaining =  hours * 3600 + minutes * 60;
    const timerInterval = setInterval(() => {
        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            secondsRemaining--;
            const hoursDisplay = Math.floor(secondsRemaining / 3600);
            const minutesDisplay = Math.floor(secondsRemaining / 60) % 60;
            const secondsDisplay = secondsRemaining % 60;
            document.getElementById('time-display').innerText = `Time remaining: ${hoursDisplay}h ${minutesDisplay}m ${secondsDisplay}s`;
        }
    }, 1000);
}
