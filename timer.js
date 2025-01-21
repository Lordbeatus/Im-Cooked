const hand = document.getElementById('hand');
let angle = 0;

// Ensure the hand starts at 12:00
hand.style.transform = `rotate(${angle}deg)`;

hand.addEventListener('mousedown', startDrag);

function startDrag(event) {
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(event) {
    const rect = hand.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI); // Calculate new angle

    if (newAngle < 0) {
        newAngle += 360; // Adjust angle for full rotation
    }

    angle = newAngle;
    hand.style.transform = `rotate(${angle}deg)`; // Update the hand rotation
}

function stopDrag(event) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

document.getElementById('start-timer').addEventListener('click', () => {
    const minutes = Math.round(angle / 30) * 5;
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
});
