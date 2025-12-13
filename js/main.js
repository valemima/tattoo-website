// ==========================================
// Main JavaScript - Navigation & Scroll Effects
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // ==========================================
    // Hamburger Menu Toggle
    // ==========================================
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // ==========================================
    // Smooth Scroll for Navigation Links
    // ==========================================
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Header Scroll Effect
    // ==========================================
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .product-card, .gallery-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'visible');
                // Optional: Stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // ==========================================
    // Active Navigation Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ==========================================
    // Scroll to Top Button
    // ==========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-to-top');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles dynamically
    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--black);
            color: var(--white);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
        }
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .scroll-to-top:hover {
            transform: translateY(-5px);
        }
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 80px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(scrollTopStyle);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // Notification System
    // ==========================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        
        // Add styles
        const notificationStyle = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#000' : '#e74c3c'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideDown 0.3s ease;
        `;
        notification.setAttribute('style', notificationStyle);
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Expose notification function globally for other scripts (e.g., cart.js)
    window.showNotification = showNotification;

    // Add fadeOut animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
    
    // ==========================================
    // Performance: Lazy Load Images
    // ==========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ==========================================
    // Form Security & Validation
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Honeypot spam check
            const honeypot = document.getElementById('honeypot');
            if (honeypot && honeypot.value !== '') {
                console.warn('Spam detected');
                return false;
            }
            
            // Get form values and sanitize
            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const phone = sanitizeInput(document.getElementById('phone').value);
            const service = document.getElementById('service').value;
            const message = sanitizeInput(document.getElementById('message').value);
            
            // Validate email
            if (!isValidEmail(email)) {
                showNotification('Unesite validnu email adresu', 'error');
                return false;
            }
            
            // Rate limiting check (prevent spam)
            const lastSubmit = localStorage.getItem('lastFormSubmit');
            const now = Date.now();
            if (lastSubmit && (now - lastSubmit) < 60000) { // 1 minute
                showNotification('Molimo sačekajte pre ponovnog slanja poruke', 'error');
                return false;
            }
            
            // Disable submit button to prevent double submission
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šalje se...';
            
            // Store submit time
            localStorage.setItem('lastFormSubmit', now);
            
            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                showNotification('Poruka uspešno poslata! Javićemo vam se uskoro.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Pošalji Poruku';
            }, 1500);
            
            // In production, send to backend:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-Token': getCsrfToken()
            //     },
            //     body: JSON.stringify({ name, email, phone, service, message })
            // })
        });
    }
    
    // Helper: Sanitize input to prevent XSS
    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML.trim();
    }
    
    // Helper: Validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
});
