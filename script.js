// ===== Personal Website - Interactive Features =====
// Mobile menu toggle, active link highlight, smooth interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MOBILE MENU TOGGLE (for responsive navigation)
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const closeMenuBtn = document.getElementById('closeMenu');
    
    // Function to open/close menu
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenuBtn && mainNav) {
        closeMenuBtn.addEventListener('click', function() {
            mainNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('open')) {
            if (!mainNav.contains(event.target) && event.target !== menuToggle && !menuToggle.contains(event.target)) {
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });
    
    // When any nav link inside mainNav is clicked, close menu on mobile
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 2. ACTIVE PAGE HIGHLIGHT (based on current URL)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('nav a, .bottom-nav a');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            if (link.classList.contains('active') && linkHref !== currentPage) {
                link.classList.remove('active');
            }
        }
    });
    
    // 3. Back to Top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '⬆️';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.backgroundColor = '#ffb347';
    backToTopBtn.style.color = '#4C186C';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.width = '45px';
    backToTopBtn.style.height = '45px';
    backToTopBtn.style.fontSize = '24px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    backToTopBtn.style.zIndex = '99';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.transition = '0.2s';
    backToTopBtn.style.opacity = '0.8';
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'scale(1.05)';
    });
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.opacity = '0.8';
        backToTopBtn.style.transform = 'scale(1)';
    });
    
    // 4. Console greeting
    console.log('✨ Personal website loaded | Stacy Valerie ✨');
    
    // 5. Video interaction logging
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            console.log(`🎬 Playing: ${video.currentSrc || 'video'}`);
        });
    });
    
    // 6. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 7. Update footer year
    const footerYear = document.querySelector('footer p');
    if (footerYear && footerYear.innerText.includes('2025')) {
        const currentYear = new Date().getFullYear();
        if (currentYear !== 2025) {
            footerYear.innerText = `© ${currentYear} Stacy Valerie. Personal Website.`;
        }
    }
    
    // 8. Video error fallback
    const allVids = document.querySelectorAll('.blog-video');
    allVids.forEach(vid => {
        vid.addEventListener('error', function() {
            const parent = vid.closest('.video-item, .blog-entry');
            if (parent && !parent.querySelector('.video-fallback')) {
                const fallback = document.createElement('p');
                fallback.className = 'video-fallback';
                fallback.style.color = '#ffaa66';
                fallback.style.fontSize = '0.85rem';
                fallback.innerText = '⚠️ Video tidak tersedia, pastikan file ada di folder web-vid/';
                vid.insertAdjacentElement('afterend', fallback);
            }
        });
    });
    
    // 9. Ensure all images have alt attributes
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.hasAttribute('alt') || img.alt === '') {
            img.setAttribute('alt', 'Personal media gallery');
        }
    });
    
    // 10. LIGHTBOX FUNCTIONALITY (for gallery)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.lightbox-close');
    
    const galleryImages = document.querySelectorAll('.gallery-card');
    
    galleryImages.forEach(card => {
        card.addEventListener('click', function(e) {
            const img = this.querySelector('.gallery-img');
            const caption = this.querySelector('.gallery-caption');
            
            if (img && lightbox) {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                if (caption) {
                    lightboxCaption.textContent = caption.textContent;
                } else {
                    lightboxCaption.textContent = '';
                }
                
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            if (lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
        // ===== TAB FUNCTIONALITY FOR CONTACT PAGE =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
});