const sky = document.getElementById('sky');
const weatherCanvas = document.getElementById('weather-layer');
const ctx = weatherCanvas.getContext('2d');

// 1. Time-Based Environment Engine
function updateEnvironment() {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 10) {
        sky.style.background = "linear-gradient(to bottom, #ff9a9e, #fad0c4)"; // Sunrise (Pink)
    } else if (hour >= 18 || hour < 6) {
        sky.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)"; // Night
    } else {
        sky.style.background = "linear-gradient(to bottom, #89f7fe, #66a6ff)"; // Day (Blue)
    }
}

// 2. Particle Weather System (Cherry Blossoms / Rain)
let particles = [];
function initWeather() {
    weatherCanvas.width = window.innerWidth;
    weatherCanvas.height = window.innerHeight;
    for(let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 5 + 2
        });
    }
}

function drawWeather() {
    ctx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
    ctx.fillStyle = "rgba(255, 183, 197, 0.8)"; // Pink Petals
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.speed;
        p.x += Math.sin(p.y / 20);
        if(p.y > window.innerHeight) p.y = -10;
    });
    requestAnimationFrame(drawWeather);
}

// 3. The Secret Entrance
window.addEventListener('keydown', (e) => {
    if(e.key === 'h') { // Press 'h' for honeydrop
        document.getElementById('terminal-overlay').style.display = 'flex';
    }
});

updateEnvironment();
initWeather();
drawWeather();
