document.addEventListener('DOMContentLoaded', function() {
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