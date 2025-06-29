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
        
        if (mobileMenuRow.classList.contains('active')) {
            mobileMenuRow.classList.remove('active');
            mobileHeader.classList.remove('hide');
        }
    });

    if (burger && mobileMenuRow && mobileHeader) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (mobileMenuRow.classList.contains('active')) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = '';
                });
            } else {
                mobileMenuRow.classList.add('active');
                mobileHeader.classList.add('hide');
            }
        });

        document.addEventListener('click', function(e) {
            if (mobileMenuRow.classList.contains('active') && 
                !mobileMenuRow.contains(e.target) && 
                !burger.contains(e.target)) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = '';
                });
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuRow.classList.remove('active');
                mobileHeader.classList.remove('hide');
                
                const mobileItems = mobileMenuRow.querySelectorAll('.mobile-nav-link, .mobile-download-btn');
                mobileItems.forEach(item => {
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = '';
                });
            }
        });
    }

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

    const aboutImgLarge = document.querySelector('.about-img-large');
    
    if ('IntersectionObserver' in window) {
        if (aboutImgLarge) {
            const desktopObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
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
                threshold: 0.2, 
                rootMargin: '0px 0px -100px 0px' });
            
            desktopObserver.observe(aboutImgLarge);
            
            if (aboutImgLarge.getBoundingClientRect().top < window.innerHeight && aboutImgLarge.getBoundingClientRect().bottom > 0) {
                aboutImgLarge.classList.add('animated-in');
            }
        }
    } else {
        if (aboutImgLarge) {
            aboutImgLarge.classList.add('animated-in');
        }
    }

    function adjustPushDown() {
        const header = document.querySelector('.header');
        const pushDown = document.querySelector('.push-down');
        if (header && pushDown) {
            pushDown.style.marginTop = header.offsetHeight + 'px';
        }
    }
    adjustPushDown();
    window.addEventListener('resize', adjustPushDown);

    const loader = document.getElementById('sayer-loader');
    const heroImg = document.querySelector('.hero-mockup-img');
    const heroSection = document.querySelector('.hero-section');
    const progressCircle = document.querySelector('.progress-ring-circle');
    
    if (!loader) return;

    function animateHeroSection() {
        if (heroSection) heroSection.classList.add('hero-animate');
    }

    function updateProgress(progress) {
        if (progressCircle) {
            const radius = 54; 
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    function hideLoader() {
        loader.classList.add('loaded');
        setTimeout(() => {
            loader.remove();
            animateHeroSection();
        }, 500);
    }

    updateProgress(0);

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        updateProgress(Math.min(progress, 90)); 
        if (progress >= 90) {
            clearInterval(progressInterval);
        }
    }, 30); 

    if (document.readyState === 'complete') {
        clearInterval(progressInterval);
        updateProgress(100);
        setTimeout(hideLoader, 200);
    } else {
        window.addEventListener('load', () => {
            clearInterval(progressInterval);
            updateProgress(100);
            setTimeout(hideLoader, 200);
        });
        
        if (heroImg) {
            if (heroImg.complete) {
                clearInterval(progressInterval);
                updateProgress(100);
                setTimeout(hideLoader, 200);
            } else {
                heroImg.addEventListener('load', () => {
                    clearInterval(progressInterval);
                    updateProgress(100);
                    setTimeout(hideLoader, 200);
                });
                heroImg.addEventListener('error', () => {
                    clearInterval(progressInterval);
                    updateProgress(100);
                    setTimeout(hideLoader, 200);
                });
            }
        }
        
        setTimeout(() => {
            clearInterval(progressInterval);
            updateProgress(100);
            hideLoader();
        }, 4000);
    }

    const aboutImgs = document.querySelectorAll('.mobile-images .about-img');
    if ('IntersectionObserver' in window && aboutImgs.length > 0) {
        const mobileObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(aboutImgs).indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 0.15) + 's';
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        aboutImgs.forEach(img => {
            mobileObserver.observe(img);
        });
    } else if (aboutImgs.length > 0) {
        aboutImgs.forEach(img => img.classList.add('in-view'));
    }
}); 

