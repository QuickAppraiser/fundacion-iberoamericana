/**
 * teacher.js — Panel del Profesor
 * Coordinadora Paola Ferrer
 */

// =========================
// DATOS DE DEMO
// =========================

const estudiantesDemo = [
    { nombre: "María García López", email: "maria.garcia@email.com", curso: "Excel", promedio: 92, acceso: "2026-02-07", estado: "activo" },
    { nombre: "Juan Hernández Ruiz", email: "juan.hdez@email.com", curso: "Excel", promedio: 78, acceso: "2026-02-06", estado: "activo" },
    { nombre: "Ana Martínez Flores", email: "ana.mtz@email.com", curso: "SQL", promedio: 85, acceso: "2026-02-07", estado: "activo" },
    { nombre: "Carlos Mendoza Díaz", email: "carlos.m@email.com", curso: "Power BI", promedio: 67, acceso: "2026-02-05", estado: "activo" },
    { nombre: "Laura Ramírez Torres", email: "laura.rt@email.com", curso: "Python", promedio: 45, acceso: "2026-01-28", estado: "riesgo" },
    { nombre: "Pedro Sánchez Vargas", email: "pedro.sv@email.com", curso: "Web", promedio: 91, acceso: "2026-02-07", estado: "activo" },
    { nombre: "Sofía Castillo Moreno", email: "sofia.cm@email.com", curso: "Excel", promedio: 88, acceso: "2026-02-06", estado: "activo" },
    { nombre: "Diego Rivera Campos", email: "diego.rc@email.com", curso: "Scrum", promedio: 73, acceso: "2026-02-04", estado: "activo" },
    { nombre: "Valentina Ortiz Luna", email: "vale.ol@email.com", curso: "SQL", promedio: 52, acceso: "2026-01-30", estado: "riesgo" },
    { nombre: "Roberto Aguilar Peña", email: "roberto.ap@email.com", curso: "Python", promedio: 81, acceso: "2026-02-07", estado: "activo" },
    { nombre: "Camila Vega Jiménez", email: "camila.vj@email.com", curso: "Excel", promedio: 95, acceso: "2026-02-07", estado: "completado" },
    { nombre: "Andrés Rojas Delgado", email: "andres.rd@email.com", curso: "Web", promedio: 38, acceso: "2026-01-20", estado: "riesgo" },
    { nombre: "Isabella Herrera Cruz", email: "isa.hc@email.com", curso: "Power BI", promedio: 76, acceso: "2026-02-05", estado: "activo" },
    { nombre: "Mateo Cordero Silva", email: "mateo.cs@email.com", curso: "SQL", promedio: 55, acceso: "2026-02-01", estado: "riesgo" },
    { nombre: "Gabriela Muñoz Ríos", email: "gabi.mr@email.com", curso: "Scrum", promedio: 84, acceso: "2026-02-06", estado: "activo" }
];

const plantillas = {
    recordatorio: "¡Hola estudiantes! 📝\n\nLes recuerdo que la fecha límite para entregar la tarea del módulo actual es este viernes.\n\nPor favor revisen los materiales en Google Classroom y no duden en contactarme si tienen preguntas.\n\n¡Éxito!\nCoordinadora Paola Ferrer",
    material: "¡Hola! 📚\n\nSe ha subido nuevo material al curso:\n\n📌 [Nombre del material]\n📁 Disponible en Google Classroom\n\nLes recomiendo revisarlo antes de la próxima clase.\n\n¡Nos vemos pronto!\nCoordinadora Paola Ferrer",
    resultados: "¡Hola estudiantes! 📊\n\nYa están disponibles los resultados del último quiz:\n\n✅ Promedio del grupo: [X]%\n🏆 Puntaje más alto: [X]%\n\nPueden revisar sus respuestas en la plataforma. Si tienen dudas, estoy disponible.\n\n¡Sigan así!\nCoordinadora Paola Ferrer",
    clase: "¡Hola! 🎓\n\nLes recuerdo nuestra próxima clase:\n\n📅 Fecha: [día y hora]\n📌 Tema: [tema de la clase]\n💻 Plataforma: [Google Meet / presencial]\n\nPor favor lleguen a tiempo y tengan listos sus materiales.\n\n¡Los espero!\nCoordinadora Paola Ferrer"
};

let estudiantesActuales = [...estudiantesDemo];
let ordenActual = { campo: null, asc: true };

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    verificarAuth();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // Enter para login
    const passInput = document.getElementById('passInput');
    if (passInput) {
        passInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') autenticarProfesor();
        });
    }
});

// =========================
// AUTENTICACIÓN
// =========================

function verificarAuth() {
    if (localStorage.getItem('teacher_auth') === 'true') {
        mostrarPanel();
    }
}

window.autenticarProfesor = function() {
    const pass = document.getElementById('passInput')?.value;
    if (pass === 'profe2026') {
        localStorage.setItem('teacher_auth', 'true');
        mostrarPanel();
    } else {
        const error = document.getElementById('passError');
        if (error) error.style.display = 'block';
        document.getElementById('passInput').style.borderColor = '#F44336';
    }
};

function mostrarPanel() {
    document.getElementById('passwordOverlay').style.display = 'none';
    document.getElementById('teacherLayout').style.display = 'flex';
    renderizarResumen();
    renderizarTabla();
}

window.cerrarSesionProfesor = function() {
    localStorage.removeItem('teacher_auth');
    window.location.reload();
};

// =========================
// NAVEGACIÓN
// =========================

window.cambiarSeccionT = function(id, el, e) {
    if (e) e.preventDefault();
    document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
    document.getElementById('seccion-' + id)?.classList.add('active');
    document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
};

// =========================
// RESUMEN
// =========================

function renderizarResumen() {
    // Stats
    document.getElementById('teacherStats').innerHTML = `
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(0,191,166,0.1);color:#00BFA6;"><i class="fas fa-users"></i></div>
            <div class="stat-card-number" style="color:#00BFA6;">127</div>
            <div class="stat-card-label">Total Estudiantes</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(33,150,243,0.1);color:#2196F3;"><i class="fas fa-book"></i></div>
            <div class="stat-card-number" style="color:#2196F3;">12</div>
            <div class="stat-card-label">Cursos Activos</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(255,184,0,0.1);color:#FFB800;"><i class="fas fa-trophy"></i></div>
            <div class="stat-card-number" style="color:#FFB800;">78%</div>
            <div class="stat-card-label">Promedio General</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-icon" style="background:rgba(156,39,176,0.1);color:#9C27B0;"><i class="fas fa-certificate"></i></div>
            <div class="stat-card-number" style="color:#9C27B0;">43</div>
            <div class="stat-card-label">Certificados Emitidos</div>
        </div>`;

    // Gráfica de barras
    const cursos = [
        { nombre: "Excel", prom: 82, color: "#4CAF50" },
        { nombre: "SQL", prom: 75, color: "#2196F3" },
        { nombre: "Power BI", prom: 71, color: "#FFB800" },
        { nombre: "Python", prom: 68, color: "#3776AB" },
        { nombre: "Desarrollo Web", prom: 85, color: "#FF5722" },
        { nombre: "Scrum", prom: 79, color: "#FF9800" }
    ];
    document.getElementById('barChart').innerHTML = cursos.map(c => `
        <div class="bar-chart-row">
            <span class="bar-chart-label">${c.nombre}</span>
            <div class="bar-chart-track">
                <div class="bar-chart-fill" style="width:${c.prom}%;background:${c.color};">${c.prom}%</div>
            </div>
            <span class="bar-chart-value">${c.prom}%</span>
        </div>`).join('');

    // Estudiantes en riesgo
    const enRiesgo = estudiantesDemo.filter(e => e.promedio < 60);
    document.getElementById('riskList').innerHTML = enRiesgo.map(e => `
        <div class="risk-item">
            <div class="activity-icon" style="background:rgba(244,67,54,0.1);color:#F44336;"><i class="fas fa-exclamation-triangle"></i></div>
            <div class="risk-info">
                <h4>${e.nombre}</h4>
                <p>${e.curso} — Último acceso: ${e.acceso}</p>
            </div>
            <div class="risk-score">${e.promedio}%</div>
        </div>`).join('');
}

// =========================
// TABLA DE ESTUDIANTES
// =========================

function renderizarTabla() {
    const tbody = document.getElementById('tablaBody');
    if (!tbody) return;

    const estadoLabels = { activo: 'Activo', inactivo: 'Inactivo', completado: 'Completado', riesgo: 'En Riesgo' };

    tbody.innerHTML = estudiantesActuales.map(e => `
        <tr>
            <td><strong>${e.nombre}</strong></td>
            <td>${e.email}</td>
            <td>${e.curso}</td>
            <td style="font-weight:700;color:${e.promedio < 60 ? '#F44336' : 'var(--navy)'};">${e.promedio}%</td>
            <td>${e.acceso}</td>
            <td><span class="status-badge ${e.estado}">${estadoLabels[e.estado] || e.estado}</span></td>
        </tr>`).join('');
}

window.filtrarEstudiantes = function() {
    const filtro = document.getElementById('filtroEstudiantes')?.value;
    estudiantesActuales = filtro === 'all'
        ? [...estudiantesDemo]
        : estudiantesDemo.filter(e => e.curso === filtro);
    renderizarTabla();
};

window.ordenarTabla = function(campo) {
    if (ordenActual.campo === campo) {
        ordenActual.asc = !ordenActual.asc;
    } else {
        ordenActual = { campo, asc: true };
    }

    estudiantesActuales.sort((a, b) => {
        let valA = a[campo], valB = b[campo];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return ordenActual.asc ? -1 : 1;
        if (valA > valB) return ordenActual.asc ? 1 : -1;
        return 0;
    });

    renderizarTabla();
};

window.exportarCSV = function() {
    const header = 'Nombre,Email,Curso,Promedio,Último Acceso,Estado\n';
    const rows = estudiantesActuales.map(e =>
        `"${e.nombre}","${e.email}","${e.curso}",${e.promedio},"${e.acceso}","${e.estado}"`
    ).join('\n');

    const csv = header + rows;
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudiantes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

// =========================
// COMUNICACIÓN
// =========================

window.cargarPlantilla = function() {
    const select = document.getElementById('plantillaSelect');
    const textarea = document.getElementById('mensajeTexto');
    if (select && textarea && plantillas[select.value]) {
        textarea.value = plantillas[select.value];
    }
};

window.copiarMensaje = function() {
    const textarea = document.getElementById('mensajeTexto');
    if (!textarea?.value) return;

    navigator.clipboard.writeText(textarea.value).then(() => {
        const success = document.getElementById('copySuccess');
        if (success) {
            success.style.display = 'inline';
            setTimeout(() => { success.style.display = 'none'; }, 2000);
        }
    });
};
