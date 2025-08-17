# AI4InclusiveGh Django Templates

This folder contains Django-ready HTML templates and assets converted from the React authentication interface.

## Files Included

### Templates
- `auth-base.html` - Base template with the hero section and layout
- `login-form.html` - Login form template
- `signup-form.html` - User registration form template  
- `forgot-password-form.html` - Password reset form template

### Static Assets
- `static/css/auth-styles.css` - Complete CSS with design system colors
- `static/js/auth-forms.js` - JavaScript for form interactions and validation

## Setup Instructions

1. **Copy templates to your Django project:**
   ```bash
   cp django-templates/*.html your_project/templates/auth/
   ```

2. **Copy static files:**
   ```bash
   cp -r django-templates/static/* your_project/static/
   ```

3. **Update your Django settings:**
   ```python
   # settings.py
   STATICFILES_DIRS = [
       BASE_DIR / "static",
   ]
   ```

4. **Create Django URLs:**
   ```python
   # urls.py
   urlpatterns = [
       path('auth/login/', views.login_view, name='login'),
       path('auth/signup/', views.signup_view, name='signup'),
       path('auth/forgot-password/', views.forgot_password_view, name='forgot_password'),
   ]
   ```

5. **Create Django Forms:**
   ```python
   # forms.py
   from django import forms
   from django.contrib.auth.models import User

   class LoginForm(forms.Form):
       email = forms.EmailField()
       password = forms.CharField(widget=forms.PasswordInput)

   class SignupForm(forms.ModelForm):
       surname = forms.CharField(max_length=100)
       othername = forms.CharField(max_length=100)
       password = forms.CharField(widget=forms.PasswordInput)
       
       class Meta:
           model = User
           fields = ['email', 'password']
   ```

## Design System

The templates use a complete design system with semantic color tokens:

- **Primary Colors:** Blue theme (`--analytics-blue`)
- **Analytics Colors:** Purple, green, pink, orange, teal
- **Semantic Tokens:** Background, foreground, card, primary, secondary, etc.
- **Dark Mode:** Automatic dark mode support

## Features

- ✅ Responsive design (mobile-first)
- ✅ Beautiful gradient hero section
- ✅ Form validation with JavaScript
- ✅ Loading states for buttons
- ✅ Google Sign-In ready (needs backend implementation)
- ✅ Accessibility features
- ✅ Dark mode support
- ✅ Toast notifications (optional)

## Customization

### Colors
Edit the CSS variables in `auth-styles.css`:
```css
:root {
    --primary: 210 100% 50%;  /* Change primary color */
    --analytics-blue: 210 100% 50%;  /* Change hero gradient */
}
```

### Content
Update the hero section text in `auth-base.html`:
```html
<h1 class="text-4xl font-bold mb-4">Your App Name</h1>
<p class="text-lg opacity-90">Your app description...</p>
```

### Google OAuth
Implement the `signInWithGoogle()` function in `auth-forms.js` to connect with your Django Google OAuth setup.

## Notes

- Templates use Django template syntax (`{% %}`, `{{ }}`)
- Form validation includes both JavaScript and Django form integration
- CSRF tokens are included for security
- Error handling displays Django form errors
- Tailwind CSS is loaded via CDN (consider using local build for production)