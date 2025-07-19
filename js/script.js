// ===== FOREVER CLASS - JAVASCRIPT FUNCTIONALITY =====
// User-focused interactivity for real learners

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION FUNCTIONALITY =====
    initializeNavigation();
    
    // ===== THEME TOGGLE =====
    initializeThemeToggle();
    
    // ===== DAILY DOSE FUNCTIONALITY =====
    initializeDailyDose();
    
    // ===== SMOOTH SCROLLING =====
    initializeSmoothScrolling();
    
    // ===== POMODORO TIMER =====
    initializePomodoroTimer();
    
    // ===== MOBILE MENU =====
    initializeMobileMenu();
    
    // ===== DYNAMIC DATE UPDATE =====
    updateCurrentDate();
    
    // ===== CONTENT ANIMATIONS =====
    initializeAnimations();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    function updateNavbarOnScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbarOnScroll);
    updateNavbarOnScroll(); // Initial call
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an external link or page link
            if (href.startsWith('http') || href.endsWith('.html')) {
                return;
            }
            
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== THEME TOGGLE FUNCTIONALITY =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a nice transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// ===== DAILY DOSE FUNCTIONALITY =====
function initializeDailyDose() {
    const dailyDoses = [
        {
            date: "July 19, 2025",
            category: "💡 Quick Tip",
            title: "The 2-Minute Rule for Building Habits",
            content: "Want to build a new habit? Start with just 2 minutes. Instead of \"I'll read for 30 minutes,\" start with \"I'll read one page.\" This removes the mental barrier and makes it easy to begin.",
            examples: [
                "Exercise → Put on workout clothes",
                "Study → Open your textbook", 
                "Meditate → Sit quietly for 2 minutes"
            ],
            action: "Pick one habit and do the 2-minute version right now!"
        },
        {
            date: "July 18, 2025",
            category: "🧠 Mind Hack",
            title: "The Feynman Technique for Learning",
            content: "Named after physicist Richard Feynman, this technique helps you truly understand any concept by explaining it in simple terms.",
            examples: [
                "Choose a concept you want to learn",
                "Explain it in simple words (as if teaching a child)",
                "Identify gaps in your explanation",
                "Go back and study those gaps"
            ],
            action: "Try explaining something you learned today to an imaginary 10-year-old!"
        },
        {
            date: "July 20, 2025",
            category: "✨ Life Skill",
            title: "The Power of Active Listening",
            content: "Most people listen to reply, not to understand. Active listening means fully focusing on the speaker, understanding their message, and responding thoughtfully.",
            examples: [
                "Put away distractions (phone, laptop)",
                "Make eye contact and nod to show engagement",
                "Ask clarifying questions: 'What I hear you saying is...'",
                "Summarize what you heard before responding"
            ],
            action: "Practice active listening in your next conversation today!"
        }
    ];
    
    let currentDoseIndex = 0;
    
    function updateDailyDose(index) {
        const dose = dailyDoses[index];
        
        document.getElementById('daily-date').textContent = dose.date;
        document.querySelector('.daily-category').textContent = dose.category;
        document.querySelector('.daily-title').textContent = dose.title;
        
        const contentP = document.querySelector('.daily-content p');
        contentP.textContent = dose.content;
        
        const examplesList = document.querySelector('.daily-example ul');
        examplesList.innerHTML = '';
        dose.examples.forEach(example => {
            const li = document.createElement('li');
            li.textContent = example;
            examplesList.appendChild(li);
        });
        
        document.querySelector('.daily-action').innerHTML = `<strong>Your action today:</strong> ${dose.action}`;
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('prev-day');
    const nextBtn = document.getElementById('next-day');
    
    prevBtn.addEventListener('click', function() {
        currentDoseIndex = currentDoseIndex > 0 ? currentDoseIndex - 1 : dailyDoses.length - 1;
        updateDailyDose(currentDoseIndex);
        animateCardUpdate();
    });
    
    nextBtn.addEventListener('click', function() {
        currentDoseIndex = currentDoseIndex < dailyDoses.length - 1 ? currentDoseIndex + 1 : 0;
        updateDailyDose(currentDoseIndex);
        animateCardUpdate();
    });
    
    function animateCardUpdate() {
        const card = document.querySelector('.daily-card');
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, 150);
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector('#daily-dose');
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
}

// ===== POMODORO TIMER =====
function initializePomodoroTimer() {
    const startTimerBtn = document.querySelector('.start-timer');
    if (!startTimerBtn) return;
    
    let timerInterval;
    let isRunning = false;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    
    startTimerBtn.addEventListener('click', function() {
        if (!isRunning) {
            startTimer();
        } else {
            stopTimer();
        }
    });
    
    function startTimer() {
        isRunning = true;
        startTimerBtn.textContent = 'Stop Timer';
        startTimerBtn.style.background = '#f44336';
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                stopTimer();
                showTimerComplete();
                timeLeft = 25 * 60; // Reset timer
            }
        }, 1000);
    }
    
    function stopTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        startTimerBtn.textContent = 'Start Timer';
        startTimerBtn.style.background = '#4caf50';
        updateTimerDisplay();
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerElement = document.querySelector('.timer');
        
        if (isRunning && timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (timerElement) {
            timerElement.textContent = '25 min';
        }
    }
    
    function showTimerComplete() {
        // Visual feedback
        const timerElement = document.querySelector('.timer');
        if (timerElement) {
            timerElement.style.background = '#4caf50';
            timerElement.textContent = 'Complete! 🎉';
            
            setTimeout(() => {
                timerElement.style.background = '';
                timerElement.textContent = '25 min';
            }, 3000);
        }
        
        showNotification('Pomodoro Complete! Time for a 5-minute break! 🎉');
    }
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
}

// ===== DYNAMIC DATE UPDATE =====
function updateCurrentDate() {
    const dateElement = document.getElementById('last-updated');
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    if (dateElement) {
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// ===== CONTENT ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.learning-card, .lesson-item, .refresh-card, .daily-card, .resource-category'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .learning-card, .lesson-item, .refresh-card, .resource-category {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY FUNCTIONS =====

// Show a friendly notification to users
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== INTERACTIVE FEATURES =====

// Add click interactions to lesson items
document.addEventListener('click', function(e) {
    if (e.target.closest('.lesson-item')) {
        const lessonItem = e.target.closest('.lesson-item');
        const title = lessonItem.querySelector('h4').textContent;
        showNotification(`Great choice! "${title}" feature coming soon! 🚀`);
    }
    
    if (e.target.closest('.learning-card .card-link')) {
        e.preventDefault();
        const cardTitle = e.target.closest('.learning-card').querySelector('h3').textContent;
        showNotification(`"${cardTitle}" section is being prepared! Check back soon! 📚`);
    }
    
    if (e.target.closest('.lesson-btn')) {
        showNotification('Full email guide coming soon! For now, use the template above! ✉️');
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Press 'T' to toggle theme
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) themeToggle.click();
        }
    }
    
    // Press 'H' to go to home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ===== INITIALIZATION COMPLETE =====
console.log('🚀 Forever Class loaded successfully! Ready for learning!');
console.log('💡 Tip: Press "T" to toggle theme, "H" to go home');

// Welcome message for first-time visitors
if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
        showNotification('Welcome to Forever Class! 🎉 Learning that never stops!');
        localStorage.setItem('hasVisited', 'true');
    }, 1000);
}

// ===== CONTRIBUTORS MANAGEMENT =====
const contributorsData = [
    {
        name: "Manan Vyas",
        role: "Creator & Maintainer",
        avatar: "👨‍💻",
        contributions: "Initial project setup, content creation, and platform architecture",
        github: "MananVyas01"
    }
    // Future contributors will be added here
];

function renderContributors() {
    const contributorGrid = document.getElementById('contributor-grid');
    if (!contributorGrid) return;
    
    contributorGrid.innerHTML = contributorsData.map(contributor => `
        <div class="contributor-card">
            <div class="contributor-avatar">${contributor.avatar}</div>
            <h4>${contributor.name}</h4>
            <p class="contributor-role">${contributor.role}</p>
            <p class="contributor-contributions">${contributor.contributions}</p>
            ${contributor.github ? `<a href="https://github.com/${contributor.github}" target="_blank" class="github-link">🔗 @${contributor.github}</a>` : ''}
        </div>
    `).join('');
    
    // Update contributor count
    const contributorCount = document.querySelector('.contribution-stats .stat-number');
    if (contributorCount) {
        contributorCount.textContent = contributorsData.length;
    }
}

// ===== CHANGELOG MANAGEMENT =====
const changelogData = [
    {
        version: "v1.2",
        title: "About, Contributors, and Changelog Sections",
        date: "July 19, 2025",
        description: "Added comprehensive About section with creator info, Contributors showcase with contribution guidelines, and this Changelog to track project evolution.",
        features: [
            "✨ Creator introduction and background",
            "🤝 Contributors recognition system", 
            "📋 Project timeline and version history",
            "🎯 Clear contribution guidelines"
        ],
        status: "current"
    },
    {
        version: "v1.1", 
        title: "Daily Dose and Mind Refresh Sections",
        date: "July 19, 2025",
        description: "Enhanced the learning experience with interactive daily content and productivity tools.",
        features: [
            "📅 Dynamic daily learning content",
            "🧘 Mind refresh and focus techniques",
            "⏱️ Pomodoro timer functionality", 
            "💪 Daily motivation and quotes"
        ],
        status: "completed"
    },
    {
        version: "v1.0",
        title: "Initial Project Setup", 
        date: "July 19, 2025",
        description: "Forever Class is born! Initial HTML, CSS, and JavaScript boilerplate with core structure.",
        features: [
            "🏗️ Professional project structure",
            "🎨 Responsive design with dark/light mode",
            "⚙️ GitHub Actions workflow",
            "📱 Mobile-first approach"
        ],
        status: "completed"
    },
    {
        version: "v1.3",
        title: "Enhanced SEO and Meta Tags",
        date: "Coming Soon", 
        description: "Improved search engine optimization and social media sharing capabilities.",
        features: [
            "🔍 Advanced SEO optimization",
            "📱 Better social media previews",
            "🏷️ Structured data markup",
            "⚡ Performance improvements"
        ],
        status: "planned"
    },
    {
        version: "v1.4",
        title: "Community Wall",
        date: "In Development",
        description: "Interactive community features for learners to connect and share.",
        features: [
            "💬 Community discussion board",
            "⭐ Learning achievements", 
            "📚 User-contributed content",
            "🎯 Study groups and challenges"
        ],
        status: "planned"
    }
];

function renderChangelog() {
    const changelogTimeline = document.getElementById('changelog-timeline');
    if (!changelogTimeline) return;
    
    changelogTimeline.innerHTML = changelogData.map(item => `
        <div class="timeline-item ${item.status}">
            <div class="timeline-marker ${item.status}">${item.version}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p class="timeline-date">${item.date}</p>
                <p>${item.description}</p>
                <ul class="changelog-features">
                    ${item.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// ===== ADD NEW CONTRIBUTOR FUNCTION =====
function addContributor(name, role, avatar, contributions, github = null) {
    const newContributor = {
        name,
        role,
        avatar,
        contributions,
        github
    };
    
    contributorsData.push(newContributor);
    renderContributors();
    showNotification(`Welcome ${name} to the Forever Class family! 🎉`);
}

// ===== ADD NEW CHANGELOG ENTRY FUNCTION =====
function addChangelogEntry(version, title, date, description, features, status = 'completed') {
    const newEntry = {
        version,
        title, 
        date,
        description,
        features,
        status
    };
    
    // Insert at the beginning for newest first
    changelogData.unshift(newEntry);
    renderChangelog();
    showNotification(`New update ${version} added to changelog! 📋`);
}

// Initialize dynamic content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Render contributors and changelog
    setTimeout(() => {
        renderContributors();
        renderChangelog();
    }, 100);
});

// ===== UTILITY FUNCTIONS FOR FUTURE USE =====

// Function to easily update contributor stats
function updateContributorStats() {
    const totalContributors = contributorsData.length;
    const statElements = document.querySelectorAll('.contribution-stats .stat-number');
    
    statElements.forEach((element, index) => {
        if (index === 0) { // First stat is contributor count
            element.textContent = totalContributors;
        }
    });
}

// Function to get changelog by status
function getChangelogByStatus(status) {
    return changelogData.filter(item => item.status === status);
}

// Function to get latest version
function getLatestVersion() {
    const completed = getChangelogByStatus('completed');
    const current = getChangelogByStatus('current');
    return current.length > 0 ? current[0] : completed[0];
}

// Export functions for potential future use
window.ForeverClassUtils = {
    addContributor,
    addChangelogEntry,
    updateContributorStats,
    getChangelogByStatus,
    getLatestVersion,
    contributorsData,
    changelogData
};