// ==========================================
// Gallery Lightbox Functionality
// ==========================================

class GalleryLightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }
    
    init() {
        this.createLightboxUI();
        this.attachEventListeners();
    }
    
    // ==========================================
    // Create Lightbox UI
    // ==========================================
    createLightboxUI() {
        const lightboxHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Zatvori">&times;</button>
                    <button class="lightbox-prev" aria-label="Prethodna">‹</button>
                    <button class="lightbox-next" aria-label="Sledeća">›</button>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.addLightboxStyles();
    }
    
    addLightboxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-overlay.active {
                display: flex;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 85vh;
                object-fit: contain;
                box-shadow: 0 10px 50px rgba(0,0,0,0.5);
            }
            
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: var(--white);
                font-size: 3rem;
                cursor: pointer;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }
            
            .lightbox-close:hover {
                transform: rotate(90deg);
            }
            
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: var(--white);
                font-size: 3rem;
                width: 60px;
                height: 60px;
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .lightbox-prev {
                left: 20px;
            }
            
            .lightbox-next {
                right: 20px;
            }
            
            .lightbox-caption {
                position: absolute;
                bottom: -50px;
                left: 0;
                right: 0;
                color: var(--white);
                text-align: center;
                font-size: 1.1rem;
            }
            
            .lightbox-counter {
                position: absolute;
                top: -50px;
                left: 0;
                color: var(--white);
                font-size: 1rem;
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    max-width: 95%;
                    max-height: 95%;
                }
                
                .lightbox-image {
                    max-height: 70vh;
                }
                
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    font-size: 2rem;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                }
                
                .lightbox-prev,
                .lightbox-next {
                    width: 50px;
                    height: 50px;
                    font-size: 2rem;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                }
                
                .lightbox-prev {
                    left: 10px;
                }
                
                .lightbox-next {
                    right: 10px;
                }
                
                .lightbox-caption {
                    bottom: 10px;
                    font-size: 0.9rem;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 0.5rem;
                }
                
                .lightbox-counter {
                    top: 10px;
                    left: 10px;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 0.3rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================
    // Event Listeners
    // ==========================================
    attachEventListeners() {
        // Gallery item clicks
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.images = Array.from(document.querySelectorAll('.gallery-item'));
                this.open(index);
            });
        });
        
        // Close button
        document.querySelector('.lightbox-close').addEventListener('click', () => {
            this.close();
        });
        
        // Overlay click to close
        document.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-overlay')) {
                this.close();
            }
        });
        
        // Navigation buttons
        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            this.prev();
        });
        
        document.querySelector('.lightbox-next').addEventListener('click', () => {
            this.next();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.lightbox-overlay').classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
        
        // Touch swipe support
        this.addTouchSupport();
    }
    
    // ==========================================
    // Lightbox Operations
    // ==========================================
    open(index) {
        this.currentIndex = index;
        this.show();
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        document.querySelector('.lightbox-overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
    
    show() {
        const overlay = document.querySelector('.lightbox-overlay');
        const image = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        const counter = document.querySelector('.lightbox-counter');
        
        const currentItem = this.images[this.currentIndex];
        const imgElement = currentItem.querySelector('img');
        
        // Set image
        if (imgElement) {
            image.src = imgElement.src;
            image.alt = imgElement.alt;
        } else {
            // Fallback for placeholder items
            image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23333" width="800" height="600"/%3E%3Ctext fill="%23fff" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EGallery Image%3C/text%3E%3C/svg%3E';
        }
        
        // Set caption
        caption.textContent = currentItem.textContent || '';
        
        // Set counter
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        
        overlay.classList.add('active');
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.show();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.show();
    }
    
    // ==========================================
    // Touch Support for Mobile
    // ==========================================
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const lightboxContent = document.querySelector('.lightbox-content');
        
        lightboxContent.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lightboxContent.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next
                    this.next();
                } else {
                    // Swipe right - prev
                    this.prev();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.lightbox = new GalleryLightbox();
});
