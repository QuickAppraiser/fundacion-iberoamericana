/**
 * curso-detalle.js — Motor de Páginas de Curso Individual
 * Fundación Iberoamericana
 *
 * Lee el parámetro ?id= de la URL, busca el curso en los datos
 * y renderiza la página completa dinámicamente.
 */

// Fallback data (same as main.js cursosFallback)
const cursosFallbackDetalle = [
    {
        id: "excel-basico-avanzado", titulo: "Excel Básico a Avanzado",
        categoria: "office", categoriaLabel: "Office & Productividad",
        nivel: "Básico → Avanzado", nivelClase: "basico",
        duracion: "40 horas", modulosTotales: 6, quizzesTotales: 12,
        icono: "fa-file-excel", iconoColor: "#4CAF50", color: "#4CAF50",
        descripcionCorta: "Domina hojas de cálculo, fórmulas, tablas dinámicas, macros y dashboards profesionales.",
        descripcionCompleta: "Curso integral de Microsoft Excel que te lleva desde los fundamentos básicos hasta técnicas avanzadas de análisis de datos. Aprenderás a crear fórmulas complejas, tablas dinámicas, gráficos profesionales, automatización con macros VBA, y dashboards interactivos para reportes empresariales.",
        requisitos: ["Computadora con Excel 2016 o superior", "Conocimientos básicos de computación"],
        modulos: [
            { titulo: "Fundamentos y Navegación", duracion: "5 horas" },
            { titulo: "Fórmulas y Funciones Esenciales", duracion: "8 horas" },
            { titulo: "Tablas Dinámicas y Gráficos", duracion: "8 horas" },
            { titulo: "Funciones Avanzadas", duracion: "7 horas" },
            { titulo: "Macros y Automatización VBA", duracion: "6 horas" },
            { titulo: "Dashboards y Reportes Profesionales", duracion: "6 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "google-workspace", titulo: "Google Workspace Completo",
        categoria: "office", categoriaLabel: "Office & Productividad",
        nivel: "Básico", nivelClase: "basico",
        duracion: "20 horas", modulosTotales: 5, quizzesTotales: 8,
        icono: "fab fa-google", iconoColor: "#2196F3", color: "#2196F3",
        descripcionCorta: "Docs, Sheets, Slides, Forms, Calendar y Drive para productividad personal y empresarial.",
        descripcionCompleta: "Domina todas las herramientas de Google Workspace para trabajar de forma colaborativa y eficiente. Aprenderás Google Docs para documentos profesionales, Sheets para análisis de datos, Slides para presentaciones impactantes, Forms para encuestas y evaluaciones, y Drive para gestión de archivos en la nube.",
        requisitos: ["Cuenta de Google (Gmail)", "Navegador web actualizado"],
        modulos: [
            { titulo: "Google Docs — Documentos Profesionales", duracion: "4 horas" },
            { titulo: "Google Sheets — Hojas de Cálculo", duracion: "5 horas" },
            { titulo: "Google Slides — Presentaciones", duracion: "3 horas" },
            { titulo: "Google Forms — Encuestas y Evaluaciones", duracion: "3 horas" },
            { titulo: "Drive, Calendar y Productividad", duracion: "5 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "power-bi", titulo: "Power BI — Visualización de Datos",
        categoria: "datos", categoriaLabel: "Datos & BI",
        nivel: "Intermedio", nivelClase: "intermedio",
        duracion: "20 horas", modulosTotales: 4, quizzesTotales: 8,
        icono: "fa-chart-pie", iconoColor: "#FFB800", color: "#FFB800",
        descripcionCorta: "Crea dashboards interactivos y reportes de inteligencia de negocios con Power BI Desktop.",
        descripcionCompleta: "Aprende a transformar datos crudos en visualizaciones interactivas y reportes de negocio con Microsoft Power BI. Desde conectar fuentes de datos hasta crear dashboards profesionales con DAX y publicar en Power BI Service.",
        requisitos: ["Conocimientos de Excel intermedio", "Computadora con Windows"],
        modulos: [
            { titulo: "Introducción y Conexión de Datos", duracion: "5 horas" },
            { titulo: "Modelado de Datos y Relaciones", duracion: "5 horas" },
            { titulo: "Visualizaciones y Dashboards", duracion: "5 horas" },
            { titulo: "DAX Avanzado y Publicación", duracion: "5 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "desarrollo-web", titulo: "Desarrollo Web (HTML, CSS, JS)",
        categoria: "programacion", categoriaLabel: "Programación",
        nivel: "Básico → Intermedio", nivelClase: "basico",
        duracion: "35 horas", modulosTotales: 5, quizzesTotales: 10,
        icono: "fa-code", iconoColor: "#FF5722", color: "#FF5722",
        descripcionCorta: "Crea sitios web desde cero con HTML5, CSS3 y JavaScript moderno.",
        descripcionCompleta: "Curso práctico de desarrollo web front-end donde construirás sitios web reales desde cero. Aprenderás HTML5 semántico, CSS3 con Flexbox y Grid, JavaScript ES6+, manipulación del DOM, y publicación en GitHub Pages.",
        requisitos: ["Computadora con navegador moderno", "Editor de código (VS Code)", "No se requiere experiencia previa"],
        modulos: [
            { titulo: "HTML5 — Estructura y Semántica", duracion: "7 horas" },
            { titulo: "CSS3 — Diseño y Layout", duracion: "8 horas" },
            { titulo: "JavaScript — Fundamentos", duracion: "8 horas" },
            { titulo: "JavaScript y el DOM", duracion: "6 horas" },
            { titulo: "Proyecto Final y Publicación", duracion: "6 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "python-basico", titulo: "Python desde Cero",
        categoria: "programacion", categoriaLabel: "Programación",
        nivel: "Básico", nivelClase: "basico",
        duracion: "25 horas", modulosTotales: 5, quizzesTotales: 10,
        icono: "fab fa-python", iconoColor: "#3776AB", color: "#3776AB",
        descripcionCorta: "Aprende el lenguaje más demandado del mercado. Desde variables hasta automatización.",
        descripcionCompleta: "Curso introductorio de Python orientado a principiantes absolutos. Aprenderás desde la instalación y configuración hasta crear programas funcionales con control de flujo, estructuras de datos, funciones y proyectos prácticos del mundo real.",
        requisitos: ["Computadora con acceso a internet", "No se requiere experiencia previa"],
        modulos: [
            { titulo: "Primeros Pasos con Python", duracion: "5 horas" },
            { titulo: "Control de Flujo", duracion: "5 horas" },
            { titulo: "Estructuras de Datos", duracion: "5 horas" },
            { titulo: "Funciones y Módulos", duracion: "5 horas" },
            { titulo: "Proyectos Prácticos", duracion: "5 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "sql-bases-datos", titulo: "SQL y Bases de Datos",
        categoria: "programacion", categoriaLabel: "Programación",
        nivel: "Básico → Intermedio", nivelClase: "basico",
        duracion: "25 horas", modulosTotales: 5, quizzesTotales: 10,
        icono: "fa-database", iconoColor: "#2196F3", color: "#2196F3",
        descripcionCorta: "Consulta, filtra y analiza datos con SQL. La habilidad más pedida en análisis de datos.",
        descripcionCompleta: "Aprende a consultar y manipular bases de datos relacionales con SQL. Desde SELECT básico hasta JOINs complejos, subconsultas, funciones de agregación y diseño de esquemas de bases de datos.",
        requisitos: ["Computadora con acceso a internet", "Conocimiento básico de Excel"],
        modulos: [
            { titulo: "Fundamentos de Bases de Datos", duracion: "5 horas" },
            { titulo: "Filtrado y Ordenamiento", duracion: "5 horas" },
            { titulo: "JOINs — Unir Tablas", duracion: "5 horas" },
            { titulo: "Subconsultas y Funciones", duracion: "5 horas" },
            { titulo: "Diseño y Manipulación de Datos", duracion: "5 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "gestion-proyectos-scrum", titulo: "Gestión de Proyectos / Scrum",
        categoria: "gestion", categoriaLabel: "Gestión & PM",
        nivel: "Básico → Intermedio", nivelClase: "basico",
        duracion: "15 horas", modulosTotales: 4, quizzesTotales: 8,
        icono: "fa-diagram-project", iconoColor: "#FF9800", color: "#FF9800",
        descripcionCorta: "Lidera proyectos con metodologías ágiles. Scrum, Kanban y herramientas modernas.",
        descripcionCompleta: "Aprende a gestionar proyectos con metodologías ágiles y tradicionales. Domina Scrum, Kanban, herramientas como Jira y Trello, y habilidades de liderazgo para dirigir equipos de trabajo efectivos.",
        requisitos: ["Experiencia laboral básica", "Ganas de mejorar tu organización"],
        modulos: [
            { titulo: "Fundamentos de Gestión de Proyectos", duracion: "4 horas" },
            { titulo: "Scrum: El Framework Ágil", duracion: "4 horas" },
            { titulo: "Kanban y Herramientas", duracion: "3 horas" },
            { titulo: "Liderazgo y Proyecto Final", duracion: "4 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "analitica-datos", titulo: "Analítica de Datos",
        categoria: "datos", categoriaLabel: "Datos & BI",
        nivel: "Intermedio", nivelClase: "intermedio",
        duracion: "30 horas", modulosTotales: 5, quizzesTotales: 10,
        icono: "fa-chart-line", iconoColor: "#E91E63", color: "#E91E63",
        descripcionCorta: "Aprende a tomar decisiones basadas en datos: recolección, limpieza, análisis y visualización.",
        descripcionCompleta: "Curso integral de análisis de datos que cubre todo el proceso analítico: desde la recolección y limpieza de datos hasta el análisis exploratorio, visualización profesional y presentación de insights para la toma de decisiones empresariales.",
        requisitos: ["Excel intermedio o Google Sheets", "Pensamiento lógico y analítico"],
        modulos: [
            { titulo: "Fundamentos del Análisis de Datos", duracion: "6 horas" },
            { titulo: "Limpieza y Preparación de Datos", duracion: "6 horas" },
            { titulo: "Análisis Exploratorio (EDA)", duracion: "6 horas" },
            { titulo: "Visualización de Datos", duracion: "6 horas" },
            { titulo: "Proyecto Final: Caso de Negocio", duracion: "6 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    },
    {
        id: "ingles-general", titulo: "Inglés General (A1-B2)",
        categoria: "idiomas", categoriaLabel: "Idiomas",
        nivel: "Básico → Intermedio", nivelClase: "basico",
        duracion: "30 horas", modulosTotales: 6, quizzesTotales: 12,
        icono: "fa-language", iconoColor: "#E91E63", color: "#E91E63",
        descripcionCorta: "Aprende inglés desde cero hasta nivel intermedio. Gramática, vocabulario, conversación y comprensión auditiva.",
        descripcionCompleta: "Curso integral de inglés que te lleva desde nivel principiante (A1) hasta intermedio (B2). Incluye gramática estructurada, vocabulario práctico, ejercicios de conversación, comprensión auditiva con materiales reales, y práctica de escritura. Ideal para profesionales que necesitan inglés en el ámbito laboral.",
        requisitos: ["No se requiere conocimiento previo de inglés", "Computadora con micrófono (para ejercicios de pronunciación)", "Acceso a internet"],
        modulos: [
            { titulo: "A1 — Fundamentos: Saludos, Presentaciones y Vocabulario Básico", duracion: "5 horas" },
            { titulo: "A1-A2 — Gramática Esencial: Presente Simple, Artículos, Pronombres", duracion: "5 horas" },
            { titulo: "A2 — Vida Cotidiana: Compras, Direcciones, Rutinas", duracion: "5 horas" },
            { titulo: "A2-B1 — Gramática Intermedia: Tiempos Verbales, Condicionales", duracion: "5 horas" },
            { titulo: "B1 — Conversación y Comprensión: Diálogos, Listening, Speaking", duracion: "5 horas" },
            { titulo: "B1-B2 — Inglés Profesional: Emails, Presentaciones, Vocabulario Técnico", duracion: "5 horas" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/XXXXX",
        estado: "activo"
    }
];

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    cargarCurso();
});

// ================================
// CORE FUNCTIONS
// ================================

function getCourseId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function cargarCurso() {
    const cursoId = getCourseId();
    if (!cursoId) {
        renderizarNoEncontrado();
        return;
    }

    let cursos = [];

    // Try fetching from JSON first
    try {
        const response = await fetch('../data/cursos.json');
        if (response.ok) {
            cursos = await response.json();
        } else {
            throw new Error('JSON fetch failed');
        }
    } catch (e) {
        // Fallback to hardcoded data
        cursos = cursosFallbackDetalle;
    }

    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) {
        renderizarNoEncontrado();
        return;
    }

    renderizarCurso(curso);
}

function renderizarCurso(curso) {
    const iconoClass = curso.icono.startsWith('fab') ? curso.icono : `fas ${curso.icono}`;

    // Update page title
    document.title = `${curso.titulo} | Fundación Iberoamericana`;

    // Update hero with course color
    const hero = document.getElementById('courseHero');
    if (hero) {
        hero.style.background = `linear-gradient(135deg, ${curso.color}dd 0%, ${curso.color}88 50%, var(--navy) 100%)`;
    }

    // Update hero badge
    const badge = document.getElementById('courseBadge');
    if (badge) {
        badge.innerHTML = `<i class="${iconoClass}"></i> ${curso.categoriaLabel}`;
    }

    // Update title
    const title = document.getElementById('courseTitle');
    if (title) {
        title.innerHTML = `<i class="${iconoClass}"></i> ${curso.titulo}`;
    }

    // Update subtitle
    const subtitle = document.getElementById('courseSubtitle');
    if (subtitle) {
        subtitle.textContent = curso.descripcionCorta;
    }

    // Build content
    const content = document.getElementById('courseContent');
    if (!content) return;

    // Meta row
    const metaHTML = `
        <div class="course-detail-meta">
            <div class="course-detail-meta-item">
                <i class="fas fa-signal" style="color:${curso.color};"></i> ${curso.nivel}
            </div>
            <div class="course-detail-meta-item">
                <i class="fas fa-clock" style="color:${curso.color};"></i> ${curso.duracion}
            </div>
            <div class="course-detail-meta-item">
                <i class="fas fa-book" style="color:${curso.color};"></i> ${curso.modulosTotales} módulos
            </div>
            <div class="course-detail-meta-item">
                <i class="fas fa-clipboard-check" style="color:${curso.color};"></i> ${curso.quizzesTotales} quizzes
            </div>
        </div>
    `;

    // Description
    const descHTML = `
        <div class="course-detail-description">
            ${curso.descripcionCompleta || curso.descripcionCorta}
        </div>
    `;

    // Modules
    const modulesHTML = (curso.modulos || []).map((mod, i) => `
        <div class="course-module-card">
            <div class="course-module-number" style="background:${curso.color};">
                ${i + 1}
            </div>
            <div class="course-module-info">
                <h4>${mod.titulo}</h4>
                <span><i class="fas fa-clock"></i> ${mod.duracion}</span>
            </div>
        </div>
    `).join('');

    // Requirements
    const reqHTML = (curso.requisitos || []).map(req => `
        <li><i class="fas fa-check-circle"></i> ${req}</li>
    `).join('');

    // Full content assembly
    content.innerHTML = `
        ${metaHTML}
        ${descHTML}

        <h3 class="course-detail-section-title">
            <i class="fas fa-list-ol"></i> Módulos del Curso
        </h3>
        ${modulesHTML}

        <h3 class="course-detail-section-title" style="margin-top:40px;">
            <i class="fas fa-exclamation-circle"></i> Requisitos
        </h3>
        <ul class="course-requirements-list">
            ${reqHTML}
        </ul>

        <div class="course-cta-section">
            <h3>¿Listo para comenzar?</h3>
            <p>Inscríbete en Google Classroom y empieza tu formación hoy mismo.</p>
            <a href="${curso.googleClassroomUrl || '#'}" target="_blank" class="btn btn-primary">
                <i class="fas fa-graduation-cap"></i> Inscribirme en Google Classroom
            </a>
        </div>
    `;
}

function renderizarNoEncontrado() {
    // Update title
    document.title = 'Curso no encontrado | Fundación Iberoamericana';

    // Hide hero subtitle
    const subtitle = document.getElementById('courseSubtitle');
    if (subtitle) subtitle.style.display = 'none';

    // Update title
    const title = document.getElementById('courseTitle');
    if (title) title.innerHTML = '';

    // Show 404
    const content = document.getElementById('courseContent');
    if (content) {
        content.innerHTML = `
            <div class="course-not-found">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Curso no encontrado</h2>
                <p>El curso que buscas no existe o ha sido retirado.</p>
                <a href="../index.html#cursos" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i> Ver Todos los Cursos
                </a>
            </div>
        `;
    }
}
