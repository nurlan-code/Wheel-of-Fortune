// Wheel of Fortune Casino - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initWheel();
    initFAQ();
    initMobileMenu();
    initScrollEffects();
    initGameCards();
});

function initWheel() {
    const wheel = document.getElementById('mainWheel');
    const segments = document.querySelectorAll('.segment');
    let isSpinning = false;
    
    wheel.addEventListener('click', function() {
        if (!isSpinning) {
            spinWheel();
        }
    });
    
    segments.forEach(segment => {
        segment.addEventListener('mouseenter', function() {
            if (!isSpinning) {
                this.style.transform += ' scale(1.05)';
            }
        });
        
        segment.addEventListener('mouseleave', function() {
            if (!isSpinning) {
                this.style.transform = this.style.transform.replace(' scale(1.05)', '');
            }
        });
    });
}

function spinWheel() {
    const wheel = document.getElementById('mainWheel');
    const segments = document.querySelectorAll('.segment');
    let isSpinning = true;
    
    wheel.style.pointerEvents = 'none';
    
    const baseRotation = 360 * (5 + Math.random() * 5); 
    const segmentAngle = 45; 
    const randomSegment = Math.floor(Math.random() * 8);
    const finalRotation = baseRotation + (randomSegment * segmentAngle);
    
    wheel.style.transform = `rotate(${finalRotation}deg)`;
    
    wheel.style.filter = 'blur(2px)';
    
    setTimeout(() => {
        wheel.style.filter = 'blur(0px)';
        wheel.style.pointerEvents = 'auto';
        isSpinning = false;
        
        const winningSegment = segments[randomSegment];
        const winningValue = winningSegment.dataset.value;
        showWinMessage(winningValue);
        
        createConfetti();
        
    }, 4000);
}

function showWinMessage(value) {
    const modal = document.createElement('div');
    modal.className = 'win-modal';
    modal.innerHTML = `
        <div class="win-content">
            <div class="win-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h2>Congratulations!</h2>
            <p>You won: <span class="win-value">${value}</span> virtual coins!</p>
            <button class="btn-primary" onclick="closeWinModal()">Continue Playing</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;
    
    const winContent = modal.querySelector('.win-content');
    winContent.style.cssText = `
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        color: #333;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.5s ease;
    `;
    
    const winIcon = modal.querySelector('.win-icon');
    winIcon.style.cssText = `
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 1s ease infinite;
    `;
    
    const winValue = modal.querySelector('.win-value');
    winValue.style.cssText = `
        font-size: 2rem;
        font-weight: 700;
        color: #ff6b6b;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeWinModal();
        }
    }, 5000);
}

// Close win modal
function closeWinModal() {
    const modal = document.querySelector('.win-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 9999;
            animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Scroll effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Scroll to games section
    window.scrollToGames = function() {
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            gamesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
}

// Game cards functionality
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show coming soon message
            showComingSoonMessage();
        });
    });
}

// Show coming soon message
function showComingSoonMessage() {
    const modal = document.createElement('div');
    modal.className = 'coming-soon-modal';
    modal.innerHTML = `
        <div class="coming-soon-content">
            <div class="coming-soon-icon">
                <i class="fas fa-clock"></i>
            </div>
            <h2>Coming Soon!</h2>
            <p>This game is currently under development. Stay tuned for exciting updates!</p>
            <button class="btn-primary" onclick="closeComingSoonModal()">Got it!</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;
    
    const content = modal.querySelector('.coming-soon-content');
    content.style.cssText = `
        background: linear-gradient(45deg, #667eea, #764ba2);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.5s ease;
    `;
    
    const icon = modal.querySelector('.coming-soon-icon');
    icon.style.cssText = `
        font-size: 4rem;
        margin-bottom: 1rem;
        color: #ffd700;
    `;
    
    document.body.appendChild(modal);
}

// Close coming soon modal
function closeComingSoonModal() {
    const modal = document.querySelector('.coming-soon-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(50px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        padding: 1rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 992px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard support
document.addEventListener('keydown', function(e) {
    // Space bar to spin wheel
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        spinWheel();
    }
    
    // Escape to close modals
    if (e.code === 'Escape') {
        closeWinModal();
        closeComingSoonModal();
    }
});

// Performance optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message
            showContactSuccess(name, subject);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Show contact success message
function showContactSuccess(name, subject) {
    const modal = document.createElement('div');
    modal.className = 'contact-success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Message Sent!</h2>
            <p>Thank you, ${name}! Your ${subject.toLowerCase()} message has been sent successfully.</p>
            <p>We'll get back to you as soon as possible.</p>
            <button class="btn-primary" onclick="closeContactSuccessModal()">Got it!</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;
    
    const successContent = modal.querySelector('.success-content');
    successContent.style.cssText = `
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.5s ease;
    `;
    
    const successIcon = modal.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 4rem;
        margin-bottom: 1rem;
        color: #ffd700;
    `;
    
    document.body.appendChild(modal);
}

// Close contact success modal
function closeContactSuccessModal() {
    const modal = document.querySelector('.contact-success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Show newsletter success message
            showNewsletterSuccess(email);
            
            // Reset form
            newsletterForm.reset();
        });
    }
}

// Show newsletter success message
function showNewsletterSuccess(email) {
    const modal = document.createElement('div');
    modal.className = 'newsletter-success-modal';
    modal.innerHTML = `
        <div class="newsletter-success-content">
            <div class="newsletter-success-icon">
                <i class="fas fa-bell"></i>
            </div>
            <h2>You're Subscribed!</h2>
            <p>Thank you for subscribing with ${email}!</p>
            <p>You'll be the first to know when our games are ready.</p>
            <button class="btn-primary" onclick="closeNewsletterSuccessModal()">Awesome!</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;
    
    const successContent = modal.querySelector('.newsletter-success-content');
    successContent.style.cssText = `
        background: linear-gradient(45deg, #667eea, #764ba2);
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.5s ease;
    `;
    
    const successIcon = modal.querySelector('.newsletter-success-icon');
    successIcon.style.cssText = `
        font-size: 4rem;
        margin-bottom: 1rem;
        color: #ffd700;
    `;
    
    document.body.appendChild(modal);
}

// Close newsletter success modal
function closeNewsletterSuccessModal() {
    const modal = document.querySelector('.newsletter-success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            modal.remove();
        }, 500);
    }
}

// Initialize additional functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initNewsletterForm();
});

// Add smooth scrolling for back to home button
document.addEventListener('DOMContentLoaded', function() {
    const backButtons = document.querySelectorAll('.btn-back');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    });
});

// Add loading states for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-submit, .btn-newsletter');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ff6b6b';
                } else {
                    this.style.borderColor = '#e0e0e0';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 107, 107)') {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        });
    });
});
