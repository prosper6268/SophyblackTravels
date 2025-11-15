// ========================================
// SOPHYBLACK TRAVEL & TOURS - JAVASCRIPT
// ========================================

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    serviceID: 'SophyBlack',
    templateID: 'template_xar4hpv', 
    publicKey: 'doqW8yunldRmchS4x'
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroSlideshow();
    initializeScrollEffects();
    initializeFormHandlers();
    initializeAnimations();
});

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// HERO SLIDESHOW
// ========================================
function initializeHeroSlideshow() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initializeScrollEffects() {
    const backToTop = document.getElementById('backToTop');

    // Back to Top Button Visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top Click Handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ========================================
// FORM HANDLERS
// ========================================
function initializeFormHandlers() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Newsletter Subscription
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterInput = document.getElementById('newsletterEmail');
    
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNewsletterSubscription(newsletterInput.value);
    });
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Here you would typically send the data to your server
    // For now, we'll just show a success message
    showNotification('Thank you for your inquiry! We will contact you shortly to plan your perfect adventure.', 'success');
    
    // Reset form
    e.target.reset();
}

function handleNewsletterSubscription(email) {
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Here you would typically send the email to your server
    showNotification('Thank you for subscribing! You will receive exclusive travel deals and updates.', 'success');
    
    // Clear input
    document.getElementById('newsletterEmail').value = '';
}

// ========================================
// NOTIFICATIONS
// ========================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service cards, destination cards, and testimonials
    document.querySelectorAll('.service-card, .destination-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// DYNAMIC COPYRIGHT YEAR
// ========================================
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright p');
if (copyrightElement) {
    copyrightElement.innerHTML = 
        `&copy; ${currentYear} Sophyblack Travel & Tours Voyages. All rights reserved. | Designed with passion for travel`;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%cSophyblack Travel & Tours Voyages', 'color: #D4AF37; font-size: 24px; font-weight: bold;');

console.log('%cWebsite loaded successfully! Ready to explore the world! 🌍✈️', 'color: #0C1A4B; font-size: 14px;');
