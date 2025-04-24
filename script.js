// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        
        // Enable scrolling on body after loading screen is hidden
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500); // Match this with the transition time in CSS
    }, 2000);
    
    // Copy email functionality
    const copyEmailBtn = document.getElementById('copy-email');
    const emailDisplay = document.getElementById('email-display');
    const tooltip = document.querySelector('.tooltip');
    
    if (copyEmailBtn && emailDisplay) {
        copyEmailBtn.addEventListener('click', function() {
            // Select the text
            emailDisplay.select();
            emailDisplay.setSelectionRange(0, 99999); // For mobile devices
            
            // Copy the text to the clipboard
            document.execCommand('copy');
            
            // Deselect the text
            window.getSelection().removeAllRanges();
            
            // Show success message
            tooltip.textContent = 'Copied!';
            tooltip.classList.add('copied');
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Hide after 2 seconds
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                
                // Reset after animation completes
                setTimeout(() => {
                    tooltip.textContent = 'Copy';
                    tooltip.classList.remove('copied');
                }, 300);
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').split('#')[1];
                const targetSection = document.querySelector('#' + targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.padding = '15px 40px';
            nav.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.padding = '20px 40px';
            nav.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    });
    
    // Scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .blog-card, .about-card, .hero-left');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const cards = document.querySelectorAll('.project-card, .blog-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial state for hero elements
    const heroLeft = document.querySelector('.hero-left');
    const aboutCard = document.querySelector('.about-card');
    
    if (heroLeft) {
        heroLeft.style.opacity = '0';
        heroLeft.style.transform = 'translateX(-50px)';
        heroLeft.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (aboutCard) {
        aboutCard.style.opacity = '0';
        aboutCard.style.transform = 'translateX(50px)';
        aboutCard.style.transition = 'opacity 1s ease, transform 1s ease';
        // Add delay to about card animation
        setTimeout(() => {
            aboutCard.style.opacity = '1';
            aboutCard.style.transform = 'translateX(0)';
        }, 700);
    }
    
    // Show hero left content after a short delay
    setTimeout(() => {
        if (heroLeft) {
            heroLeft.style.opacity = '1';
            heroLeft.style.transform = 'translateX(0)';
        }
    }, 400);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on initial load
    animateOnScroll();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For this example, we'll just log it to the console
            console.log('Form submitted:', { name, email, message });
            
            // Show success message to user
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Handle active class for navigation
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.querySelector('a').getAttribute('href') === `#${sectionId}`) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }

    // Initial call to set the active nav item
    setActiveNavItem();

    // Add scroll event to update active nav item
    window.addEventListener('scroll', setActiveNavItem);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 