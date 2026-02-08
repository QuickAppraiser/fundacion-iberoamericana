/**
 * certificados.js — Generador de Certificados
 * Coordinadora Paola Ferrer
 *
 * Funcionalidades:
 * - Formulario con validación
 * - Generador de ID único
 * - Vista previa en tiempo real
 * - Impresión como PDF (window.print)
 */

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();

    // Fecha por defecto: hoy
    const fechaInput = document.getElementById('certFecha');
    if (fechaInput) {
        fechaInput.value = new Date().toISOString().split('T')[0];
    }

    // Vista previa en tiempo real
    const inputs = ['certNombre', 'certCurso', 'certFecha', 'certCalificacion', 'certInstructor'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', actualizarVistaPrevia);
        if (el) el.addEventListener('change', actualizarVistaPrevia);
    });

    // Generar ID inicial
    generarIdCertificado();
    actualizarVistaPrevia();

    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
});

// =========================
// GENERAR ID ÚNICO
// =========================

function generarIdCertificado() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    const id = `CPF-${year}-${random}`;
    const el = document.getElementById('certId');
    if (el) el.textContent = id;
    return id;
}

// =========================
// VISTA PREVIA
// =========================

function actualizarVistaPrevia() {
    const nombre = document.getElementById('certNombre')?.value || 'Nombre del Estudiante';
    const curso = document.getElementById('certCurso')?.value || 'Nombre del Curso';
    const fecha = document.getElementById('certFecha')?.value || new Date().toISOString().split('T')[0];
    const calificacion = document.getElementById('certCalificacion')?.value || '0';
    const instructor = document.getElementById('certInstructor')?.value || 'Coordinadora Paola Ferrer';

    // Formatear fecha
    const fechaObj = new Date(fecha + 'T12:00:00');
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-MX', opciones);

    // Actualizar elementos del certificado
    const certNombreEl = document.getElementById('certPreviewNombre');
    const certCursoEl = document.getElementById('certPreviewCurso');
    const certFechaEl = document.getElementById('certPreviewFecha');
    const certCalifEl = document.getElementById('certPreviewCalif');
    const certInstrEl = document.getElementById('certPreviewInstructor');

    if (certNombreEl) certNombreEl.textContent = nombre;
    if (certCursoEl) certCursoEl.textContent = curso;
    if (certFechaEl) certFechaEl.textContent = fechaFormateada;
    if (certCalifEl) certCalifEl.textContent = calificacion + '%';
    if (certInstrEl) certInstrEl.textContent = instructor;
}

// =========================
// VALIDACIÓN
// =========================

function validarFormulario() {
    const nombre = document.getElementById('certNombre')?.value.trim();
    const curso = document.getElementById('certCurso')?.value;
    const calificacion = parseInt(document.getElementById('certCalificacion')?.value);

    if (!nombre) {
        alert('Por favor ingresa el nombre del estudiante.');
        document.getElementById('certNombre')?.focus();
        return false;
    }
    if (!curso) {
        alert('Por favor selecciona un curso.');
        document.getElementById('certCurso')?.focus();
        return false;
    }
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        alert('La calificación debe ser un número entre 0 y 100.');
        document.getElementById('certCalificacion')?.focus();
        return false;
    }
    return true;
}

// =========================
// DESCARGAR PDF (IMPRIMIR)
// =========================

window.descargarCertificado = function() {
    if (!validarFormulario()) return;

    // Generar nuevo ID para este certificado
    generarIdCertificado();
    actualizarVistaPrevia();

    // Pequeño delay para que se actualice el DOM
    setTimeout(() => {
        window.print();
    }, 100);
};

// =========================
// VISTA PREVIA (BOTÓN)
// =========================

window.vistaPrevia = function() {
    if (!validarFormulario()) return;
    actualizarVistaPrevia();

    // Scroll al certificado
    const cert = document.getElementById('certificado');
    if (cert) {
        cert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
