/**
 * main.js — JavaScript Principal
 * Fundación Iberoamericana — Portal de Aprendizaje
 *
 * Funcionalidades:
 * - Navegación (hamburguesa, scroll suave, header sticky)
 * - Carga y renderizado de cursos desde JSON
 * - Filtrado y búsqueda de cursos
 * - Modal de detalle de curso
 * - Animaciones al hacer scroll
 */

// =========================
// DATOS (fallback si fetch falla)
// =========================

// Datos de cursos se cargan desde JSON, pero tenemos fallback hardcoded
let cursosData = [];

// Datos de cursos hardcoded como fallback (subset para que funcione sin servidor)
const cursosFallback = [
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
        descripcionCompleta: "Domina todas las herramientas de Google Workspace para trabajar de forma colaborativa y eficiente.",
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
        descripcionCompleta: "Aprende a transformar datos crudos en visualizaciones interactivas y reportes de negocio con Microsoft Power BI.",
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
        descripcionCompleta: "Curso práctico de desarrollo web front-end donde construirás sitios web reales desde cero.",
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
        descripcionCompleta: "Curso introductorio de Python orientado a principiantes absolutos.",
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
        descripcionCompleta: "Aprende a consultar y manipular bases de datos relacionales con SQL.",
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
        descripcionCompleta: "Aprende a gestionar proyectos con metodologías ágiles y tradicionales.",
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
        descripcionCompleta: "Curso integral de análisis de datos que cubre todo el proceso analítico.",
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
    }
];

// Categoría activa actual
let categoriaActiva = 'all';
let busquedaActiva = '';

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    cargarCursos();
    inicializarNavegacion();

    inicializarModal();
    inicializarBusqueda();
}

// =========================
// CARGA DE CURSOS
// =========================

async function cargarCursos() {
    try {
        const response = await fetch('data/cursos.json');
        if (!response.ok) throw new Error('No se pudo cargar el JSON');
        cursosData = await response.json();
    } catch (error) {
        // Fallback: usar datos hardcoded (funciona sin servidor)
        console.warn('Usando datos locales (fetch falló):', error.message);
        cursosData = cursosFallback;
    }
    renderizarCursos();
}

// =========================
// RENDERIZADO DE CURSOS
// =========================

function renderizarCursos() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;

    // Filtrar por categoría y búsqueda
    let cursosFiltrados = cursosData;

    if (categoriaActiva !== 'all') {
        cursosFiltrados = cursosFiltrados.filter(c => c.categoria === categoriaActiva);
    }

    if (busquedaActiva) {
        const termino = busquedaActiva.toLowerCase();
        cursosFiltrados = cursosFiltrados.filter(c =>
            c.titulo.toLowerCase().includes(termino) ||
            c.descripcionCorta.toLowerCase().includes(termino) ||
            c.categoriaLabel.toLowerCase().includes(termino)
        );
    }

    // Renderizar
    if (cursosFiltrados.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <p>No se encontraron cursos con ese criterio.</p>
            </div>`;
        return;
    }

    grid.innerHTML = cursosFiltrados.map(curso => crearTarjetaCurso(curso)).join('');
    if (typeof refreshStaggerGrids === 'function') refreshStaggerGrids();
}

function crearTarjetaCurso(curso) {
    const iconoClass = curso.icono.startsWith('fab') ? curso.icono : `fas ${curso.icono}`;
    const estadoBadge = curso.estado === 'proximamente'
        ? '<span class="level-badge" style="background:#E3F2FD;color:#1565C0;">Próximamente</span>'
        : '';

    return `
    <div class="course-card" data-curso-id="${curso.id}">
        <div class="course-banner" style="background: linear-gradient(135deg, ${curso.color}, ${curso.color}88);"></div>
        <div class="course-body">
            <div class="course-category" style="color: ${curso.color};">
                <i class="${iconoClass}"></i> ${curso.categoriaLabel}
            </div>
            <h3 class="course-title">${curso.titulo}</h3>
            <p class="course-desc">${curso.descripcionCorta}</p>
            <div class="course-meta">
                <span class="course-meta-item"><i class="fas fa-signal"></i> ${curso.nivel}</span>
                <span class="course-meta-item"><i class="fas fa-clock"></i> ${curso.duracion}</span>
                <span class="course-meta-item"><i class="fas fa-book"></i> ${curso.modulosTotales} módulos</span>
            </div>
            <div class="course-footer">
                <span class="level-badge level-${curso.nivelClase}">${curso.nivel}</span>
                ${estadoBadge}
                <button class="course-btn" onclick="abrirModal('${curso.id}')">
                    Ver Curso <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// =========================
// FILTRADO POR CATEGORÍA
// =========================

// Función global para los botones de tab
window.filterCourses = function(categoria, e) {
    categoriaActiva = categoria;

    // Actualizar tabs activos
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (e && e.target) e.target.classList.add('active');

    renderizarCursos();
};

// =========================
// BÚSQUEDA
// =========================

function inicializarBusqueda() {
    const searchInput = document.getElementById('searchCursos');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        busquedaActiva = e.target.value.trim();
        renderizarCursos();
    });
}

// =========================
// MODAL DE DETALLE
// =========================

function inicializarModal() {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay) return;

    // Cerrar al hacer clic fuera del modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) cerrarModal();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModal();
    });
}

window.abrirModal = function(cursoId) {
    const curso = cursosData.find(c => c.id === cursoId);
    if (!curso) return;

    const overlay = document.getElementById('modalOverlay');
    const contenido = document.getElementById('modalContent');

    const iconoClass = curso.icono.startsWith('fab') ? curso.icono : `fas ${curso.icono}`;

    // Construir lista de módulos
    const modulosHTML = (curso.modulos || []).map((mod, i) => `
        <li>
            <i class="fas fa-play-circle"></i>
            <span><strong>Módulo ${i + 1}:</strong> ${mod.titulo}</span>
            <span style="margin-left:auto;color:var(--text-muted);font-size:0.8rem;">${mod.duracion}</span>
        </li>
    `).join('');

    // Construir lista de requisitos
    const requisitosHTML = (curso.requisitos || []).map(req => `
        <li><i class="fas fa-check-circle"></i> ${req}</li>
    `).join('');

    contenido.innerHTML = `
        <div class="modal-header">
            <div>
                <span class="modal-category" style="color:${curso.color};"><i class="${iconoClass}"></i> ${curso.categoriaLabel}</span>
            </div>
            <button class="modal-close" onclick="cerrarModal()" aria-label="Cerrar">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <h2>${curso.titulo}</h2>
            <div class="modal-meta">
                <span class="modal-meta-item"><i class="fas fa-signal"></i> ${curso.nivel}</span>
                <span class="modal-meta-item"><i class="fas fa-clock"></i> ${curso.duracion}</span>
                <span class="modal-meta-item"><i class="fas fa-book"></i> ${curso.modulosTotales} módulos</span>
                <span class="modal-meta-item"><i class="fas fa-clipboard-check"></i> ${curso.quizzesTotales} quizzes</span>
            </div>
            <p class="modal-desc">${curso.descripcionCompleta || curso.descripcionCorta}</p>

            <h4 class="modal-section-title"><i class="fas fa-list-ol"></i> Módulos del Curso</h4>
            <ul class="modal-modules-list">
                ${modulosHTML}
            </ul>

            <h4 class="modal-section-title"><i class="fas fa-exclamation-circle"></i> Requisitos</h4>
            <ul class="modal-requirements">
                ${requisitosHTML}
            </ul>
        </div>
        <div class="modal-footer">
            <a href="${curso.googleClassroomUrl || '#'}" target="_blank" class="btn btn-primary" style="flex:1;justify-content:center;">
                <i class="fas fa-graduation-cap"></i> Inscribirme en Google Classroom
            </a>
            <button class="btn btn-outline" onclick="cerrarModal()" style="flex:0;">
                Cerrar
            </button>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.cerrarModal = function() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// =========================
// NAVEGACIÓN
// =========================

function inicializarNavegacion() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Cerrar menú al hacer clic en un enlace (móvil)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Scroll suave para enlaces con hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

