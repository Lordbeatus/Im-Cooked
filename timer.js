const hand = document.getElementById('hand');
const minutes;
let angle = -90; // Start at 12:00
let isDragging = false; // Track dragging state

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
    angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;

    // Ensure angle stays within 0-360 degrees
    if (angle < 0) {
        angle += 360;
    }

    // Restrict the angle to a maximum of 360°
    

    // Update the hand rotation
    hand.style.transform = `rotate(${angle}deg)`;
}

function stopDrag(event) {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Start timer and display time
document.getElementById('start-timer').addEventListener('click', () => {
    // Convert angle to minutes
    angle = Math.min(angle, 360); //Binds the timer to be only for 1 hour
    minutes = Math.round(angle / 30) * 5; // 30 degrees per hour, 5 minutes per increment
    document.getElementById('time-display').innerText = `Timer set for ${minutes} minutes`;
});




//Countdown timer logic

let deadline = new Date().getTime() + (minutes * 1000 * 60);

// Calling defined function at certain interval
let x = setInterval(function () {
  // Getting current date and time in required format
  let now = new Date().getTime();

  // Calculating difference
  let t = minutes;

  // Getting values of days,hours,minutes, seconds
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((t % (1000 * 60)) / 1000);

  // Show the output time
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;

  // Show overtime output
  if (t < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "TIME UP";
    document.getElementById("day").innerHTML = "0";
    document.getElementById("hour").innerHTML = "0";
    document.getElementById("minute").innerHTML = "0";
    document.getElementById("second").innerHTML = "0";
  }
}, 1000);




