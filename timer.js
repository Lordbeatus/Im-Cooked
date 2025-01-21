const hand = document.getElementById('hand');
let angle = -90; // Starting at 12:00

// Update the hand's initial position
hand.style.transform = `rotate(${angle}deg)`;

// Handling interactions
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

    // Calculate the new angle
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI); // Get angle in degrees

    // Normalize the angle and adjust for starting position
    newAngle = (newAngle + 90) % 360; // Normalize to [0, 360)
    
    // Update the angle without jittering
    // Prevent large jumps when crossing the 0° mark
    if (Math.abs(newAngle - angle) > 180) {
        if (newAngle > angle) {
            newAngle -= 360; // Go to negative range
        } else {
            newAngle += 360; // Go to positive range
        }
    }

    // Update the angle
    angle = newAngle;
    hand.style.transform = `rotate(${angle}deg)`; // Apply rotation
    
    // Calculate minutes based on the angle
    const minutes = Math.round((newAngle / 360) * 60); // Normalize to [0, 60) minutes
    if (minutes === 60) minutes = 0; // Handle 12:00 case
    document.getElementById('time-display').innerText = `Timer set to ${minutes} minutes`;
}

function stopDrag(event) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Initial timer display
document.getElementById('time-display').innerText = `Timer set to 0 minutes`;
