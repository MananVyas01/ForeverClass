/**
 * User Authentication System
 * Forever Class Platform
 * Features: Login, Registration, Password Reset, Profile Management
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authModalOpen = false;
        
        this.init();
    }
    
    init() {
        this.checkExistingAuth();
        this.createAuthModal();
        this.bindEvents();
        this.setupProgressSync();
    }
    
    checkExistingAuth() {
        const userData = localStorage.getItem('foreverclass_user');
        const authToken = localStorage.getItem('foreverclass_auth_token');
        
        if (userData && authToken) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
                this.updateUIForAuthenticatedUser();
            } catch (error) {
                console.error('Error parsing user data:', error);
                this.logout();
            }
        }
    }
    
    createAuthModal() {
        const modalHTML = `
            <div id="auth-modal" class="auth-modal" style="display: none;">
                <div class="auth-modal-overlay"></div>
                <div class="auth-modal-content">
                    <button class="auth-modal-close">&times;</button>
                    
                    <!-- Login Form -->
                    <div id="login-form" class="auth-form active">
                        <h2>Welcome Back! 👋</h2>
                        <p class="auth-subtitle">Continue your learning journey</p>
                        
                        <form class="auth-form-content">
                            <div class="form-group">
                                <label for="login-email">Email</label>
                                <input type="email" id="login-email" required 
                                       placeholder="your@email.com">
                            </div>
                            
                            <div class="form-group">
                                <label for="login-password">Password</label>
                                <input type="password" id="login-password" required 
                                       placeholder="Enter your password">
                            </div>
                            
                            <button type="submit" class="auth-btn primary">
                                Sign In
                            </button>
                            
                            <div class="auth-links">
                                <a href="#" id="show-register">New here? Create account</a>
                                <a href="#" id="show-forgot">Forgot password?</a>
                            </div>
                        </form>
                        
                        <div class="auth-demo">
                            <p>📝 Demo Account:</p>
                            <button type="button" class="auth-btn demo" id="demo-login">
                                Try Demo (No signup needed)
                            </button>
                        </div>
                    </div>
                    
                    <!-- Register Form -->
                    <div id="register-form" class="auth-form">
                        <h2>Join Forever Class! 🚀</h2>
                        <p class="auth-subtitle">Start your learning adventure</p>
                        
                        <form class="auth-form-content">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="register-fname">First Name</label>
                                    <input type="text" id="register-fname" required 
                                           placeholder="John">
                                </div>
                                <div class="form-group">
                                    <label for="register-lname">Last Name</label>
                                    <input type="text" id="register-lname" required 
                                           placeholder="Doe">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="register-email">Email</label>
                                <input type="email" id="register-email" required 
                                       placeholder="your@email.com">
                            </div>
                            
                            <div class="form-group">
                                <label for="register-password">Password</label>
                                <input type="password" id="register-password" required 
                                       placeholder="Choose a strong password"
                                       minlength="8">
                                <small>At least 8 characters</small>
                            </div>
                            
                            <div class="form-group">
                                <label for="register-confirm">Confirm Password</label>
                                <input type="password" id="register-confirm" required 
                                       placeholder="Confirm your password">
                            </div>
                            
                            <div class="form-group checkbox">
                                <label>
                                    <input type="checkbox" id="terms-agree" required>
                                    I agree to the <a href="#" target="_blank">Terms of Service</a> 
                                    and <a href="#" target="_blank">Privacy Policy</a>
                                </label>
                            </div>
                            
                            <button type="submit" class="auth-btn primary">
                                Create Account
                            </button>
                            
                            <div class="auth-links">
                                <a href="#" id="show-login">Already have an account? Sign in</a>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Forgot Password Form -->
                    <div id="forgot-form" class="auth-form">
                        <h2>Reset Password 🔐</h2>
                        <p class="auth-subtitle">We'll send you a reset link</p>
                        
                        <form class="auth-form-content">
                            <div class="form-group">
                                <label for="forgot-email">Email</label>
                                <input type="email" id="forgot-email" required 
                                       placeholder="your@email.com">
                            </div>
                            
                            <button type="submit" class="auth-btn primary">
                                Send Reset Link
                            </button>
                            
                            <div class="auth-links">
                                <a href="#" id="back-to-login">Back to Sign In</a>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Success Message -->
                    <div id="auth-success" class="auth-form">
                        <div class="auth-success-content">
                            <div class="success-icon">✅</div>
                            <h2 id="success-title">Welcome!</h2>
                            <p id="success-message">You're all set to continue learning.</p>
                            <button class="auth-btn primary" id="success-continue">
                                Continue Learning
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    bindEvents() {
        // Modal controls
        document.getElementById('auth-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('auth-modal-overlay') || 
                e.target.classList.contains('auth-modal-close')) {
                this.closeAuthModal();
            }
        });
        
        // Form switching
        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('register');
        });
        
        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('login');
        });
        
        document.getElementById('show-forgot').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('forgot');
        });
        
        document.getElementById('back-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('login');
        });
        
        // Demo login
        document.getElementById('demo-login').addEventListener('click', () => {
            this.demoLogin();
        });
        
        // Form submissions
        document.querySelector('#login-form form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });
        
        document.querySelector('#register-form form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(e);
        });
        
        document.querySelector('#forgot-form form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleForgotPassword(e);
        });
        
        document.getElementById('success-continue').addEventListener('click', () => {
            this.closeAuthModal();
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.authModalOpen) {
                this.closeAuthModal();
            }
        });
    }
    
    setupProgressSync() {
        // Sync progress with user account when authenticated
        if (this.isAuthenticated && typeof ProgressTracker !== 'undefined') {
            const progressTracker = new ProgressTracker();
            progressTracker.syncWithUser(this.currentUser.id);
        }
    }
    
    showAuthModal(defaultForm = 'login') {
        this.authModalOpen = true;
        document.getElementById('auth-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.showForm(defaultForm);
    }
    
    closeAuthModal() {
        this.authModalOpen = false;
        document.getElementById('auth-modal').style.display = 'none';
        document.body.style.overflow = '';
    }
    
    showForm(formType) {
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => form.classList.remove('active'));
        document.getElementById(`${formType}-form`).classList.add('active');
    }
    
    async handleLogin(e) {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const button = e.target.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Signing in...';
        
        try {
            // Simulate API call (replace with real backend)
            await this.simulateAPICall();
            
            const userData = {
                id: this.generateUserId(),
                email: email,
                firstName: 'Demo',
                lastName: 'User',
                joinDate: new Date().toISOString(),
                avatar: this.generateAvatar(email)
            };
            
            this.loginUser(userData);
            this.showSuccess('Welcome back!', 'Ready to continue learning?');
            
        } catch (error) {
            this.showError('Login failed. Please check your credentials.');
        } finally {
            button.disabled = false;
            button.textContent = 'Sign In';
        }
    }
    
    async handleRegister(e) {
        const firstName = document.getElementById('register-fname').value;
        const lastName = document.getElementById('register-lname').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        // Validation
        if (password !== confirmPassword) {
            this.showError('Passwords do not match.');
            return;
        }
        
        if (password.length < 8) {
            this.showError('Password must be at least 8 characters long.');
            return;
        }
        
        const button = e.target.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Creating account...';
        
        try {
            // Simulate API call (replace with real backend)
            await this.simulateAPICall();
            
            const userData = {
                id: this.generateUserId(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                joinDate: new Date().toISOString(),
                avatar: this.generateAvatar(email)
            };
            
            this.loginUser(userData);
            this.showSuccess(
                `Welcome ${firstName}!`, 
                'Your account has been created successfully.'
            );
            
        } catch (error) {
            this.showError('Registration failed. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = 'Create Account';
        }
    }
    
    async handleForgotPassword(e) {
        const email = document.getElementById('forgot-email').value;
        
        const button = e.target.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Sending...';
        
        try {
            // Simulate API call (replace with real backend)
            await this.simulateAPICall();
            
            this.showSuccess(
                'Check your email!', 
                `We've sent a reset link to ${email}`
            );
            
        } catch (error) {
            this.showError('Failed to send reset email. Please try again.');
        } finally {
            button.disabled = false;
            button.textContent = 'Send Reset Link';
        }
    }
    
    demoLogin() {
        const demoUser = {
            id: 'demo_user_001',
            email: 'demo@foreverclass.com',
            firstName: 'Demo',
            lastName: 'Learner',
            joinDate: new Date().toISOString(),
            avatar: this.generateAvatar('demo@foreverclass.com'),
            isDemo: true
        };
        
        this.loginUser(demoUser);
        this.showSuccess('Demo Mode Activated!', 'Explore all features with the demo account.');
    }
    
    loginUser(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        
        // Store in localStorage
        localStorage.setItem('foreverclass_user', JSON.stringify(userData));
        localStorage.setItem('foreverclass_auth_token', this.generateAuthToken());
        
        // Update UI
        this.updateUIForAuthenticatedUser();
        
        // Sync progress
        this.setupProgressSync();
        
        // Dispatch auth event
        window.dispatchEvent(new CustomEvent('userAuthenticated', { 
            detail: userData 
        }));
    }
    
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear localStorage
        localStorage.removeItem('foreverclass_user');
        localStorage.removeItem('foreverclass_auth_token');
        
        // Update UI
        this.updateUIForUnauthenticatedUser();
        
        // Dispatch auth event
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }
    
    updateUIForAuthenticatedUser() {
        // Update navigation
        this.updateNavigation();
        
        // Show user profile info
        this.showUserProfile();
        
        // Update progress tracking
        this.updateProgressForUser();
    }
    
    updateUIForUnauthenticatedUser() {
        // Reset navigation
        this.updateNavigation();
        
        // Hide user profile
        this.hideUserProfile();
    }
    
    updateNavigation() {
        let navActions = document.querySelector('.nav-actions');
        
        if (this.isAuthenticated) {
            const userMenu = `
                <div class="user-menu">
                    <button class="user-profile-btn" id="userProfileBtn">
                        <img src="${this.currentUser.avatar}" alt="Profile" class="user-avatar">
                        <span>${this.currentUser.firstName}</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="#" class="dropdown-item" id="viewProfile">
                            👤 Profile
                        </a>
                        <a href="#" class="dropdown-item" id="viewProgress">
                            📊 My Progress
                        </a>
                        <a href="#" class="dropdown-item" id="viewCertificates">
                            🏆 Certificates
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" id="logoutBtn">
                            🚪 Sign Out
                        </a>
                    </div>
                </div>
            `;
            
            const themeToggle = navActions.querySelector('.theme-toggle');
            const hamburger = navActions.querySelector('.hamburger');
            
            navActions.innerHTML = userMenu;
            navActions.appendChild(themeToggle);
            navActions.appendChild(hamburger);
            
            // Bind dropdown events
            this.bindUserMenuEvents();
            
        } else {
            const authButtons = `
                <button class="auth-btn login" id="loginBtn">Sign In</button>
                <button class="auth-btn register" id="registerBtn">Join Free</button>
            `;
            
            const themeToggle = navActions.querySelector('.theme-toggle');
            const hamburger = navActions.querySelector('.hamburger');
            
            navActions.innerHTML = authButtons;
            navActions.appendChild(themeToggle);
            navActions.appendChild(hamburger);
            
            // Bind auth button events
            document.getElementById('loginBtn').addEventListener('click', () => {
                this.showAuthModal('login');
            });
            
            document.getElementById('registerBtn').addEventListener('click', () => {
                this.showAuthModal('register');
            });
        }
    }
    
    bindUserMenuEvents() {
        const profileBtn = document.getElementById('userProfileBtn');
        const dropdown = document.getElementById('userDropdown');
        
        profileBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        // Menu items
        document.getElementById('viewProfile').addEventListener('click', (e) => {
            e.preventDefault();
            this.showUserProfile();
        });
        
        document.getElementById('viewProgress').addEventListener('click', (e) => {
            e.preventDefault();
            this.showProgressDashboard();
        });
        
        document.getElementById('viewCertificates').addEventListener('click', (e) => {
            e.preventDefault();
            this.showCertificates();
        });
        
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });
    }
    
    showUserProfile() {
        // Implementation for user profile modal
        console.log('Show user profile');
    }
    
    showProgressDashboard() {
        // Scroll to progress dashboard or show modal
        const progressSection = document.getElementById('progress-dashboard');
        if (progressSection) {
            progressSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showCertificates() {
        // Implementation for certificates view
        console.log('Show certificates');
    }
    
    hideUserProfile() {
        // Hide any open profile modals
    }
    
    updateProgressForUser() {
        // Sync progress with authenticated user
        if (typeof ProgressTracker !== 'undefined') {
            const progressTracker = new ProgressTracker();
            progressTracker.syncWithUser(this.currentUser.id);
        }
    }
    
    showSuccess(title, message) {
        document.getElementById('success-title').textContent = title;
        document.getElementById('success-message').textContent = message;
        this.showForm('success');
    }
    
    showError(message) {
        // Create or update error message display
        let errorDiv = document.querySelector('.auth-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'auth-error';
            document.querySelector('.auth-form.active').prepend(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
    
    // Utility methods
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateAuthToken() {
        return 'auth_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
    }
    
    generateAvatar(email) {
        // Generate a simple avatar URL (could be replaced with service like Gravatar)
        const hash = this.simpleHash(email);
        const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F'];
        const color = colors[hash % colors.length];
        const initial = email.charAt(0).toUpperCase();
        
        // Using a simple avatar service
        return `https://ui-avatars.com/api/?name=${initial}&background=${color}&color=fff&size=40`;
    }
    
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    
    async simulateAPICall() {
        // Simulate network delay
        return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}
