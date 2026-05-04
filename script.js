// ===== Personal Website - Interactive Features =====
// Mobile menu toggle, active link highlight, smooth interactions, and dynamic year/or any enhancements.

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MOBILE MENU TOGGLE (for responsive navigation)
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const closeMenuBtn = document.getElementById('closeMenu');
    
    // Function to open/close menu
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent scrolling when menu open
        });
    }
    
    if (closeMenuBtn && mainNav) {
        closeMenuBtn.addEventListener('click', function() {
            mainNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside (optional, click on any link also closes)
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('open')) {
            // if click is not inside nav and not on toggle button
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
    
    // 2. ACTIVE PAGE HIGHLIGHT (based on current URL, dynamic)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('nav a, .bottom-nav a');
    
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            // Remove active from others to avoid duplication
            if (link.classList.contains('active') && linkHref !== currentPage) {
                link.classList.remove('active');
            }
        }
    });
    
    // 3. Add a consistent "back to top" button for better UX
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
    
    // 4. GALLERY: lazy loading images for performance? optional, but simple: add alt fallback?
    // Also provide a simple interactive console greeting.
    console.log('✨ Personal website loaded | Stacy Valerie ✨');
    
    // 5. For Contact page - copy to clipboard functionality (nice addition)
    const contactEmail = document.querySelector('.contact-card a[href^="mailto"]') || 
                         (() => {
                            // if normal contact page doesn't have mailto, we extract from text?
                            const gmailElem = Array.from(document.querySelectorAll('.contact-detail, .contact-card')).find(el => el.innerText.includes('gmail.com'));
                            if (gmailElem) return null;
                            return null;
                         })();
    
    // Actually we can add interactive "copy" for whatsapp or email on contact page
    const contactPhoneSpan = document.querySelector('.contact-card') ? 
        Array.from(document.querySelectorAll('.contact-card p, .contact-card div')).find(el => el.innerText.includes('+62')) : null;
    
    // create copy buttons if we find phone/email elements to enhance UX but preserve original style
    const contactContainer = document.querySelector('.contact-card');
    if (contactContainer && !document.querySelector('.copy-notice')) {
        // To avoid duplicate, add small copy hint
        const copyHint = document.createElement('p');
        copyHint.style.fontSize = '0.8rem';
        copyHint.style.marginTop = '1rem';
        copyHint.style.opacity = '0.7';
        copyHint.innerHTML = '💡 Klik nomor WA atau email untuk menyalin';
        copyHint.classList.add('copy-notice');
        contactContainer.appendChild(copyHint);
        
        // find whatsapp number and email
        const whatsElem = Array.from(contactContainer.querySelectorAll('div, p')).find(el => el.innerText.includes('WhatsApp'));
        const emailElem = Array.from(contactContainer.querySelectorAll('div, p')).find(el => el.innerText.includes('Gmail'));
        
        if (whatsElem) {
            const numberText = whatsElem.innerText.replace('WhatsApp:', '').trim();
            const numberSpan = document.createElement('span');
            numberSpan.style.cursor = 'pointer';
            numberSpan.style.backgroundColor = 'rgba(255,255,255,0.2)';
            numberSpan.style.padding = '4px 8px';
            numberSpan.style.borderRadius = '20px';
            numberSpan.style.display = 'inline-block';
            numberSpan.innerText = numberText;
            numberSpan.title = 'Klik untuk salin nomor';
            numberSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(numberText).then(() => {
                    showToast(`📋 Nomor disalin: ${numberText}`);
                }).catch(() => alert('Gagal menyalin'));
            });
            // replace text part
            const textNode = [...whatsElem.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('WhatsApp:'));
            if (textNode) {
                const original = textNode.textContent;
                textNode.textContent = 'WhatsApp: ';
                whatsElem.insertBefore(numberSpan, textNode.nextSibling);
            } else {
                // fallback
                whatsElem.innerHTML = whatsElem.innerHTML.replace(numberText, `<span style="cursor:pointer;background:rgba(255,255,255,0.2);padding:4px 8px;border-radius:20px;display:inline-block;">${numberText}</span>`);
            }
        }
        
        if (emailElem) {
            let emailText = emailElem.innerText.replace('Gmail:', '').trim();
            const emailSpan = document.createElement('span');
            emailSpan.style.cursor = 'pointer';
            emailSpan.style.backgroundColor = 'rgba(255,255,255,0.2)';
            emailSpan.style.padding = '4px 8px';
            emailSpan.style.borderRadius = '20px';
            emailSpan.style.display = 'inline-block';
            emailSpan.innerText = emailText;
            emailSpan.title = 'Klik untuk salin email';
            emailSpan.addEventListener('click', (e) => {
                navigator.clipboard.writeText(emailText).then(() => {
                    showToast(`📧 Email disalin: ${emailText}`);
                });
            });
            const textNode = [...emailElem.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes('Gmail:'));
            if (textNode) {
                textNode.textContent = 'Gmail: ';
                emailElem.insertBefore(emailSpan, textNode.nextSibling);
            } else {
                emailElem.innerHTML = emailElem.innerHTML.replace(emailText, `<span style="cursor:pointer;background:rgba(255,255,255,0.2);padding:4px 8px;border-radius:20px;">${emailText}</span>`);
            }
        }
    }
    
    // helper toast notification
    function showToast(message) {
        let toast = document.querySelector('.custom-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '80px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#1e1e2f';
            toast.style.color = '#ffd966';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '40px';
            toast.style.fontSize = '0.9rem';
            toast.style.zIndex = '1000';
            toast.style.boxShadow = '0 4px 12px black';
            toast.style.backdropFilter = 'blur(4px)';
            toast.style.border = '1px solid #ffb347';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2000);
    }
    
    // 6. Additional: video interaction logging but not intrusive
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            console.log(`🎬 Playing: ${video.currentSrc || 'video'}`);
        });
    });
    
    // 7. Smooth scroll for anchor links if any
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 8. Add subtle hover effect for gallery images (already in css but ensure)
    // dynamic update year footer? optional:
    const footerYear = document.querySelector('footer p');
    if (footerYear && footerYear.innerText.includes('2025')) {
        const currentYear = new Date().getFullYear();
        if (currentYear !== 2025) {
            footerYear.innerText = `&copy; ${currentYear} Stacy Valerie. Personal Website.`;
        }
    }
    
    // 9. For blog page: handling potential missing video sources gracefully
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
    
    // 10. loading: ensure images have alt (accessibility)
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.hasAttribute('alt') || img.alt === '') {
            img.setAttribute('alt', 'Personal media gallery');
        }
    });

        // ===== LIGHTBOX / FULL PHOTO FUNCTIONALITY =====
    // Get the lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.lightbox-close');
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-card');
    
    // Add click event to each gallery card
    galleryImages.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the caption area that might bubble? but it's fine
            const img = this.querySelector('.gallery-img');
            const caption = this.querySelector('.gallery-caption');
            
            if (img) {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                
                if (caption) {
                    lightboxCaption.textContent = caption.textContent;
                } else {
                    lightboxCaption.textContent = '';
                }
                
                // Prevent body scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox when clicking on close button
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Close lightbox when clicking outside the image (on the background)
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            // Only close if clicking on the lightbox background, not on the image itself
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});