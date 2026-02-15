/**
 * certificados.js — Generador de Certificados
 * Fundación Iberoamericana
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

    // Hamburger handled by animations.js
});

// =========================
// GENERAR ID ÚNICO
// =========================

function generarIdCertificado() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    const id = `FI-${year}-${random}`;
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
    const instructor = document.getElementById('certInstructor')?.value || 'Dr. Mauricio Rodríguez, PhD';

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
        const el = document.getElementById('certNombre');
        el.classList.add('shake-error');
        el.addEventListener('animationend', () => el.classList.remove('shake-error'), { once: true });
        el.focus();
        if (typeof showToast === 'function') showToast('Ingresa el nombre del estudiante', 'error');
        return false;
    }
    if (!curso) {
        const el = document.getElementById('certCurso');
        el.classList.add('shake-error');
        el.addEventListener('animationend', () => el.classList.remove('shake-error'), { once: true });
        el.focus();
        if (typeof showToast === 'function') showToast('Selecciona un curso', 'error');
        return false;
    }
    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        const el = document.getElementById('certCalificacion');
        el.classList.add('shake-error');
        el.addEventListener('animationend', () => el.classList.remove('shake-error'), { once: true });
        el.focus();
        if (typeof showToast === 'function') showToast('La calificación debe ser entre 0 y 100', 'error');
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

    // Confetti + toast
    if (typeof triggerConfetti === 'function') triggerConfetti();
    if (typeof showToast === 'function') showToast('Certificado generado exitosamente', 'success');

    // Pequeño delay para que se actualice el DOM
    setTimeout(() => {
        window.print();
    }, 300);
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
