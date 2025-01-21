const hand = document.getElementById('hand');
let angle = -90;

// Ensure the hand starts at 12:00
hand.style.transform = `rotate(${angle}deg)`; // Adjust initial position by -90 degrees

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
    
    angle = Math.atan2(dy, dx) * (180 / Math.PI); // Get the angle in degrees

    // Adjust for clockwise rotation: Adding 90 degrees to start at 12:00
    angle = (angle + 90) % 360; // Normalize to 0-360 range
    
    // Setting angle in transform
    hand.style.transform = `rotate(${angle}deg)`; 
}

function stopDrag(event) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Correct the minutes calculation based on the angle
document.getElementById('start-timer').addEventListener('click', () => {
    // Convert angle to minutes, 30 degrees corresponds to 5 minutes (360°/60min)
    const minutes = Math.round(angle / 6); // Since 360° / 60 is 6°
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
});
