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

    function adjustPushDown() {
        const header = document.querySelector('.header');
        const pushDown = document.querySelector('.push-down');
        if (header && pushDown) {
            pushDown.style.marginTop = header.offsetHeight + 'px';
        }
    }
    adjustPushDown();
    window.addEventListener('resize', adjustPushDown);
}); 