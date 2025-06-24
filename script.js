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

    // Animate mobile about images on scroll
    const aboutImgs = document.querySelectorAll('.mobile-images .about-img');
    if ('IntersectionObserver' in window && aboutImgs.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.3
        });
        aboutImgs.forEach(img => observer.observe(img));
    } else {
        // Fallback: show all if IntersectionObserver not supported
        aboutImgs.forEach(img => img.classList.add('in-view'));
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

    // Animate desktop about us image on scroll
    const aboutImgLarge = document.querySelector('.about-img-large');
    if ('IntersectionObserver' in window && aboutImgLarge) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutImgLarge.classList.add('animated-in');
                } else {
                    aboutImgLarge.classList.remove('animated-in');
                }
            });
        }, {
            threshold: 0.3
        });
        observer.observe(aboutImgLarge);
    } else if (aboutImgLarge) {
        aboutImgLarge.classList.add('animated-in');
    }
}); 