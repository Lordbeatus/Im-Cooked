const hand = document.getElementById('hand');
let angle = 0;
const sensitivityFactor = 2;

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
    angle = Math.atan2(dy, dx) * (180 / Math.PI); //angle
    hand.style.transform = `rotate(${angle/sensitivityFactor}deg)`; //Updates the sensitivity
}

function stopDrag(event) {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

document.getElementById('start-timer').addEventListener('click', () => {
    const minutes = Math.round(angle / 30) * 5;
    alert(`Timer set for ${minutes} minutes`);
});
