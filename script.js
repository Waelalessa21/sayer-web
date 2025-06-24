
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const headerContent = document.querySelector('.header-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const downloadBtn = document.querySelector('.download-btn');
    const burger = document.getElementById('burger-menu');
    const mobileHeader = document.querySelector('.mobile-header');
    const mobileMenuRow = document.getElementById('mobile-menu-row');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileDownloadBtn = document.querySelector('.mobile-download-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Desktop navigation links
    navLinks.forEach(link => {
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

    // Mobile navigation links
    mobileNavLinks.forEach(link => {
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
            
            // Close mobile menu after navigation
            if (mobileMenuRow.classList.contains('active')) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
            }
        });
    });

    downloadBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    mobileDownloadBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Close mobile menu after download button click
        if (mobileMenuRow.classList.contains('active')) {
            mobileMenuRow.classList.remove('active');
            mobileHeader.classList.remove('hide');
        }
    });

    // Mobile burger menu functionality
    if (burger && mobileMenuRow && mobileHeader) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (mobileMenuRow.classList.contains('active')) {
                // Close menu
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                // Reset animations for next time
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = '';
                });
            } else {
                // Open menu
                mobileMenuRow.classList.add('active');
                mobileHeader.classList.add('hide');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenuRow.classList.contains('active') && 
                !mobileMenuRow.contains(e.target) && 
                !burger.contains(e.target)) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                // Reset animations for next time
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = '';
                });
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                // Reset animations for next time
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = '';
                });
            }
        });
    }

    // Close mobile menu when clicking outside (for desktop header compatibility)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && headerContent.classList.contains('menu-open')) {
            if (!headerContent.contains(e.target)) {
                headerContent.classList.remove('menu-open');
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            headerContent.classList.remove('menu-open');
        }
    });

    // Advanced scroll animation for about-sayer images with sophisticated effects
    const aboutImgs = document.querySelectorAll('.mobile-images .about-img');
    const aboutImgLarge = document.querySelector('.about-img-large');
    
    if ('IntersectionObserver' in window) {
        // Mobile images animation with enhanced effects
        if (aboutImgs.length > 0) {
            const mobileObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(aboutImgs).indexOf(entry.target);
                        const delay = 0.2 * index; // Increased delay for more dramatic effect
                        
                        // Add a subtle bounce effect by slightly adjusting the timing
                        entry.target.style.animationDelay = delay + 's';
                        
                        // Add a class for additional effects
                        entry.target.classList.add('in-view');
                        
                        // Add a subtle scale effect on scroll
                        const handleScroll = () => {
                            const rect = entry.target.getBoundingClientRect();
                            const scrolled = window.pageYOffset;
                            const rate = scrolled * -0.5;
                            const opacity = Math.max(0.3, 1 - (rect.top - window.innerHeight) / window.innerHeight);
                            
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                entry.target.style.transform = `translateY(${rate * 0.1}px) scale(${1 + opacity * 0.05})`;
                            }
                        };
                        
                        window.addEventListener('scroll', handleScroll, { passive: true });
                        
                        obs.unobserve(entry.target); // Only animate once
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Start animation slightly before element comes into view
            });
            
            aboutImgs.forEach(img => {
                mobileObserver.observe(img);
                
                // Check if image is already in view on page load
                if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0) {
                    const index = Array.from(aboutImgs).indexOf(img);
                    const delay = 0.2 * index;
                    img.style.animationDelay = delay + 's';
                    img.classList.add('in-view');
                    mobileObserver.unobserve(img);
                }
            });
        }
        
        // Desktop image animation with enhanced effects
        if (aboutImgLarge) {
            const desktopObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add a subtle parallax effect
                        const handleScroll = () => {
                            const rect = entry.target.getBoundingClientRect();
                            const scrolled = window.pageYOffset;
                            const rate = scrolled * -0.3;
                            
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                entry.target.style.transform = `translateY(${rate * 0.1}px) scale(1) rotateY(0deg)`;
                            }
                        };
                        
                        window.addEventListener('scroll', handleScroll, { passive: true });
                        
                        aboutImgLarge.classList.add('animated-in');
                    } else {
                        aboutImgLarge.classList.remove('animated-in');
                    }
                });
            }, {
                threshold: 0.2, // Trigger when 20% of the element is visible
                rootMargin: '0px 0px -100px 0px' // Start animation earlier
            });
            
            desktopObserver.observe(aboutImgLarge);
            
            // Check if desktop image is already in view on page load
            if (aboutImgLarge.getBoundingClientRect().top < window.innerHeight && aboutImgLarge.getBoundingClientRect().bottom > 0) {
                aboutImgLarge.classList.add('animated-in');
            }
        }
    } else {
        // Fallback for browsers without IntersectionObserver
        if (aboutImgs.length > 0) {
            aboutImgs.forEach((img, i) => {
                img.style.animationDelay = (0.2 * i) + 's';
                img.classList.add('in-view');
            });
        }
        
        if (aboutImgLarge) {
            aboutImgLarge.classList.add('animated-in');
        }
    }

    // Dynamically set margin-top on .push-down to header height
    function adjustPushDown() {
        const header = document.querySelector('.header');
        const pushDown = document.querySelector('.push-down');
        if (header && pushDown) {
            pushDown.style.marginTop = header.offsetHeight + 'px';
        }
    }
    adjustPushDown();
    window.addEventListener('resize', adjustPushDown);

    // Loader overlay logic for hero image only
    const loader = document.getElementById('sayer-loader');
    const heroImg = document.querySelector('.hero-mockup-img');
    const heroSection = document.querySelector('.hero-section');
    if (!loader || !heroImg) return;

    function animateHeroSection() {
        if (heroSection) heroSection.classList.add('hero-animate');
    }

    function hideLoader() {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.remove();
            animateHeroSection();
        }, 500);
    }

    if (heroImg.complete) {
        hideLoader();
    } else {
        heroImg.addEventListener('load', hideLoader);
        heroImg.addEventListener('error', hideLoader);
    }
}); 

