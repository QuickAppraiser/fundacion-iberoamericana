/**
 * auth.js — Authentication & Content Gating System
 * Fundación Iberoamericana
 *
 * localStorage-based auth for static site.
 * Features:
 * - Registration with name, email, phone, course interest
 * - Login with email
 * - Content gating on protected pages
 * - WhatsApp automated enrollment messages
 * - Navbar auth state management
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'fi_user';
    const WA_NUMBER = '573188383917';

    // Pages that require authentication
    const PROTECTED_PAGES = [
        'dashboard.html',
        'quizzes.html',
        'labs.html',
        'recursos.html',
        'certificados.html',
        'placement-test.html',
        'calendario.html'
    ];

    // Course list for registration dropdown
    const COURSES = [
        { id: 'excel-basico-avanzado', name: 'Excel Básico a Avanzado' },
        { id: 'google-workspace', name: 'Google Workspace para Profesionales' },
        { id: 'power-bi', name: 'Power BI: Visualización de Datos' },
        { id: 'desarrollo-web', name: 'Desarrollo Web: HTML, CSS y JavaScript' },
        { id: 'python-basico', name: 'Python desde Cero' },
        { id: 'sql-bases-datos', name: 'SQL y Bases de Datos' },
        { id: 'office-365', name: 'Microsoft Office 365' },
        { id: 'analitica-datos', name: 'Analítica de Datos con Excel y Power BI' },
        { id: 'fundamentos-programacion', name: 'Fundamentos de Programación' },
        { id: 'business-intelligence', name: 'Business Intelligence Empresarial' },
        { id: 'gestion-proyectos-scrum', name: 'Gestión de Proyectos con Scrum' },
        { id: 'liderazgo-gestion', name: 'Liderazgo y Gestión de Equipos' },
        { id: 'ingles-general', name: 'Inglés General A1-C1' },
        { id: 'transformacion-digital', name: 'Transformación Digital para Empresas' },
        { id: 'ia-machine-learning', name: 'IA y Machine Learning' }
    ];

    // ========================
    // USER DATA MANAGEMENT
    // ========================

    function getUser() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch(e) {
            return null;
        }
    }

    function saveUser(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }

    function isLoggedIn() {
        return !!getUser();
    }

    function logout() {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    }

    function getInitials(name) {
        if (!name) return 'FI';
        return name.split(' ').map(function(w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
    }

    // ========================
    // CONTENT GATING
    // ========================

    function isProtectedPage() {
        var path = window.location.pathname;
        for (var i = 0; i < PROTECTED_PAGES.length; i++) {
            if (path.indexOf(PROTECTED_PAGES[i]) !== -1) return true;
        }
        return false;
    }

    function showContentGate() {
        // Hide the main page content
        var main = document.querySelector('.dash-layout, .dash-main, #quizSelectView, #quizPlayView, #quizResultsView');
        var body = document.querySelector('body > section, body > div:not(.navbar):not(.auth-overlay):not(.content-gate):not(.pomo-fab):not(.chatbot-fab)');

        // Create gate overlay
        var gate = document.createElement('div');
        gate.className = 'content-gate';
        gate.id = 'contentGate';
        gate.innerHTML =
            '<div class="gate-card">' +
                '<div class="gate-icon"><i class="fas fa-lock"></i></div>' +
                '<h2 data-i18n="auth.gateTitle">Contenido Exclusivo</h2>' +
                '<p data-i18n="auth.gateDesc">Regístrate gratis para acceder a todo el contenido de la plataforma.</p>' +
                '<div class="gate-benefits">' +
                    '<div class="gate-benefit"><i class="fas fa-check-circle"></i> <span data-i18n="auth.benefit1">Quizzes interactivos con retroalimentación</span></div>' +
                    '<div class="gate-benefit"><i class="fas fa-check-circle"></i> <span data-i18n="auth.benefit2">Laboratorios prácticos hands-on</span></div>' +
                    '<div class="gate-benefit"><i class="fas fa-check-circle"></i> <span data-i18n="auth.benefit3">Dashboard de progreso y gamificación</span></div>' +
                    '<div class="gate-benefit"><i class="fas fa-check-circle"></i> <span data-i18n="auth.benefit4">Certificados digitales verificables</span></div>' +
                    '<div class="gate-benefit"><i class="fas fa-check-circle"></i> <span data-i18n="auth.benefit5">Recursos y materiales de estudio</span></div>' +
                '</div>' +
                '<div class="gate-buttons">' +
                    '<button class="btn btn-primary" onclick="openAuthModal(\'register\')" style="width:100%;justify-content:center;">' +
                        '<i class="fas fa-user-plus"></i> <span data-i18n="auth.registerFree">Registrarse Gratis</span>' +
                    '</button>' +
                    '<button class="btn btn-outline" onclick="openAuthModal(\'login\')" style="width:100%;justify-content:center;">' +
                        '<i class="fas fa-sign-in-alt"></i> <span data-i18n="auth.loginExisting">Ya tengo cuenta</span>' +
                    '</button>' +
                    '<a href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hola, me interesa registrarme en los cursos de la Fundación Iberoamericana. ¿Podrían darme más información?') + '" target="_blank" class="auth-whatsapp-btn">' +
                        '<i class="fab fa-whatsapp"></i> <span data-i18n="auth.contactWhatsApp">Consultar por WhatsApp</span>' +
                    '</a>' +
                '</div>' +
            '</div>';

        // Hide page-specific content
        var pageContent = document.querySelectorAll('.dash-layout, .demo-btn, section:not(.navbar), div[style*="padding-top"]');
        for (var i = 0; i < pageContent.length; i++) {
            pageContent[i].style.display = 'none';
        }

        // Insert gate before footer
        var footer = document.querySelector('.footer');
        if (footer) {
            footer.parentNode.insertBefore(gate, footer);
        } else {
            document.body.appendChild(gate);
        }

        // Apply translations if i18n is loaded
        if (typeof aplicarTraducciones === 'function') {
            setTimeout(function() { aplicarTraducciones(); }, 100);
        }
    }

    // ========================
    // AUTH MODAL
    // ========================

    function createAuthModal() {
        if (document.getElementById('authOverlay')) return;

        var courseOptions = '<option value="">— Seleccionar curso —</option>';
        for (var i = 0; i < COURSES.length; i++) {
            courseOptions += '<option value="' + COURSES[i].name + '">' + COURSES[i].name + '</option>';
        }

        var modal = document.createElement('div');
        modal.className = 'auth-overlay';
        modal.id = 'authOverlay';
        modal.innerHTML =
            '<div class="auth-card" style="position:relative;">' +
                '<button class="auth-close" onclick="closeAuthModal()"><i class="fas fa-times"></i></button>' +
                '<div class="auth-header">' +
                    '<div class="logo-icon">FI</div>' +
                    '<h2 id="authTitle" data-i18n="auth.welcome">Bienvenido</h2>' +
                    '<p id="authSubtitle" data-i18n="auth.welcomeDesc">Accede a todo el contenido de la plataforma</p>' +
                '</div>' +
                '<div class="auth-tabs">' +
                    '<button class="auth-tab active" id="tabLogin" onclick="switchAuthTab(\'login\')"><i class="fas fa-sign-in-alt"></i> <span data-i18n="auth.login">Iniciar Sesión</span></button>' +
                    '<button class="auth-tab" id="tabRegister" onclick="switchAuthTab(\'register\')"><i class="fas fa-user-plus"></i> <span data-i18n="auth.register">Registrarse</span></button>' +
                '</div>' +
                '<div class="auth-body">' +
                    '<!-- LOGIN FORM -->' +
                    '<form class="auth-form active" id="loginForm" onsubmit="handleLogin(event)">' +
                        '<div class="auth-field" id="loginEmailField">' +
                            '<label for="loginEmail" data-i18n="auth.email">Correo electrónico</label>' +
                            '<input type="email" id="loginEmail" placeholder="tu@email.com" required>' +
                            '<span class="field-error" data-i18n="auth.emailError">Correo no registrado</span>' +
                        '</div>' +
                        '<button type="submit" class="auth-submit auth-submit-login">' +
                            '<i class="fas fa-sign-in-alt"></i> <span data-i18n="auth.loginBtn">Iniciar Sesión</span>' +
                        '</button>' +
                        '<div class="auth-footer">' +
                            '<span data-i18n="auth.noAccount">¿No tienes cuenta?</span> <a onclick="switchAuthTab(\'register\')" data-i18n="auth.registerHere">Regístrate aquí</a>' +
                        '</div>' +
                    '</form>' +
                    '<!-- REGISTER FORM -->' +
                    '<form class="auth-form" id="registerForm" onsubmit="handleRegister(event)">' +
                        '<div class="auth-field" id="regNameField">' +
                            '<label for="regName" data-i18n="auth.fullName">Nombre completo *</label>' +
                            '<input type="text" id="regName" placeholder="Ej: María García López" required>' +
                            '<span class="field-error" data-i18n="auth.nameError">Ingresa tu nombre completo</span>' +
                        '</div>' +
                        '<div class="auth-field" id="regEmailField">' +
                            '<label for="regEmail" data-i18n="auth.emailLabel">Correo electrónico *</label>' +
                            '<input type="email" id="regEmail" placeholder="tu@email.com" required>' +
                            '<span class="field-error" data-i18n="auth.emailExists">Este correo ya está registrado</span>' +
                        '</div>' +
                        '<div class="auth-field" id="regPhoneField">' +
                            '<label for="regPhone" data-i18n="auth.phone">Teléfono / WhatsApp</label>' +
                            '<input type="tel" id="regPhone" placeholder="Ej: 318 838 3917">' +
                            '<span class="field-hint" data-i18n="auth.phoneHint">Para recibir información sobre tus cursos</span>' +
                        '</div>' +
                        '<div class="auth-field">' +
                            '<label for="regCourse" data-i18n="auth.courseInterest">Curso de interés</label>' +
                            '<select id="regCourse">' + courseOptions + '</select>' +
                        '</div>' +
                        '<button type="submit" class="auth-submit auth-submit-register">' +
                            '<i class="fas fa-user-plus"></i> <span data-i18n="auth.registerBtn">Crear Cuenta Gratis</span>' +
                        '</button>' +
                        '<div class="auth-divider">o</div>' +
                        '<a href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hola, quiero inscribirme en los cursos de la Fundación Iberoamericana.\n\nMi nombre es: \nCurso de interés: \n\n¿Podrían ayudarme con el proceso de registro?') + '" target="_blank" class="auth-whatsapp-btn">' +
                            '<i class="fab fa-whatsapp"></i> <span data-i18n="auth.registerWhatsApp">Registrarme por WhatsApp</span>' +
                        '</a>' +
                        '<div class="auth-footer">' +
                            '<span data-i18n="auth.hasAccount">¿Ya tienes cuenta?</span> <a onclick="switchAuthTab(\'login\')" data-i18n="auth.loginHere">Inicia sesión</a>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>';

        document.body.appendChild(modal);

        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeAuthModal();
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeAuthModal();
        });
    }

    // ========================
    // NAVBAR AUTH STATE
    // ========================

    function renderNavAuth() {
        // Try new nav-utility first, fallback to navLinks
        var container = document.getElementById('navUtility') || document.getElementById('navLinks');
        if (!container) return;

        // Remove existing auth elements
        var existing = document.querySelectorAll('.nav-auth-item');
        for (var i = 0; i < existing.length; i++) {
            existing[i].remove();
        }

        var user = getUser();
        var isUtility = container.id === 'navUtility';

        if (user) {
            // Logged in: show user info + dropdown
            var el = document.createElement(isUtility ? 'div' : 'li');
            el.className = 'nav-auth-item';
            el.innerHTML =
                '<div class="nav-user-info" onclick="toggleUserDropdown(event)">' +
                    '<div class="nav-user-avatar">' + getInitials(user.name) + '</div>' +
                    '<span class="nav-user-name">' + (user.name.split(' ')[0]) + '</span>' +
                    '<i class="fas fa-chevron-down" style="font-size:0.7rem;opacity:0.5;"></i>' +
                    '<div class="nav-user-dropdown" id="userDropdown">' +
                        '<a href="dashboard.html"><i class="fas fa-home"></i> Mi Aula</a>' +
                        '<a href="quizzes.html"><i class="fas fa-clipboard-check"></i> Quizzes</a>' +
                        '<a href="labs.html"><i class="fas fa-flask"></i> Labs</a>' +
                        '<a href="recursos.html"><i class="fas fa-book"></i> Recursos</a>' +
                        '<div class="dropdown-divider"></div>' +
                        '<button class="dropdown-logout" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>' +
                    '</div>' +
                '</div>';

            // Insert at the beginning of utility area (before dark mode toggle)
            var darkBtn = container.querySelector('#darkModeToggle');
            if (darkBtn) {
                container.insertBefore(el, darkBtn);
            } else {
                container.insertBefore(el, container.firstChild);
            }

            // Update dashboard sidebar if present
            updateDashboardUser(user);
        } else {
            // Not logged in: show login + register buttons
            var loginEl = document.createElement(isUtility ? 'div' : 'li');
            loginEl.className = 'nav-auth-item';
            loginEl.innerHTML = '<button class="nav-auth-btn nav-auth-login" onclick="openAuthModal(\'login\')"><i class="fas fa-sign-in-alt"></i> <span data-i18n="auth.login">Iniciar Sesión</span></button>';

            var registerEl = document.createElement(isUtility ? 'div' : 'li');
            registerEl.className = 'nav-auth-item';
            registerEl.innerHTML = '<button class="nav-auth-btn nav-auth-register" onclick="openAuthModal(\'register\')"><i class="fas fa-user-plus"></i> <span data-i18n="auth.register">Registrarse</span></button>';

            // Insert at the beginning of utility area
            var darkBtn = container.querySelector('#darkModeToggle');
            if (darkBtn) {
                container.insertBefore(registerEl, darkBtn);
                container.insertBefore(loginEl, registerEl);
            } else {
                container.insertBefore(loginEl, container.firstChild);
                loginEl.after(registerEl);
            }
        }

        // Apply translations
        if (typeof aplicarTraducciones === 'function') {
            setTimeout(function() { aplicarTraducciones(); }, 50);
        }
    }

    function updateDashboardUser(user) {
        var sidebarName = document.getElementById('sidebarName');
        var sidebarAvatar = document.getElementById('sidebarAvatar');
        var welcomeMsg = document.getElementById('welcomeMsg');

        if (sidebarName) sidebarName.textContent = user.name;
        if (sidebarAvatar) sidebarAvatar.textContent = getInitials(user.name);
        if (welcomeMsg) welcomeMsg.textContent = '¡Hola, ' + user.name.split(' ')[0] + '! Continúa donde te quedaste';

        // Also update onboarding name if present
        var onboardName = document.getElementById('onboardName');
        if (onboardName) onboardName.value = user.name;

        // Hide onboarding if logged in
        var onboarding = document.getElementById('onboarding');
        if (onboarding) onboarding.style.display = 'none';

        // Store name for dashboard.js compatibility
        if (!localStorage.getItem('fi_studentName')) {
            localStorage.setItem('fi_studentName', user.name);
        }
    }

    // ========================
    // WHATSAPP AUTOMATION
    // ========================

    function buildWhatsAppEnrollURL(courseName, userName) {
        var message = 'Hola, soy ' + (userName || '[tu nombre]') + '.\n\n' +
            'Quiero inscribirme en el curso: *' + (courseName || '[nombre del curso]') + '*\n\n' +
            'De la Fundación Iberoamericana.\n' +
            '¿Podrían indicarme los pasos para completar mi inscripción?\n\n' +
            'Gracias.';
        return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function buildWhatsAppInfoURL(courseName) {
        var message = 'Hola, me interesa obtener más información sobre el curso: *' + (courseName || 'los cursos disponibles') + '*\n\n' +
            'De la Fundación Iberoamericana.\n\n' +
            '¿Cuáles son los horarios, duración y requisitos?\n\n' +
            'Gracias.';
        return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function buildWhatsAppSupportURL() {
        var message = 'Hola, necesito ayuda con la plataforma de la Fundación Iberoamericana.\n\n' +
            'Mi consulta es: ';
        return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
    }

    // ========================
    // EVENT HANDLERS
    // ========================

    window.openAuthModal = function(tab) {
        createAuthModal();
        var overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.add('active');
        if (tab) switchAuthTab(tab);
        document.body.style.overflow = 'hidden';
    };

    window.closeAuthModal = function() {
        var overlay = document.getElementById('authOverlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.switchAuthTab = function(tab) {
        var loginTab = document.getElementById('tabLogin');
        var registerTab = document.getElementById('tabRegister');
        var loginForm = document.getElementById('loginForm');
        var registerForm = document.getElementById('registerForm');

        if (!loginTab || !registerTab) return;

        if (tab === 'login') {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            if (loginForm) loginForm.classList.add('active');
            if (registerForm) registerForm.classList.remove('active');
        } else {
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
            if (loginForm) loginForm.classList.remove('active');
            if (registerForm) registerForm.classList.add('active');
        }

        // Clear errors
        var errors = document.querySelectorAll('.auth-field.error');
        for (var i = 0; i < errors.length; i++) {
            errors[i].classList.remove('error');
        }
    };

    window.handleLogin = function(e) {
        e.preventDefault();
        var email = document.getElementById('loginEmail').value.trim().toLowerCase();
        var field = document.getElementById('loginEmailField');

        if (!email) {
            field.classList.add('error');
            return;
        }

        // Check all registered users
        var users = getAllUsers();
        var found = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                found = users[i];
                break;
            }
        }

        if (found) {
            field.classList.remove('error');
            saveUser(found);
            closeAuthModal();
            if (typeof showToast === 'function') {
                showToast('¡Bienvenido de vuelta, ' + found.name.split(' ')[0] + '!', 'success');
            }
            setTimeout(function() { window.location.reload(); }, 800);
        } else {
            field.classList.add('error');
        }
    };

    window.handleRegister = function(e) {
        e.preventDefault();
        var name = document.getElementById('regName').value.trim();
        var email = document.getElementById('regEmail').value.trim().toLowerCase();
        var phone = document.getElementById('regPhone').value.trim();
        var course = document.getElementById('regCourse').value;

        var valid = true;

        // Validate name
        if (!name || name.length < 2) {
            document.getElementById('regNameField').classList.add('error');
            valid = false;
        } else {
            document.getElementById('regNameField').classList.remove('error');
        }

        // Validate email
        if (!email || !email.includes('@') || !email.includes('.')) {
            document.getElementById('regEmailField').classList.add('error');
            valid = false;
        } else {
            // Check if email already exists
            var users = getAllUsers();
            var exists = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) { exists = true; break; }
            }
            if (exists) {
                document.getElementById('regEmailField').classList.add('error');
                valid = false;
            } else {
                document.getElementById('regEmailField').classList.remove('error');
            }
        }

        if (!valid) return;

        // Create user
        var user = {
            name: name,
            email: email,
            phone: phone,
            courseInterest: course,
            registeredAt: new Date().toISOString(),
            id: 'fi-' + Date.now()
        };

        // Save to current user
        saveUser(user);

        // Save to users registry
        addToUserRegistry(user);

        // Also set dashboard compatibility
        localStorage.setItem('fi_studentName', name);

        closeAuthModal();

        if (typeof showToast === 'function') {
            showToast('¡Cuenta creada! Bienvenido, ' + name.split(' ')[0] + '.', 'success', 4000);
        }

        // If they selected a course, offer WhatsApp enrollment
        if (course) {
            setTimeout(function() {
                var enrollUrl = buildWhatsAppEnrollURL(course, name);
                if (typeof showToast === 'function') {
                    showToast('¿Quieres inscribirte en ' + course + '? <a href="' + enrollUrl + '" target="_blank" style="color:#25D366;font-weight:700;">Inscribirme por WhatsApp</a>', 'info', 8000);
                }
            }, 2000);
        }

        setTimeout(function() { window.location.reload(); }, 1500);
    };

    window.toggleUserDropdown = function(e) {
        e.stopPropagation();
        var dropdown = document.getElementById('userDropdown');
        if (dropdown) dropdown.classList.toggle('open');
    };

    window.logoutUser = function() {
        logout();
    };

    // WhatsApp helpers exposed globally
    window.enrollViaWhatsApp = function(courseName) {
        var user = getUser();
        var url = buildWhatsAppEnrollURL(courseName, user ? user.name : '');
        window.open(url, '_blank');
    };

    window.infoViaWhatsApp = function(courseName) {
        var url = buildWhatsAppInfoURL(courseName);
        window.open(url, '_blank');
    };

    window.supportViaWhatsApp = function() {
        var url = buildWhatsAppSupportURL();
        window.open(url, '_blank');
    };

    // ========================
    // USER REGISTRY (multi-user localStorage)
    // ========================

    function getAllUsers() {
        try {
            var data = localStorage.getItem('fi_users_registry');
            return data ? JSON.parse(data) : [];
        } catch(e) {
            return [];
        }
    }

    function addToUserRegistry(user) {
        var users = getAllUsers();
        users.push(user);
        localStorage.setItem('fi_users_registry', JSON.stringify(users));
    }

    // ========================
    // INITIALIZATION
    // ========================

    function init() {
        // Render auth buttons in navbar
        renderNavAuth();

        // Check if current page is protected
        if (isProtectedPage() && !isLoggedIn()) {
            showContentGate();
        }

        // Close dropdown on outside click
        document.addEventListener('click', function(e) {
            var dropdown = document.getElementById('userDropdown');
            if (dropdown && !e.target.closest('.nav-user-info')) {
                dropdown.classList.remove('open');
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
