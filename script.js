document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DUAL-THEME LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    htmlEl.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- 2. INTERACTIVE GRID BACKGROUND ---
    const grid = document.querySelector('.background-grid');
    if (grid) {
        window.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                grid.style.setProperty('--mouse-x', `${x}%`);
                grid.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }

    // --- 3. RELIABLE SCROLL ANIMATIONS ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                 entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(element => observer.observe(element));

    // --- 4. FLAWLESS NAVBAR LOGIC ---
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    window.addEventListener("scroll", () => {
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            navbar.classList.add("nav-hidden");
        } else {
            navbar.classList.remove("nav-hidden");
        }
        navbar.classList.toggle("nav-scrolled", window.scrollY > 50);
        lastScrollY = window.scrollY;
    });

    // --- 5. HAMBURGER MENU LOGIC ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        // Prevents scrolling when mobile menu is open
        document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    }));
    
    // --- 6. PERFECTED PROJECT MODAL ---
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    const projectData = {
        1: {
            category: "Machine Learning",
            title: "Customer Churn Analysis",
            imageSrc: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
            overview: "The Customer Churn Analysis Dashboard is an AI-powered web application that helps businesses predict and analyze customer churn. It enables users to upload their own customer data, perform preprocessing, train predictive models, and explore churn risk insights all within an interactive Streamlit dashboard.",
            features: ["Instantly analyze churn by uploading any CSV dataset.", "Cleans data by handling missing values, encoding, and scaling.","Visualizes churn distributions, correlations, and key data patterns.", "Compares Logistic Regression, Random Forest, and XGBoost performance.","Identifies key churn drivers using SHAP for business clarity.","Exports predictions and model insights into Excel/PDF reports."],
            tech: ["Python", "Pandas", "Matplotlib", "Scikit-Learn","Plotly","Streamlit"],
            githubLink: "https://github.com/VIGNESH54/Customer_Churn_Analysis",
            liveLink: "https://customer-churn-analysis-dashboard.streamlit.app/"
        },
        2: {
            category: "Business Intelligence",
            title: "Superstore Sales Analysis",
            imageSrc: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
            overview: "The Superstore Sales Analysis Dashboard is a data-driven business intelligence tool designed to reveal insights into retail performance. It uses Streamlit, Plotly, and Prophet to offer interactive visualizations, forecasts, and KPIs, simulating what a business analyst or BI engineer would provide to decision makers in a real world enterprise.",
            features: ["Dynamic data filtering by region, category, and time using Streamlit & Plotly.", "Drill-down insights into sales vs. profit by product, segment, and region.", "Predicts future sales trends using Facebook's Prophet model.", "Visualizes top-performing customers, cities, and states.","Downloadable charts and KPIs in CSV/Excel formats for reporting.","Built to integrate new datasets and future ML models."],
            tech: ["Python", "Pandas", "Matplotlib","seaborn","Streamlit"],
            githubLink: "https://github.com/VIGNESH54/Superstore_Sales_Analysis",
            liveLink: "https://superstore-salesanalysis.streamlit.app/"
        },
        3: {
            category: "Classification Model",
            title: "Fraud Detection System",
            imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
            overview: "This project addresses the critical problem of identifying and preventing fraudulent financial activities. It uses machine learning models to detect fraudulent transactions by analyzing transaction data and the key factors that contribute to fraud.",
            features: ["Helps to understand the distribution of fraudulent activities.", "Identifies the key factors that influence the detection of fraud.", "A model trained to classify transactions as either fraudulent or non-fraudulent.", "Uses Matplotlib & Seaborn to generate insightful charts."],
            tech: ["Python", "pandas", "scikit-learn", "matplotlib & seaborn"],
            githubLink: "https://github.com/VIGNESH54/Fraud_Detection_Project"
        }
        
    };

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const liveSiteButton = (project.liveLink && project.liveLink !== "#")
            ? `<a href="${project.liveLink}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Live Site</a>`
            : "";
        
        modalBody.innerHTML = `
            <img src="${project.imageSrc}" alt="${project.title}" class="project-image">
            <div class="modal-header">
                <span class="project-category">${project.category}</span>
                <h3>${project.title}</h3>
            </div>
            <div class="modal-buttons">
                ${liveSiteButton}
                <a href="${project.githubLink}" target="_blank" class="btn btn-secondary"><i class="fa-brands fa-github"></i> View on GitHub</a>
            </div>
            <h4>Project Overview</h4>
            <p>${project.overview}</p>
            <h4>Key Features</h4>
            <ul>${project.features.map(item => `<li>${item}</li>`).join('')}</ul>
            <h4>Tech Stack</h4>
            <div class="tech-stack-tags skill-tags">
                ${project.tech.map(item => `<span>${item}</span>`).join('')}
            </div>
        `;

        document.body.style.overflow = 'hidden';
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.project);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    console.log("Portfolio Dual-Theme Edition loaded. All systems stable and fantastic.");
});
