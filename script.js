document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor Follower Logic
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Scroll Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
    hiddenElements.forEach((el) => observer.observe(el));

    // 3. Hover Effect for Tech Tags (Random Color)
    const tags = document.querySelectorAll('.tags span');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            tag.style.borderColor = randomColor;
            tag.style.boxShadow = `0 0 10px ${randomColor}`;
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.borderColor = 'rgba(255,255,255,0.05)';
            tag.style.boxShadow = 'none';
        });
    });
});