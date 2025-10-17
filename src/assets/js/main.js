// INBA/PNBA Mountain States - Main JavaScript
// Navigation and interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const lines = navToggle.querySelectorAll('.nav__toggle-line');
            if (navMenu.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Dropdown functionality
    const showsDropdown = document.getElementById('showsDropdown');
    if (showsDropdown) {
        showsDropdown.addEventListener('mouseenter', function() {
            const dropdown = this.querySelector('.nav__dropdown');
            if (dropdown) {
                dropdown.style.display = 'block';
            }
        });
        
        showsDropdown.addEventListener('mouseleave', function() {
            const dropdown = this.querySelector('.nav__dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
            const formId = this.id;
            
            if (formId === 'contactForm') {
                alert('Thank you for your message! We will get back to you soon.');
            } else if (formId === 'registrationForm') {
                alert('Registration submitted! We will contact you with further details.');
            }
            
            // Reset form
            this.reset();
        });
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.dataset.faq;
            const answer = document.getElementById(`faq-${faqId}`);
            const icon = this.querySelector('.faq-icon');
            
            if (answer && icon) {
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.textContent = '+';
                } else {
                    // Close all other FAQs
                    faqQuestions.forEach(q => {
                        const otherFaqId = q.dataset.faq;
                        const otherAnswer = document.getElementById(`faq-${otherFaqId}`);
                        const otherIcon = q.querySelector('.faq-icon');
                        if (otherAnswer && otherIcon) {
                            otherAnswer.style.display = 'none';
                            otherIcon.textContent = '+';
                        }
                    });
                    
                    answer.style.display = 'block';
                    icon.textContent = '-';
                }
            }
        });
    });

    // Champion filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const championCards = document.querySelectorAll('.champion-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            championCards.forEach(card => {
                if (filter === 'all' || card.dataset.division === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Results table sorting
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            const column = this.dataset.column;
            const table = this.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // Sort rows
            rows.sort((a, b) => {
                const aVal = a.querySelector(`[data-${column}]`).textContent;
                const bVal = b.querySelector(`[data-${column}]`).textContent;
                return aVal.localeCompare(bVal);
            });
            
            // Re-append sorted rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const lines = navToggle.querySelectorAll('.nav__toggle-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        }
    });
});
