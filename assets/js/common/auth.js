// ========== AUTHENTICATION FUNCTIONALITY ==========
// Functions specific to login.html page

function initAuthPage() {
    // Login/Register toggle (only if elements exist)
    const container = document.querySelector('.containerA');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }

    // Handle form submissions
    initAuthForms();
}

function initAuthForms() {
    // Login form handling
    const loginForm = document.querySelector('.form-box.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form handling
    const registerForm = document.querySelector('.form-box.register form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = event.target.querySelector('input[type="text"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login process
    showLoginLoading();
    
    setTimeout(() => {
        // In a real app, you'd make an API call here
        alert('Login successful! Redirecting...');
        window.location.href = 'Landing.html';
    }, 1500);
}

function handleRegister(event) {
    event.preventDefault();
    
    const username = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="text"]:nth-of-type(2)').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate registration process
    showRegisterLoading();
    
    setTimeout(() => {
        // In a real app, you'd make an API call here
        alert('Registration successful! Please login.');
        document.querySelector('.login-btn').click(); // Switch to login form
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoginLoading() {
    const loginBtn = document.querySelector('.form-box.login .btn');
    if (loginBtn) {
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
    }
}

function showRegisterLoading() {
    const registerBtn = document.querySelector('.form-box.register .btn');
    if (registerBtn) {
        registerBtn.textContent = 'Creating account...';
        registerBtn.disabled = true;
    }
}

// Social login handlers (placeholder functions)
function handleGoogleLogin() {
    alert('Google login would be implemented here');
}

function handleEmailLogin() {
    alert('Email login would be implemented here');
}

// Initialize auth page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the login page
    if (document.querySelector('.containerA')) {
        initAuthPage();
    }
});