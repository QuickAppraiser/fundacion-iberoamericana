/**
 * recursos.js — Biblioteca de Recursos
 * Fundación Iberoamericana
 *
 * Funcionalidades:
 * - Catálogo de recursos organizados por tipo y curso
 * - Filtrado por tipo (PDF, plantilla, cheatsheet, video, externo)
 * - Búsqueda por nombre
 * - Recursos externos recomendados
 */

// =========================
// DATOS DE RECURSOS
// =========================

const recursosData = [
    {
        id: 'excel-formulas-pdf',
        titulo: 'Guía de Fórmulas de Excel',
        curso: 'Excel Básico a Avanzado',
        tipo: 'pdf',
        tipoLabel: 'PDF',
        descripcion: 'Referencia completa de las 50 fórmulas más usadas en Excel con ejemplos prácticos.',
        icono: 'fa-file-pdf',
        iconoColor: '#F44336',
        iconoBg: 'rgba(244,67,54,0.1)',
        formato: 'PDF',
        tamano: '2.4 MB',
        url: '#'
    },
    {
        id: 'excel-atajos-cheat',
        titulo: 'Atajos de Teclado — Excel',
        curso: 'Excel Básico a Avanzado',
        tipo: 'cheatsheet',
        tipoLabel: 'Cheat Sheet',
        descripcion: 'Todos los atajos de teclado esenciales para ser más productivo en Excel.',
        icono: 'fa-keyboard',
        iconoColor: '#4CAF50',
        iconoBg: 'rgba(76,175,80,0.1)',
        formato: 'PDF',
        tamano: '850 KB',
        url: '#'
    },
    {
        id: 'excel-plantilla-dashboard',
        titulo: 'Plantilla: Dashboard de Ventas',
        curso: 'Excel Básico a Avanzado',
        tipo: 'plantilla',
        tipoLabel: 'Plantilla',
        descripcion: 'Plantilla lista para usar de un dashboard de ventas con gráficos dinámicos.',
        icono: 'fa-file-excel',
        iconoColor: '#4CAF50',
        iconoBg: 'rgba(76,175,80,0.1)',
        formato: 'XLSX',
        tamano: '1.8 MB',
        url: '#'
    },
    {
        id: 'html-cheatsheet',
        titulo: 'HTML5 Cheat Sheet',
        curso: 'Desarrollo Web',
        tipo: 'cheatsheet',
        tipoLabel: 'Cheat Sheet',
        descripcion: 'Referencia visual de todas las etiquetas HTML5 con ejemplos de uso.',
        icono: 'fa-code',
        iconoColor: '#FF5722',
        iconoBg: 'rgba(255,87,34,0.1)',
        formato: 'PDF',
        tamano: '1.2 MB',
        url: '#'
    },
    {
        id: 'css-flexbox-grid',
        titulo: 'Guía Visual: Flexbox y Grid',
        curso: 'Desarrollo Web',
        tipo: 'pdf',
        tipoLabel: 'PDF',
        descripcion: 'Guía visual completa de CSS Flexbox y Grid con diagramas interactivos.',
        icono: 'fa-th-large',
        iconoColor: '#2196F3',
        iconoBg: 'rgba(33,150,243,0.1)',
        formato: 'PDF',
        tamano: '3.1 MB',
        url: '#'
    },
    {
        id: 'js-plantilla-proyecto',
        titulo: 'Plantilla: Proyecto Web Starter',
        curso: 'Desarrollo Web',
        tipo: 'plantilla',
        tipoLabel: 'Plantilla',
        descripcion: 'Estructura base para iniciar un proyecto web con HTML, CSS y JS organizados.',
        icono: 'fa-folder-tree',
        iconoColor: '#FF5722',
        iconoBg: 'rgba(255,87,34,0.1)',
        formato: 'ZIP',
        tamano: '245 KB',
        url: '#'
    },
    {
        id: 'python-sintaxis',
        titulo: 'Python: Sintaxis Rápida',
        curso: 'Python desde Cero',
        tipo: 'cheatsheet',
        tipoLabel: 'Cheat Sheet',
        descripcion: 'Cheat sheet con sintaxis de Python: variables, listas, diccionarios, ciclos y funciones.',
        icono: 'fab fa-python',
        iconoColor: '#3776AB',
        iconoBg: 'rgba(55,118,171,0.1)',
        formato: 'PDF',
        tamano: '950 KB',
        url: '#'
    },
    {
        id: 'sql-comandos',
        titulo: 'SQL: Comandos Esenciales',
        curso: 'SQL y Bases de Datos',
        tipo: 'cheatsheet',
        tipoLabel: 'Cheat Sheet',
        descripcion: 'Referencia rápida de SELECT, JOIN, WHERE, GROUP BY, INSERT, UPDATE y DELETE.',
        icono: 'fa-database',
        iconoColor: '#2196F3',
        iconoBg: 'rgba(33,150,243,0.1)',
        formato: 'PDF',
        tamano: '780 KB',
        url: '#'
    },
    {
        id: 'powerbi-guia',
        titulo: 'Power BI: Guía de Inicio Rápido',
        curso: 'Power BI',
        tipo: 'pdf',
        tipoLabel: 'PDF',
        descripcion: 'Paso a paso para crear tu primer dashboard en Power BI Desktop.',
        icono: 'fa-chart-pie',
        iconoColor: '#FFB800',
        iconoBg: 'rgba(255,184,0,0.1)',
        formato: 'PDF',
        tamano: '4.5 MB',
        url: '#'
    },
    {
        id: 'scrum-plantilla',
        titulo: 'Plantilla: Sprint Board en Sheets',
        curso: 'Gestión de Proyectos',
        tipo: 'plantilla',
        tipoLabel: 'Plantilla',
        descripcion: 'Tablero Scrum con backlog, sprint actual y gráfico de burndown en Google Sheets.',
        icono: 'fa-diagram-project',
        iconoColor: '#FF9800',
        iconoBg: 'rgba(255,152,0,0.1)',
        formato: 'Google Sheets',
        tamano: 'Online',
        url: '#'
    },
    {
        id: 'gworkspace-guia',
        titulo: 'Google Workspace: Guía Completa',
        curso: 'Google Workspace',
        tipo: 'pdf',
        tipoLabel: 'PDF',
        descripcion: 'Guía de productividad con Docs, Sheets, Slides, Forms, Drive y Calendar.',
        icono: 'fab fa-google',
        iconoColor: '#4285F4',
        iconoBg: 'rgba(66,133,244,0.1)',
        formato: 'PDF',
        tamano: '5.2 MB',
        url: '#'
    },
    {
        id: 'video-excel-tablas',
        titulo: 'Video: Tablas Dinámicas en 20 min',
        curso: 'Excel Básico a Avanzado',
        tipo: 'video',
        tipoLabel: 'Video',
        descripcion: 'Tutorial en video de cómo crear y personalizar tablas dinámicas paso a paso.',
        icono: 'fa-play-circle',
        iconoColor: '#F44336',
        iconoBg: 'rgba(244,67,54,0.1)',
        formato: 'YouTube',
        tamano: '20 min',
        url: '#'
    }
];

const recursosExternos = [
    {
        titulo: 'Excel Jet',
        tipo: 'Referencia Web',
        descripcion: 'La mejor referencia online de fórmulas y funciones de Excel con ejemplos.',
        url: 'https://exceljet.net',
        icono: 'fa-file-excel',
        color: '#4CAF50'
    },
    {
        titulo: 'freeCodeCamp (YouTube)',
        tipo: 'Canal de YouTube',
        descripcion: 'Cursos completos gratuitos de programación: Python, JavaScript, SQL y más.',
        url: 'https://www.youtube.com/@freecodecamp',
        icono: 'fab fa-youtube',
        color: '#F44336'
    },
    {
        titulo: 'W3Schools',
        tipo: 'Tutorial Interactivo',
        descripcion: 'Tutoriales y referencia de HTML, CSS, JavaScript, SQL, Python con sandbox.',
        url: 'https://www.w3schools.com',
        icono: 'fa-graduation-cap',
        color: '#4CAF50'
    },
    {
        titulo: 'MDN Web Docs',
        tipo: 'Documentación',
        descripcion: 'Documentación oficial y completa de tecnologías web (HTML, CSS, JS).',
        url: 'https://developer.mozilla.org/es/',
        icono: 'fa-book',
        color: '#1B2A4A'
    },
    {
        titulo: 'Kaggle',
        tipo: 'Plataforma de Datos',
        descripcion: 'Datasets gratuitos, competencias de datos y notebooks de Python/R.',
        url: 'https://www.kaggle.com',
        icono: 'fa-chart-bar',
        color: '#20BEFF'
    },
    {
        titulo: 'Platzi (Blog)',
        tipo: 'Blog Educativo',
        descripcion: 'Artículos y guías en español sobre tecnología, programación y negocios.',
        url: 'https://platzi.com/blog/',
        icono: 'fa-blog',
        color: '#98CA3F'
    }
];

// =========================
// VARIABLES DE ESTADO
// =========================
let tipoRecursoActivo = 'all';
let busquedaRecurso = '';

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    renderizarRecursos();
    renderizarRecursosExternos();
    inicializarBusquedaRecursos();
    inicializarHamburger();
});

// =========================
// RENDERIZADO
// =========================

function renderizarRecursos() {
    const grid = document.getElementById('recursosGrid');
    if (!grid) return;

    let filtrados = recursosData;

    if (tipoRecursoActivo !== 'all') {
        filtrados = filtrados.filter(r => r.tipo === tipoRecursoActivo);
    }

    if (busquedaRecurso) {
        const termino = busquedaRecurso.toLowerCase();
        filtrados = filtrados.filter(r =>
            r.titulo.toLowerCase().includes(termino) ||
            r.curso.toLowerCase().includes(termino) ||
            r.descripcion.toLowerCase().includes(termino)
        );
    }

    if (filtrados.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-folder-open"></i>
                <p>No se encontraron recursos con ese criterio.</p>
            </div>`;
        return;
    }

    grid.innerHTML = filtrados.map(r => crearTarjetaRecurso(r)).join('');
    if (typeof refreshStaggerGrids === 'function') refreshStaggerGrids();
}

function crearTarjetaRecurso(recurso) {
    const iconoClass = recurso.icono.startsWith('fab') ? recurso.icono : `fas ${recurso.icono}`;
    return `
    <div class="recurso-card">
        <div class="recurso-icon" style="background:${recurso.iconoBg};color:${recurso.iconoColor};">
            <i class="${iconoClass}"></i>
        </div>
        <div class="recurso-info">
            <div class="recurso-curso">${recurso.curso}</div>
            <h4>${recurso.titulo}</h4>
            <p>${recurso.descripcion}</p>
            <div class="recurso-meta">
                <span><i class="fas fa-file"></i>${recurso.formato}</span>
                <span><i class="fas fa-weight-hanging"></i>${recurso.tamano}</span>
                <span class="level-badge" style="background:rgba(0,191,166,0.1);color:var(--teal);padding:2px 8px;">${recurso.tipoLabel}</span>
            </div>
        </div>
        <div class="recurso-download">
            <a href="${recurso.url}" target="_blank" title="Descargar ${recurso.titulo}">
                <i class="fas fa-download"></i>
            </a>
        </div>
    </div>`;
}

function renderizarRecursosExternos() {
    const grid = document.getElementById('recursosExternos');
    if (!grid) return;

    grid.innerHTML = recursosExternos.map(r => {
        const iconoClass = r.icono.startsWith('fab') ? r.icono : `fas ${r.icono}`;
        return `
        <div class="recurso-ext-card">
            <div class="recurso-ext-type"><i class="${iconoClass}" style="color:${r.color};margin-right:6px;"></i> ${r.tipo}</div>
            <h4>${r.titulo}</h4>
            <p>${r.descripcion}</p>
            <a href="${r.url}" target="_blank" class="recurso-ext-link">
                Visitar <i class="fas fa-arrow-right"></i>
            </a>
        </div>`;
    }).join('');
}

// =========================
// FILTRADO
// =========================

window.filterRecursos = function(tipo, e) {
    tipoRecursoActivo = tipo;
    document.querySelectorAll('#recursosTabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    if (e && e.target) e.target.classList.add('active');
    renderizarRecursos();
};

// =========================
// BÚSQUEDA
// =========================

function inicializarBusquedaRecursos() {
    const input = document.getElementById('searchRecursos');
    if (!input) return;
    input.addEventListener('input', (e) => {
        busquedaRecurso = e.target.value.trim();
        renderizarRecursos();
    });
}

// =========================
// HAMBURGER
// =========================

function inicializarHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
}
