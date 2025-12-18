/**
 * Lord Mandell Esguerra - Portfolio
 * Editorial Design-Forward Interactive Website
 */

// ========================================
// Custom Cursor
// ========================================
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        this.cursorPos = { x: 0, y: 0 };
        this.dotPos = { x: 0, y: 0 };
        this.outlinePos = { x: 0, y: 0 };
        this.isHovering = false;
        
        this.init();
    }
    
    init() {
        // Skip on touch devices
        if ('ontouchstart' in window) return;
        
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.addHoverListeners();
        this.animate();
    }
    
    onMouseMove(e) {
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
    }
    
    addHoverListeners() {
        const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .project-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
                document.body.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
                document.body.classList.remove('cursor-hover');
            });
        });
    }
    
    animate() {
        // Smooth interpolation for dot
        this.dotPos.x += (this.cursorPos.x - this.dotPos.x) * 0.2;
        this.dotPos.y += (this.cursorPos.y - this.dotPos.y) * 0.2;
        
        // Slower interpolation for outline (creates trailing effect)
        this.outlinePos.x += (this.cursorPos.x - this.outlinePos.x) * 0.1;
        this.outlinePos.y += (this.cursorPos.y - this.outlinePos.y) * 0.1;
        
        if (this.dot && this.outline) {
            this.dot.style.left = `${this.dotPos.x}px`;
            this.dot.style.top = `${this.dotPos.y}px`;
            this.outline.style.left = `${this.outlinePos.x}px`;
            this.outline.style.top = `${this.outlinePos.y}px`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Magnetic Buttons
// ========================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
        this.init();
    }
    
    init() {
        // Skip on touch devices
        if ('ontouchstart' in window) return;
        
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.onMouseMove(e, btn));
            btn.addEventListener('mouseleave', (e) => this.onMouseLeave(e, btn));
        });
    }
    
    onMouseMove(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
    
    onMouseLeave(e, btn) {
        btn.style.transform = 'translate(0, 0)';
    }
}

// ========================================
// Scroll Reveal Animations
// ========================================
class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-image, .reveal-project');
        this.init();
    }
    
    init() {
        // Initial check for elements in viewport
        this.checkElements();
        
        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    checkElements() {
        this.revealElements.forEach((el, index) => {
            if (this.isInViewport(el) && !el.classList.contains('revealed')) {
                // Stagger reveal for multiple elements
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 50);
            }
        });
    }
    
    isInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = window.innerHeight * 0.85;
        return rect.top < threshold;
    }
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
class SmoothNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ========================================
// Parallax Effects
// ========================================
class ParallaxEffects {
    constructor() {
        this.heroDecoration = document.querySelector('.hero-decoration');
        this.decoCircle = document.querySelector('.deco-circle');
        this.init();
    }
    
    init() {
        if (!this.heroDecoration) return;
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.onScroll());
        });
        
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => this.onMouseMove(e));
        });
    }
    
    onScroll() {
        const scrollY = window.scrollY;
        
        if (this.heroDecoration && scrollY < window.innerHeight) {
            this.heroDecoration.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
        }
    }
    
    onMouseMove(e) {
        if (!this.decoCircle) return;
        
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        this.decoCircle.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
    }
}

// ========================================
// Text Scramble Effect (Optional)
// ========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ========================================
// Image Hover Effects
// ========================================
class ImageHoverEffects {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        this.projectCards.forEach(card => {
            const image = card.querySelector('.project-image-inner');
            
            card.addEventListener('mousemove', (e) => {
                if (!image) return;
                
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                image.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                if (!image) return;
                image.style.transform = 'scale(1)';
            });
        });
    }
}

// ========================================
// Loading Animation
// ========================================
class LoadingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        // Animate hero elements after page load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Trigger initial reveals
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero .reveal-text, .hero .reveal-fade');
                heroElements.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, i * 100);
                });
            }, 300);
        });
    }
}

// ========================================
// Scroll Progress Indicator
// ========================================
class ScrollProgress {
    constructor() {
        this.createIndicator();
        this.init();
    }
    
    createIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.className = 'scroll-progress';
        this.indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(to right, var(--color-burnt-orange), var(--color-olive));
            z-index: 9999;
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(this.indicator);
    }
    
    init() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.updateProgress());
        });
    }
    
    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        
        this.indicator.style.transform = `scaleX(${progress})`;
    }
}

// ========================================
// Lazy Section Animations
// ========================================
class SectionAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// ========================================
// Keyboard Navigation
// ========================================
class KeyboardNavigation {
    constructor() {
        this.sections = ['hero', 'about', 'work', 'contact'];
        this.currentSection = 0;
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.navigateSection(1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.navigateSection(-1);
            }
        });
    }
    
    navigateSection(direction) {
        this.currentSection = Math.max(0, Math.min(this.sections.length - 1, this.currentSection + direction));
        
        const target = this.sections[this.currentSection];
        const element = target === 'hero' 
            ? document.querySelector('.hero') 
            : document.getElementById(target);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ========================================
// Project Image Carousel
// ========================================
class ProjectCarousel {
    constructor() {
        this.carousels = document.querySelectorAll('.project-screenshots');
        this.init();
    }
    
    init() {
        this.carousels.forEach(carousel => {
            const images = carousel.querySelectorAll('.project-screenshot');
            const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
            const prevArrow = carousel.parentElement.querySelector('.carousel-arrow-prev');
            const nextArrow = carousel.parentElement.querySelector('.carousel-arrow-next');
            let currentIndex = 0;
            let autoPlayInterval = null;
            
            // Only proceed if there are multiple images
            if (images.length <= 1) {
                // If single image, just show it
                if (images.length === 1) {
                    images[0].classList.add('active');
                }
                // Hide arrows if only one image
                if (prevArrow) prevArrow.style.display = 'none';
                if (nextArrow) nextArrow.style.display = 'none';
                return;
            }
            
            // Handle image load errors
            images.forEach((img, index) => {
                img.addEventListener('error', () => {
                    img.style.display = 'none';
                    const dot = dots[index];
                    if (dot) dot.style.display = 'none';
                });
            });
            
            // Navigation function
            const navigate = (direction) => {
                let nextIndex = currentIndex;
                let attempts = 0;
                do {
                    nextIndex = (nextIndex + direction + images.length) % images.length;
                    attempts++;
                } while (images[nextIndex].style.display === 'none' && attempts < images.length);
                
                if (images[nextIndex].style.display !== 'none') {
                    currentIndex = nextIndex;
                    this.showImage(images, dots, currentIndex);
                    if (autoPlayInterval) {
                        clearInterval(autoPlayInterval);
                        autoPlayInterval = null;
                    }
                }
            };
            
            // Set up arrow navigation
            if (prevArrow) {
                prevArrow.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(-1);
                });
            }
            
            if (nextArrow) {
                nextArrow.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(1);
                });
            }
            
            // Set up dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showImage(images, dots, index);
                    currentIndex = index;
                    if (autoPlayInterval) {
                        clearInterval(autoPlayInterval);
                        autoPlayInterval = null;
                    }
                });
            });
            
            // Auto-play on hover
            const projectCard = carousel.closest('.project-card');
            if (projectCard) {
                projectCard.addEventListener('mouseenter', () => {
                    autoPlayInterval = setInterval(() => {
                        navigate(1);
                    }, 3000); // Change image every 3 seconds
                });
                
                projectCard.addEventListener('mouseleave', () => {
                    if (autoPlayInterval) {
                        clearInterval(autoPlayInterval);
                        autoPlayInterval = null;
                    }
                });
            }
            
            // Show first available image
            let firstVisible = 0;
            for (let i = 0; i < images.length; i++) {
                if (images[i].complete && images[i].naturalHeight !== 0) {
                    firstVisible = i;
                    break;
                }
            }
            this.showImage(images, dots, firstVisible);
            currentIndex = firstVisible;
        });
    }
    
    showImage(images, dots, index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
}

// ========================================
// Initialize All Components
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new CustomCursor();
    new MagneticButtons();
    new ScrollReveal();
    new SmoothNavigation();
    new ParallaxEffects();
    new ImageHoverEffects();
    new LoadingAnimation();
    new ScrollProgress();
    new SectionAnimations();
    new KeyboardNavigation();
    new DarkModeToggle();
    new ProjectCarousel();
    
    // Add some dynamic touches
    addDynamicYear();
    initializeMarqueeClone();
});

// ========================================
// Utility Functions
// ========================================
function addDynamicYear() {
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()}`;
    }
}

function initializeMarqueeClone() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        // Clone content for seamless loop
        const clone = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = clone + clone;
    }
}

// ========================================
// Dark Mode Toggle
// ========================================
class DarkModeToggle {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        this.label = this.toggle ? this.toggle.querySelector('.theme-label') : null;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add click listener
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button state
        if (this.toggle) {
            const labelText = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            this.toggle.setAttribute('aria-label', labelText);
            this.toggle.setAttribute('data-theme-state', theme);
            if (this.label) {
                this.label.textContent = labelText;
            }
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add a subtle animation class for smooth transition
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 600);
    }
}

// ========================================
// Prefers Reduced Motion
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--duration-fast', '0s');
    document.documentElement.style.setProperty('--duration-normal', '0s');
    document.documentElement.style.setProperty('--duration-slow', '0s');
    document.documentElement.style.setProperty('--duration-slower', '0s');
}

// ========================================
// Console Greeting
// ========================================
console.log(`
%c✨ Lord Mandell Esguerra
%cDeveloper & Designer
%c─────────────────────────
Thanks for checking out my portfolio!
Let's build something beautiful together.

📧 strike.sgera@gmail.com
`, 
'font-size: 20px; font-weight: bold; color: #C45D35;',
'font-size: 14px; color: #5A6F4A;',
'color: #C4BCB0;'
);

