// Elite Portfolio JavaScript
// Advanced interactions and animations

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const modalBody = document.getElementById('modalBody');

// Project data for modal content
const projectData = {
    1: {
        title: "E-commerce Churn Prediction",
        subtitle: "Machine Learning • E-commerce",
        problem: "A major e-commerce platform was experiencing high customer churn rates, with 25% of customers not returning after their first purchase. The business needed to identify at-risk customers early to implement targeted retention strategies.",
        methodology: [
            "Analyzed 2+ million customer transactions and behavioral data",
            "Applied feature engineering to extract 50+ predictive variables",
            "Implemented ensemble methods combining XGBoost and Random Forest",
            "Used SMOTE for handling class imbalance in the dataset",
            "Deployed model with real-time scoring via REST API"
        ],
        techStack: [
            { icon: "fab fa-python", name: "Python" },
            { icon: "fas fa-brain", name: "Scikit-learn" },
            { icon: "fas fa-chart-line", name: "Pandas" },
            { icon: "fas fa-database", name: "PostgreSQL" },
            { icon: "fab fa-aws", name: "AWS" }
        ],
        outcome: "Achieved 92% accuracy in predicting customer churn, leading to a projected 15% reduction in customer attrition. The model identified key behavioral patterns that informed targeted marketing campaigns, resulting in $2.3M in retained revenue.",
        codeLink: "https://github.com/yourusername/ecommerce-churn-prediction",
        demoLink: "https://churn-prediction-demo.herokuapp.com"
    },
    2: {
        title: "Sales Performance Dashboard",
        subtitle: "Business Intelligence • Real-time Analytics",
        problem: "The sales team lacked real-time visibility into performance metrics across multiple regions and product lines. Manual reporting was taking 2+ days and decisions were based on outdated information.",
        methodology: [
            "Designed ETL pipeline to process 100K+ daily transactions",
            "Built interactive dashboards with drill-down capabilities",
            "Implemented automated alert system for anomaly detection",
            "Created predictive models for sales forecasting",
            "Integrated with CRM and ERP systems for unified data view"
        ],
        techStack: [
            { icon: "fas fa-chart-bar", name: "Tableau" },
            { icon: "fab fa-python", name: "Python" },
            { icon: "fas fa-database", name: "SQL Server" },
            { icon: "fas fa-cloud", name: "Azure" },
            { icon: "fas fa-cogs", name: "Apache Airflow" }
        ],
        outcome: "Reduced reporting time from 2 days to real-time updates, enabling faster decision-making. Sales team efficiency increased by 35%, and the forecasting models improved accuracy by 28%, leading to better inventory management and revenue optimization.",
        codeLink: "https://github.com/yourusername/sales-dashboard",
        demoLink: "https://sales-dashboard-demo.herokuapp.com"
    },
    3: {
        title: "Financial Market Analysis",
        subtitle: "Time Series • Financial Analytics",
        problem: "Investment firm needed sophisticated models to predict market trends and optimize portfolio allocation. Traditional technical analysis was insufficient for the volatile market conditions.",
        methodology: [
            "Collected and cleaned 5+ years of multi-asset financial data",
            "Implemented LSTM neural networks for time series prediction",
            "Applied advanced feature engineering including technical indicators",
            "Used Monte Carlo simulations for risk assessment",
            "Built automated trading signals with backtesting framework"
        ],
        techStack: [
            { icon: "fab fa-python", name: "Python" },
            { icon: "fas fa-network-wired", name: "TensorFlow" },
            { icon: "fas fa-chart-line", name: "Pandas" },
            { icon: "fas fa-chart-pie", name: "Power BI" },
            { icon: "fas fa-database", name: "PostgreSQL" }
        ],
        outcome: "Developed models with 78% directional accuracy in predicting market movements. Portfolio optimization strategies resulted in 23% improvement in risk-adjusted returns, managing $50M+ in assets with reduced volatility.",
        codeLink: "https://github.com/yourusername/financial-market-analysis",
        demoLink: "https://market-analysis-demo.herokuapp.com"
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initMagneticButtons();
    initProjectModals();
    initMobileMenu();
    initScrollToTop();
    initIntersectionObserver();
});

// Custom Cursor Implementation
function initCustomCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor
    function animateCursor() {
        // Cursor position (immediate)
        cursorX = mouseX;
        cursorY = mouseY;
        
        // Follower position (delayed)
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .magnetic-btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}

// Navigation functionality
function initNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('section, .skill-item, .project-card, .strength-item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
    });
}

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    const elementsToObserve = document.querySelectorAll('.fade-in-up');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Magnetic button effects
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-btn');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Project modal functionality
function initProjectModals() {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Close modal events
    modalClose.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', closeProjectModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Generate modal content
    const modalContent = `
        <div class="modal-title">${project.title}</div>
        <div class="modal-subtitle">${project.subtitle}</div>
        
        <div class="modal-section">
            <h3>Problem Statement</h3>
            <p>${project.problem}</p>
        </div>
        
        <div class="modal-section">
            <h3>My Methodology</h3>
            <ul>
                ${project.methodology.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Tech Stack</h3>
            <div class="modal-tech-stack">
                ${project.techStack.map(tech => `
                    <div class="modal-tech-item">
                        <i class="${tech.icon}"></i>
                        <span>${tech.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Outcome & Impact</h3>
            <p>${project.outcome}</p>
        </div>
        
        <div class="modal-buttons">
            <a href="${project.codeLink}" target="_blank" class="btn btn-outline">
                <i class="fab fa-github"></i>
                View Source Code
            </a>
            <a href="${project.demoLink}" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
            </a>
        </div>
    `;

    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Mobile menu functionality
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Parallax effect for gradient orbs
function initParallaxEffect() {
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        gradientOrbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', () => {
    initParallaxEffect();
});

// Skill items animation stagger
function initSkillItemsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Project cards animation stagger
function initProjectCardsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', () => {
    initSkillItemsAnimation();
    initProjectCardsAnimation();
});

// Performance optimizations
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttle scroll events for better performance
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Loading animation
function showPageLoad() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100);
    });
}

// Page load handler
window.addEventListener('load', () => {
    showPageLoad();
    
    // Remove loading class from body if it exists
    document.body.classList.remove('loading');
});

// Smooth page transitions
function initSmoothPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth transitions
document.addEventListener('DOMContentLoaded', initSmoothPageTransitions);

// Advanced hover effects for project cards
function initAdvancedHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `
                translateY(-12px) 
                rotateX(${deltaY * 5}deg) 
                rotateY(${deltaX * 5}deg)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize advanced hover effects
document.addEventListener('DOMContentLoaded', initAdvancedHoverEffects);

// Accessibility improvements
function initAccessibilityFeatures() {
    // Skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: var(--primary-bg);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add proper focus management for modal
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableContent = modal.querySelectorAll(focusableElements);
            const firstFocusable = focusableContent[0];
            const lastFocusable = focusableContent[focusableContent.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibilityFeatures);

// Error handling and fallbacks
function initErrorHandling() {
    // Fallback for browsers without Intersection Observer
    if (!window.IntersectionObserver) {
        const fallbackElements = document.querySelectorAll('.fade-in-up');
        fallbackElements.forEach(element => {
            element.classList.add('visible');
        });
    }
    
    // Fallback for browsers without CSS Grid
    if (!CSS.supports('display', 'grid')) {
        const grids = document.querySelectorAll('.skills-grid, .projects-grid');
        grids.forEach(grid => {
            grid.style.display = 'flex';
            grid.style.flexWrap = 'wrap';
        });
    }
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', initErrorHandling);

// Console signature
console.log(`
%c Elite Portfolio Website
%c Crafted with precision and attention to detail
%c Built with vanilla JavaScript, CSS Grid, and modern web standards
`, 
'color: #00A3FF; font-size: 24px; font-weight: bold;',
'color: #E0E0E0; font-size: 14px;',
'color: #B0B0B0; font-size: 12px;'
);