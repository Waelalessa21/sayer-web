// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('[data-faq-item]');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state
        answer.style.maxHeight = '0px';
        
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherItem.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.maxHeight = '0px';
                }
            });
            
            // Toggle current item
            if (isExpanded) {
                // Close
                item.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0px';
            } else {
                // Open
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                
                // Calculate the height of the answer content
                const answerContent = answer.querySelector('p');
                const answerHeight = answerContent.offsetHeight;
                answer.style.maxHeight = answerHeight + 'px';
            }
        });
        
        // Keyboard navigation support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Intersection Observer for animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe FAQ items for animation
    faqItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Resize observer for responsive behavior
    const resizeObserver = new ResizeObserver(() => {
        // Recalculate max-height for open items when window resizes
        faqItems.forEach(item => {
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                const answerContent = answer.querySelector('p');
                const answerHeight = answerContent.offsetHeight;
                answer.style.maxHeight = answerHeight + 'px';
            }
        });
    });
    
    // Observe the FAQ container for resize events
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        resizeObserver.observe(faqContainer);
    }
});

// Optional: Add smooth scroll to FAQ section when clicking navigation links
document.addEventListener('DOMContentLoaded', function() {
    const faqLinks = document.querySelectorAll('a[href="#faq"]');
    
    faqLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                faqSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 