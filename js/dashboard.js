/**
 * dashboard.js — Lógica del Dashboard de Estudiante
 * Fundación Iberoamericana
 *
 * Gestiona:
 * - Onboarding (nombre del estudiante)
 * - Datos en localStorage (progreso, quizzes, logros)
 * - Renderizado de todas las secciones del dashboard
 * - Datos de demostración
 */

// =========================
// DATOS DE DEMO
// =========================

const datosDemo = {
    nombre: "Carlos Mendoza",
    cursosInscritos: ["excel-basico-avanzado", "sql-bases-datos", "power-bi", "python-basico"],
    progreso: {
        "excel-basico-avanzado": { modulosCompletados: ["excel-m1","excel-m2","excel-m3","excel-m4"], porcentaje: 67, leccionActual: "Macros y Automatización VBA" },
        "sql-bases-datos": { modulosCompletados: ["sql-m1","sql-m2"], porcentaje: 40, leccionActual: "JOINs — Unir Tablas" },
        "power-bi": { modulosCompletados: ["pbi-m1"], porcentaje: 25, leccionActual: "Modelado de Datos" },
        "python-basico": { modulosCompletados: [], porcentaje: 10, leccionActual: "Primeros Pasos con Python" }
    },
    quizResultados: [
        { quizId: "quiz-excel-m2", puntaje: 88, fecha: "2026-02-05", cursoId: "excel-basico-avanzado", titulo: "Fórmulas y Funciones" },
        { quizId: "quiz-excel-m3", puntaje: 73, fecha: "2026-02-03", cursoId: "excel-basico-avanzado", titulo: "Tablas Dinámicas" },
        { quizId: "quiz-web-m1", puntaje: 95, fecha: "2026-02-01", cursoId: "desarrollo-web", titulo: "HTML5 Estructura" }
    ],
    logros: [
        { id: "first-quiz", titulo: "Primer Quiz", descripcion: "Completaste tu primer quiz", icono: "fa-star", color: "#FFB800", fecha: "2026-01-28" },
        { id: "excel-warrior", titulo: "Guerrero Excel", descripcion: "Aprobaste 2 quizzes de Excel", icono: "fa-file-excel", color: "#4CAF50", fecha: "2026-02-01" },
        { id: "on-fire", titulo: "En Racha", descripcion: "3 días consecutivos de estudio", icono: "fa-fire", color: "#FF5722", fecha: "2026-02-06" }
    ]
};

// Catálogo de cursos (subset para el dashboard)
const cursoCatalogo = {
    "excel-basico-avanzado": { titulo: "Excel Básico a Avanzado", icono: "fas fa-file-excel", color: "#4CAF50", modulosTotales: 6 },
    "sql-bases-datos": { titulo: "SQL y Bases de Datos", icono: "fas fa-database", color: "#2196F3", modulosTotales: 5 },
    "power-bi": { titulo: "Power BI — Visualización", icono: "fas fa-chart-pie", color: "#FFB800", modulosTotales: 4 },
    "python-basico": { titulo: "Python desde Cero", icono: "fab fa-python", color: "#3776AB", modulosTotales: 5 },
    "desarrollo-web": { titulo: "Desarrollo Web (HTML, CSS, JS)", icono: "fas fa-code", color: "#FF5722", modulosTotales: 5 },
    "google-workspace": { titulo: "Google Workspace", icono: "fab fa-google", color: "#2196F3", modulosTotales: 5 },
    "gestion-proyectos-scrum": { titulo: "Gestión de Proyectos / Scrum", icono: "fas fa-diagram-project", color: "#FF9800", modulosTotales: 4 },
    "analitica-datos": { titulo: "Analítica de Datos", icono: "fas fa-chart-line", color: "#E91E63", modulosTotales: 5 }
};

// Logros posibles (los que aún no se obtienen)
const todosLosLogros = [
    { id: "first-quiz", titulo: "Primer Quiz", descripcion: "Completa tu primer quiz", icono: "fa-star", color: "#FFB800" },
    { id: "excel-warrior", titulo: "Guerrero Excel", descripcion: "Aprueba 2 quizzes de Excel", icono: "fa-file-excel", color: "#4CAF50" },
    { id: "on-fire", titulo: "En Racha", descripcion: "3 días consecutivos de estudio", icono: "fa-fire", color: "#FF5722" },
    { id: "perfect-score", titulo: "Puntaje Perfecto", descripcion: "Obtén 100% en un quiz", icono: "fa-bullseye", color: "#9C27B0" },
    { id: "polyglot", titulo: "Políglota", descripcion: "Inscríbete en 5 cursos", icono: "fa-language", color: "#00BCD4" },
    { id: "first-cert", titulo: "Primer Certificado", descripcion: "Obtén tu primer certificado", icono: "fa-certificate", color: "#FFB800" }
];

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    verificarOnboarding();
    renderizarDashboard();

    // Navegación hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
});

// =========================
// ONBOARDING
// =========================

function verificarOnboarding() {
    const nombre = localStorage.getItem('estudiante_nombre');
    const overlay = document.getElementById('onboarding');
    if (!nombre && overlay) {
        overlay.style.display = 'flex';
    }

    // Enter key para el input
    const input = document.getElementById('onboardName');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') completarOnboarding();
        });
    }
}

window.completarOnboarding = function() {
    const input = document.getElementById('onboardName');
    const nombre = input?.value.trim();
    if (!nombre) {
        input.style.borderColor = '#F44336';
        input.focus();
        return;
    }
    localStorage.setItem('estudiante_nombre', nombre);
    document.getElementById('onboarding').style.display = 'none';
    renderizarDashboard();
};

// =========================
// CERRAR SESIÓN
// =========================

window.cerrarSesionEstudiante = function() {
    localStorage.removeItem('estudiante_nombre');
    localStorage.removeItem('cursos_inscritos');
    localStorage.removeItem('progreso');
    localStorage.removeItem('quiz_resultados');
    localStorage.removeItem('logros');
    localStorage.removeItem('fi_xp');
    localStorage.removeItem('fi_streak');
    localStorage.removeItem('fi_last_activity');
    localStorage.removeItem('fi_last_login');
    window.location.href = 'index.html';
};

// =========================
// CARGAR DATOS DEMO
// =========================

window.cargarDatosDemo = function() {
    localStorage.setItem('estudiante_nombre', datosDemo.nombre);
    localStorage.setItem('cursos_inscritos', JSON.stringify(datosDemo.cursosInscritos));
    localStorage.setItem('progreso', JSON.stringify(datosDemo.progreso));
    localStorage.setItem('quiz_resultados', JSON.stringify(datosDemo.quizResultados));
    localStorage.setItem('logros', JSON.stringify(datosDemo.logros));

    // Gamification demo data
    localStorage.setItem('fi_xp', '780');
    localStorage.setItem('fi_streak', '5');
    localStorage.setItem('fi_last_activity', new Date().toDateString());
    localStorage.setItem('fi_last_login', new Date().toDateString());

    document.getElementById('onboarding').style.display = 'none';
    renderizarDashboard();

    // Re-render gamification widgets
    if (typeof renderGamificationWidget === 'function') renderGamificationWidget();
    if (typeof renderGamificationSidebar === 'function') renderGamificationSidebar();
    if (typeof renderLearningPath === 'function') renderLearningPath();
};

// =========================
// NAVEGACIÓN ENTRE SECCIONES
// =========================

window.cambiarSeccion = function(seccionId, elemento, e) {
    if (e) e.preventDefault();

    // Ocultar todas las secciones
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));

    // Mostrar la seleccionada
    const seccion = document.getElementById('seccion-' + seccionId);
    if (seccion) seccion.classList.add('active');

    // Actualizar menú activo
    document.querySelectorAll('.sidebar-menu a, .sidebar-menu button').forEach(a => a.classList.remove('active'));
    if (elemento) elemento.classList.add('active');
};

// =========================
// RENDERIZADO PRINCIPAL
// =========================

function renderizarDashboard() {
    const nombre = localStorage.getItem('estudiante_nombre') || 'Estudiante';
    const cursosInscritos = JSON.parse(localStorage.getItem('cursos_inscritos') || '[]');
    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    const quizResultados = JSON.parse(localStorage.getItem('quiz_resultados') || '[]');
    const logros = JSON.parse(localStorage.getItem('logros') || '[]');

    // Actualizar sidebar
    const iniciales = nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarName = document.getElementById('sidebarName');
    if (sidebarAvatar) sidebarAvatar.textContent = iniciales;
    if (sidebarName) sidebarName.textContent = nombre;

    // Bienvenida
    const welcomeMsg = document.getElementById('welcomeMsg');
    if (welcomeMsg) {
        welcomeMsg.textContent = `¡Hola, ${nombre}! Continúa donde te quedaste`;
    }

    // Stats
    renderizarStats(cursosInscritos, quizResultados, progreso);

    // Cursos en progreso
    renderizarCursosProgreso(cursosInscritos, progreso, 'courseProgressList');
    renderizarCursosProgreso(cursosInscritos, progreso, 'fullCourseList');

    // Actividad reciente
    renderizarActividad(quizResultados);

    // Próximas fechas
    renderizarFechas();

    // Certificados
    renderizarCertificados(cursosInscritos, progreso);

    // Logros
    renderizarLogros(logros);
}

// =========================
// STATS
// =========================

function renderizarStats(cursosInscritos, quizResultados, progreso) {
    const container = document.getElementById('statsRow');
    if (!container) return;

    const totalCursos = cursosInscritos.length;
    const totalQuizzes = quizResultados.length;
    const promedio = quizResultados.length > 0
        ? Math.round(quizResultados.reduce((sum, q) => sum + q.puntaje, 0) / quizResultados.length)
        : 0;
    const certificados = Object.values(progreso).filter(p => p.porcentaje >= 100).length;

    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(0,191,166,0.1);color:#00BFA6;">
                <i class="fas fa-book"></i>
            </div>
            <div class="stat-card-number" style="color:#00BFA6;">${totalCursos}</div>
            <div class="stat-card-label">${t('dash.cursosInscritos')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(33,150,243,0.1);color:#2196F3;">
                <i class="fas fa-clipboard-check"></i>
            </div>
            <div class="stat-card-number" style="color:#2196F3;">${totalQuizzes}</div>
            <div class="stat-card-label">${t('dash.quizzesCompletados')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(255,184,0,0.1);color:#FFB800;">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="stat-card-number" style="color:#FFB800;">${promedio}%</div>
            <div class="stat-card-label">${t('dash.promedioGeneral')}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(156,39,176,0.1);color:#9C27B0;">
                <i class="fas fa-certificate"></i>
            </div>
            <div class="stat-card-number" style="color:#9C27B0;">${certificados}</div>
            <div class="stat-card-label">${t('dash.certificadosObtenidos')}</div>
        </div>
    `;
}

// =========================
// CURSOS EN PROGRESO
// =========================

function renderizarCursosProgreso(cursosInscritos, progreso, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (cursosInscritos.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding:40px;">
                <i class="fas fa-book-open"></i>
                <p>No estás inscrito en ningún curso todavía.</p>
                <a href="index.html#cursos" class="btn btn-primary" style="margin-top:16px;">
                    <i class="fas fa-search"></i> Explorar Cursos
                </a>
            </div>`;
        return;
    }

    container.innerHTML = cursosInscritos.map(cursoId => {
        const curso = cursoCatalogo[cursoId];
        if (!curso) return '';
        const prog = progreso[cursoId] || { porcentaje: 0, leccionActual: 'Sin iniciar', modulosCompletados: [] };

        return `
        <div class="course-progress-card">
            <div class="cp-icon" style="background:${curso.color}15;color:${curso.color};">
                <i class="${curso.icono}"></i>
            </div>
            <div class="cp-info">
                <h4>${curso.titulo}</h4>
                <p>${prog.leccionActual} — ${prog.modulosCompletados.length}/${curso.modulosTotales} módulos</p>
                <div class="cp-bar">
                    <div class="cp-bar-fill" style="width:${prog.porcentaje}%;background:${curso.color};"></div>
                </div>
            </div>
            <div class="cp-percentage" style="color:${curso.color};">${prog.porcentaje}%</div>
            <div class="cp-action">
                <a href="quizzes.html" class="btn btn-primary" style="padding:10px 20px;font-size:0.85rem;">
                    ${t('dash.continuar')} <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>`;
    }).join('');
}

// =========================
// ACTIVIDAD RECIENTE
// =========================

function renderizarActividad(quizResultados) {
    const container = document.getElementById('activityList');
    if (!container) return;

    const actividades = [
        ...quizResultados.map(q => ({
            icono: 'fa-clipboard-check',
            color: q.puntaje >= 80 ? '#4CAF50' : q.puntaje >= 60 ? '#FFB800' : '#F44336',
            texto: `Completaste el quiz <strong>"${q.titulo || q.quizId}"</strong> con <strong>${q.puntaje}%</strong>`,
            fecha: q.fecha
        }))
    ];

    // Agregar actividades simuladas
    actividades.push(
        { icono: 'fa-book-open', color: '#2196F3', texto: 'Iniciaste el módulo <strong>"JOINs — Unir Tablas"</strong> en SQL', fecha: '2026-02-06' },
        { icono: 'fa-trophy', color: '#FFB800', texto: 'Obtuviste el badge <strong>"En Racha"</strong>', fecha: '2026-02-06' }
    );

    // Ordenar por fecha descendente
    actividades.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    container.innerHTML = actividades.slice(0, 5).map(act => `
        <div class="activity-item">
            <div class="activity-icon" style="background:${act.color}15;color:${act.color};">
                <i class="fas ${act.icono}"></i>
            </div>
            <div class="activity-text">${act.texto}</div>
            <div class="activity-time">${act.fecha}</div>
        </div>
    `).join('');
}

// =========================
// PRÓXIMAS FECHAS
// =========================

function renderizarFechas() {
    const container = document.getElementById('datesList');
    if (!container) return;

    const fechas = [
        { icono: 'fa-clipboard-check', color: '#F44336', texto: 'Quiz de <strong>Tablas Dinámicas</strong> — Excel', fecha: '2026-02-10' },
        { icono: 'fa-video', color: '#4CAF50', texto: 'Clase en vivo: <strong>Power Query</strong>', fecha: '2026-02-12' },
        { icono: 'fa-file-alt', color: '#2196F3', texto: 'Entrega proyecto <strong>SQL</strong>', fecha: '2026-02-15' },
        { icono: 'fa-graduation-cap', color: '#9C27B0', texto: 'Examen final <strong>Excel Avanzado</strong>', fecha: '2026-02-20' }
    ];

    container.innerHTML = fechas.map(f => `
        <div class="activity-item">
            <div class="activity-icon" style="background:${f.color}15;color:${f.color};">
                <i class="fas ${f.icono}"></i>
            </div>
            <div class="activity-text">${f.texto}</div>
            <div class="activity-time">${f.fecha}</div>
        </div>
    `).join('');
}

// =========================
// CERTIFICADOS
// =========================

function renderizarCertificados(cursosInscritos, progreso) {
    const container = document.getElementById('certGrid');
    if (!container) return;

    const allCursos = [...new Set([...cursosInscritos, ...Object.keys(cursoCatalogo).slice(0, 6)])];

    container.innerHTML = allCursos.map(cursoId => {
        const curso = cursoCatalogo[cursoId];
        if (!curso) return '';
        const prog = progreso[cursoId];
        const completado = prog && prog.porcentaje >= 100;
        const inscrito = cursosInscritos.includes(cursoId);

        if (completado) {
            return `
            <div class="cert-card">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                    <i class="${curso.icono}" style="color:${curso.color};font-size:1.2rem;"></i>
                    <h4>${curso.titulo}</h4>
                </div>
                <p style="color:#4CAF50;"><i class="fas fa-check-circle"></i> Curso completado</p>
                <a href="certificados.html" class="btn btn-primary" style="width:100%;justify-content:center;">
                    <i class="fas fa-download"></i> Descargar Certificado
                </a>
            </div>`;
        }

        return `
        <div class="cert-card locked">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                <i class="${curso.icono}" style="color:${curso.color};font-size:1.2rem;"></i>
                <h4>${curso.titulo}</h4>
            </div>
            <p><i class="fas fa-lock"></i> ${inscrito ? `Progreso: ${prog?.porcentaje || 0}%` : 'No inscrito'}</p>
            <button class="btn btn-outline" style="width:100%;justify-content:center;opacity:0.5;" disabled>
                <i class="fas fa-lock"></i> Certificado bloqueado
            </button>
        </div>`;
    }).join('');
}

// =========================
// LOGROS / BADGES
// =========================

function renderizarLogros(logrosObtenidos) {
    const container = document.getElementById('badgesGrid');
    if (!container) return;

    const logrosIds = logrosObtenidos.map(l => l.id);

    container.innerHTML = todosLosLogros.map(logro => {
        const obtenido = logrosIds.includes(logro.id);
        const datos = obtenido ? logrosObtenidos.find(l => l.id === logro.id) : logro;

        return `
        <div class="badge-card ${obtenido ? '' : 'locked'}">
            <div class="badge-icon" style="background:${(datos.color || logro.color)}15;color:${datos.color || logro.color};">
                <i class="fas ${datos.icono || logro.icono}"></i>
            </div>
            <h4>${datos.titulo || logro.titulo}</h4>
            <p>${datos.descripcion || logro.descripcion}</p>
            ${obtenido && datos.fecha ? `<p style="color:var(--teal);font-size:0.7rem;margin-top:4px;">${datos.fecha}</p>` : ''}
        </div>`;
    }).join('');
}
