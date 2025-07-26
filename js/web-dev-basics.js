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
        this.updateProgress();
    }
    
    updateProgress() {
        const sections = document.querySelectorAll('.content-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        let visibleSections = 0;
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
            
            if (isVisible) {
                currentSection = section.id;
                visibleSections++;
            }
        });
        
        // Update progress bar
        const progress = Math.min((visibleSections / this.totalSections) * 100, 100);
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(progress) + '% Complete';
        }
        
        // Update active sidebar link
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === currentSection) {
                link.classList.add('active');
            }
        });
        
        this.currentProgress = progress;
    }
    
    setupSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Close mobile menu if open
                if (this.isMobile) {
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 80;
            const targetPosition = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    setupSmoothScrolling() {
        // CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const onclick = button.getAttribute('onclick');
                if (onclick && onclick.includes('scrollToSection')) {
                    e.preventDefault();
                    const match = onclick.match(/'([^']+)'/);
                    if (match) {
                        this.scrollToSection(match[1]);
                    }
                }
            });
        });
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    setupInteractiveDemos() {
        this.setupCodeTabs();
        this.setupDemoTabs();
        this.setupPlaygroundTabs();
        this.setupJavaScriptExamples();
        this.setupWeatherDemo();
        this.setupLayoutDemos();
    }
    
    setupCodeTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabGroup = btn.closest('.code-tabs').parentElement;
                const targetTab = btn.dataset.tab;
                
                // Update active tab button
                tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                tabGroup.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    setupDemoTabs() {
        const demoTabs = document.querySelectorAll('.demo-tab');
        demoTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const demoType = tab.dataset.demo;
                const container = tab.closest('.layout-demo');
                
                // Update active demo tab
                container.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show/hide demo containers
                container.querySelectorAll('.demo-container').forEach(demo => {
                    demo.classList.add('hidden');
                });
                const targetDemo = document.getElementById(demoType + '-demo');
                if (targetDemo) {
                    targetDemo.classList.remove('hidden');
                }
            });
        });
    }
    
    setupPlaygroundTabs() {
        const playgroundTabs = document.querySelectorAll('.playground-tabs .tab-btn');
        playgroundTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                const playground = tab.closest('.js-playground');
                
                // Update active tab
                playground.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active panel
                playground.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    setupJavaScriptExamples() {
        // Demo button functionality
        const demoBtn = document.getElementById('demo-btn');
        const demoOutput = document.getElementById('demo-output');
        if (demoBtn && demoOutput) {
            demoBtn.addEventListener('click', () => {
                demoOutput.textContent = 'Button clicked! ' + new Date().toLocaleTimeString();
                demoOutput.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
            });
        }
        
        // Run code buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('run-code-btn')) {
                const type = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.runJSExample(type);
            }
        });
    }
    
    runJSExample(type) {
        const output = document.getElementById(type + '-output');
        if (!output) return;
        
        output.innerHTML = '<div class="loading">🔄 Running code...</div>';
        
        setTimeout(() => {
            if (type === 'variables') {
                output.innerHTML = `
                    <div class="console-line">Hi, I'm John, 25 years old</div>
                    <div class="console-line">Student status: true</div>
                `;
            } else if (type === 'functions') {
                output.innerHTML = `
                    <div class="console-line">Hello, Sarah! Welcome to JavaScript!</div>
                    <div class="console-line">Area: 50</div>
                `;
            }
        }, 1000);
    }
    
    setupWeatherDemo() {
        // Make getWeather globally accessible for onclick handlers
        window.getWeather = () => {
            const cityInput = document.getElementById('cityInput');
            const weatherResult = document.getElementById('weatherResult');
            const city = cityInput ? cityInput.value.trim() : '';
            
            if (!city) {
                if (weatherResult) {
                    weatherResult.innerHTML = '<div class="error">Please enter a city name</div>';
                }
                return;
            }
            
            if (weatherResult) {
                weatherResult.innerHTML = '<div class="loading">🔄 Loading weather data...</div>';
                
                // Simulate API call
                setTimeout(() => {
                    const weather = {
                        city: city,
                        temperature: Math.round(Math.random() * 30 + 5),
                        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                        humidity: Math.round(Math.random() * 40 + 30)
                    };
                    
                    weatherResult.innerHTML = `
                        <div class="weather-card">
                            <h4>🌤️ ${weather.city}</h4>
                            <div class="weather-info">
                                <div class="temperature">${weather.temperature}°C</div>
                                <div class="condition">${weather.condition}</div>
                                <div class="humidity">Humidity: ${weather.humidity}%</div>
                            </div>
                        </div>
                    `;
                }, 1500);
            }
        };
    }
    
    setupLayoutDemos() {
        // Make demo functions globally accessible
        window.toggleFlexDirection = () => {
            const flexContainer = document.querySelector('.flex-container');
            if (flexContainer) {
                const currentDirection = flexContainer.style.flexDirection || 'row';
                flexContainer.style.flexDirection = currentDirection === 'row' ? 'column' : 'row';
            }
        };
        
        window.toggleJustifyContent = () => {
            const flexContainer = document.querySelector('.flex-container');
            if (flexContainer) {
                const justifyValues = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'];
                const currentJustify = flexContainer.style.justifyContent || 'flex-start';
                const currentIndex = justifyValues.indexOf(currentJustify);
                const nextIndex = (currentIndex + 1) % justifyValues.length;
                flexContainer.style.justifyContent = justifyValues[nextIndex];
            }
        };
        
        // Make scrollToSection globally accessible
        window.scrollToSection = (sectionId) => this.scrollToSection(sectionId);
    }
    
    setupMobileMenu() {
        // Create mobile menu toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
        document.body.appendChild(mobileToggle);
        
        // Create mobile overlay
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
        
        // Event listeners
        mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebarOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        if (this.sidebarOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (sidebar) {
            sidebar.classList.add('mobile-open');
        }
        if (overlay) {
            overlay.classList.add('active');
        }
        
        this.sidebarOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (sidebar) {
            sidebar.classList.remove('mobile-open');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        this.sidebarOpen = false;
        document.body.style.overflow = '';
    }
    
    setupTouchGestures() {
        // Enhanced touch interactions
        const interactiveElements = document.querySelectorAll(
            '.tech-card, .concept-card, .project-card, .career-card, .framework-card'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
        
        // Enhanced button interactions
        const buttons = document.querySelectorAll(
            '.tab-btn, .demo-tab, .project-btn, .career-btn, .cta-btn, .api-btn, .run-code-btn'
        );
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
        
        // Swipe gesture for tabs
        this.setupSwipeGestures();
    }
    
    setupSwipeGestures() {
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
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeTab = document.querySelector('.tab-btn.active, .demo-tab.active');
            if (activeTab) {
                const tabContainer = activeTab.parentElement;
                const tabs = Array.from(tabContainer.children);
                const currentIndex = tabs.indexOf(activeTab);
                
                let nextIndex;
                if (diff > 0 && currentIndex < tabs.length - 1) {
                    // Swipe left - next tab
                    nextIndex = currentIndex + 1;
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right - previous tab
                    nextIndex = currentIndex - 1;
                }
                
                if (nextIndex !== undefined) {
                    tabs[nextIndex].click();
                }
            }
        }
    }
    
    handleResponsiveLayout() {
        this.isMobile = window.innerWidth <= 768;
        
        if (this.isMobile) {
            this.closeMobileMenu();
        }
    }
    
    handleResize() {
        this.handleResponsiveLayout();
        this.updateProgress();
    }
    
    initializeScrollTracking() {
        // Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            // Observe all content cards
            document.querySelectorAll('.concept-card, .project-card, .career-card').forEach(card => {
                observer.observe(card);
            });
        }
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

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add body class for styling
    document.body.classList.add('web-dev-page');
    
    // Initialize the main application
    const app = new WebDevBasicsApp();
    
    // Add CSS for dynamic elements
    const style = document.createElement('style');
    style.textContent = `
        .console-line {
            background: var(--bg-secondary);
            padding: 8px 12px;
            margin: 4px 0;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
            color: var(--text-color);
            border-left: 3px solid var(--primary-color);
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: var(--text-secondary);
            font-style: italic;
            gap: 8px;
        }
        
        .error {
            color: var(--error-color, #ef4444);
            padding: 15px;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 8px;
            text-align: center;
        }
        
        .weather-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: var(--shadow-md);
        }
        
        .weather-info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 10px;
        }
        
        .temperature {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .condition {
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--text-color);
        }
        
        .humidity {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .concept-card, .project-card, .career-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .concept-card.visible, .project-card.visible, .career-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .weather-info {
                gap: 6px;
            }
            
            .temperature {
                font-size: 1.5rem;
            }
            
            .condition {
                font-size: 1rem;
            }
            
            .humidity {
                font-size: 0.8rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebDevBasicsApp;
}
