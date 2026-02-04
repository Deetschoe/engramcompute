// Neural network background animation
const canvas = document.getElementById('neural-bg');
const ctx = canvas.getContext('2d');

let nodes = [];
let connections = [];
let mouse = { x: null, y: null };

const colors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#9775fa'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initNodes();
}

function initNodes() {
    nodes = [];
    const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function drawNode(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
}

function drawConnection(node1, node2, distance) {
    const maxDistance = 150;
    const opacity = 1 - (distance / maxDistance);

    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);

    const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
    gradient.addColorStop(0, node1.color.replace(')', `, ${opacity * 0.3})`).replace('rgb', 'rgba').replace('#', ''));
    gradient.addColorStop(1, node2.color.replace(')', `, ${opacity * 0.3})`).replace('rgb', 'rgba').replace('#', ''));

    ctx.strokeStyle = `rgba(100, 100, 100, ${opacity * 0.15})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction - gentle attraction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                node.vx += dx * 0.00005;
                node.vy += dy * 0.00005;
            }
        }

        // Speed limit
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.5) {
            node.vx = (node.vx / speed) * 0.5;
            node.vy = (node.vy / speed) * 0.5;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                drawConnection(node, other, distance);
            }
        }

        drawNode(node);
    });

    requestAnimationFrame(animate);
}

// Mouse tracking
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const cards = entry.target.parentElement.querySelectorAll('.team-card, .advisor-card, .contact-card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe grid containers
document.querySelectorAll('.team-grid, .advisors-grid, .contact-cards').forEach(grid => {
    observer.observe(grid);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
