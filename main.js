// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const scrollGlow = document.querySelector('.scroll-glow');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Orange glow effect on scroll
    if (scrollY > 100) {
        scrollGlow.classList.add('active');
    } else {
        scrollGlow.classList.remove('active');
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
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.team-card, .advisor-card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 80);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe grid containers
document.querySelectorAll('.team-grid').forEach(grid => {
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
