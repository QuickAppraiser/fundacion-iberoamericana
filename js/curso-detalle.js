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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
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
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
        estado: "activo"
    },
    {
        id: "ingles-general", titulo: "Inglés General (A1-C1) — Marco Común Europeo",
        categoria: "idiomas", categoriaLabel: "Idiomas",
        nivel: "Básico → Avanzado (MCER A1-C1)", nivelClase: "basico",
        duracion: "160 horas", modulosTotales: 23, quizzesTotales: 46,
        icono: "fa-language", iconoColor: "#E91E63", color: "#E91E63",
        cefrAligned: true, cefrLevels: ["A1", "A2", "B1", "B2", "C1"],
        youtubeChannelUrl: "https://www.youtube.com/channel/UCYXojL0jRuMYpJQk7LVhJhg",
        descripcionCorta: "Aprende inglés desde cero hasta nivel avanzado (C1) alineado al Marco Común Europeo de Referencia (MCER/CEFR).",
        descripcionCompleta: "Programa integral de inglés alineado al Marco Común Europeo de Referencia para las Lenguas (MCER/CEFR). Te lleva desde principiante absoluto (A1) hasta nivel avanzado (C1) con 23 módulos estructurados. Incluye test de nivel inicial, quizzes por nivel, y certificación por cada nivel CEFR completado.",
        requisitos: ["No se requiere conocimiento previo de inglés", "Computadora con micrófono y altavoces", "Acceso a internet", "Recomendado: tomar el Test de Nivel para comenzar en el módulo adecuado"],
        modulos: [
            { titulo: "A1.1 — Primeros Pasos: Saludos, Abecedario y Números", duracion: "8 horas", cefrLevel: "A1" },
            { titulo: "A1.2 — Gramática Base: Verb To Be, Pronombres y Artículos", duracion: "8 horas", cefrLevel: "A1" },
            { titulo: "A1.3 — Presente Simple y Vocabulario Cotidiano", duracion: "8 horas", cefrLevel: "A1" },
            { titulo: "A1.4 — Supervivencia: Preguntas, Direcciones y Can", duracion: "8 horas", cefrLevel: "A1" },
            { titulo: "A2.1 — Experiencias Pasadas: Past Simple", duracion: "7 horas", cefrLevel: "A2" },
            { titulo: "A2.2 — Planes y Comparaciones: Going to", duracion: "7 horas", cefrLevel: "A2" },
            { titulo: "A2.3 — Vida Social: Compras, Salud, Phrasal Verbs", duracion: "7 horas", cefrLevel: "A2" },
            { titulo: "A2.4 — Comunicación Conectada: Conjunciones y Escritura", duracion: "7 horas", cefrLevel: "A2" },
            { titulo: "B1.1 — Tiempos Narrativos: Past Continuous y Past Perfect", duracion: "7 horas", cefrLevel: "B1" },
            { titulo: "B1.2 — Posibilidades: Present Perfect y Condicionales", duracion: "8 horas", cefrLevel: "B1" },
            { titulo: "B1.3 — Voz Pasiva, Reported Speech y Conectores", duracion: "7 horas", cefrLevel: "B1" },
            { titulo: "B1.4 — Habilidades Integradas: Reading, Listening, Speaking", duracion: "7 horas", cefrLevel: "B1" },
            { titulo: "B1.5 — Introducción Profesional: Emails y Teléfono", duracion: "7 horas", cefrLevel: "B1" },
            { titulo: "B2.1 — Third Conditional y Mixed Conditionals", duracion: "7 horas", cefrLevel: "B2" },
            { titulo: "B2.2 — Modales Perfectos y Pasiva Avanzada", duracion: "7 horas", cefrLevel: "B2" },
            { titulo: "B2.3 — Escritura Académica: Ensayos y Registro Formal", duracion: "7 horas", cefrLevel: "B2" },
            { titulo: "B2.4 — Inglés Profesional: Presentaciones y Negociación", duracion: "7 horas", cefrLevel: "B2" },
            { titulo: "B2.5 — Fluidez: Idioms, Debates y Cultura", duracion: "7 horas", cefrLevel: "B2" },
            { titulo: "C1.1 — Inversión, Cleft Sentences y Wish Avanzado", duracion: "7 horas", cefrLevel: "C1" },
            { titulo: "C1.2 — Excelencia Académica y Análisis Crítico", duracion: "7 horas", cefrLevel: "C1" },
            { titulo: "C1.3 — Liderazgo, Persuasión e Interculturalidad", duracion: "7 horas", cefrLevel: "C1" },
            { titulo: "C1.4 — Nivel Nativo: Humor, Slang y Registro", duracion: "7 horas", cefrLevel: "C1" },
            { titulo: "C1.5 — Mock Exams, Revisión Total y Proyecto Final", duracion: "8 horas", cefrLevel: "C1" }
        ],
        googleClassroomUrl: "https://classroom.google.com/c/t4ydvjja3",
        kahootUrl: "https://create.kahoot.it/profile/MoEnglishClasses",
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

    // CEFR level indicator for English course
    const cefrLevels = curso.cefrLevels || [];
    let cefrBarHTML = '';
    if (cefrLevels.length > 0) {
        const cefrColors = { A1: '#4CAF50', A2: '#8BC34A', B1: '#2196F3', B2: '#9C27B0', C1: '#E91E63' };
        const cefrDescriptions = {
            A1: 'Beginner — Puede entender y usar expresiones cotidianas básicas',
            A2: 'Elementary — Puede comunicarse en situaciones rutinarias simples',
            B1: 'Intermediate — Puede entender los puntos principales de textos claros',
            B2: 'Upper-Intermediate — Puede interactuar con fluidez con hablantes nativos',
            C1: 'Advanced — Puede usar el idioma de forma flexible y eficaz'
        };
        const userCefrLevel = localStorage.getItem('fi_cefr_level');
        const cefrDate = localStorage.getItem('fi_cefr_date');
        let cefrHistory = [];
        try { cefrHistory = JSON.parse(localStorage.getItem('fi_cefr_history') || '[]'); } catch(e) {}

        // Build progress indicator if there's history
        let progressHTML = '';
        if (userCefrLevel && cefrHistory.length > 1) {
            const first = cefrHistory[0];
            const latest = cefrHistory[cefrHistory.length - 1];
            const firstIdx = cefrLevels.indexOf(first.level);
            const latestIdx = cefrLevels.indexOf(latest.level);
            const diff = latestIdx - firstIdx;
            if (diff > 0) {
                progressHTML = `<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(76,175,80,0.1);color:#4CAF50;border-radius:8px;font-size:0.8rem;font-weight:600;"><i class="fas fa-arrow-up"></i> +${diff} nivel${diff > 1 ? 'es' : ''} desde ${first.level} <i class="fas fa-long-arrow-alt-right" style="opacity:0.5;"></i> ${latest.level}</div>`;
            } else if (diff === 0) {
                progressHTML = `<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(33,150,243,0.1);color:#2196F3;border-radius:8px;font-size:0.8rem;font-weight:600;"><i class="fas fa-equals"></i> Nivel estable: ${latest.level} (${cefrHistory.length} intentos)</div>`;
            } else {
                progressHTML = `<div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(255,152,0,0.1);color:#FF9800;border-radius:8px;font-size:0.8rem;font-weight:600;"><i class="fas fa-arrow-down"></i> ${first.level} <i class="fas fa-long-arrow-alt-right" style="opacity:0.5;"></i> ${latest.level} — ¡Sigue practicando!</div>`;
            }
        }

        // Format date
        let dateHTML = '';
        if (cefrDate) {
            const d = new Date(cefrDate);
            const dateStr = d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
            dateHTML = `<span style="font-size:0.75rem;color:var(--text-muted);margin-left:4px;"><i class="fas fa-calendar-alt"></i> ${dateStr}</span>`;
        }

        cefrBarHTML = `
            <div style="background:var(--card-bg);border-radius:16px;padding:20px;margin-bottom:24px;border:1px solid var(--border);">
                <h4 style="margin-bottom:12px;font-size:0.95rem;"><i class="fas fa-layer-group" style="color:${curso.color};"></i> Niveles CEFR del Programa</h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
                    ${cefrLevels.map(lvl => `
                        <div style="padding:8px 16px;border-radius:10px;background:${cefrColors[lvl]}15;color:${cefrColors[lvl]};font-weight:700;font-size:0.85rem;border:1px solid ${cefrColors[lvl]}30;${userCefrLevel === lvl ? 'box-shadow:0 0 0 2px ' + cefrColors[lvl] + ';' : ''}">
                            ${lvl} ${userCefrLevel === lvl ? '<i class="fas fa-star" style="font-size:0.7rem;"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
                ${cefrLevels.map(lvl => `<div style="font-size:0.82rem;color:var(--text-light);margin-bottom:4px;"><strong style="color:${cefrColors[lvl]};">${lvl}:</strong> ${cefrDescriptions[lvl]}</div>`).join('')}
                ${!userCefrLevel ? `
                    <a href="../placement-test.html" style="display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:10px 20px;background:${curso.color};color:white;border-radius:10px;font-size:0.88rem;font-weight:600;text-decoration:none;"><i class="fas fa-clipboard-check"></i> Tomar Test de Nivel Gratis</a>
                ` : `
                    <div style="margin-top:14px;padding:14px;background:var(--bg);border-radius:12px;border:1px solid var(--border);">
                        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:${progressHTML ? '10px' : '0'};">
                            <div style="padding:8px 14px;background:${cefrColors[userCefrLevel]}15;color:${cefrColors[userCefrLevel]};border-radius:10px;font-size:0.85rem;font-weight:600;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-award"></i> Tu nivel: ${userCefrLevel} — ${cefrDescriptions[userCefrLevel]?.split(' — ')[0]}</div>
                            ${dateHTML}
                        </div>
                        ${progressHTML ? '<div style="margin-bottom:10px;">' + progressHTML + '</div>' : ''}
                        <a href="../placement-test.html" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;background:${curso.color};color:white;border-radius:10px;font-size:0.84rem;font-weight:600;text-decoration:none;transition:all 0.2s ease;"><i class="fas fa-redo"></i> Repetir Test de Nivel</a>
                    </div>
                `}
            </div>
        `;
    }

    // Certification alignment card
    let certAlignHTML = '';
    if (curso.certificacionAlineada) {
        const cert = curso.certificacionAlineada;
        const coberturaNum = parseInt(cert.cobertura) || 0;
        const coberturaColor = coberturaNum >= 80 ? '#4CAF50' : coberturaNum >= 60 ? '#FF9800' : '#2196F3';
        certAlignHTML = `
            <div style="background:var(--card-bg);border-radius:16px;padding:20px;margin-bottom:24px;border:1px solid var(--border);">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
                    <div style="width:42px;height:42px;border-radius:12px;background:${coberturaColor}15;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-award" style="color:${coberturaColor};font-size:1.2rem;"></i>
                    </div>
                    <div style="flex:1;min-width:200px;">
                        <h4 style="font-size:0.95rem;margin-bottom:2px;">Alineado a Certificación Profesional</h4>
                        <p style="font-size:0.82rem;color:var(--text-light);margin:0;">${cert.nombre}</p>
                    </div>
                    <div style="text-align:center;padding:6px 14px;border-radius:10px;background:${coberturaColor}15;border:1px solid ${coberturaColor}30;">
                        <div style="font-size:1.1rem;font-weight:800;color:${coberturaColor};">${cert.cobertura}</div>
                        <div style="font-size:0.68rem;color:var(--text-muted);">Cobertura</div>
                    </div>
                </div>
                <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;font-size:0.82rem;">
                    <div><strong>Examen:</strong> <span style="color:var(--text-light);">${cert.codigoExamen}</span></div>
                    <div><strong>Organización:</strong> <span style="color:var(--text-light);">${cert.organizacion}</span></div>
                </div>
                <div style="margin-bottom:14px;">
                    <div style="font-size:0.8rem;font-weight:600;margin-bottom:8px;color:var(--text-main);">Temas Cubiertos:</div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${(cert.temas || []).map(t => `<span style="padding:4px 10px;border-radius:8px;background:${curso.color}10;color:${curso.color};font-size:0.75rem;font-weight:600;border:1px solid ${curso.color}20;">${t}</span>`).join('')}
                    </div>
                </div>
                <a href="${cert.url}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;background:${coberturaColor};color:white;border-radius:10px;font-size:0.82rem;font-weight:600;text-decoration:none;"><i class="fas fa-external-link-alt"></i> Ver Certificación Oficial</a>
            </div>
        `;
    }

    // YouTube channel link
    let youtubeHTML = '';
    if (curso.youtubeChannelUrl) {
        youtubeHTML = `
            <div style="background:linear-gradient(135deg,#FF000015,#FF000008);border-radius:16px;padding:16px 20px;margin-bottom:24px;border:1px solid #FF000020;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
                <i class="fab fa-youtube" style="font-size:1.8rem;color:#FF0000;"></i>
                <div style="flex:1;min-width:200px;">
                    <h4 style="font-size:0.92rem;margin-bottom:2px;">Canal de YouTube</h4>
                    <p style="font-size:0.82rem;color:var(--text-light);margin:0;">Videos complementarios, lecciones y práctica de listening.</p>
                </div>
                <a href="${curso.youtubeChannelUrl}" target="_blank" style="padding:8px 18px;background:#FF0000;color:white;border-radius:10px;font-size:0.85rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px;"><i class="fab fa-youtube"></i> Ver Videos</a>
            </div>
        `;
    }

    // Modules — with expandable lessons for courses that have them
    const modulesHTML = (curso.modulos || []).map((mod, i) => {
        const hasLessons = mod.lecciones && mod.lecciones.length > 0;
        const cefrBadge = mod.cefrLevel ? `<span style="background:${{'A1':'#4CAF50','A2':'#8BC34A','B1':'#2196F3','B2':'#9C27B0','C1':'#E91E63'}[mod.cefrLevel] || curso.color}15;color:${{'A1':'#4CAF50','A2':'#8BC34A','B1':'#2196F3','B2':'#9C27B0','C1':'#E91E63'}[mod.cefrLevel] || curso.color};padding:2px 8px;border-radius:6px;font-size:0.72rem;font-weight:700;margin-left:8px;">${mod.cefrLevel}</span>` : '';
        const vocabMeta = mod.vocabularioMeta ? `<div style="font-size:0.78rem;color:var(--teal);margin-top:4px;"><i class="fas fa-book-open" style="font-size:0.7rem;"></i> ${mod.vocabularioMeta}</div>` : '';
        const canDoMeta = mod.canDo ? `<div style="font-size:0.78rem;color:var(--text-light);margin-top:2px;font-style:italic;"><i class="fas fa-bullseye" style="font-size:0.65rem;color:var(--gold);"></i> ${mod.canDo}</div>` : '';

        // Learning objectives, skills, tools
        const hasExtras = mod.objetivosAprendizaje || mod.habilidades || mod.herramientas;
        let extrasHTML = '';
        if (hasExtras) {
            const objHTML = (mod.objetivosAprendizaje || []).map(obj => `<li style="font-size:0.78rem;color:var(--text-light);margin-bottom:3px;"><i class="fas fa-check" style="color:${curso.color};font-size:0.65rem;margin-right:6px;"></i>${obj}</li>`).join('');
            const skillsHTML = (mod.habilidades || []).map(s => `<span style="padding:2px 8px;border-radius:6px;background:${curso.color}10;color:${curso.color};font-size:0.7rem;font-weight:600;">${s}</span>`).join('');
            const toolsHTML = (mod.herramientas || []).map(t => `<span style="padding:2px 8px;border-radius:6px;background:var(--border);color:var(--text-muted);font-size:0.7rem;">${t}</span>`).join('');
            extrasHTML = `
                <div class="module-extras" id="extras-${i}" style="display:none;margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);">
                    ${objHTML ? `<div style="margin-bottom:8px;"><div style="font-size:0.75rem;font-weight:700;margin-bottom:4px;color:var(--text-main);"><i class="fas fa-bullseye" style="color:${curso.color};font-size:0.65rem;"></i> Objetivos de Aprendizaje</div><ul style="list-style:none;padding:0;margin:0;">${objHTML}</ul></div>` : ''}
                    ${skillsHTML ? `<div style="margin-bottom:8px;"><div style="font-size:0.75rem;font-weight:700;margin-bottom:4px;color:var(--text-main);"><i class="fas fa-tags" style="color:${curso.color};font-size:0.65rem;"></i> Habilidades</div><div style="display:flex;gap:4px;flex-wrap:wrap;">${skillsHTML}</div></div>` : ''}
                    ${toolsHTML ? `<div><div style="font-size:0.75rem;font-weight:700;margin-bottom:4px;color:var(--text-main);"><i class="fas fa-tools" style="color:var(--text-muted);font-size:0.65rem;"></i> Herramientas</div><div style="display:flex;gap:4px;flex-wrap:wrap;">${toolsHTML}</div></div>` : ''}
                </div>
            `;
        }

        let lessonsHTML = '';
        if (hasLessons) {
            const lessonTypeIcons = { video: 'fa-play-circle', lectura: 'fa-book', practica: 'fa-laptop-code', quiz: 'fa-clipboard-check' };
            const lessonTypeColors = { video: '#2196F3', lectura: '#FF9800', practica: '#4CAF50', quiz: '#E91E63' };
            lessonsHTML = `
                <div class="module-lessons" id="lessons-${i}" style="display:none;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
                    ${mod.lecciones.map(l => `
                        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;font-size:0.82rem;">
                            <i class="fas ${lessonTypeIcons[l.tipo] || 'fa-circle'}" style="color:${lessonTypeColors[l.tipo] || '#999'};width:16px;text-align:center;font-size:0.75rem;"></i>
                            <span style="flex:1;color:var(--text-main);">${l.titulo}</span>
                            <span style="color:var(--text-muted);font-size:0.75rem;white-space:nowrap;">${l.duracion}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        const isExpandable = hasLessons || hasExtras;

        return `
            <div class="course-module-card" ${isExpandable ? `style="cursor:pointer;" onclick="toggleModule(${i})"` : ''}>
                <div class="course-module-number" style="background:${mod.cefrLevel ? ({'A1':'#4CAF50','A2':'#8BC34A','B1':'#2196F3','B2':'#9C27B0','C1':'#E91E63'}[mod.cefrLevel] || curso.color) : curso.color};">
                    ${i + 1}
                </div>
                <div class="course-module-info" style="flex:1;">
                    <h4>${mod.titulo}${cefrBadge}</h4>
                    <span><i class="fas fa-clock"></i> ${mod.duracion}${hasLessons ? ` — ${mod.lecciones.length} lecciones` : ''}</span>
                    ${vocabMeta}
                    ${canDoMeta}
                    ${extrasHTML}
                    ${lessonsHTML}
                </div>
                ${isExpandable ? '<i class="fas fa-chevron-down" style="color:var(--text-muted);font-size:0.8rem;transition:transform 0.3s;"></i>' : ''}
            </div>
        `;
    }).join('');

    // Requirements
    const reqHTML = (curso.requisitos || []).map(req => `
        <li><i class="fas fa-check-circle"></i> ${req}</li>
    `).join('');

    // Full content assembly
    content.innerHTML = `
        ${metaHTML}
        ${descHTML}
        ${cefrBarHTML}
        ${certAlignHTML}
        ${youtubeHTML}

        <h3 class="course-detail-section-title">
            <i class="fas fa-list-ol"></i> Módulos del Curso ${cefrLevels.length > 0 ? `<span style="font-size:0.8rem;color:var(--text-muted);font-weight:400;margin-left:8px;">(${curso.modulos.length} módulos — ${cefrLevels.length} niveles CEFR)</span>` : ''}
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
            <p>Inscríbete y empieza tu formación hoy mismo.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="${curso.googleClassroomUrl || '#'}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-graduation-cap"></i> Inscribirme en Classroom
                </a>
                <a href="https://wa.me/573188383917?text=${encodeURIComponent('Hola, quiero inscribirme en el curso: *' + curso.titulo + '*\n\nDe la Fundación Iberoamericana.\n¿Podrían indicarme los pasos para completar mi inscripción?\n\nGracias.')}" target="_blank" class="auth-whatsapp-btn" style="flex:1;min-width:200px;">
                    <i class="fab fa-whatsapp"></i> Inscribirme por WhatsApp
                </a>
            </div>
        </div>

        <div class="cert-preview-section">
            <h3 class="course-detail-section-title">
                <i class="fas fa-certificate"></i> Tu Certificado
            </h3>
            <p style="color:var(--text-light);margin-bottom:20px;font-size:0.92rem;">Al completar este curso recibirás un certificado digital verificable. Escribe tu nombre para ver cómo se verá:</p>
            <div class="cert-preview-card">
                <div class="cert-badge"><i class="fas fa-award"></i> Certificado</div>
                <div class="cert-preview-logo">FUNDACIÓN IBEROAMERICANA</div>
                <div class="cert-preview-title">Certifica que</div>
                <div class="cert-preview-name" id="certPreviewName">Tu Nombre Aquí</div>
                <div class="cert-preview-course">ha completado exitosamente el curso<br><strong>${curso.titulo}</strong><br>(${curso.duracion} — ${curso.modulosTotales} módulos)</div>
                <input type="text" class="cert-preview-input" id="certPreviewInput" placeholder="Escribe tu nombre..." maxlength="40">
            </div>
        </div>
    `;

    // Initialize cert preview after DOM elements exist
    if (typeof initCertPreview === 'function') initCertPreview();
}

// Toggle module expandable content (extras + lessons)
window.toggleModule = function(index) {
    const extras = document.getElementById('extras-' + index);
    const lessons = document.getElementById('lessons-' + index);
    const target = extras || lessons;
    if (!target) return;

    const isOpen = target.style.display !== 'none';
    if (extras) extras.style.display = isOpen ? 'none' : 'block';
    if (lessons) lessons.style.display = isOpen ? 'none' : 'block';

    // Rotate chevron
    const card = target.closest('.course-module-card');
    if (card) {
        const chevron = card.querySelector('.fa-chevron-down, .fa-chevron-up');
        if (chevron) {
            chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }
};

// Keep backward compat
window.toggleLessons = window.toggleModule;

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
