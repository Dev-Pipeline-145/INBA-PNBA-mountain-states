/**
 * INBA/PNBA Mountain States - Main JavaScript
 * Clean, modular, and maintainable code structure
 */

// ==========================================================================
// CONFIGURATION & CONSTANTS
// ==========================================================================

const CONFIG = {
  selectors: {
    navToggle: '#navToggle',
    navMenu: '#navMenu',
    showsDropdown: '#showsDropdown',
    contactForm: '#contactForm',
    registrationForm: '#registrationForm',
    faqQuestions: '.faq-question',
    filterButtons: '.filter-btn',
    championCards: '.champion-card',
    sortButtons: '.sort-btn'
  },
  classes: {
    active: 'active',
    navMenuActive: 'nav__menu--active'
  },
  animations: {
    duration: 300
  }
};

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

/**
 * Get DOM element by selector
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {Element|null}
 */
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Get all DOM elements by selector
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {NodeList}
 */
function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Add event listener with error handling
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
function addEvent(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
  }
}

/**
 * Toggle class on element
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * Remove class from element
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Add class to element
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

// ==========================================================================
// NAVIGATION MODULE
// ==========================================================================

const Navigation = {
  init() {
    this.setupMobileToggle();
    this.setupDropdowns();
    this.setupSmoothScrolling();
    this.setupOutsideClick();
  },

  setupMobileToggle() {
    const navToggle = $(CONFIG.selectors.navToggle);
    const navMenu = $(CONFIG.selectors.navMenu);

    if (navToggle && navMenu) {
      addEvent(navToggle, 'click', () => {
        this.toggleMobileMenu(navMenu, navToggle);
      });
    }
  },

  toggleMobileMenu(navMenu, navToggle) {
    toggleClass(navMenu, CONFIG.classes.navMenuActive);
    this.animateHamburger(navToggle, navMenu.classList.contains(CONFIG.classes.navMenuActive));
  },

  animateHamburger(navToggle, isActive) {
    const lines = navToggle.querySelectorAll('.nav__toggle-line');
    
    if (isActive) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
  },

  setupDropdowns() {
    const showsDropdown = $(CONFIG.selectors.showsDropdown);
    
    if (showsDropdown) {
      addEvent(showsDropdown, 'mouseenter', () => {
        this.showDropdown(showsDropdown);
      });
      
      addEvent(showsDropdown, 'mouseleave', () => {
        this.hideDropdown(showsDropdown);
      });
    }
  },

  showDropdown(dropdown) {
    const dropdownMenu = dropdown.querySelector('.nav__dropdown');
    if (dropdownMenu) {
      dropdownMenu.style.display = 'block';
    }
  },

  hideDropdown(dropdown) {
    const dropdownMenu = dropdown.querySelector('.nav__dropdown');
    if (dropdownMenu) {
      dropdownMenu.style.display = 'none';
    }
  },

  setupSmoothScrolling() {
    const anchorLinks = $$('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
      addEvent(anchor, 'click', (e) => {
        e.preventDefault();
        this.scrollToTarget(anchor.getAttribute('href'));
      });
    });
  },

  scrollToTarget(targetId) {
    const target = $(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  setupOutsideClick() {
    addEvent(document, 'click', (e) => {
      const navMenu = $(CONFIG.selectors.navMenu);
      const navToggle = $(CONFIG.selectors.navToggle);
      
      if (navMenu && navMenu.classList.contains(CONFIG.classes.navMenuActive)) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          this.closeMobileMenu(navMenu, navToggle);
        }
      }
    });
  },

  closeMobileMenu(navMenu, navToggle) {
    removeClass(navMenu, CONFIG.classes.navMenuActive);
    this.animateHamburger(navToggle, false);
  }
};

// ==========================================================================
// FORM MODULE
// ==========================================================================

const Forms = {
  init() {
    this.setupFormHandlers();
  },

  setupFormHandlers() {
    const forms = $$('form');
    
    forms.forEach(form => {
      addEvent(form, 'submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  },

  handleFormSubmit(form) {
    const formId = form.id;
    let message = 'Thank you for your submission!';
    
    switch (formId) {
      case 'contactForm':
        message = 'Thank you for your message! We will get back to you soon.';
        break;
      case 'registrationForm':
        message = 'Registration submitted! We will contact you with further details.';
        break;
      default:
        message = 'Form submitted successfully!';
    }
    
    this.showNotification(message);
    form.reset();
  },

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-cyan);
      color: var(--bg-dark);
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
};

// ==========================================================================
// FAQ MODULE
// ==========================================================================

const FAQ = {
  init() {
    this.setupFAQHandlers();
  },

  setupFAQHandlers() {
    const faqQuestions = $$(CONFIG.selectors.faqQuestions);
    
    faqQuestions.forEach(question => {
      addEvent(question, 'click', () => {
        this.toggleFAQ(question);
      });
    });
  },

  toggleFAQ(question) {
    const faqId = question.dataset.faq;
    const answer = $(`#faq-${faqId}`);
    const icon = question.querySelector('.faq-icon');
    
    if (answer && icon) {
      const isOpen = answer.style.display === 'block';
      
      if (isOpen) {
        this.closeFAQ(answer, icon);
      } else {
        this.closeAllFAQs();
        this.openFAQ(answer, icon);
      }
    }
  },

  closeAllFAQs() {
    const faqQuestions = $$(CONFIG.selectors.faqQuestions);
    
    faqQuestions.forEach(q => {
      const faqId = q.dataset.faq;
      const answer = $(`#faq-${faqId}`);
      const icon = q.querySelector('.faq-icon');
      
      if (answer && icon) {
        this.closeFAQ(answer, icon);
      }
    });
  },

  openFAQ(answer, icon) {
    answer.style.display = 'block';
    icon.textContent = '-';
  },

  closeFAQ(answer, icon) {
    answer.style.display = 'none';
    icon.textContent = '+';
  }
};

// ==========================================================================
// FILTER MODULE
// ==========================================================================

const Filter = {
  init() {
    this.setupFilterHandlers();
  },

  setupFilterHandlers() {
    const filterButtons = $$(CONFIG.selectors.filterButtons);
    
    filterButtons.forEach(button => {
      addEvent(button, 'click', () => {
        this.handleFilter(button);
      });
    });
  },

  handleFilter(activeButton) {
    const filter = activeButton.dataset.filter;
    const filterButtons = $$(CONFIG.selectors.filterButtons);
    const championCards = $$(CONFIG.selectors.championCards);
    
    // Update active button
    filterButtons.forEach(btn => removeClass(btn, CONFIG.classes.active));
    addClass(activeButton, CONFIG.classes.active);
    
    // Filter cards
    championCards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.division === filter;
      card.style.display = shouldShow ? 'block' : 'none';
    });
  }
};

// ==========================================================================
// SORT MODULE
// ==========================================================================

const Sort = {
  init() {
    this.setupSortHandlers();
  },

  setupSortHandlers() {
    const sortButtons = $$(CONFIG.selectors.sortButtons);
    
    sortButtons.forEach(button => {
      addEvent(button, 'click', () => {
        this.handleSort(button);
      });
    });
  },

  handleSort(button) {
    const column = button.dataset.column;
    const table = button.closest('table');
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
  }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  Navigation.init();
  Forms.init();
  FAQ.init();
  Filter.init();
  Sort.init();
  
  console.log('INBA/PNBA Mountain States - JavaScript initialized successfully');
});
