/**
 * Python Programming Module JavaScript
 * Forever Class Platform
 * Professional interactive functionality
 */

class PythonProgrammingApp {
    constructor() {
        this.currentProgress = 0;
        this.totalSections = 0;
        this.isMobile = window.innerWidth <= 768;
        this.sidebarOpen = false;
        this.activeTab = 'lists';
        this.playgroundOpen = false;
        this.heroCodeInterval = null;
        this.heroCodeTimeout = null;
        
        // Update mobile state on resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            // Only reinitialize hero code if mobile state changed
            if (wasMobile !== this.isMobile) {
                const heroCode = document.getElementById('heroCode');
                if (heroCode) {
                    heroCode.dataset.initialized = 'false';
                    this.stopHeroCodeAnimation();
                    this.initializeHeroCode();
                }
            }
        });
        
        // Demo code snippets
        this.demoSnippets = {
            variables: {
                title: "Variables & Data Types Demo",
                code: `# Variables and basic operations
name = "Python Learner"
age = 25
is_learning = True

# String formatting
greeting = f"Hello {name}, you are {age} years old!"
print(greeting)

# Data type checking
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of is_learning: {type(is_learning)}")

# String methods
text = "  Python Programming  "
print(f"Original: '{text}'")
print(f"Stripped: '{text.strip()}'")
print(f"Uppercase: '{text.upper()}'")
print(f"Replaced: '{text.replace('Python', 'Java')}'")`,
                expectedOutput: `Hello Python Learner, you are 25 years old!
Type of name: <class 'str'>
Type of age: <class 'int'>
Type of is_learning: <class 'bool'>
Original: '  Python Programming  '
Stripped: 'Python Programming'
Uppercase: '  PYTHON PROGRAMMING  '
Replaced: '  Java Programming  '`
            },
            control: {
                title: "Control Structures Demo",
                code: `# Conditional statements
score = 85

if score >= 90:
    grade = "A"
    status = "Excellent!"
elif score >= 80:
    grade = "B"
    status = "Good job!"
elif score >= 70:
    grade = "C"
    status = "Satisfactory"
else:
    grade = "F"
    status = "Need improvement"

print(f"Score: {score}, Grade: {grade}")
print(f"Status: {status}")

# For loop with different ranges
print("\\nLoop examples:")
for i in range(5):
    if i % 2 == 0:
        print(f"{i} is even")
    else:
        print(f"{i} is odd")

# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"\\nSquares: {squares}")`,
                expectedOutput: `Score: 85, Grade: B
Status: Good job!

Loop examples:
0 is even
1 is odd
2 is even
3 is odd
4 is even

Squares: [1, 4, 9, 16, 25]`
            },
            functions: {
                title: "Functions & Scope Demo",
                code: `# Basic function
def greet(name):
    """Simple greeting function"""
    return f"Hello, {name}!"

# Function with default parameters
def create_profile(name, age=18, city="Unknown"):
    return {
        "name": name,
        "age": age,
        "city": city
    }

# Test the functions
print(greet("Alice"))
print(greet("Bob"))

profile1 = create_profile("Charlie")
profile2 = create_profile("Diana", 25, "New York")

print(f"\\nProfile 1: {profile1}")
print(f"Profile 2: {profile2}")

# Lambda function
square = lambda x: x ** 2
numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
print(f"\\nSquared numbers: {squared}")

# List comprehension (Pythonic way)
squared_lc = [x**2 for x in numbers]
print(f"Squared (list comp): {squared_lc}")`,
                expectedOutput: `Hello, Alice!
Hello, Bob!

Profile 1: {'name': 'Charlie', 'age': 18, 'city': 'Unknown'}
Profile 2: {'name': 'Diana', 'age': 25, 'city': 'New York'}

Squared numbers: [1, 4, 9, 16, 25]
Squared (list comp): [1, 4, 9, 16, 25]`
            },
            errors: {
                title: "Error Handling Demo",
                code: `# Basic exception handling
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print(f"Error: Cannot divide {a} by zero!")
        return None
    except TypeError:
        print(f"Error: Invalid input types!")
        return None

# Test the function
print("Testing safe_divide function:")
print(f"10 / 2 = {safe_divide(10, 2)}")
print(f"10 / 0 = {safe_divide(10, 0)}")
print(f"'10' / 2 = {safe_divide('10', 2)}")

# Multiple exception handling
def process_data(data):
    try:
        num = int(data)
        result = 100 / num
        print(f"Processing {data}: Result = {result}")
        return result
    except ValueError:
        print(f"Error: Cannot convert '{data}' to integer")
    except ZeroDivisionError:
        print(f"Error: Cannot divide by zero (data was {data})")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        print(f"Finished processing '{data}'")

print("\\nTesting process_data function:")
process_data("50")
process_data("0")
process_data("abc")`,
                expectedOutput: `Testing safe_divide function:
10 / 2 = 5.0
Error: Cannot divide 10 by zero!
10 / 0 = None
Error: Invalid input types!
'10' / 2 = None

Testing process_data function:
Processing 50: Result = 2.0
Finished processing '50'
Error: Cannot divide by zero (data was 0)
Finished processing '0'
Error: Cannot convert 'abc' to integer
Finished processing 'abc'`
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupProgressTracking();
        this.handleResponsiveLayout();
        this.initializeScrollTracking();
        this.setupMobileMenu();
        this.initializeHeroCode();
        this.setupDataStructureTabs();
        this.setupCodePlayground();
        this.setupInteractiveDemos();
    }
    
    bindEvents() {
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.throttle(this.updateProgress.bind(this), 100)());
        
        // Navigation events
        this.setupSidebarNavigation();
        this.setupSmoothScrolling();
        
        // Back to top
        this.setupBackToTop();
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
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        let visibleSections = 0;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionHeight = rect.height;
            
            // Check if section is at least 50% visible
            if (scrollTop + windowHeight > sectionTop + (sectionHeight * 0.5)) {
                visibleSections++;
            }
        });
        
        this.currentProgress = Math.round((visibleSections / this.totalSections) * 100);
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${this.currentProgress}%`;
            progressText.textContent = `${this.currentProgress}% Complete`;
        }
        
        // Update sidebar active state
        this.updateSidebarActiveState();
    }
    
    setupSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
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
                
                // Close mobile sidebar
                if (this.isMobile) {
                    this.closeSidebar();
                }
            });
        });
    }
    
    updateSidebarActiveState() {
        const sections = document.querySelectorAll('.content-section, #hero-section');
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const scrollPos = window.pageYOffset + 100;
        
        let activeSection = null;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            
            if (scrollPos >= top && scrollPos < bottom) {
                activeSection = section.id;
            }
        });
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
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
    
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                this.toggleSidebar();
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (this.sidebarOpen && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                    this.closeSidebar();
                }
            });
        }
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        
        if (this.sidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        
        if (sidebar) {
            sidebar.classList.add('open');
            this.sidebarOpen = true;
        }
        
        if (hamburger) {
            hamburger.classList.add('active');
        }
        
        // Prevent body scroll on mobile
        if (this.isMobile) {
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        
        if (sidebar) {
            sidebar.classList.remove('open');
            this.sidebarOpen = false;
        }
        
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    handleResponsiveLayout() {
        const sidebar = document.getElementById('sidebar');
        
        if (window.innerWidth > 768) {
            // Desktop: show sidebar
            if (sidebar) {
                sidebar.style.transform = 'translateX(0)';
                sidebar.style.opacity = '1';
            }
            this.isMobile = false;
            this.closeSidebar();
        } else {
            // Mobile: hide sidebar
            if (sidebar) {
                sidebar.style.transform = 'translateX(-100%)';
                sidebar.style.opacity = '0';
            }
            this.isMobile = true;
        }
    }
    
    handleResize() {
        this.handleResponsiveLayout();
        
        // Update mobile flag
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // If switched from mobile to desktop, close sidebar
        if (wasMobile && !this.isMobile) {
            this.closeSidebar();
        }
    }
    
    initializeScrollTracking() {
        // Intersection Observer for smooth progress tracking
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-80px 0px -20% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Additional progress tracking can be added here
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }
    
    initializeHeroCode() {
        const heroCode = document.getElementById('heroCode');
        if (!heroCode) return;
        
        // Prevent multiple initializations
        if (heroCode.dataset.initialized === 'true') return;
        heroCode.dataset.initialized = 'true';
        
        // Clear any existing content and intervals
        heroCode.textContent = '';
        if (this.heroCodeInterval) {
            clearInterval(this.heroCodeInterval);
        }
        if (this.heroCodeTimeout) {
            clearTimeout(this.heroCodeTimeout);
        }
        
        // Shorter code snippets for better mobile display
        const codeSnippets = this.isMobile ? [
            `# Python Mastery
def learn():
    skills = ['syntax', 'data', 'web']
    for skill in skills:
        print(f"Learning {skill}...")
    return "Expert! 🐍"

result = learn()
print(result)`,

            `# Data Science
import pandas as pd
df = pd.read_csv('data.csv')
avg = df['score'].mean()
print(f"Average: {avg}")`,

            `# Web Development
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello Python!"

app.run()`
        ] : [
            `# Welcome to Python Programming Mastery!
def learn_python():
    """Your journey to Python mastery starts here"""
    skills = ['syntax', 'data_structures', 'oop', 'web_dev']
    
    for skill in skills:
        print(f"Mastering {skill}...")
        practice(skill)
    
    return "Python Expert! 🐍"

# Let's start learning!
result = learn_python()
print(result)`,

            `# Data Science with Python
import pandas as pd
import numpy as np

# Load and analyze data
df = pd.read_csv('student_data.csv')
average_score = df['score'].mean()

# Create visualizations
import matplotlib.pyplot as plt
plt.plot(df['study_hours'], df['score'])
plt.title('Study Hours vs Score')
plt.show()

print(f"Average score: {average_score}")`,

            `# Web Development with Flask
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/students')
def get_students():
    students = [
        {'name': 'Alice', 'grade': 'A'},
        {'name': 'Bob', 'grade': 'B+'}
    ]
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)`
        ];
        
        let currentSnippet = 0;
        
        const typeCode = (text, element, speed = this.isMobile ? 30 : 50) => {
            // Clear any existing intervals
            if (this.heroCodeInterval) {
                clearInterval(this.heroCodeInterval);
            }
            if (this.heroCodeTimeout) {
                clearTimeout(this.heroCodeTimeout);
            }
            
            element.textContent = '';
            let i = 0;
            
            this.heroCodeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(this.heroCodeInterval);
                    this.heroCodeTimeout = setTimeout(() => {
                        currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                        this.heroCodeTimeout = setTimeout(() => typeCode(codeSnippets[currentSnippet], element, speed), 2000);
                    }, 3000);
                }
            }, speed);
        };
        
        // Start the typing animation
        typeCode(codeSnippets[currentSnippet], heroCode);
    }
    
    // Cleanup method to stop hero code animation
    stopHeroCodeAnimation() {
        if (this.heroCodeInterval) {
            clearInterval(this.heroCodeInterval);
            this.heroCodeInterval = null;
        }
        if (this.heroCodeTimeout) {
            clearTimeout(this.heroCodeTimeout);
            this.heroCodeTimeout = null;
        }
    }
    
    setupDataStructureTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                btn.classList.add('active');
                const targetContent = document.querySelector(`[data-content="${tabName}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                this.activeTab = tabName;
            });
        });
    }
    
    setupCodePlayground() {
        const demoButtons = document.querySelectorAll('.demo-btn');
        const playground = document.getElementById('code-playground');
        const closeBtn = document.querySelector('.close-playground');
        const runBtn = document.querySelector('.run-code-btn');
        const codeTextarea = document.getElementById('playground-code');
        const resultDiv = document.getElementById('playground-result');
        const playgroundTitle = document.getElementById('playground-title');
        
        const demoCode = {
            variables: `# Variables and Data Types Demo
name = "Python Learner"
age = 25
height = 5.9
is_student = True

# String formatting
greeting = f"Hello {name}!"
info = f"You are {age} years old and {height} feet tall."

print(greeting)
print(info)
print(f"Student status: {is_student}")

# Type checking
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")`,

            control: `# Control Structures Demo
# For loop with conditional logic
print("Even and odd numbers:")
for i in range(10):
    if i % 2 == 0:
        print(f"{i} is even")
    else:
        print(f"{i} is odd")

# List comprehension
squares = [x**2 for x in range(5)]
print(f"\\nSquares: {squares}")

# While loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1`,

            functions: `# Functions Demo
def greet(name, title="Friend"):
    """Greet someone with an optional title"""
    return f"Hello {title} {name}!"

def calculate_area(length, width):
    """Calculate rectangle area"""
    area = length * width
    return area

def fibonacci(n):
    """Generate fibonacci sequence"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Function calls
print(greet("Alice"))
print(greet("Bob", "Dr."))

area = calculate_area(5, 3)
print(f"Area: {area}")

print("Fibonacci sequence:")
for i in range(8):
    print(fibonacci(i), end=" ")`
        };
        
        demoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const demoType = btn.getAttribute('data-demo');
                const code = demoCode[demoType];
                
                if (code && playground) {
                    playgroundTitle.textContent = `Python Interactive Demo - ${btn.parentElement.querySelector('h3').textContent}`;
                    codeTextarea.value = code;
                    resultDiv.textContent = 'Click "Run Code" to see the output';
                    this.openPlayground();
                }
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closePlayground();
            });
        }
        
        if (playground) {
            playground.addEventListener('click', (e) => {
                if (e.target === playground) {
                    this.closePlayground();
                }
            });
        }
        
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.runPythonCode();
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.playgroundOpen) {
                this.closePlayground();
            }
        });
    }
    
    openPlayground(demoType = null) {
        const playground = document.getElementById('code-playground');
        const titleElement = document.getElementById('playground-title');
        const codeTextarea = document.getElementById('playground-code');
        
        if (playground) {
            playground.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.playgroundOpen = true;
            
            // Load demo code if specified
            if (demoType && this.demoSnippets && this.demoSnippets[demoType]) {
                const demo = this.demoSnippets[demoType];
                if (titleElement) titleElement.textContent = demo.title;
                if (codeTextarea) codeTextarea.value = demo.code;
            } else {
                if (titleElement) titleElement.textContent = 'Python Interactive Demo';
                if (codeTextarea) codeTextarea.value = '# Write your Python code here...\nprint("Hello, Python!")';
            }
        }
    }
    
    closePlayground() {
        const playground = document.getElementById('code-playground');
        if (playground) {
            playground.style.display = 'none';
            document.body.style.overflow = '';
            this.playgroundOpen = false;
        }
    }
    
    runPythonCode() {
        const codeTextarea = document.getElementById('playground-code');
        const resultDiv = document.getElementById('playground-result');
        const runBtn = document.querySelector('.run-code-btn');
        
        if (!codeTextarea || !resultDiv) return;
        
        const code = codeTextarea.value.trim();
        
        if (!code) {
            resultDiv.textContent = 'Please enter some Python code to run.';
            return;
        }
        
        // Simulate code execution (in a real app, you'd use a Python interpreter)
        runBtn.textContent = 'Running...';
        runBtn.disabled = true;
        
        setTimeout(() => {
            try {
                // This is a simulation - replace with actual Python execution
                const output = this.simulatePythonExecution(code);
                resultDiv.innerHTML = output;
            } catch (error) {
                resultDiv.innerHTML = `<span style="color: #ff6b6b;">Error: ${error.message}</span>`;
            } finally {
                runBtn.textContent = 'Run Code';
                runBtn.disabled = false;
            }
        }, 1000);
    }
    
    simulatePythonExecution(code) {
        // Simple simulation of Python code execution
        // In a real application, you would use a Python interpreter or service
        
        if (code.includes('print(')) {
            const printMatches = code.match(/print\([^)]*\)/g);
            if (printMatches) {
                let output = '';
                printMatches.forEach(match => {
                    const content = match.replace('print(', '').replace(')', '');
                    let value = content.replace(/["']/g, '');
                    
                    // Simple variable substitution
                    if (content.includes('f"') || content.includes("f'")) {
                        value = 'Hello Python Learner!\nYou are 25 years old and 5.9 feet tall.\nStudent status: True';
                    } else if (content.includes('type(')) {
                        value = "&lt;class 'str'&gt;\n&lt;class 'int'&gt;";
                    }
                    
                    output += value + '\n';
                });
                return output.trim();
            }
        }
        
        if (code.includes('for i in range')) {
            return `0 is even
1 is odd
2 is even
3 is odd
4 is even
5 is odd
6 is even
7 is odd
8 is even
9 is odd

Squares: [0, 1, 4, 9, 16]

Count: 0
Count: 1
Count: 2`;
        }
        
        if (code.includes('fibonacci')) {
            return `Hello Friend Alice!
Hello Dr. Bob!
Area: 15
Fibonacci sequence:
0 1 1 2 3 5 8 13`;
        }
        
        return 'Code executed successfully! (This is a simulation)';
    }
    
    setupInteractiveDemos() {
        // Add demo button functionality
        const demoButtons = document.querySelectorAll('.demo-btn');
        
        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const demoType = button.getAttribute('data-demo');
                this.openPlayground(demoType);
            });
        });
        
        // Add hover effects and animations
        const cards = document.querySelectorAll('.fundamental-card, .library-card, .automation-card, .project-card, .career-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Add click animations to buttons
        const buttons = document.querySelectorAll('.demo-btn, .btn-primary, .btn-secondary');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.visibility = 'visible';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.visibility = 'hidden';
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Utility method for throttling
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// Initialize the Python Programming app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PythonProgrammingApp();
    
    // Initialize the app
    app.init();
    
    // Make app instance globally available for debugging
    window.pythonApp = app;
    
    // Initialize progress tracking integration
    if (typeof ProgressTracker !== 'undefined') {
        const progressTracker = new ProgressTracker();
        
        // Track module visit
        progressTracker.updateModuleProgress('python-programming', 0); // Start with 0, will update based on scroll
        
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
                    progressTracker.updateModuleProgress('python-programming', progress);
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

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PythonProgrammingApp;
}
