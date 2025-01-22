const hand = document.getElementById('hand');
let minutes;
let secondsRemaining;
let angle = 0; // Start at 12:00
let isDragging = false; // Track dragging state
let lastAngle = 0; // Store the last angle to smooth out the rotation
let timerInterval; // Variable to store the timer interval

// Ensure the hand starts at 12:00
hand.style.transform = `rotate(${angle}deg)`;

// Add event listeners for dragging
hand.addEventListener('mousedown', startDrag);

function startDrag(event) {
    isDragging = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(event) {
    if (!isDragging) return;

    const rect = hand.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle relative to 12:00
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Ensure angle stays within 0-360 degrees
    if (angle < 0) {
        angle += 360;
    }
    if (angle > 360) {
        angle = angle % 360;
    }

    // Smooth the rotation to prevent spinning
    if (Math.abs(angle - lastAngle) > 180) {
        if (angle > lastAngle) {
            angle -= 360;
        } else {
            angle += 360;
        }
    }
    lastAngle = angle;

    // Update the hand rotation
    hand.style.transform = `rotate(${angle}deg)`;
}

function stopDrag(event) {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Function to start the countdown timer
function startCountdown(minutes) {
    secondsRemaining = minutes * 60;
    clearInterval(timerInterval); // Clear any existing intervals
    timerInterval = setInterval(() => {
        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            secondsRemaining--;
            const minutesDisplay = Math.floor(secondsRemaining / 60);
            const secondsDisplay = secondsRemaining % 60;
            document.getElementById('time-display').innerText = `Time remaining: ${minutesDisplay}m ${secondsDisplay}s`;
        }
    }, 1000);
}

// Start timer and display time
document.getElementById('start-timer').addEventListener('click', () => {
    // Convert angle to minutes
    minutes = Math.round(angle / 30) * 5 - 15; // 30 degrees per hour, 5 minutes per increment
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
    startCountdown(minutes);
});
