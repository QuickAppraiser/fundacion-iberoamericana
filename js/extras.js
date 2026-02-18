/**
 * extras.js — Premium Interactive Features
 * Fundación Iberoamericana
 *
 * Features:
 * - Countdown timer (next enrollment cycle)
 * - Quick Quiz "¿Qué curso es para ti?"
 * - Floating chatbot widget
 * - Certificate preview (on course detail pages)
 */

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initQuizFinder();
    initChatbot();
    initCertPreview();
    initTestimonialsCarousel();
});

// =========================
// COUNTDOWN TIMER
// =========================

function initCountdown() {
    const container = document.getElementById('countdownTimer');
    if (!container) return;

    // Next enrollment: June 1, 2026
    const targetDate = new Date('2026-06-01T09:00:00');

    function update() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            container.innerHTML = '<i class="fas fa-check-circle"></i> <span class="cd-label">Inscripciones abiertas ahora</span>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        container.innerHTML = `
            <i class="fas fa-fire"></i>
            <span class="cd-label">Nuevo ciclo inicia en:</span>
            <div class="countdown-boxes">
                <div class="cd-box"><span class="cd-num">${days}</span><span class="cd-unit">días</span></div>
                <div class="cd-box"><span class="cd-num">${String(hours).padStart(2,'0')}</span><span class="cd-unit">hrs</span></div>
                <div class="cd-box"><span class="cd-num">${String(mins).padStart(2,'0')}</span><span class="cd-unit">min</span></div>
                <div class="cd-box"><span class="cd-num">${String(secs).padStart(2,'0')}</span><span class="cd-unit">seg</span></div>
            </div>
        `;
    }

    update();
    setInterval(update, 1000);
}

// =========================
// QUICK QUIZ FINDER
// =========================

const quizQuestions = [
    {
        question: '¿Qué te interesa más?',
        options: [
            { text: 'Organizar datos y crear reportes', icon: 'fa-table', tags: ['office', 'datos'] },
            { text: 'Crear sitios web o aplicaciones', icon: 'fa-code', tags: ['programacion'] },
            { text: 'Liderar equipos y proyectos', icon: 'fa-users', tags: ['gestion'] },
            { text: 'Aprender un nuevo idioma', icon: 'fa-language', tags: ['idiomas'] }
        ]
    },
    {
        question: '¿Cuál es tu nivel de experiencia técnica?',
        options: [
            { text: 'Principiante total', icon: 'fa-seedling', tags: ['basico'] },
            { text: 'Sé lo básico', icon: 'fa-leaf', tags: ['basico-inter'] },
            { text: 'Tengo experiencia intermedia', icon: 'fa-tree', tags: ['intermedio'] },
            { text: 'Quiero especializarme', icon: 'fa-crown', tags: ['avanzado'] }
        ]
    },
    {
        question: '¿Cuál es tu objetivo principal?',
        options: [
            { text: 'Conseguir un mejor empleo', icon: 'fa-briefcase', tags: ['empleo'] },
            { text: 'Mejorar en mi trabajo actual', icon: 'fa-chart-line', tags: ['mejora'] },
            { text: 'Emprender mi propio negocio', icon: 'fa-rocket', tags: ['emprender'] },
            { text: 'Aprender por curiosidad', icon: 'fa-lightbulb', tags: ['curiosidad'] }
        ]
    },
    {
        question: '¿Cuánto tiempo puedes dedicar por semana?',
        options: [
            { text: '2-3 horas', icon: 'fa-clock', tags: ['poco'] },
            { text: '4-6 horas', icon: 'fa-clock', tags: ['medio'] },
            { text: '7+ horas — estoy comprometido', icon: 'fa-fire', tags: ['mucho'] }
        ]
    }
];

const courseRecommendations = {
    'office,datos': { id: 'excel-basico-avanzado', reason: 'Excel es la herramienta #1 para datos y reportes' },
    'office': { id: 'google-workspace', reason: 'Google Workspace potencia tu productividad diaria' },
    'datos': { id: 'power-bi', reason: 'Power BI es el estándar en visualización de datos' },
    'datos,avanzado': { id: 'analitica-datos', reason: 'Analítica de Datos es ideal para especializarte' },
    'programacion,basico': { id: 'python-basico', reason: 'Python es el lenguaje más demandado para principiantes' },
    'programacion': { id: 'desarrollo-web', reason: 'Desarrollo Web tiene alta demanda y resultados visibles' },
    'programacion,intermedio': { id: 'sql-bases-datos', reason: 'SQL es imprescindible para cualquier desarrollador' },
    'gestion': { id: 'gestion-proyectos-scrum', reason: 'Scrum es la metodología más usada en empresas modernas' },
    'idiomas': { id: 'ingles-general', reason: 'Inglés abre puertas en cualquier industria' },
    'default': { id: 'excel-basico-avanzado', reason: 'Excel es la habilidad más versátil para comenzar' }
};

let quizStep = 0;
let quizAnswers = [];

function initQuizFinder() {
    const container = document.getElementById('quizFinderContent');
    if (!container) return;
    renderQuizStep();
}

function renderQuizStep() {
    const container = document.getElementById('quizFinderContent');
    if (!container) return;

    if (quizStep >= quizQuestions.length) {
        renderQuizResult();
        return;
    }

    const q = quizQuestions[quizStep];
    const totalSteps = quizQuestions.length;

    const dotsHTML = Array.from({ length: totalSteps }, (_, i) => {
        let cls = 'quiz-progress-dot';
        if (i < quizStep) cls += ' done';
        if (i === quizStep) cls += ' active';
        return `<div class="${cls}"></div>`;
    }).join('');

    const optionsHTML = q.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectQuizOption(${i})">
            <i class="fas ${opt.icon}"></i> ${opt.text}
        </div>
    `).join('');

    container.innerHTML = `
        <div class="quiz-progress">${dotsHTML}</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">${optionsHTML}</div>
        <p style="font-size:0.8rem;color:var(--text-muted);">Pregunta ${quizStep + 1} de ${totalSteps}</p>
    `;
}

window.selectQuizOption = function(index) {
    const q = quizQuestions[quizStep];
    quizAnswers.push(q.options[index].tags);

    // Animate selection
    const options = document.querySelectorAll('.quiz-option');
    options[index].classList.add('selected');

    setTimeout(() => {
        quizStep++;
        renderQuizStep();
    }, 400);
};

function renderQuizResult() {
    const container = document.getElementById('quizFinderContent');
    if (!container) return;

    // Flatten all tags
    const allTags = quizAnswers.flat();

    // Find best match
    let bestMatch = courseRecommendations['default'];
    let bestScore = 0;

    for (const [key, rec] of Object.entries(courseRecommendations)) {
        if (key === 'default') continue;
        const keyTags = key.split(',');
        const score = keyTags.filter(t => allTags.includes(t)).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = rec;
        }
    }

    // Find course data for color/icon
    const courseColors = {
        'excel-basico-avanzado': { color: '#4CAF50', icon: 'fa-file-excel', title: 'Excel Básico a Avanzado' },
        'google-workspace': { color: '#2196F3', icon: 'fab fa-google', title: 'Google Workspace Completo' },
        'power-bi': { color: '#FFB800', icon: 'fa-chart-pie', title: 'Power BI' },
        'desarrollo-web': { color: '#FF5722', icon: 'fa-code', title: 'Desarrollo Web' },
        'python-basico': { color: '#3776AB', icon: 'fab fa-python', title: 'Python desde Cero' },
        'sql-bases-datos': { color: '#2196F3', icon: 'fa-database', title: 'SQL y Bases de Datos' },
        'gestion-proyectos-scrum': { color: '#FF9800', icon: 'fa-diagram-project', title: 'Gestión de Proyectos / Scrum' },
        'analitica-datos': { color: '#E91E63', icon: 'fa-chart-line', title: 'Analítica de Datos' },
        'ingles-general': { color: '#E91E63', icon: 'fa-language', title: 'Inglés General (A1-C1)' }
    };

    const course = courseColors[bestMatch.id] || courseColors['excel-basico-avanzado'];
    const iconClass = course.icon.startsWith('fab') ? course.icon : `fas ${course.icon}`;

    container.innerHTML = `
        <div class="quiz-result">
            <div class="quiz-result-icon" style="background:${course.color};">
                <i class="${iconClass}"></i>
            </div>
            <h3>${course.title}</h3>
            <p>${bestMatch.reason}</p>
            <a href="cursos/curso.html?id=${bestMatch.id}" class="btn btn-primary" style="margin-bottom:12px;">
                <i class="fas fa-arrow-right"></i> Ver Este Curso
            </a>
            <br>
            <button onclick="resetQuiz()" style="background:none;border:none;color:var(--teal);cursor:pointer;font-size:0.88rem;font-weight:600;font-family:'DM Sans',sans-serif;margin-top:8px;">
                <i class="fas fa-redo"></i> Volver a intentar
            </button>
        </div>
    `;

    // Confetti!
    if (typeof triggerConfetti === 'function') triggerConfetti();
}

window.resetQuiz = function() {
    quizStep = 0;
    quizAnswers = [];
    renderQuizStep();
};

// =========================
// FLOATING CHATBOT
// =========================

let chatbotOpen = false;

function initChatbot() {
    const fab = document.getElementById('chatbotFab');
    if (!fab) return;
    // Show chatbot after 3 seconds
    setTimeout(() => { fab.style.display = 'block'; }, 3000);
}

window.toggleChatbot = function() {
    const win = document.getElementById('chatbotWindow');
    if (!win) return;
    chatbotOpen = !chatbotOpen;
    win.classList.toggle('open', chatbotOpen);

    const btn = document.querySelector('.chatbot-toggle i:not(.pulse-ring)');
    if (btn) {
        btn.className = chatbotOpen ? 'fas fa-times' : 'fas fa-comment-dots';
    }
};

window.chatOption = function(action) {
    const body = document.getElementById('chatbotBody');
    if (!body) return;

    const responses = {
        inscribir: `
            <div class="chat-bubble">Para inscribirte, tienes dos opciones:</div>
            <div class="chat-bubble">
                <strong>Opción 1: Registro en la plataforma</strong><br>
                Haz clic en <a href="#" onclick="openAuthModal('register');toggleChatbot();" style="color:var(--teal);font-weight:600;">Registrarse</a> y crea tu cuenta gratis.<br><br>
                <strong>Opción 2: Inscripción por WhatsApp</strong><br>
                <a href="https://wa.me/573188383917?text=${encodeURIComponent('Hola, quiero inscribirme en los cursos de la Fundación Iberoamericana.\n\nMi nombre es: \nCurso de interés: \n\n¿Podrían ayudarme con el proceso de registro?')}" target="_blank" style="color:#25D366;font-weight:600;">
                    <i class="fab fa-whatsapp"></i> Escríbenos por WhatsApp
                </a> y te guiamos en el proceso.
            </div>
        `,
        nosaber: `
            <div class="chat-bubble">No te preocupes, es normal. Te recomiendo:</div>
            <div class="chat-bubble">
                Toma nuestro <a href="#quiz-finder" style="color:var(--teal);font-weight:600;" onclick="toggleChatbot()">Quiz "¿Qué curso es para ti?"</a> — son 4 preguntas rápidas y te damos una recomendación personalizada.<br><br>
                O cuéntanos tus intereses por <a href="https://wa.me/573188383917?text=${encodeURIComponent('Hola, no sé qué curso es mejor para mí. ¿Podrían orientarme?\n\nMe interesa: \nMi experiencia actual: ')}" target="_blank" style="color:#25D366;font-weight:600;">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a> y te asesoramos.
            </div>
        `,
        duda: `
            <div class="chat-bubble">Puedes contactarnos por:</div>
            <div class="chat-bubble">
                <i class="fab fa-whatsapp" style="color:#25D366;"></i> <strong><a href="https://wa.me/573188383917?text=${encodeURIComponent('Hola, tengo una consulta sobre los cursos de la Fundación Iberoamericana.')}" target="_blank" style="color:#25D366;font-weight:600;">WhatsApp</a></strong> — Respuesta rápida<br>
                <i class="fab fa-facebook" style="color:#1877F2;"></i> <strong>Facebook</strong> — <a href="https://www.facebook.com/fundacioniberoamericana" target="_blank" style="color:var(--teal);font-weight:600;">Fundación Iberoamericana</a><br>
                <i class="fas fa-envelope" style="color:var(--gold);"></i> <strong>Email</strong> — contacto@fundacioniberoamericana.com
            </div>
        `,
        profesor: `
            <div class="chat-bubble">Si eres profesor o coordinador:</div>
            <div class="chat-bubble">
                Accede al <a href="teacher.html" style="color:var(--teal);font-weight:600;">Panel del Profesor</a> con tu contraseña de coordinación.<br><br>
                Consulta la <a href="guides/guia-profesor.html" style="color:var(--teal);font-weight:600;">Guía del Profesor</a> para aprender a gestionar cursos.
            </div>
        `
    };

    body.innerHTML = responses[action] || '<div class="chat-bubble">Lo siento, no entendí. Intenta otra opción.</div>';
    body.innerHTML += `
        <button onclick="resetChat()" style="background:none;border:none;color:var(--teal);cursor:pointer;font-size:0.82rem;font-weight:600;margin-top:8px;font-family:'DM Sans',sans-serif;">
            <i class="fas fa-arrow-left"></i> Volver al menú
        </button>
    `;
};

window.resetChat = function() {
    const body = document.getElementById('chatbotBody');
    if (!body) return;
    body.innerHTML = `
        <div class="chat-bubble">Hola, soy el asistente de Fundación Iberoamericana. ¿En qué te puedo ayudar?</div>
        <div class="chat-options">
            <button class="chat-option-btn" onclick="chatOption('inscribir')"><i class="fas fa-graduation-cap"></i> Quiero inscribirme</button>
            <button class="chat-option-btn" onclick="chatOption('nosaber')"><i class="fas fa-compass"></i> No sé qué estudiar</button>
            <button class="chat-option-btn" onclick="chatOption('duda')"><i class="fas fa-question-circle"></i> Tengo una duda</button>
            <button class="chat-option-btn" onclick="chatOption('profesor')"><i class="fas fa-chalkboard-teacher"></i> Soy profesor</button>
        </div>
    `;
};

// =========================
// CERTIFICATE PREVIEW
// =========================

function initCertPreview() {
    const input = document.getElementById('certPreviewInput');
    const nameEl = document.getElementById('certPreviewName');
    if (!input || !nameEl) return;

    input.addEventListener('input', (e) => {
        const name = e.target.value.trim();
        nameEl.textContent = name || 'Tu Nombre Aquí';
    });
}

// =========================
// TESTIMONIALS CAROUSEL
// =========================

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const prevBtn = track.parentElement.querySelector('.testimonial-prev');
    const nextBtn = track.parentElement.querySelector('.testimonial-next');

    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayDelay = 5000;

    // Calculate how many cards fit in view
    function getVisibleCount() {
        const containerWidth = track.parentElement.offsetWidth - 84; // minus nav buttons
        const cardWidth = cards[0].offsetWidth + 20; // card + gap
        return Math.max(1, Math.floor(containerWidth / cardWidth));
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    // Build dots
    function buildDots() {
        dotsContainer.innerHTML = '';
        const max = getMaxIndex();
        for (let i = 0; i <= max; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot' + (i === currentIndex ? ' active' : '');
            dot.setAttribute('aria-label', 'Reseña ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        const max = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, max));
        const cardWidth = cards[0].offsetWidth + 20;
        track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
        updateDots();
    }

    function next() {
        const max = getMaxIndex();
        goTo(currentIndex >= max ? 0 : currentIndex + 1);
    }

    function prev() {
        const max = getMaxIndex();
        goTo(currentIndex <= 0 ? max : currentIndex - 1);
    }

    // Auto-play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(next, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    // Events
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoPlay(); });

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Rebuild on resize
    window.addEventListener('resize', () => {
        buildDots();
        goTo(Math.min(currentIndex, getMaxIndex()));
    });

    buildDots();
    startAutoPlay();
}
