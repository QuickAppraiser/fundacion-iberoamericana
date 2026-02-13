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
// DATOS DE RECURSOS (fallback)
// =========================

const recursosFallback = [
    { id: 'excel-formulas-pdf', titulo: 'Guía de Fórmulas de Excel', curso: 'Excel Básico a Avanzado', tipo: 'pdf', tipoLabel: 'PDF', descripcion: 'Referencia completa de las 50 fórmulas más usadas en Excel con ejemplos prácticos.', icono: 'fa-file-pdf', iconoColor: '#F44336', iconoBg: 'rgba(244,67,54,0.1)', formato: 'PDF', tamano: '2.4 MB', url: '#' },
    { id: 'html-cheatsheet', titulo: 'HTML5 Cheat Sheet', curso: 'Desarrollo Web', tipo: 'cheatsheet', tipoLabel: 'Cheat Sheet', descripcion: 'Referencia visual de todas las etiquetas HTML5.', icono: 'fa-code', iconoColor: '#FF5722', iconoBg: 'rgba(255,87,34,0.1)', formato: 'PDF', tamano: '1.2 MB', url: '#' },
    { id: 'python-sintaxis', titulo: 'Python: Sintaxis Rápida', curso: 'Python desde Cero', tipo: 'cheatsheet', tipoLabel: 'Cheat Sheet', descripcion: 'Cheat sheet con sintaxis de Python.', icono: 'fab fa-python', iconoColor: '#3776AB', iconoBg: 'rgba(55,118,171,0.1)', formato: 'PDF', tamano: '950 KB', url: '#' }
];

const recursosExternosFallback = [
    { titulo: 'W3Schools', tipo: 'Tutorial Interactivo', descripcion: 'Tutoriales y referencia de HTML, CSS, JavaScript, SQL, Python.', url: 'https://www.w3schools.com', icono: 'fa-graduation-cap', color: '#4CAF50' },
    { titulo: 'freeCodeCamp', tipo: 'Canal de YouTube', descripcion: 'Cursos completos gratuitos de programación.', url: 'https://www.youtube.com/@freecodecamp', icono: 'fab fa-youtube', color: '#F44336' }
];

// =========================
// VARIABLES DE ESTADO
// =========================
let recursosData = [];
let recursosExternos = [];
let tipoRecursoActivo = 'all';
let busquedaRecurso = '';

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    cargarRecursos();
    inicializarBusquedaRecursos();
    inicializarHamburger();
});

async function cargarRecursos() {
    try {
        const response = await fetch('data/recursos.json');
        if (!response.ok) throw new Error('Fetch failed');
        const data = await response.json();
        recursosData = data.recursos || recursosFallback;
        recursosExternos = data.recursosExternos || recursosExternosFallback;
    } catch (e) {
        console.warn('Usando recursos de fallback:', e.message);
        recursosData = recursosFallback;
        recursosExternos = recursosExternosFallback;
    }
    renderizarRecursos();
    renderizarRecursosExternos();
}

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
