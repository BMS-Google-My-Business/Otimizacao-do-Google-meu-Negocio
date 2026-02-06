// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all elements with data-scroll attribute
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-disclaimer');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// ============================================
// HERO GRADIENT MOUSE EFFECT (OPTIONAL)
// ============================================
const hero = document.querySelector('.hero');
const heroGradient = document.querySelector('.hero-gradient');

if (hero && heroGradient) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = hero;
        
        const xPercent = (clientX / offsetWidth) * 100;
        const yPercent = (clientY / offsetHeight) * 100;
        
        heroGradient.style.background = `
            radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(230, 57, 70, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(230, 57, 70, 0.1) 0%, transparent 50%)
        `;
    });
}

// ============================================
// PRICING CARD TRACKING (OPTIONAL ANALYTICS)
// ============================================
const pricingButtons = document.querySelectorAll('.btn-pricing, .btn-final-cta');

pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const planName = button.textContent.trim();
        console.log(`User clicked: ${planName}`);
        
        // Here you can add analytics tracking
        // Example: gtag('event', 'click', { 'plan': planName });
    });
});

// ============================================
// PREVENT ORPHAN WORDS IN TITLES
// ============================================
function preventOrphans() {
    const titles = document.querySelectorAll('.hero-title, .section-title, .pricing-name');
    
    titles.forEach(title => {
        const text = title.innerHTML;
        const words = text.split(' ');
        
        if (words.length > 2) {
            const lastTwoWords = words.slice(-2).join('&nbsp;');
            const restWords = words.slice(0, -2).join(' ');
            title.innerHTML = `${restWords} ${lastTwoWords}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', preventOrphans);

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES (IF NEEDED)
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any modals or overlays if you add them later
    }
});

// ============================================
// MOBILE MENU TOGGLE (IF NEEDED LATER)
// ============================================
const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && !header.classList.contains('mobile-ready')) {
        // Add mobile menu functionality here if needed
        header.classList.add('mobile-ready');
    }
};

window.addEventListener('resize', createMobileMenu);
document.addEventListener('DOMContentLoaded', createMobileMenu);

// ============================================
// SCROLL PROGRESS INDICATOR (OPTIONAL)
// ============================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #E63946, #C42E3A);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Uncomment to enable scroll progress bar
// document.addEventListener('DOMContentLoaded', createScrollProgress);

// ============================================
// WHATSAPP LINK VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Track WhatsApp clicks
            console.log('WhatsApp link clicked:', link.href);
            
            // Optional: Add UTM parameters or tracking
            // const url = new URL(link.href);
            // url.searchParams.set('utm_source', 'landing_page');
            // link.href = url.toString();
        });
    });
});

// ============================================
// FORM VALIDATION (IF YOU ADD FORMS LATER)
// ============================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 BMS Agência de Marketing', 'color: #E63946; font-size: 20px; font-weight: bold;');
console.log('%cSe você está vendo isso, provavelmente entende de código!', 'color: #1A1A1A; font-size: 14px;');
console.log('%cQue tal conversar sobre como podemos trabalhar juntos?', 'color: #4A4A4A; font-size: 12px;');
console.log('%cWhatsApp: (16) 98100-5730', 'color: #E63946; font-size: 12px; font-weight: bold;');