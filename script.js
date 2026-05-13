const sermonVideos = [
    '_c7793EkVfw',
    'UC1ZkQxbiI4',
    '3A-u0eGH2Ow',
    'dQw4w9WgXcQ',
];

function loadRandomSermon() {
    const randomVideo = sermonVideos[Math.floor(Math.random() * sermonVideos.length)];
    const sermonFrame = document.getElementById('sermonFrame');
    if (sermonFrame) {
        sermonFrame.src = `https://www.youtube.com/embed/${randomVideo}?rel=0&autoplay=0`;
    }
}

const testimonials = [
    {
        quote: "Mercy City Assembly helped me encounter God in a fresh way. The worship and teaching are powerful and welcoming.",
        name: "Esther M.",
        role: "Member"
    },
    {
        quote: "The prayer nights have carried our family through hard seasons. The community is loving and truly alive.",
        name: "Samuel K.",
        role: "Volunteer"
    },
    {
        quote: "I found purpose, friends, and a deep spiritual home at Mercy City Assembly.",
        name: "Linda N.",
        role: "Youth Leader"
    }
];

const testimonialSlide = document.getElementById('testimonialSlide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let testimonialIndex = 0;

function renderTestimonial(index) {
    const selected = testimonials[index];
    if (!selected || !testimonialSlide) return;
    testimonialSlide.querySelector('.testimonial-quote').textContent = `“${selected.quote}”`;
    testimonialSlide.querySelector('.testimonial-name').textContent = selected.name;
    testimonialSlide.querySelector('.testimonial-role').textContent = selected.role;
    testimonialDots.forEach(dot => dot.classList.toggle('active', Number(dot.dataset.index) === index));
}

function startTestimonialRotation() {
    renderTestimonial(testimonialIndex);
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        renderTestimonial(testimonialIndex);
    }, 7000);
}

function handleCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const speed = 1800;
        let current = 0;
        const step = Math.ceil(target / (speed / 20));

        const update = () => {
            current += step;
            counter.textContent = current > target ? target : current;
            if (current < target) {
                requestAnimationFrame(update);
            } else {
                setTimeout(() => counter.closest('.counter-card').classList.remove('counting'), 500);
            }
        };
        counter.closest('.counter-card').classList.add('counting');
        update();
    });
}

function initRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('counters-section')) {
                    handleCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}

function initParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    if (!parallaxItems.length) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxItems.forEach(item => {
            const speed = parseFloat(item.dataset.parallax) || 0;
            item.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    if (!hamburger || !menu) return;
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('nav-open');
        hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('nav-open');
            hamburger.classList.remove('active');
        });
    });
}

function initJoinButton() {
    const joinBtn = document.getElementById('joinChatBtn');
    if (!joinBtn) return;
    joinBtn.addEventListener('click', () => {
        document.getElementById('visit').scrollIntoView({ behavior: 'smooth' });
        joinBtn.classList.add('button-pulse');
        setTimeout(() => joinBtn.classList.remove('button-pulse'), 450);
    });
}

function initTestimonialButtons() {
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            testimonialIndex = Number(dot.dataset.index);
            renderTestimonial(testimonialIndex);
        });
    });
}

function hideLoading() {
    const loading = document.getElementById('loadingScreen');
    if (!loading) return;
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 500);
}

window.addEventListener('DOMContentLoaded', () => {
    loadRandomSermon();
    initRevealObserver();
    initNavigation();
    initJoinButton();
    initTestimonialButtons();
    initParallax();
    startTestimonialRotation();
});

window.addEventListener('load', () => {
    hideLoading();
});
