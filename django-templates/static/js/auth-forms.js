// AI4InclusiveGh Auth Forms JavaScript

// Form validation and interaction handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
                submitBtn.disabled = true;
                
                // Update button text based on current text
                const originalText = submitBtn.textContent.trim();
                if (originalText === 'Sign in') {
                    submitBtn.textContent = 'Signing in...';
                } else if (originalText === 'Create account') {
                    submitBtn.textContent = 'Creating account...';
                } else if (originalText === 'Submit') {
                    submitBtn.textContent = 'Sending...';
                }
            }
        });
    });

    // Form field validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
    });

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('blur', validatePassword);
    });
});

// Email validation
function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(e.target, 'Please enter a valid email address');
    } else {
        clearFieldError(e.target);
    }
}

// Password validation
function validatePassword(e) {
    const password = e.target.value;
    
    if (password && password.length < 6) {
        showFieldError(e.target, 'Password must be at least 6 characters long');
    } else {
        clearFieldError(e.target);
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('border-destructive');
    
    const errorEl = document.createElement('p');
    errorEl.className = 'text-sm text-destructive mt-1';
    errorEl.textContent = message;
    
    field.parentNode.appendChild(errorEl);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('border-destructive');
    
    const existingError = field.parentNode.querySelector('.text-destructive');
    if (existingError) {
        existingError.remove();
    }
}

// Google Sign In (you'll need to implement this with your Django backend)
function signInWithGoogle() {
    // This should redirect to your Django Google OAuth endpoint
    // Example: window.location.href = '/auth/google/';
    console.log('Google Sign In clicked - implement with your Django backend');
    
    // You can also use Google's JavaScript SDK here
    // and send the token to your Django backend for verification
}

// Show toast notifications (optional - you can use Django messages framework instead)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
        type === 'error' ? 'bg-destructive text-destructive-foreground' : 
        type === 'success' ? 'bg-analytics-green text-white' : 
        'bg-card text-card-foreground border border-border'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Password visibility toggle (optional enhancement)
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}