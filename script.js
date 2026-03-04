// ===== DEBOUNCE HELPER =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== CUSTOM CURSOR FOLLOWER =====
const cursor = document.querySelector('.cursor-glow');

// Use debounced mousemove to improve performance
const updateCursorPosition = debounce((e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
}, 5);

document.addEventListener('mousemove', updateCursorPosition);

// Hide cursor on leave
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-indicator').style.width = scrollPercentage + '%';
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
hiddenElements.forEach((el) => observer.observe(el));

// ===== INTERACTIVE TECH TAGS =====
const tags = document.querySelectorAll('.tags span');

tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#22c55e', '#f59e0b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.setProperty('--hover-color', randomColor);
        this.style.borderColor = randomColor;
        this.style.boxShadow = `0 0 20px ${randomColor}`;
    });

    tag.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255,255,255,0.05)';
        this.style.boxShadow = 'none';
    });
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAV LINK INDICATOR =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        if (stat.style.animationPlayState === 'running') return;

        const finalValue = stat.textContent.replace(/[^0-9]/g, '');
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50);

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = stat.textContent.replace(/\d+/, finalValue);
                clearInterval(counter);
            } else {
                const displayValue = stat.textContent.replace(/\d+/, currentValue);
                stat.textContent = displayValue;
            }
        }, 20);
    });
};

// Trigger counter when stats section is visible
const statsSection = document.querySelector('#stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ===== PARTICLE MOUSE FOLLOW (OPTIONAL ENHANCEMENT) =====
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.alpha = 1;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.vy += 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Optional: Uncomment below to enable particle effect
/*
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9997';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(p => p.alpha > 0);
    
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
*/

// ===== DYNAMIC BACKGROUND COLOR BASED ON SCROLL =====
const updateBackgroundGradient = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = (scrollPercent * 60) % 360;
    // Optional: uncomment to enable
    // document.body.style.background = `hsl(${hue}, 100%, 2%)`;
};

window.addEventListener('scroll', debounce(updateBackgroundGradient, 20));

// ===== PRELOAD IMAGES =====
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Portfolio loaded successfully! 🚀');
});

// ===== CONSOLE MESSAGE =====
console.log(
    '%cWelcome to Fakhri Portfolio!',
    'font-size: 20px; color: #8b5cf6; font-weight: bold;'
);
console.log(
    '%cLooking for the source code? Check out: github.com/Farisifakhri',
    'font-size: 12px; color: #3b82f6;'
);