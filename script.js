// Mobile menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Add a subtle animation delay for better UX
        if (mobileMenu.classList.contains('open')) {
            // Animate menu items with staggered delay
            const menuItems = mobileMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 50));
            });
        } else {
            // Reset menu items
            const menuItems = mobileMenu.querySelectorAll('a');
            menuItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
                item.style.transition = '';
            });
        }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // Add touch/swipe support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    mobileMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    mobileMenu.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        if (swipeDistance > swipeThreshold) {
            // Swipe up - close menu
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
        }
    }
}

// Logo animations and interactions
const logo = document.querySelector('.navbar .logo');
const logoImg = document.querySelector('.navbar .logo img');

if (logo && logoImg) {
    // Logo is ready
}

// Navigation links are ready
const navLinks = document.querySelectorAll('.navbar .nav-links a');

// Scroll-triggered animations
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport (80% threshold)
        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            // Remove the initial opacity: 0 and trigger the animation
            element.style.opacity = '1';
            
            // Add a class to indicate the animation has been triggered
            element.classList.add('animated');
        }
    });
}

// Throttle function to limit scroll event frequency
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(handleScrollAnimations, 50));

// Initial check for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
});

// Check on window resize
window.addEventListener('resize', throttle(handleScrollAnimations, 50)); 