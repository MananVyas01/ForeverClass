/**
 * Web Development Basics - Dedicated JavaScript
 * Forever Class Platform
 * Professional modular implementation
 */

class WebDevBasicsApp {
    constructor() {
        this.currentProgress = 0;
        this.totalSections = 0;
        this.isMobile = window.innerWidth <= 768;
        this.sidebarOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupProgressTracking();
        this.handleResponsiveLayout();
        this.initializeScrollTracking();
        this.setupMobileMenu();
    }
    
    bindEvents() {
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.throttle(this.updateProgress.bind(this), 100)());
        
        // Navigation events
        this.setupSidebarNavigation();
        this.setupSmoothScrolling();
        
        // Interactive demos
        this.setupInteractiveDemos();
        
        // Mobile gestures
        this.setupTouchGestures();
    }
    
    setupProgressTracking() {
        this.totalSections = document.querySelectorAll('.content-section').length;
        
        // Initialize progress on page load
        setTimeout(() => {
            this.updateProgress();
        }, 100);
    }
    
    updateProgress() {
        const sections = document.querySelectorAll('.content-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (!sections.length) return;
        
        let sectionsViewed = 0;
        let currentSection = '';
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollTop + rect.top;
            const sectionHeight = rect.height;
            
            // Consider a section "viewed" if user has scrolled past 30% of it
            const viewThreshold = sectionTop + (sectionHeight * 0.3);
            
            if (scrollTop + viewportHeight > viewThreshold) {
                sectionsViewed++;
            }
            
            // Set current section based on which one is most visible
            if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5) {
                currentSection = section.id;
            }
        });
        
        // Calculate progress as percentage of sections viewed
        const progress = Math.min((sectionsViewed / sections.length) * 100, 100);
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(progress) + '% Complete';
        }
        
        // Update active sidebar link
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.dataset.section === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    setupSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.scrollToElement(targetSection);
                }
            });
        });
    }
    
    setupSmoothScrolling() {
        // Handle CTA button clicks
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const onClick = button.getAttribute('onclick');
                if (onClick && onClick.includes('scrollToSection')) {
                    e.preventDefault();
                    const sectionId = onClick.match(/'([^']+)'/)[1];
                    const section = document.getElementById(sectionId);
                    if (section) {
                        this.scrollToElement(section);
                    }
                }
            });
        });
    }
    
    scrollToElement(element) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    setupInteractiveDemos() {
        this.setupCodeTabs();
        this.setupLayoutDemos();
        this.setupJSPlayground();
        this.setupAPIDemo();
    }
    
    setupCodeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabContainer = button.closest('.code-example, .js-playground');
                if (!tabContainer) return;
                
                const targetTab = button.dataset.tab;
                
                // Remove active class from all tabs and content in this container
                tabContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                tabContainer.querySelectorAll('.tab-content, .tab-panel').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Find and activate the target content - try both ID and data-tab selectors
                let targetContent = tabContainer.querySelector(`#${targetTab}`);
                if (!targetContent) {
                    targetContent = tabContainer.querySelector(`[data-tab="${targetTab}"]`);
                }
                
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    setupLayoutDemos() {
        const demoTabs = document.querySelectorAll('.demo-tab');
        
        demoTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const demoContainer = tab.closest('.layout-demo');
                if (!demoContainer) return;
                
                const targetDemo = tab.dataset.demo;
                
                // Remove active class from all demo tabs in this container
                demoContainer.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
                demoContainer.querySelectorAll('.demo-container').forEach(container => container.classList.add('hidden'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show the target demo container
                const targetContainer = document.getElementById(`${targetDemo}-demo`);
                if (targetContainer) {
                    targetContainer.classList.remove('hidden');
                }
            });
        });
    }
    
    setupJSPlayground() {
        // Set up the demo button for DOM manipulation
        const demoButton = document.getElementById('demo-btn');
        const demoOutput = document.getElementById('demo-output');
        
        if (demoButton && demoOutput) {
            demoButton.addEventListener('click', () => {
                demoOutput.textContent = 'Button clicked! ' + new Date().toLocaleTimeString();
                demoOutput.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
            });
        }
    }
    
    setupAPIDemo() {
        // Set up weather API demo
        const cityInput = document.getElementById('cityInput');
        const getWeatherBtn = document.querySelector('.api-btn');
        
        if (getWeatherBtn) {
            getWeatherBtn.addEventListener('click', () => {
                this.getWeather();
            });
        }
        
        if (cityInput) {
            cityInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.getWeather();
                }
            });
        }
    }
    
    getWeather() {
        const cityInput = document.getElementById('cityInput');
        const weatherResult = document.getElementById('weatherResult');
        const city = cityInput ? cityInput.value.trim() : '';
        
        if (!weatherResult) return;
        
        if (!city) {
            weatherResult.innerHTML = '<div class="error">Please enter a city name</div>';
            return;
        }
        
        weatherResult.innerHTML = '<div class="loading">Loading weather data...</div>';
        
        // Simulate API call
        setTimeout(() => {
            weatherResult.innerHTML = `
                <div class="weather-card">
                    <h4>Weather in ${city}</h4>
                    <div class="weather-temp">22°C</div>
                    <div class="weather-desc">Partly cloudy</div>
                    <div class="weather-note">🌤️ This is a demo. In a real app, this would show actual weather data from an API.</div>
                </div>
            `;
        }, 1500);
    }
    
    handleResponsiveLayout() {
        this.isMobile = window.innerWidth <= 768;
        const sidebar = document.getElementById('sidebar');
        
        if (sidebar) {
            if (this.isMobile) {
                sidebar.classList.remove('open');
                this.sidebarOpen = false;
            } else {
                // Ensure sidebar is visible on desktop
                sidebar.style.transform = 'translateX(0)';
            }
        }
    }
    
    handleResize() {
        this.handleResponsiveLayout();
        this.updateProgress();
    }
    
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            this.sidebarOpen = !this.sidebarOpen;
            sidebar.classList.toggle('open', this.sidebarOpen);
        }
    }
    
    setupTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const difference = this.touchStartX - this.touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left - close sidebar
                if (this.sidebarOpen) {
                    this.toggleSidebar();
                }
            } else {
                // Swipe right - open sidebar
                if (!this.sidebarOpen && this.isMobile) {
                    this.toggleSidebar();
                }
            }
        }
    }
    
    initializeScrollTracking() {
        // Intersection Observer for scroll animations
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
        
        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.concept-card, .project-card, .career-card, .timeline-item, .framework-card'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Global functions that need to be accessible from HTML
function runJSExample(type) {
    const output = document.getElementById(`${type}-output`);
    if (!output) return;
    
    output.innerHTML = ''; // Clear previous output
    
    // Simulate console.log by capturing and displaying output
    const originalConsoleLog = console.log;
    const logs = [];
    
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalConsoleLog.apply(console, arguments);
    };
    
    try {
        if (type === 'variables') {
            let name = "John";
            let age = 25;
            let isStudent = true;
            
            console.log(`Hi, I'm ${name}, ${age} years old`);
            console.log(`Student status: ${isStudent}`);
        } else if (type === 'functions') {
            function greetUser(name) {
                return `Hello, ${name}! Welcome to JavaScript!`;
            }
            
            const calculateArea = (width, height) => {
                return width * height;
            };
            
            console.log(greetUser("Sarah"));
            console.log(`Area: ${calculateArea(10, 5)}`);
        }
    } catch (error) {
        logs.push(`Error: ${error.message}`);
    }
    
    // Restore original console.log
    console.log = originalConsoleLog;
    
    // Display the logged output
    logs.forEach(log => {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = log;
        output.appendChild(line);
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function toggleFlexDirection() {
    const container = document.querySelector('.flex-container');
    if (container) {
        const isColumn = container.style.flexDirection === 'column';
        container.style.flexDirection = isColumn ? 'row' : 'column';
    }
}

function toggleJustifyContent() {
    const container = document.querySelector('.flex-container');
    if (container) {
        const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
        const current = container.style.justifyContent || 'flex-start';
        const currentIndex = justifyValues.indexOf(current);
        const nextIndex = (currentIndex + 1) % justifyValues.length;
        container.style.justifyContent = justifyValues[nextIndex];
    }
}

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const city = cityInput ? cityInput.value.trim() : '';
    
    if (!weatherResult) return;
    
    if (!city) {
        weatherResult.innerHTML = '<div class="error">Please enter a city name</div>';
        return;
    }
    
    weatherResult.innerHTML = '<div class="loading">Loading weather data...</div>';
    
    // Simulate API call
    setTimeout(() => {
        weatherResult.innerHTML = `
            <div class="weather-card">
                <h4>Weather in ${city}</h4>
                <div class="weather-temp">22°C</div>
                <div class="weather-desc">Partly cloudy</div>
                <div class="weather-note">🌤️ This is a demo. In a real app, this would show actual weather data from an API.</div>
            </div>
        `;
    }, 1500);
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add body class for styling
    document.body.classList.add('web-dev-page');
    
    // Initialize the main application
    const app = new WebDevBasicsApp();
    
    // Make app instance globally available for debugging
    window.webDevApp = app;
    
    // Initialize progress tracking integration
    if (typeof ProgressTracker !== 'undefined') {
        const progressTracker = new ProgressTracker();
        
        // Track module visit
        progressTracker.updateModuleProgress('web-dev-basics', 0); // Start with 0, will update based on scroll
        
        // Integrate with existing progress system
        const originalUpdateProgress = app.updateProgress.bind(app);
        app.updateProgress = function() {
            originalUpdateProgress();
            
            // Get current progress and update global tracker
            const progressText = document.getElementById('progressText');
            if (progressText) {
                const progressMatch = progressText.textContent.match(/(\d+)%/);
                if (progressMatch) {
                    const progress = parseInt(progressMatch[1]);
                    progressTracker.updateModuleProgress('web-dev-basics', progress);
                }
            }
        };
    }
    
    // Force sidebar visibility on desktop after initialization
    setTimeout(() => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth > 768) {
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.opacity = '1';
        }
    }, 50);
});
