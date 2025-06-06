const hand = document.getElementById('hand');
const clock = document.getElementById('clock');
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
    if (isWithinClock(event)) {
        updateAngle(event);
    }
}

function stopDrag(event) {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

function isWithinClock(event) {
    const rect = clock.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}

function updateAngle(event) {
    const rect = clock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Calculate the raw angle difference
    let rawAngleDifference = newAngle - (angle % 360);

    // Adjust for crossing the 0-degree boundary
    if (rawAngleDifference > 180) {
        rawAngleDifference -= 360;
    } else if (rawAngleDifference < -180) {
        rawAngleDifference += 360;
    }

    if (isDragging) {
        // Prevent backward movement at 0 degrees
        if (angle === 0 && rawAngleDifference < 0) {
            return; // Do nothing if trying to go backward at 0 degrees
        }

        // Introduce a scaling factor to smooth the spinning
        const scalingFactor = 0.05; // Adjust this value to control sensitivity
        angle += rawAngleDifference * scalingFactor;

        angle = Math.max(0, angle); // Prevent negative angles

        if (angle  > 0){
            hand.style.transform = `rotate(${angle % 360}deg)`;
        console.log(`Updated angle: ${angle} degrees`);
        }
        // Calculate the minutes based on the angle
        minutes = (Math.round(angle / 30) * 5) % 60; // 30 degrees per 5 minutes
        hours = Math.floor(angle / 360);
        hours = Math.max(hours, 0); 
        minutes = Math.max(minutes, 0); 
        document.getElementById('time-display').innerText = `Do you want to set the timer for ${hours} hours and ${minutes} minutes`;
    }
}

document.getElementById('start-timer').addEventListener('click', () => {
    document.getElementById('time-display').innerText = `Timer set for ${hours} hours and ${minutes} minutes`;
    startCountdown(hours, minutes);
});

function startCountdown(hours, minutes) {
    let secondsRemaining = hours * 3600 + minutes * 60;
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
