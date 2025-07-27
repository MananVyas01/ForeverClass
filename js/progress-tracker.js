/**
 * Progress Tracking System
 * Forever Class Platform
 * Tracks user progress across all modules and courses
 */

class ProgressTracker {
    constructor() {
        this.storageKey = 'foreverclass_progress';
        this.data = this.loadProgress();
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplays();
        this.trackPageVisit();
    }

    // Load progress from localStorage
    loadProgress() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : this.getDefaultProgress();
        } catch (error) {
            console.warn('Failed to load progress data:', error);
            return this.getDefaultProgress();
        }
    }

    // Default progress structure
    getDefaultProgress() {
        return {
            modules: {
                'git-github': {
                    name: 'Git & GitHub',
                    started: false,
                    completed: false,
                    sections: {},
                    lastVisited: null,
                    timeSpent: 0,
                    progress: 0
                },
                'web-dev-basics': {
                    name: 'Web Development Basics',
                    started: false,
                    completed: false,
                    sections: {},
                    lastVisited: null,
                    timeSpent: 0,
                    progress: 0
                }
            },
            overall: {
                totalTimeSpent: 0,
                modulesStarted: 0,
                modulesCompleted: 0,
                overallProgress: 0,
                streak: 0,
                lastActive: null
            },
            achievements: [],
            settings: {
                trackingEnabled: true,
                showProgress: true
            }
        };
    }

    // Save progress to localStorage
    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        } catch (error) {
            console.warn('Failed to save progress data:', error);
        }
    }

    // Track page visit
    trackPageVisit() {
        const currentPage = this.getCurrentPage();
        const currentTime = Date.now();
        
        if (currentPage) {
            const module = this.data.modules[currentPage];
            if (module) {
                module.started = true;
                module.lastVisited = currentTime;
                this.data.overall.lastActive = currentTime;
                
                // Update modules started count
                this.updateOverallStats();
                this.saveProgress();
            }
        }

        // Track time spent on page
        this.startTimeTracking();
    }

    // Get current page/module
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('git-github.html')) return 'git-github';
        if (path.includes('web-dev-basics.html')) return 'web-dev-basics';
        return null;
    }

    // Start tracking time spent on current page
    startTimeTracking() {
        this.sessionStartTime = Date.now();
        
        // Save time when user leaves the page
        window.addEventListener('beforeunload', () => {
            this.updateTimeSpent();
        });

        // Also save time periodically
        setInterval(() => {
            this.updateTimeSpent();
        }, 30000); // Every 30 seconds
    }

    // Update time spent on current module
    updateTimeSpent() {
        if (!this.sessionStartTime) return;
        
        const currentPage = this.getCurrentPage();
        if (currentPage) {
            const sessionTime = Date.now() - this.sessionStartTime;
            const module = this.data.modules[currentPage];
            if (module) {
                module.timeSpent += sessionTime;
                this.data.overall.totalTimeSpent += sessionTime;
                this.saveProgress();
            }
        }
        
        this.sessionStartTime = Date.now(); // Reset for next interval
    }

    // Mark section as completed
    markSectionCompleted(moduleId, sectionId) {
        const module = this.data.modules[moduleId];
        if (module) {
            module.sections[sectionId] = {
                completed: true,
                completedAt: Date.now()
            };
            
            this.updateModuleProgress(moduleId);
            this.checkAchievements(moduleId);
            this.saveProgress();
            this.updateDisplays();
        }
    }

    // Update module progress percentage
    updateModuleProgress(moduleId) {
        const module = this.data.modules[moduleId];
        if (!module) return;

        // Get total sections for this module
        const totalSections = this.getTotalSections(moduleId);
        const completedSections = Object.keys(module.sections).filter(
            sectionId => module.sections[sectionId].completed
        ).length;

        module.progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
        
        // Mark module as completed if all sections are done
        if (module.progress >= 100) {
            module.completed = true;
        }

        this.updateOverallStats();
    }

    // Get total sections for a module
    getTotalSections(moduleId) {
        const sectionCounts = {
            'git-github': 8, // Update based on actual sections
            'web-dev-basics': 10 // Update based on actual sections
        };
        return sectionCounts[moduleId] || 0;
    }

    // Update overall statistics
    updateOverallStats() {
        const modules = Object.values(this.data.modules);
        
        this.data.overall.modulesStarted = modules.filter(m => m.started).length;
        this.data.overall.modulesCompleted = modules.filter(m => m.completed).length;
        
        const totalProgress = modules.reduce((sum, m) => sum + m.progress, 0);
        this.data.overall.overallProgress = modules.length > 0 ? totalProgress / modules.length : 0;
        
        this.updateStreak();
    }

    // Update learning streak
    updateStreak() {
        const lastActive = this.data.overall.lastActive;
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        if (!lastActive) {
            this.data.overall.streak = 1;
        } else {
            const daysSinceActive = Math.floor((now - lastActive) / oneDayMs);
            if (daysSinceActive <= 1) {
                // Maintain or increment streak
                this.data.overall.streak += (daysSinceActive === 1) ? 1 : 0;
            } else {
                // Reset streak
                this.data.overall.streak = 1;
            }
        }
    }

    // Check for new achievements
    checkAchievements(moduleId) {
        const achievements = [
            {
                id: 'first_module_start',
                name: 'Getting Started',
                description: 'Started your first module',
                condition: () => this.data.overall.modulesStarted >= 1
            },
            {
                id: 'first_module_complete',
                name: 'Module Master',
                description: 'Completed your first module',
                condition: () => this.data.overall.modulesCompleted >= 1
            },
            {
                id: 'week_streak',
                name: 'Week Warrior',
                description: '7-day learning streak',
                condition: () => this.data.overall.streak >= 7
            },
            {
                id: 'all_modules_complete',
                name: 'Graduate',
                description: 'Completed all available modules',
                condition: () => this.data.overall.modulesCompleted >= Object.keys(this.data.modules).length
            }
        ];

        achievements.forEach(achievement => {
            if (!this.data.achievements.includes(achievement.id) && achievement.condition()) {
                this.data.achievements.push(achievement.id);
                this.showAchievementNotification(achievement);
            }
        });
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Update all progress displays on the page
    updateDisplays() {
        this.updateOverallProgressDisplay();
        this.updateModuleProgressDisplays();
        this.updateStatsDisplay();
    }

    // Update overall progress display
    updateOverallProgressDisplay() {
        const overallProgressBar = document.querySelector('.overall-progress-bar');
        const overallProgressText = document.querySelector('.overall-progress-text');
        
        if (overallProgressBar) {
            overallProgressBar.style.width = `${this.data.overall.overallProgress}%`;
        }
        
        if (overallProgressText) {
            overallProgressText.textContent = `${Math.round(this.data.overall.overallProgress)}% Complete`;
        }
    }

    // Update module progress displays
    updateModuleProgressDisplays() {
        Object.keys(this.data.modules).forEach(moduleId => {
            const module = this.data.modules[moduleId];
            const progressBar = document.querySelector(`[data-module="${moduleId}"] .module-progress-bar`);
            const progressText = document.querySelector(`[data-module="${moduleId}"] .module-progress-text`);
            
            if (progressBar) {
                progressBar.style.width = `${module.progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${Math.round(module.progress)}% Complete`;
            }
        });
    }

    // Update stats display
    updateStatsDisplay() {
        const statsElements = {
            'modules-started': this.data.overall.modulesStarted,
            'modules-completed': this.data.overall.modulesCompleted,
            'learning-streak': this.data.overall.streak,
            'time-spent': this.formatTime(this.data.overall.totalTimeSpent)
        };

        Object.keys(statsElements).forEach(id => {
            const element = document.querySelector(`[data-stat="${id}"]`);
            if (element) {
                element.textContent = statsElements[id];
            }
        });
    }

    // Format time in milliseconds to readable format
    formatTime(ms) {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return '< 1m';
        }
    }

    // Bind events
    bindEvents() {
        // Listen for custom progress events
        document.addEventListener('progressUpdate', (e) => {
            const { moduleId, sectionId } = e.detail;
            this.markSectionCompleted(moduleId, sectionId);
        });
    }

    // Public method to mark progress
    markProgress(moduleId, sectionId) {
        this.markSectionCompleted(moduleId, sectionId);
    }

    // Get progress data for external use
    getProgress() {
        return this.data;
    }

    // Reset all progress (for testing or user request)
    resetProgress() {
        this.data = this.getDefaultProgress();
        this.saveProgress();
        this.updateDisplays();
    }
}

// Initialize progress tracking when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});

// Helper function to manually mark progress
function markProgress(moduleId, sectionId) {
    if (window.progressTracker) {
        window.progressTracker.markProgress(moduleId, sectionId);
    }
}
