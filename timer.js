const hand = document.getElementById('hand');
let minutes = 0;
let angle = 90; // Start at 12:00 (90 degrees)
let isDragging = false;

// Set the transform origin to the left center
hand.style.transformOrigin = 'left center';
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

    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (newAngle < 0) {
        newAngle += 360;
    }

    angle = newAngle;
    hand.style.transform = `rotate(${angle}deg)`;

    // Calculate the minutes based on the angle
    const adjustedAngle = (angle - 90 + 360) % 360; // Adjust angle to start from 90 degrees
    minutes = Math.round(adjustedAngle / 30) * 5; // 30 degrees per 5 minutes
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
}

function stopDrag(event) {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

document.getElementById('start-timer').addEventListener('click', () => {
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
    startCountdown(minutes);
});

function startCountdown(minutes) {
    let secondsRemaining = minutes * 60;
    const timerInterval = setInterval(() => {
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
