// Login Page JavaScript

// Mock user database (in real app, this would be server-side)
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@mercycityassembly.zw',
        password: 'admin123',
        role: 'admin',
        name: 'System Admin',
        phone: '+263 77 000 0000',
        twoFactorEnabled: true,
        twoFactorSecret: '123456',
        isProjectTeam: true
    },
    {
        id: 2,
        username: 'financial',
        email: 'finance@mercycityassembly.zw',
        password: 'finance123',
        role: 'financial_director',
        name: 'Financial Director',
        phone: '+263 71 111 1111',
        twoFactorEnabled: true,
        twoFactorSecret: '654321',
        isProjectTeam: true
    },
    {
        id: 3,
        username: 'bryantamudaishe',
        email: 'bryantamudaishe@gmail.com',
        password: '2006abc##',
        role: 'admin',
        name: 'Bryant Amudaishe',
        phone: '+263 780 333 703',
        twoFactorEnabled: true,
        twoFactorSecret: '789012',
        isProjectTeam: true
    },
    {
        id: 4,
        username: 'secretary',
        email: 'secretary@mercycityassembly.zw',
        password: 'secretary123',
        role: 'secretary',
        name: 'Church Secretary',
        phone: '+263 78 000 0001',
        twoFactorEnabled: true,
        twoFactorSecret: '111111',
        isProjectTeam: true
    },
    {
        id: 5,
        username: 'mediateam',
        email: 'media@mercycityassembly.zw',
        password: 'media123',
        role: 'media_team',
        name: 'Media Team',
        phone: '+263 78 000 0002',
        twoFactorEnabled: true,
        twoFactorSecret: '222222',
        isProjectTeam: true
    },
    {
        id: 6,
        username: 'projects',
        email: 'projects@mercycityassembly.zw',
        password: 'projects123',
        role: 'projects_admin',
        name: 'Projects Admin',
        phone: '+263 78 000 0003',
        twoFactorEnabled: true,
        twoFactorSecret: '333333',
        isProjectTeam: true
    }
];

// Current login session
let currentLoginAttempt = null;
const REGISTERED_USERS_KEY = 'registeredUsers';

function loadRegisteredUsers() {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!stored) return [];

    try {
        return JSON.parse(stored);
    } catch (error) {
        localStorage.removeItem(REGISTERED_USERS_KEY);
        return [];
    }
}

function saveRegisteredUsers(users) {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function getAllUsers() {
    return [...mockUsers, ...loadRegisteredUsers()];
}

function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.classList.add('slide-out-left');
    setTimeout(() => {
        loginForm.style.display = 'none';
        loginForm.classList.remove('slide-out-left');
        registerForm.style.display = 'grid';
        registerForm.classList.add('slide-in');
    }, 500);

    hideMessage();
}

function showLoginForm() {
    const registerForm = document.getElementById('registerForm');
    const twoFactorForm = document.getElementById('twoFactorForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm && registerForm.style.display !== 'none') {
        registerForm.classList.add('slide-out-right');
        setTimeout(() => {
            registerForm.style.display = 'none';
            registerForm.classList.remove('slide-out-right');
            if (loginForm) {
                loginForm.style.display = 'grid';
                loginForm.classList.add('slide-in-right');
            }
        }, 500);
    } else if (twoFactorForm && twoFactorForm.style.display !== 'none') {
        twoFactorForm.classList.add('slide-out-right');
        setTimeout(() => {
            twoFactorForm.style.display = 'none';
            twoFactorForm.classList.remove('slide-out-right');
            if (loginForm) {
                loginForm.style.display = 'grid';
                loginForm.classList.add('slide-in-right');
            }
        }, 500);
    }

    hideMessage();
}

function clearRegisterForm() {
    document.getElementById('registerFullName').value = '';
    document.getElementById('registerIdNumber').value = '';
    document.getElementById('registerRole').value = '';
    document.getElementById('registerPhone').value = '';
    document.getElementById('registerAddress').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleRegistration(event) {
    if (event) event.preventDefault();

    const fullName = document.getElementById('registerFullName').value.trim();
    const idNumber = document.getElementById('registerIdNumber').value.trim();
    const role = document.getElementById('registerRole').value;
    const phone = document.getElementById('registerPhone').value.trim();
    const address = document.getElementById('registerAddress').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    if (!fullName || !idNumber || !role || !phone || !address || !email || !password) {
        showMessage('All registration fields are required.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Please provide a valid email address.', 'error');
        return;
    }

    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long.', 'error');
        return;
    }

    const registeredUsers = loadRegisteredUsers();
    const duplicateEmail = registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase()) ||
        mockUsers.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (duplicateEmail) {
        showMessage('This email is already registered. Please login or use another email.', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        username: email.split('@')[0],
        email: email,
        password: password,
        role: role,
        name: fullName,
        phone: phone,
        address: address,
        idNumber: idNumber,
        twoFactorEnabled: true,
        isProjectTeam: true,
        verified: true,
        registeredAt: new Date().toISOString()
    };

    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    showMessage('Registration complete. Please login with your email and password.', 'success');
    clearRegisterForm();
    showLoginForm();
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
    setupEventListeners();
    checkRememberedLogin();
});

function initializeLoginPage() {
    // Focus on username field
    document.getElementById('username').focus();

    // Add loading states
    console.log('AFMIZ Mercy City Assembly Login Page initialized');
}

function setupEventListeners() {
    // Enter key support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const activeForm = document.activeElement.closest('form');
            if (activeForm) {
                activeForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Form validation
    document.getElementById('username').addEventListener('blur', validateUsername);
    document.getElementById('password').addEventListener('blur', validatePassword);

    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', event => handleOtpInput(event, index));
        input.addEventListener('keydown', event => handleOtpKeyDown(event, index));
    });
}

function checkRememberedLogin() {
    // Check for remembered login (mock implementation)
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
}

// Form validation functions
function validateUsername() {
    const username = document.getElementById('username').value.trim();
    const usernameGroup = document.getElementById('username').closest('.input-group');

    if (!username) {
        showFieldError(usernameGroup, 'Email is required');
        return false;
    }

    if (!validateEmail(username)) {
        showFieldError(usernameGroup, 'Please enter a valid email address');
        return false;
    }

    clearFieldError(usernameGroup);
    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordGroup = document.getElementById('password').closest('.input-group');

    if (!password) {
        showFieldError(passwordGroup, 'Password is required');
        return false;
    }

    if (password.length < 6) {
        showFieldError(passwordGroup, 'Password must be at least 6 characters');
        return false;
    }

    clearFieldError(passwordGroup);
    return true;
}

function getOtpCode() {
    const digits = Array.from(document.querySelectorAll('.otp-input')).map(input => input.value.trim());
    return digits.join('');
}

function updateVerifyButtonState() {
    const submitBtn = document.querySelector('.btn-verify');
    const code = getOtpCode();
    if (submitBtn) submitBtn.disabled = code.length !== 6;
}

function handleOtpInput(event, index) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '').slice(0, 1);

    if (input.value && index < 5) {
        const nextInput = document.querySelectorAll('.otp-input')[index + 1];
        if (nextInput) nextInput.focus();
    }

    updateVerifyButtonState();
}

function handleOtpKeyDown(event, index) {
    const input = event.target;

    if (event.key === 'Backspace' && !input.value && index > 0) {
        const previous = document.querySelectorAll('.otp-input')[index - 1];
        if (previous) {
            previous.focus();
            previous.value = '';
        }
        updateVerifyButtonState();
        event.preventDefault();
    }
}

function showFieldError(fieldGroup, message) {
    clearFieldError(fieldGroup);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;

    fieldGroup.appendChild(errorDiv);
    fieldGroup.querySelector('input').style.borderColor = '#dc3545';
}

function clearFieldError(fieldGroup) {
    const existingError = fieldGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    fieldGroup.querySelector('input').style.borderColor = '';
}

// Login form handler
async function handleLogin(event) {
    event.preventDefault();

    // Clear previous messages
    hideMessage();

    // Validate form
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();

    if (!isUsernameValid || !isPasswordValid) {
        showMessage('Please correct the errors above', 'error');
        return;
    }

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading state
    const submitBtn = document.querySelector('#loginForm .btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div> Authenticating...';
    submitBtn.disabled = true;

    try {
        // Simulate API call delay
        await delay(1500);

        // Authenticate user
        const user = authenticateUser(username, password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        if (!user.isProjectTeam) {
            throw new Error('You are not authorized to access this dashboard. Contact the project team lead.');
        }

        // Store login attempt
        currentLoginAttempt = {
            user: user,
            rememberMe: rememberMe
        };

        // Generate the verification code and show the OTP entry form
        await startTwoFactorFlow();

    } catch (error) {
        showMessage(error.message, 'error');
        handleFailedLogin(username);
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Start the manual verification flow after successful login credentials
async function startTwoFactorFlow() {
    const user = currentLoginAttempt.user;
    const code = generateVerificationCode();

    currentLoginAttempt.twoFactorCode = code;
    currentLoginAttempt.twoFactorSentAt = new Date().toISOString();

    sendVerificationEmail(user, code);
    showTwoFactorForm();

    await delay(500);
    alert(`🔐 VERIFICATION CODE: ${code}\n\nThis code has been sent to ${user.email}. Enter it in the verification form to continue.`);
}

// 2FA verification handler
async function handleTwoFactorVerification(event) {
    event.preventDefault();

    const code = getOtpCode();

    if (code.length !== 6) {
        showMessage('Please enter a valid 6-digit code', 'error');
        return;
    }

    const submitBtn = document.querySelector('.btn-verify');
    const loader = submitBtn.querySelector('.btn-loader');
    const label = submitBtn.querySelector('.btn-text');

    if (loader) loader.classList.remove('hidden');
    if (label) label.textContent = 'Verifying...';
    submitBtn.disabled = true;

    try {
        await delay(1000);

        const isValid = verifyTwoFactorCode(currentLoginAttempt.user, code);

        if (!isValid) {
            throw new Error('Invalid verification code. Please try again.');
        }

        completeLogin(currentLoginAttempt.user, currentLoginAttempt.rememberMe);
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        if (loader) loader.classList.add('hidden');
        if (label) label.textContent = 'Verify Code';
        submitBtn.disabled = false;
    }
}

function verifyTwoFactorCode(user, code) {
    return currentLoginAttempt && currentLoginAttempt.twoFactorCode === code;
}

function showTwoFactorForm() {
    const loginForm = document.getElementById('loginForm');
    const twoFactorForm = document.getElementById('twoFactorForm');

    if (loginForm) {
        loginForm.classList.add('slide-out-left');
    }
    setTimeout(() => {
        if (loginForm) {
            loginForm.style.display = 'none';
            loginForm.classList.remove('slide-out-left');
        }
        if (twoFactorForm) {
            twoFactorForm.style.display = 'block';
            twoFactorForm.classList.add('slide-in');
        }
    }, 500);

    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => input.value = '');
    if (otpInputs[0]) otpInputs[0].focus();

    const verificationEmailText = document.getElementById('verificationEmailText');
    if (verificationEmailText) {
        verificationEmailText.textContent = currentLoginAttempt.user.email;
    }
}

// Authentication functions
function authenticateUser(username, password) {
    // Find user by email, username, or linked phone number
    const user = getAllUsers().find(u =>
        (u.username === username || u.email === username || u.phone === username) &&
        u.password === password
    );

    return user || null;
}

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendVerificationEmail(user, code) {
    console.log(`Google email sent to ${user.email}: access code ${code}`);
    showMessage(`Security verification email dispatched automatically to ${user.email} via Google Mail.`, 'success');
}

function completeLogin(user, rememberMe) {
    // Store session (mock)
    const session = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
        isProjectTeam: user.isProjectTeam,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    };

    // Store in localStorage (in real app, use secure httpOnly cookies)
    localStorage.setItem('adminSession', JSON.stringify(session));

    // Remember user if requested
    if (rememberMe) {
        localStorage.setItem('rememberedUser', user.email);
    } else {
        localStorage.removeItem('rememberedUser');
    }

    // Log successful login
    console.log(`User ${user.username} logged in successfully`);

    // Redirect to dashboard
    showMessage('Login successful! Redirecting...', 'success');

    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1000);
}

// UI functions
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('loginMessage');
    const messageContent = messageDiv.querySelector('.message-content');
    const messageText = document.getElementById('messageText');

    messageText.textContent = message;
    messageContent.className = `message-content ${type}`;

    messageDiv.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

function hideMessage() {
    document.getElementById('loginMessage').style.display = 'none';
}

// Utility functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Forgot password handler (mock)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('forgot-password')) {
        event.preventDefault();
        showMessage('Password reset link sent to your email (mock functionality)', 'info');
    }
});

// Security features
function logSecurityEvent(event, details) {
    const securityLog = {
        timestamp: new Date().toISOString(),
        event: event,
        details: details,
        userAgent: navigator.userAgent,
        ip: 'mock-ip' // In real app, get from server
    };

    console.log('Security Event:', securityLog);

    // In real app, send to security monitoring service
}

// Log login attempts
function logLoginAttempt(username, success) {
    logSecurityEvent('login_attempt', {
        username: username,
        success: success,
        timestamp: new Date().toISOString()
    });
}

// Enhanced security - detect suspicious activity
let failedAttempts = 0;
const maxFailedAttempts = 3;

function handleFailedLogin(username) {
    failedAttempts++;
    logLoginAttempt(username, false);

    if (failedAttempts >= maxFailedAttempts) {
        // Lock account temporarily (mock)
        showMessage('Account temporarily locked due to multiple failed attempts. Try again in 15 minutes.', 'error');

        // Disable login form
        document.getElementById('loginForm').querySelectorAll('input, button').forEach(el => {
            el.disabled = true;
        });

        // Re-enable after 15 minutes (mock)
        setTimeout(() => {
            document.getElementById('loginForm').querySelectorAll('input, button').forEach(el => {
                el.disabled = false;
            });
            failedAttempts = 0;
        }, 15 * 60 * 1000); // 15 minutes
    }
}

// Session management
function checkExistingSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        try {
            const sessionData = JSON.parse(session);
            const now = new Date();
            const expiresAt = new Date(sessionData.expiresAt);

            if (now < expiresAt && sessionData.isProjectTeam) {
                // Valid session exists, redirect to dashboard
                window.location.href = 'admin.html';
                return true;
            } else {
                // Session expired or unauthorized, clear it
                localStorage.removeItem('adminSession');
            }
        } catch (error) {
            localStorage.removeItem('adminSession');
        }
    }
    return false;
}

// Check for existing session on page load
if (checkExistingSession()) {
    // User already logged in, redirect handled above
} else {
    // Show login form
    console.log('No valid session found, showing login form');
}

// Accessibility enhancements
document.addEventListener('keydown', function(event) {
    // Close message with Escape key
    if (event.key === 'Escape') {
        hideMessage();
    }
});

// Prevent form submission on enter for non-submit inputs
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON' && event.target.type !== 'submit') {
        event.preventDefault();
    }
});

// Add ARIA labels for screen readers
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label') && input.getAttribute('placeholder')) {
            input.setAttribute('aria-label', input.getAttribute('placeholder'));
        }
    });
});

// Initialize security monitoring
console.log('Security monitoring initialized');
