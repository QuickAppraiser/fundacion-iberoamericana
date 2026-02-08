/**
 * i18n.js — Sistema de internacionalización (ES/EN)
 * Fundación Iberoamericana — Portal de Aprendizaje
 *
 * Permite cambiar entre español e inglés en toda la plataforma.
 * El idioma seleccionado se guarda en localStorage.
 */

const traducciones = {
    es: {
        // Navbar
        "nav.cursos": "Cursos",
        "nav.herramientas": "Herramientas",
        "nav.dashboard": "Dashboard",
        "nav.roadmap": "Roadmap",
        "nav.contacto": "Contacto",
        "nav.acceder": "Acceder",
        "nav.quizzes": "Quizzes",

        // Hero
        "hero.badge": "Plataforma MVP 2026",
        "hero.titulo": 'Tu centro de <span class="highlight">formación técnica</span> y profesional',
        "hero.subtitulo": "Cursos prácticos con quizzes interactivos, laboratorios hands-on, certificados y seguimiento de progreso. Todo en un solo lugar para estudiantes y profesores.",
        "hero.btn.explorar": "Explorar Cursos",
        "hero.btn.profesor": "Soy Profesor",
        "hero.stat.cursos": "Cursos Activos",
        "hero.stat.estudiantes": "Estudiantes",
        "hero.stat.satisfaccion": "Satisfacción",

        // Sección Cursos
        "cursos.label": "Catálogo",
        "cursos.titulo": "Nuestros Cursos",
        "cursos.subtitulo": "Formación práctica con quizzes, laboratorios y certificación. Elige tu próximo paso profesional.",
        "cursos.buscar": "Buscar curso por nombre...",
        "cursos.todos": "Todos",
        "cursos.office": "Office & Productividad",
        "cursos.programacion": "Programación",
        "cursos.datos": "Datos & BI",
        "cursos.gestion": "Gestión & PM",
        "cursos.ver": "Ver Curso",
        "cursos.modulos": "módulos",
        "cursos.inscribirme": "Inscribirme en Google Classroom",
        "cursos.requisitos": "Requisitos",
        "cursos.modulosCurso": "Módulos del Curso",
        "cursos.cerrar": "Cerrar",
        "cursos.noResultados": "No se encontraron cursos con ese criterio.",
        "cursos.proximamente": "Próximamente",

        // Sección Features
        "features.label": "Funcionalidades",
        "features.titulo": "Qué incluye la plataforma",
        "features.subtitulo": "Herramientas diseñadas tanto para estudiantes como para profesores.",
        "features.quizzes.titulo": "Quizzes con Auto-calificación",
        "features.quizzes.desc": "Exámenes interactivos con retroalimentación instantánea. Kahoot para práctica gamificada y Google Forms para evaluaciones formales.",
        "features.labs.titulo": "Laboratorios Prácticos",
        "features.labs.desc": "Ejercicios hands-on en sandboxes reales. Practica Excel, SQL, Python y más en entornos seguros sin instalar nada.",
        "features.cert.titulo": "Certificados Digitales",
        "features.cert.desc": "Al completar un curso recibe tu certificado descargable con código verificable. Compártelo en LinkedIn.",
        "features.progreso.titulo": "Seguimiento de Progreso",
        "features.progreso.desc": "Dashboard visual con porcentaje de avance, calificaciones, badges y tu historial completo de aprendizaje.",
        "features.video.titulo": "Video Lecciones Interactivas",
        "features.video.desc": "Videos con preguntas integradas (Edpuzzle), timestamps y notas. Aprende a tu ritmo con contenido multimedia.",
        "features.ai.titulo": "Asistente AI (Próximamente)",
        "features.ai.desc": "Chatbot inteligente que responde dudas sobre el contenido del curso 24/7. Tu tutor personal con IA.",
        "features.tools.titulo": "Ecosistema de Herramientas Gratuitas",
        "features.tools.subtitulo": "Integramos las mejores herramientas gratuitas en una experiencia unificada",

        // Dashboard Preview
        "dashPreview.label": "Vista Previa",
        "dashPreview.titulo": "Dashboard del Estudiante",
        "dashPreview.subtitulo": "Visualiza tu progreso, calificaciones y próximos pasos en un solo lugar.",

        // Roadmap
        "roadmap.label": "Hoja de Ruta",
        "roadmap.titulo": "Roadmap de Crecimiento",
        "roadmap.subtitulo": "Plan evolutivo: comenzamos con herramientas gratuitas y escalamos hacia una plataforma completa.",

        // CTA
        "cta.titulo": "¿Listo para transformar tu aprendizaje?",
        "cta.subtitulo": "Únete a nuestra comunidad de estudiantes y comienza tu formación técnica hoy.",
        "cta.facebook": "Visítanos en Facebook",
        "cta.whatsapp": "Escríbenos por WhatsApp",

        // Footer
        "footer.desc": "Plataforma de formación técnica y profesional. Cursos prácticos para impulsar tu carrera.",
        "footer.cursos": "Cursos",
        "footer.plataforma": "Plataforma",
        "footer.soporte": "Soporte",
        "footer.miAula": "Mi Aula",
        "footer.panelProfesor": "Panel Profesor",
        "footer.certificados": "Certificados",
        "footer.faq": "Preguntas Frecuentes",
        "footer.guia": "Guía del Estudiante",
        "footer.contactarProfesor": "Contactar Profesor",
        "footer.feedback": "Feedback",
        "footer.copy": "© 2026 Fundación Iberoamericana. Todos los derechos reservados. Plataforma MVP.",

        // Dashboard
        "dash.bienvenida": "¡Hola, {nombre}! Continúa donde te quedaste",
        "dash.resumen": "Resumen",
        "dash.misCursos": "Mis Cursos",
        "dash.misQuizzes": "Mis Quizzes",
        "dash.certificados": "Certificados",
        "dash.recursos": "Recursos",
        "dash.cursosInscritos": "Cursos Inscritos",
        "dash.quizzesCompletados": "Quizzes Completados",
        "dash.promedioGeneral": "Promedio General",
        "dash.certificadosObtenidos": "Certificados",
        "dash.continuar": "Continuar",
        "dash.cargarDemo": "Cargar datos de demostración",
        "dash.cerrarSesion": "Cerrar Sesión",
        "dash.actividadReciente": "Actividad Reciente",
        "dash.proximasFechas": "Próximas Fechas",

        // Quizzes
        "quiz.centro": "Centro de Quizzes",
        "quiz.practica": "Modo Práctica",
        "quiz.examen": "Modo Examen",
        "quiz.seleccionarCurso": "Selecciona un curso",
        "quiz.iniciar": "Iniciar Quiz",
        "quiz.siguiente": "Siguiente",
        "quiz.finalizar": "Finalizar",
        "quiz.resultado": "Resultado",
        "quiz.correctas": "Correctas",
        "quiz.incorrectas": "Incorrectas",
        "quiz.puntaje": "Puntaje",
        "quiz.tiempo": "Tiempo",
        "quiz.revisar": "Revisar Respuestas",
        "quiz.repetir": "Repetir Quiz",
        "quiz.volver": "Volver a Quizzes",
        "quiz.pregunta": "Pregunta",
        "quiz.de": "de",
        "quiz.explicacion": "Explicación",

        // Onboarding
        "onboard.titulo": "¡Bienvenido a la plataforma!",
        "onboard.nombre": "¿Cómo te llamas?",
        "onboard.placeholder": "Tu nombre completo",
        "onboard.comenzar": "Comenzar"
    },
    en: {
        // Navbar
        "nav.cursos": "Courses",
        "nav.herramientas": "Tools",
        "nav.dashboard": "Dashboard",
        "nav.roadmap": "Roadmap",
        "nav.contacto": "Contact",
        "nav.acceder": "Sign In",
        "nav.quizzes": "Quizzes",

        // Hero
        "hero.badge": "MVP Platform 2026",
        "hero.titulo": 'Your <span class="highlight">technical training</span> and professional development center',
        "hero.subtitulo": "Practical courses with interactive quizzes, hands-on labs, certificates, and progress tracking. Everything in one place for students and teachers.",
        "hero.btn.explorar": "Explore Courses",
        "hero.btn.profesor": "I'm a Teacher",
        "hero.stat.cursos": "Active Courses",
        "hero.stat.estudiantes": "Students",
        "hero.stat.satisfaccion": "Satisfaction",

        // Sección Cursos
        "cursos.label": "Catalog",
        "cursos.titulo": "Our Courses",
        "cursos.subtitulo": "Practical training with quizzes, labs, and certification. Choose your next professional step.",
        "cursos.buscar": "Search course by name...",
        "cursos.todos": "All",
        "cursos.office": "Office & Productivity",
        "cursos.programacion": "Programming",
        "cursos.datos": "Data & BI",
        "cursos.gestion": "Management & PM",
        "cursos.ver": "View Course",
        "cursos.modulos": "modules",
        "cursos.inscribirme": "Enroll in Google Classroom",
        "cursos.requisitos": "Requirements",
        "cursos.modulosCurso": "Course Modules",
        "cursos.cerrar": "Close",
        "cursos.noResultados": "No courses found matching that criteria.",
        "cursos.proximamente": "Coming Soon",

        // Sección Features
        "features.label": "Features",
        "features.titulo": "What the platform includes",
        "features.subtitulo": "Tools designed for both students and teachers.",
        "features.quizzes.titulo": "Auto-Graded Quizzes",
        "features.quizzes.desc": "Interactive exams with instant feedback. Kahoot for gamified practice and Google Forms for formal assessments.",
        "features.labs.titulo": "Hands-On Labs",
        "features.labs.desc": "Hands-on exercises in real sandboxes. Practice Excel, SQL, Python and more in safe environments without installing anything.",
        "features.cert.titulo": "Digital Certificates",
        "features.cert.desc": "Upon completing a course, receive your downloadable certificate with verifiable code. Share it on LinkedIn.",
        "features.progreso.titulo": "Progress Tracking",
        "features.progreso.desc": "Visual dashboard with completion percentage, grades, badges, and your complete learning history.",
        "features.video.titulo": "Interactive Video Lessons",
        "features.video.desc": "Videos with embedded questions (Edpuzzle), timestamps, and notes. Learn at your own pace with multimedia content.",
        "features.ai.titulo": "AI Assistant (Coming Soon)",
        "features.ai.desc": "Smart chatbot that answers questions about course content 24/7. Your personal AI tutor.",
        "features.tools.titulo": "Free Tools Ecosystem",
        "features.tools.subtitulo": "We integrate the best free tools into a unified experience",

        // Dashboard Preview
        "dashPreview.label": "Preview",
        "dashPreview.titulo": "Student Dashboard",
        "dashPreview.subtitulo": "View your progress, grades, and next steps all in one place.",

        // Roadmap
        "roadmap.label": "Roadmap",
        "roadmap.titulo": "Growth Roadmap",
        "roadmap.subtitulo": "Evolutionary plan: we start with free tools and scale towards a complete platform.",

        // CTA
        "cta.titulo": "Ready to transform your learning?",
        "cta.subtitulo": "Join our student community and start your technical training today.",
        "cta.facebook": "Visit us on Facebook",
        "cta.whatsapp": "Message us on WhatsApp",

        // Footer
        "footer.desc": "Technical and professional training platform. Practical courses to boost your career.",
        "footer.cursos": "Courses",
        "footer.plataforma": "Platform",
        "footer.soporte": "Support",
        "footer.miAula": "My Classroom",
        "footer.panelProfesor": "Teacher Panel",
        "footer.certificados": "Certificates",
        "footer.faq": "FAQ",
        "footer.guia": "Student Guide",
        "footer.contactarProfesor": "Contact Teacher",
        "footer.feedback": "Feedback",
        "footer.copy": "© 2026 Fundación Iberoamericana. All rights reserved. MVP Platform.",

        // Dashboard
        "dash.bienvenida": "Hi, {nombre}! Pick up where you left off",
        "dash.resumen": "Overview",
        "dash.misCursos": "My Courses",
        "dash.misQuizzes": "My Quizzes",
        "dash.certificados": "Certificates",
        "dash.recursos": "Resources",
        "dash.cursosInscritos": "Enrolled Courses",
        "dash.quizzesCompletados": "Quizzes Completed",
        "dash.promedioGeneral": "Overall Average",
        "dash.certificadosObtenidos": "Certificates",
        "dash.continuar": "Continue",
        "dash.cargarDemo": "Load demo data",
        "dash.cerrarSesion": "Sign Out",
        "dash.actividadReciente": "Recent Activity",
        "dash.proximasFechas": "Upcoming Dates",

        // Quizzes
        "quiz.centro": "Quiz Center",
        "quiz.practica": "Practice Mode",
        "quiz.examen": "Exam Mode",
        "quiz.seleccionarCurso": "Select a course",
        "quiz.iniciar": "Start Quiz",
        "quiz.siguiente": "Next",
        "quiz.finalizar": "Finish",
        "quiz.resultado": "Result",
        "quiz.correctas": "Correct",
        "quiz.incorrectas": "Incorrect",
        "quiz.puntaje": "Score",
        "quiz.tiempo": "Time",
        "quiz.revisar": "Review Answers",
        "quiz.repetir": "Retry Quiz",
        "quiz.volver": "Back to Quizzes",
        "quiz.pregunta": "Question",
        "quiz.de": "of",
        "quiz.explicacion": "Explanation",

        // Onboarding
        "onboard.titulo": "Welcome to the platform!",
        "onboard.nombre": "What's your name?",
        "onboard.placeholder": "Your full name",
        "onboard.comenzar": "Get Started"
    }
};

/**
 * Obtener el idioma actual desde localStorage (default: es)
 */
function getIdioma() {
    return localStorage.getItem('idioma') || 'es';
}

/**
 * Cambiar el idioma y guardar en localStorage
 */
function setIdioma(idioma) {
    localStorage.setItem('idioma', idioma);
    aplicarTraducciones();
    actualizarBotonIdioma();
}

/**
 * Obtener una traducción por clave
 */
function t(clave, params) {
    const idioma = getIdioma();
    let texto = traducciones[idioma]?.[clave] || traducciones['es']?.[clave] || clave;

    // Reemplazar parámetros {nombre} etc.
    if (params) {
        Object.keys(params).forEach(key => {
            texto = texto.replace(`{${key}}`, params[key]);
        });
    }

    return texto;
}

/**
 * Aplicar traducciones a todos los elementos con data-i18n
 */
function aplicarTraducciones() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const clave = el.getAttribute('data-i18n');
        const traduccion = t(clave);

        // Si el elemento tiene data-i18n-attr, actualizar el atributo
        const attr = el.getAttribute('data-i18n-attr');
        if (attr) {
            el.setAttribute(attr, traduccion);
        } else {
            el.innerHTML = traduccion;
        }
    });
}

/**
 * Actualizar el botón de idioma en el navbar
 */
function actualizarBotonIdioma() {
    const btn = document.getElementById('langToggle');
    if (btn) {
        const idioma = getIdioma();
        btn.textContent = idioma === 'es' ? 'EN' : 'ES';
        btn.title = idioma === 'es' ? 'Switch to English' : 'Cambiar a Español';
    }
}

/**
 * Toggle entre español e inglés
 */
function toggleIdioma() {
    const actual = getIdioma();
    setIdioma(actual === 'es' ? 'en' : 'es');
}

/**
 * Inicializar i18n cuando el DOM está listo
 */
function inicializarI18n() {
    actualizarBotonIdioma();
    aplicarTraducciones();
}

// Exportar para uso global
window.t = t;
window.getIdioma = getIdioma;
window.setIdioma = setIdioma;
window.toggleIdioma = toggleIdioma;
window.inicializarI18n = inicializarI18n;
window.aplicarTraducciones = aplicarTraducciones;
