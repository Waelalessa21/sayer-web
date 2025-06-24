document.addEventListener('DOMContentLoaded', function() {
    const aboutImgs = document.querySelectorAll('.mobile-images .about-img');
    const aboutImgLarge = document.querySelector('.about-img-large');
    
    if ('IntersectionObserver' in window) {
        if (aboutImgs.length > 0) {
            const mobileObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(aboutImgs).indexOf(entry.target);
                        const delay = 0.2 * index;
                        
                        entry.target.style.animationDelay = delay + 's';
                        
                        entry.target.classList.add('in-view');
                        
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
                        
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            aboutImgs.forEach(img => {
                mobileObserver.observe(img);
                
                if (img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0) {
                    const index = Array.from(aboutImgs).indexOf(img);
                    const delay = 0.2 * index;
                    img.style.animationDelay = delay + 's';
                    img.classList.add('in-view');
                    mobileObserver.unobserve(img);
                }
            });
        }
        
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
                rootMargin: '0px 0px -100px 0px'
            });
            
            desktopObserver.observe(aboutImgLarge);
            
            if (aboutImgLarge.getBoundingClientRect().top < window.innerHeight && aboutImgLarge.getBoundingClientRect().bottom > 0) {
                aboutImgLarge.classList.add('animated-in');
            }
        }
    } else {
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
}); 