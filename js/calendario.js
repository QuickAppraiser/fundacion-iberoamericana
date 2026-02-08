/**
 * calendario.js — Calendario y Horarios
 * Fundación Iberoamericana
 *
 * Funcionalidades:
 * - Calendario mensual navegable
 * - Eventos con tipos (clase, entrega, examen, especial)
 * - Lista de próximos eventos
 * - Navegación entre meses
 */

// =========================
// DATOS DE EVENTOS
// =========================

const eventosData = [
    {
        id: 1,
        titulo: 'Clase en Vivo: Excel Fórmulas',
        descripcion: 'Sesión práctica de fórmulas avanzadas: BUSCARV, INDICE/COINCIDIR.',
        tipo: 'clase',
        fecha: '2026-02-10',
        hora: '18:00 - 19:30',
        curso: 'Excel Básico a Avanzado'
    },
    {
        id: 2,
        titulo: 'Entrega: Proyecto HTML',
        descripcion: 'Subir tu página web personal al repositorio de GitHub.',
        tipo: 'entrega',
        fecha: '2026-02-14',
        hora: '23:59',
        curso: 'Desarrollo Web'
    },
    {
        id: 3,
        titulo: 'Examen: Python Módulo 2',
        descripcion: 'Examen de control de flujo, funciones y listas.',
        tipo: 'examen',
        fecha: '2026-02-17',
        hora: '10:00 - 11:00',
        curso: 'Python desde Cero'
    },
    {
        id: 4,
        titulo: 'Clase en Vivo: SQL JOINs',
        descripcion: 'Sesión interactiva de INNER, LEFT, RIGHT y FULL JOIN.',
        tipo: 'clase',
        fecha: '2026-02-19',
        hora: '18:00 - 19:30',
        curso: 'SQL y Bases de Datos'
    },
    {
        id: 5,
        titulo: 'Webinar: Tendencias IA 2026',
        descripcion: 'Charla especial sobre inteligencia artificial y su impacto profesional.',
        tipo: 'especial',
        fecha: '2026-02-21',
        hora: '17:00 - 18:30',
        curso: 'Evento General'
    },
    {
        id: 6,
        titulo: 'Entrega: Dashboard Power BI',
        descripcion: 'Presentar tu primer dashboard con al menos 4 visualizaciones.',
        tipo: 'entrega',
        fecha: '2026-02-25',
        hora: '23:59',
        curso: 'Power BI'
    },
    {
        id: 7,
        titulo: 'Clase en Vivo: Excel Tablas Dinámicas',
        descripcion: 'Cómo crear y personalizar tablas dinámicas para reportes.',
        tipo: 'clase',
        fecha: '2026-02-26',
        hora: '18:00 - 19:30',
        curso: 'Excel Básico a Avanzado'
    },
    {
        id: 8,
        titulo: 'Examen Final: Desarrollo Web',
        descripcion: 'Examen práctico: construir una página completa en 60 minutos.',
        tipo: 'examen',
        fecha: '2026-02-28',
        hora: '10:00 - 11:00',
        curso: 'Desarrollo Web'
    },
    {
        id: 9,
        titulo: 'Clase en Vivo: Google Workspace',
        descripcion: 'Productividad con Docs, Sheets y Slides colaborativos.',
        tipo: 'clase',
        fecha: '2026-03-03',
        hora: '18:00 - 19:30',
        curso: 'Google Workspace'
    },
    {
        id: 10,
        titulo: 'Hackathon: Datos Abiertos',
        descripcion: 'Evento especial de 4 horas para analizar un dataset real y presentar hallazgos.',
        tipo: 'especial',
        fecha: '2026-03-07',
        hora: '14:00 - 18:00',
        curso: 'Analítica de Datos'
    },
    {
        id: 11,
        titulo: 'Entrega: Script de Automatización',
        descripcion: 'Entregar un script Python que automatice una tarea repetitiva.',
        tipo: 'entrega',
        fecha: '2026-03-12',
        hora: '23:59',
        curso: 'Python desde Cero'
    },
    {
        id: 12,
        titulo: 'Examen: SQL Módulo 3 - JOINs',
        descripcion: 'Examen formal sobre joins, subconsultas y funciones de agregación.',
        tipo: 'examen',
        fecha: '2026-03-15',
        hora: '10:00 - 11:00',
        curso: 'SQL y Bases de Datos'
    }
];

// =========================
// VARIABLES DE ESTADO
// =========================

const mesesNombres = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    renderizarCalendario();
    renderizarProximosEventos();
    inicializarHamburger();
});

// =========================
// RENDERIZADO DEL CALENDARIO
// =========================

function renderizarCalendario() {
    // Actualizar título
    document.getElementById('calMonthTitle').textContent = `${mesesNombres[mesActual]} ${anioActual}`;

    const calBody = document.getElementById('calBody');
    if (!calBody) return;

    // Primer día del mes (0=Dom, 1=Lun, ...)
    const primerDia = new Date(anioActual, mesActual, 1).getDay();
    const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();
    const diasMesAnterior = new Date(anioActual, mesActual, 0).getDate();

    const hoy = new Date();
    const esHoyMes = hoy.getMonth() === mesActual && hoy.getFullYear() === anioActual;

    let html = '';

    // Días del mes anterior (relleno)
    for (let i = primerDia - 1; i >= 0; i--) {
        html += `<div class="cal-day other-month">${diasMesAnterior - i}</div>`;
    }

    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fechaStr = `${anioActual}-${String(mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const eventosDelDia = eventosData.filter(e => e.fecha === fechaStr);
        const esHoy = esHoyMes && dia === hoy.getDate();

        let clases = 'cal-day';
        if (esHoy) clases += ' today';

        if (eventosDelDia.length > 0) {
            clases += ' has-event';
            // Usar el tipo del primer evento para el color del punto
            clases += ` event-${eventosDelDia[0].tipo}`;
        }

        const tooltip = eventosDelDia.length > 0
            ? ` title="${eventosDelDia.map(e => e.titulo).join(', ')}"`
            : '';

        html += `<div class="${clases}"${tooltip} onclick="mostrarEventosDia('${fechaStr}')">${dia}</div>`;
    }

    // Días del mes siguiente (relleno hasta completar grid)
    const totalCeldas = primerDia + diasEnMes;
    const celdasFaltantes = totalCeldas % 7 === 0 ? 0 : 7 - (totalCeldas % 7);
    for (let i = 1; i <= celdasFaltantes; i++) {
        html += `<div class="cal-day other-month">${i}</div>`;
    }

    calBody.innerHTML = html;
}

// =========================
// NAVEGACIÓN DE MESES
// =========================

window.mesAnterior = function() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        anioActual--;
    }
    renderizarCalendario();
};

window.mesSiguiente = function() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        anioActual++;
    }
    renderizarCalendario();
};

window.irAHoy = function() {
    mesActual = new Date().getMonth();
    anioActual = new Date().getFullYear();
    renderizarCalendario();
};

// =========================
// EVENTOS DEL DÍA
// =========================

window.mostrarEventosDia = function(fechaStr) {
    const eventos = eventosData.filter(e => e.fecha === fechaStr);
    if (eventos.length === 0) return;

    // Scroll a la lista de eventos y mostrar solo los del día
    const lista = document.getElementById('eventsList');
    if (!lista) return;

    const fechaObj = new Date(fechaStr + 'T12:00:00');
    const fechaFormateada = fechaObj.toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    lista.innerHTML = `
        <div style="margin-bottom:12px;">
            <span style="font-size:0.82rem;font-weight:600;color:var(--teal);text-transform:capitalize;">${fechaFormateada}</span>
            <button onclick="renderizarProximosEventos()" style="float:right;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.8rem;">
                <i class="fas fa-times"></i> Ver todos
            </button>
        </div>
    ` + eventos.map(e => crearTarjetaEvento(e)).join('');

    lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// =========================
// PRÓXIMOS EVENTOS
// =========================

function renderizarProximosEventos() {
    const lista = document.getElementById('eventsList');
    if (!lista) return;

    const hoy = new Date().toISOString().split('T')[0];

    // Obtener eventos desde hoy en adelante, ordenados por fecha
    const proximos = eventosData
        .filter(e => e.fecha >= hoy)
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .slice(0, 6);

    if (proximos.length === 0) {
        lista.innerHTML = `
            <div class="empty-state" style="padding:32px 16px;">
                <i class="fas fa-calendar-check"></i>
                <p>No hay eventos próximos programados.</p>
            </div>`;
        return;
    }

    lista.innerHTML = proximos.map(e => crearTarjetaEvento(e)).join('');
}

function crearTarjetaEvento(evento) {
    const fechaObj = new Date(evento.fecha + 'T12:00:00');
    const opciones = { weekday: 'short', month: 'short', day: 'numeric' };
    const fechaCorta = fechaObj.toLocaleDateString('es-MX', opciones);

    const tipoIconos = {
        clase: 'fa-video',
        entrega: 'fa-file-arrow-up',
        examen: 'fa-clipboard-check',
        especial: 'fa-star'
    };

    return `
    <div class="event-card tipo-${evento.tipo}">
        <div class="event-card-date" style="text-transform:capitalize;">${fechaCorta}</div>
        <h4>${evento.titulo}</h4>
        <p>${evento.descripcion}</p>
        <div class="event-card-time">
            <i class="fas ${tipoIconos[evento.tipo] || 'fa-calendar'}"></i>
            ${evento.hora} &middot; ${evento.curso}
        </div>
    </div>`;
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
