// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Profile Photo Upload Functionality
const photoUpload = document.getElementById('photo-upload');
const profileImage = document.getElementById('profile-image');
const photoDownloadBtn = document.getElementById('download-photo');
const photoUploadBtn = document.querySelector('.photo-upload-btn');
let uploadedPhoto = null;

photoUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        uploadedPhoto = file;
        
        // Create URL for the uploaded image and display it
        const imageUrl = URL.createObjectURL(file);
        profileImage.src = imageUrl;
        
        // Show download button
        photoDownloadBtn.style.display = 'inline-flex';
        
        showNotification(`Photo "${file.name}" uploaded successfully!`);
    } else {
        showNotification('Please upload a valid image file.');
        e.target.value = '';
    }
});

// Photo download functionality
photoDownloadBtn.addEventListener('click', function() {
    if (uploadedPhoto) {
        const url = URL.createObjectURL(uploadedPhoto);
        const a = document.createElement('a');
        a.href = url;
        a.download = uploadedPhoto.name || 'profile-photo.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Photo downloaded successfully!');
    }
});

// Resume Upload Functionality
const resumeUpload = document.getElementById('resume-upload');
const uploadBtn = document.querySelector('.resume-upload-btn');
const downloadBtn = document.getElementById('download-resume');
let uploadedResume = null;

resumeUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        uploadedResume = file;
        
        // Hide upload button and show download button
        uploadBtn.style.display = 'none';
        downloadBtn.style.display = 'inline-flex';
        
        showNotification(`Resume "${file.name}" uploaded successfully!`);
    } else {
        showNotification('Please upload a valid PDF file.');
        e.target.value = '';
    }
});

// Resume download functionality
downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (uploadedResume) {
        const url = URL.createObjectURL(uploadedResume);
        const a = document.createElement('a');
        a.href = url;
        a.download = uploadedResume.name || 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Resume downloaded successfully!');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
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

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-title, .glass-card, .skill-card, .project-card, .blog-card, .contact-form, .contact-info');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(12, 12, 12, 0.95)';
    } else {
        navbar.style.background = 'rgba(12, 12, 12, 0.9)';
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() > 0.5 ? '0, 212, 255' : '153, 51, 255'}, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Enhanced Contact form with better error handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Enhanced validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (message.length < 10) {
        showNotification('Please enter a message with at least 10 characters.', 'error');
        return;
    }
    
    // Create enhanced mailto link
    const subject = encodeURIComponent(`Portfolio Contact: Message from ${name}`);
    const body = encodeURIComponent(`Hello Swathi,

You have received a new message from your portfolio website:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.
Please reply to: ${email}`);
    
    const mailtoLink = `mailto:swathiuppunuthla35@gmail.com?subject=${subject}&body=${body}`;
    
    // Try to open email client
    try {
        const mailWindow = window.open(mailtoLink);
        
        // Check if the window opened successfully
        setTimeout(() => {
            if (mailWindow && !mailWindow.closed) {
                // Email client opened successfully
                contactForm.reset();
                showNotification('Thank you for your message! Your email client should open now.', 'success');
            } else {
                // Fallback for blocked popups
                fallbackContactMethod(name, email, message);
            }
        }, 1000);
        
    } catch (error) {
        // Fallback if mailto fails
        fallbackContactMethod(name, email, message);
    }
});

function fallbackContactMethod(name, email, message) {
    // Create a formatted message for copy to clipboard
    const messageText = `Name: ${name}
Email: ${email}
Message: ${message}

Please send this to: swathiuppunuthla35@gmail.com`;
    
    // Try to copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(messageText).then(() => {
            showNotification('Message copied to clipboard! Please send it manually to swathiuppunuthla35@gmail.com', 'info');
            contactForm.reset();
        }).catch(() => {
            showManualContactInfo(name, email, message);
        });
    } else {
        showManualContactInfo(name, email, message);
    }
}

function showManualContactInfo(name, email, message) {
    const manualMessage = `Please send your message manually to swathiuppunuthla35@gmail.com

Your message:
Name: ${name}
Email: ${email}
Message: ${message}`;
    
    showNotification(manualMessage, 'info', 8000);
    contactForm.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'success', duration = 4000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    
    // Set colors based on type
    let bgColor = 'linear-gradient(45deg, #00d4ff, #9933ff)'; // success
    if (type === 'error') {
        bgColor = 'linear-gradient(45deg, #ff4757, #ff6b7a)';
    } else if (type === 'info') {
        bgColor = 'linear-gradient(45deg, #3742fa, #70a1ff)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
        word-wrap: break-word;
        white-space: pre-line;
        font-size: 0.9rem;
        line-height: 1.4;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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
document.head.appendChild(notificationStyle);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 1000);
    }
});

// Add glitch effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            heroTitle.style.animation = '';
        }, 300);
    });
}

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
const trail = [];

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(dot);
    
    setTimeout(() => {
        if (dot.parentNode) {
            dot.parentNode.removeChild(dot);
        }
    }, 1000);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (Math.random() > 0.8) {
        createTrailDot(mouseX, mouseY);
    }
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const rate = scrolled * -0.5;
        section.style.transform = `translateY(${rate * (index * 0.1)}px)`;
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
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
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('🚀 Portfolio loaded successfully!');
console.log('💫 Animations and interactions ready!');
console.log('📁 Resume upload functionality enabled!');
