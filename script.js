// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const themeToggle = document.querySelector('.theme-toggle');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when clicking a nav link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Dark/Light Mode Toggle
themeToggle.onclick = () => {
    document.body.classList.toggle('light-mode');
    themeToggle.querySelector('i').classList.toggle('bx-sun');
    themeToggle.querySelector('i').classList.toggle('bx-moon');
    
    // Save theme preference to localStorage
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('lightMode', isLightMode);
};

// Check for saved theme preference
if (localStorage.getItem('lightMode') === 'true') {
    document.body.classList.add('light-mode');
    themeToggle.querySelector('i').classList.add('bx-sun');
    themeToggle.querySelector('i').classList.remove('bx-moon');
}

// Animated Counter for Stats
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Activate counters when stats section is in view
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(statsSection);

// Scroll Reveal Animation
// Ensure ScrollReveal is available before using it
if (typeof ScrollReveal !== 'undefined') {
    const scrollReveal = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: true
    });
    // The reveal calls are now inside the if block above to ensure ScrollReveal is defined
    scrollReveal.reveal('.home-content, .heading', { origin: 'left' });
    scrollReveal.reveal('.home-img, .services-container, .portfolio-container, .testimonial-container, .contact form', { origin: 'bottom' });
    scrollReveal.reveal('.about-img', { origin: 'left' });
    scrollReveal.reveal('.about-content', { origin: 'right' });
} else {
    console.warn('ScrollReveal library is not loaded.');
}

// Active link highlighting while scrolling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();