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
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Smooth lag for glow cursor
function animateCursor() {
    dotX += (mouseX - dotX) * 0.08;
    dotY += (mouseY - dotY) * 0.08;
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});

// Cursor scale on hover over interactive elements
document.querySelectorAll('a, button, .glass-card, .hobby-item, .stat-card, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursorDot.style.background = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.background = 'var(--primary)';
    });
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
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
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
        this.style.color = randomColor;
    });

    tag.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255,255,255,0.05)';
        this.style.boxShadow = 'none';
        this.style.color = '';
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
        const originalText = stat.getAttribute('data-original') || stat.textContent;
        stat.setAttribute('data-original', originalText);

        const finalValue = parseInt(originalText.replace(/[^0-9]/g, ''));
        const suffix = originalText.replace(/[0-9]/g, '');
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 60);
        const prefix = suffix.startsWith('+') ? '' : '';

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = originalText;
                clearInterval(counter);
            } else {
                stat.textContent = currentValue + suffix;
            }
        }, 20);
    });
};

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

// ===== PARTICLE EFFECT =====
const canvas = document.getElementById('particle-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.alpha = 0.8;
        this.size = Math.random() * 2.5 + 0.5;
        const colors = ['139, 92, 246', '59, 130, 246', '236, 72, 153'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.015;
        this.vy += 0.05;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

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

// ===== TYPING EFFECT =====
const textArray = ["Officiating Rules.", "Building Solutions.", "Analyzing Data.", "Creating Impact."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

// Inject blink keyframes
const blinkStyle = document.createElement('style');
blinkStyle.innerHTML = `@keyframes blink { 0%, 100% { border-color: var(--primary); } 50% { border-color: transparent; } }`;
document.head.appendChild(blinkStyle);

function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingElement) {
    typingElement.style.animation = 'blink 0.75s step-end infinite';
    setTimeout(typeEffect, 1200);
}

// ===== GLASS CARD TILT EFFECT =====
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease, border-color 0.4s, box-shadow 0.4s';
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Portfolio loaded successfully! 🚀');
});

// ===== CONSOLE MESSAGES =====
console.log(
    '%cWelcome to Fakhri Portfolio!',
    'font-size: 20px; color: #8b5cf6; font-weight: bold;'
);
console.log(
    '%cLooking for the source code? Check out: github.com/Farisifakhri',
    'font-size: 12px; color: #3b82f6;'
);