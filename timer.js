const hand = document.getElementById('hand');
let angle = 0;

// Ensure the hand starts at 12:00
hand.style.transform = `rotate(${angle - 90}deg)`; // Adjust initial position by -90 degrees

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
    angle = Math.atan2(dy, dx) * (180 / Math.PI); // Subtract 90 to start at 12:00
    if (angle < 0) {
        angle += 360;
    }
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
