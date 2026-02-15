/**
 * animations.js — Premium Micro-Interactions & Animation Engine
 * Fundación Iberoamericana
 *
 * Zero-dependency vanilla JS. Self-initializing.
 * Loaded AFTER i18n.js and BEFORE page-specific JS.
 */

document.addEventListener('DOMContentLoaded', initAnimations);

function initAnimations() {
    initDarkMode();
    initScrollAnimations();
    initParallaxLite();
    initCounterAnimations();
    initProgressBarAnimations();
    initInputFocusEffects();
    initHamburgerAnimation();
    initMobileMenu();
    initToastSystem();
}

// =========================
// DARK MODE
// =========================

function initDarkMode() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    updateDarkModeToggle();
}

function toggleDarkMode() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateDarkModeToggle();
}

function updateDarkModeToggle() {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    btn.title = isDark ? 'Modo claro' : 'Modo oscuro';
    btn.setAttribute('aria-label', isDark ? 'Modo claro' : 'Modo oscuro');
    btn.classList.toggle('active', isDark);
}

window.toggleDarkMode = toggleDarkMode;

// =========================
// SCROLL ANIMATIONS
// =========================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const grids = document.querySelectorAll('.stagger-grid');

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        grids.forEach(g => g.classList.add('animated'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));

    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    grids.forEach(g => gridObserver.observe(g));
}

// Re-observe after dynamic renders
window.refreshStaggerGrids = function() {
    const grids = document.querySelectorAll('.stagger-grid:not(.animated)');
    if (!grids.length) return;
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    grids.forEach(g => gridObserver.observe(g));
};

// =========================
// PARALLAX-LITE
// =========================

function initParallaxLite() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                hero.style.setProperty('--parallax-y', scrolled * 0.3 + 'px');
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// =========================
// COUNTER ANIMATIONS
// =========================

function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const prefix = text.substring(0, text.indexOf(match[1]));
    const suffix = text.substring(text.indexOf(match[1]) + match[1].length);
    const duration = 1200;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        element.textContent = prefix + current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.animation = 'counterPop 0.3s ease';
        }
    }

    requestAnimationFrame(update);
}

// =========================
// PROGRESS BAR ANIMATION
// =========================

function initProgressBarAnimations() {
    const bars = document.querySelectorAll('.cp-bar-fill, .dash-bar-fill, .bar-chart-fill');
    if (!bars.length) return;

    bars.forEach(bar => {
        const targetWidth = bar.style.width;
        if (!targetWidth) return;
        bar.style.width = '0';
        bar.dataset.targetWidth = targetWidth;
        bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                setTimeout(() => {
                    bar.style.width = bar.dataset.targetWidth || bar.style.width;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

// =========================
// INPUT FOCUS EFFECTS
// =========================

function initInputFocusEffects() {
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .search-container input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('input-focused');
            }
        });
        if (input.value) {
            input.parentElement.classList.add('input-focused');
        }
    });
}

// =========================
// HAMBURGER ANIMATION
// =========================

function initHamburgerAnimation() {
    // Handled by initMobileMenu — kept for compatibility
}

// =========================
// MOBILE MENU (CONSOLIDATED)
// =========================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    backdrop.addEventListener('click', () => {
        navLinks.classList.remove('open');
        backdrop.classList.remove('active');
        hamburger.classList.remove('active');
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        backdrop.classList.toggle('active', isOpen);
    });
}

// =========================
// TOAST NOTIFICATION SYSTEM
// =========================

let toastContainer = null;

function initToastSystem() {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
}

function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    if (!toastContainer) initToastSystem();

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML =
        '<i class="fas ' + (icons[type] || icons.info) + '"></i>' +
        '<span>' + message + '</span>' +
        '<button class="toast-close" onclick="this.parentElement.remove()">' +
        '<i class="fas fa-times"></i></button>';

    toastContainer.appendChild(toast);

    setTimeout(function() {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(function() { toast.remove(); }, 300);
    }, duration);
}

window.showToast = showToast;

// =========================
// CONFETTI EFFECT
// =========================

function triggerConfetti() {
    var colors = ['#00BFA6', '#FFB800', '#FF5722', '#2196F3', '#9C27B0', '#4CAF50'];
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);

    for (var i = 0; i < 60; i++) {
        var piece = document.createElement('div');
        var size = 6 + Math.random() * 6;
        piece.style.cssText =
            'position:absolute;' +
            'width:' + size + 'px;' +
            'height:' + size + 'px;' +
            'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
            'left:' + (Math.random() * 100) + '%;' +
            'top:-10px;' +
            'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';' +
            'animation:confettiFall ' + (1.5 + Math.random() * 2) + 's linear ' + (Math.random() * 0.5) + 's forwards;';
        container.appendChild(piece);
    }

    setTimeout(function() { container.remove(); }, 4000);
}

window.triggerConfetti = triggerConfetti;

// =========================
// COPY WITH FEEDBACK
// =========================

function copyWithFeedback(text, buttonElement) {
    navigator.clipboard.writeText(text).then(function() {
        var originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copiado';
        buttonElement.style.color = '#4CAF50';
        showToast('Copiado al portapapeles', 'success', 2000);

        setTimeout(function() {
            buttonElement.innerHTML = originalHTML;
            buttonElement.style.color = '';
        }, 2000);
    });
}

window.copyWithFeedback = copyWithFeedback;

// =========================
// SKELETON LOADING HELPER
// =========================

function createSkeletonCards(container, count) {
    count = count || 6;
    var html = '';
    for (var i = 0; i < count; i++) {
        html += '<div style="padding:16px;">' +
            '<div class="skeleton skeleton-card"></div>' +
            '<div style="padding:12px 0;">' +
            '<div class="skeleton skeleton-text"></div>' +
            '<div class="skeleton skeleton-text short"></div>' +
            '</div></div>';
    }
    container.innerHTML = html;
}

window.createSkeletonCards = createSkeletonCards;
