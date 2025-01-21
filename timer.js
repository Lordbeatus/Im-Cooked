const hand = document.getElementById('hand');
let angle = -90; // Starting at 12:00
let centerX, centerY;
let isDragging = false;

// Update the hand's initial position
hand.style.transform = `rotate(${angle}deg)`;

// Get the clock's center position
const clockRect = hand.parentNode.getBoundingClientRect();
centerX = clockRect.left + clockRect.width / 2;
centerY = clockRect.top + clockRect.height / 2;

hand.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag(event) {
    isDragging = true;
}

function drag(event) {
    if (isDragging) {
        const mouseRect = hand.getBoundingClientRect();
        const rect = hand.parentNode.getBoundingClientRect();
        
        if (event.clientX !== rect.left + mouseRect.width / 2 || event.clientY !== rect.top + mouseRect.height / 2) {
            const radianAngle = Math.PI / 180 * (angle - 90);
            const angleFromCenter = Math.atan2(event.clientY - centerY, event.clientX - centerX) / Math.PI * 180;
            
            // Calculate the angle
            let newAngle = angleFromCenter;
            newAngle = (newAngle + 90) % 360;
            
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
            let minutes = newAngle / 360 * 60;
            if (minutes === 60) minutes = 0; // Handle 12:00 case
            minutes = Math.round(minutes);
            document.getElementById('time-display').innerText = `Timer set to ${minutes} minutes`;
        }
    }
}

function stopDrag(event) {
    isDragging = false;
}

// Initial timer display
document.getElementById('time-display').innerText = `Timer set to 0 minutes`;
