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
        "onboard.comenzar": "Comenzar",

        // Nav (extended)
        "nav.inicio": "Inicio",
        "nav.miAula": "Mi Aula",
        "nav.labs": "Labs",
        "nav.recursos": "Recursos",
        "nav.calendario": "Calendario",
        "nav.certificados": "Certificados",

        // Labs page
        "labs.badge": "Hands-On",
        "labs.titulo": "Laboratorios Prácticos",
        "labs.subtitulo": "Practica en entornos reales sin instalar nada. Código, hojas de cálculo y ejercicios interactivos directamente en tu navegador.",
        "labs.todos": "Todos",
        "labs.codigo": "Código",
        "labs.excel": "Excel / Sheets",
        "labs.datos": "Datos & SQL",
        "labs.diseno": "Diseño",
        "labs.externas": "Herramientas Externas",
        "labs.externasDesc": "Accede a plataformas de práctica gratuitas recomendadas por tus instructores.",
        "labs.volver": "Volver a Labs",
        "labs.iniciar": "Iniciar Lab",

        // Recursos page
        "recursos.badge": "Biblioteca",
        "recursos.titulo": "Biblioteca de Recursos",
        "recursos.subtitulo": "Material de apoyo organizado por curso: PDFs, presentaciones, plantillas, cheat sheets y recursos externos recomendados.",
        "recursos.buscar": "Buscar recurso por nombre o curso...",
        "recursos.todos": "Todos",
        "recursos.pdfs": "PDFs",
        "recursos.plantillas": "Plantillas",
        "recursos.cheatsheets": "Cheat Sheets",
        "recursos.videos": "Videos",
        "recursos.externos": "Externos",
        "recursos.extRecomendados": "Recursos Externos Recomendados",
        "recursos.extRecomendadosDesc": "Canales de YouTube, cursos gratuitos y sitios web que complementan tu formación.",

        // Calendario page
        "cal.badge": "Organización",
        "cal.titulo": "Calendario y Horarios",
        "cal.subtitulo": "Mantente al día con clases en vivo, fechas de entrega, exámenes y eventos de la academia.",
        "cal.hoy": "Hoy",
        "cal.dom": "Dom",
        "cal.lun": "Lun",
        "cal.mar": "Mar",
        "cal.mie": "Mié",
        "cal.jue": "Jue",
        "cal.vie": "Vie",
        "cal.sab": "Sáb",
        "cal.claseVivo": "Clase en vivo",
        "cal.entrega": "Fecha de entrega",
        "cal.examen": "Examen",
        "cal.eventoEspecial": "Evento especial",
        "cal.proximosEventos": "Próximos Eventos",
        "cal.agregarCalendario": "Agregar a mi calendario",
        "cal.googleCalDesc": "Sincroniza todas las fechas con tu calendario personal.",

        // Certificados page
        "cert.titulo": "Generador de Certificados",
        "cert.subtitulo": "Completa los datos del estudiante para generar un certificado profesional de finalización de curso.",
        "cert.datosCert": "Datos del Certificado",
        "cert.nombre": "Nombre completo del estudiante *",
        "cert.curso": "Curso completado *",
        "cert.seleccionar": "— Seleccionar curso —",
        "cert.fecha": "Fecha de emisión",
        "cert.calificacion": "Calificación final (0-100) *",
        "cert.instructor": "Nombre del instructor",
        "cert.vistaPrevia": "Vista Previa",
        "cert.descargarPDF": "Descargar PDF",
        "cert.certFinalizacion": "Certificado de Finalización",
        "cert.seOtorga": "Se otorga el presente certificado a",
        "cert.porCompletar": "Por haber completado satisfactoriamente el curso",

        // About page
        "about.badge": "Nuestra Historia",
        "about.titulo": "Sobre Nosotros",
        "about.subtitulo": "Comprometidos con la educación técnica de calidad y el desarrollo profesional accesible para toda América Latina.",
        "about.mision": "Nuestra Misión",
        "about.vision": "Nuestra Visión",
        "about.numeros": "Nuestros Números",
        "about.impacto": "Impacto en Cifras",
        "about.metodologia": "Metodología",
        "about.enfoque": "Nuestro Enfoque",
        "about.tecnologia": "Tecnología",
        "about.caracteristicas": "Características de la Plataforma",
        "about.comenzar": "Comienza tu Formación Hoy",
        "about.verCursos": "Ver Cursos Disponibles",

        // Placement test page
        "pt.titulo": "Test de Nivel de Inglés",
        "pt.subtitulo": "Descubre tu nivel según el Marco Común Europeo de Referencia (CEFR). 25 preguntas adaptativas que ajustan la dificultad según tus respuestas.",
        "pt.duracion": "Duración estimada",
        "pt.adaptativo": "Adaptativo",
        "pt.ajustaDificultad": "Ajusta la dificultad",
        "pt.nivelesEvaluados": "Niveles evaluados",
        "pt.nivelesCEFR": "Niveles CEFR",
        "pt.comenzar": "Comenzar Test",

        // FAQ page
        "faq.badge": "Ayuda",
        "faq.titulo": "Preguntas Frecuentes",
        "faq.subtitulo": "Encuentra respuestas a las preguntas más comunes sobre la plataforma, cursos y funcionalidades.",
        "faq.contacto": "¿No encontraste lo que buscabas?",
        "faq.contactoDesc": "Estamos aquí para ayudarte. Contáctanos y resolveremos tus dudas.",
        "faq.contactoBtn": "Contactar Soporte",

        // 404 page
        "error.titulo": "Página no encontrada",
        "error.desc": "Lo sentimos, la página que buscas no existe o fue movida. Prueba navegar desde el inicio.",
        "error.popularTitle": "Páginas populares",

        // Authentication
        "auth.welcome": "Bienvenido",
        "auth.welcomeDesc": "Accede a todo el contenido de la plataforma",
        "auth.login": "Iniciar Sesión",
        "auth.register": "Registrarse",
        "auth.email": "Correo electrónico",
        "auth.emailOrUser": "Correo o usuario",
        "auth.emailError": "Cuenta no encontrada. ¿Quieres registrarte?",
        "auth.password": "Contraseña",
        "auth.passwordWrong": "Contraseña incorrecta",
        "auth.createPassword": "Contraseña *",
        "auth.passwordShort": "La contraseña debe tener al menos 6 caracteres",
        "auth.fullName": "Nombre completo *",
        "auth.emailLabel": "Correo electrónico *",
        "auth.phone": "Teléfono / WhatsApp",
        "auth.phoneHint": "Para recibir información sobre tus cursos",
        "auth.courseInterest": "Curso de interés",
        "auth.nameError": "Ingresa tu nombre completo",
        "auth.emailExists": "Este correo ya está registrado. Inicia sesión.",
        "auth.loginBtn": "Iniciar Sesión",
        "auth.registerBtn": "Crear Cuenta Gratis",
        "auth.registerWhatsApp": "Registrarme por WhatsApp",
        "auth.noAccount": "¿No tienes cuenta?",
        "auth.registerHere": "Regístrate aquí",
        "auth.hasAccount": "¿Ya tienes cuenta?",
        "auth.loginHere": "Inicia sesión",
        "auth.gateTitle": "Contenido Exclusivo para Estudiantes",
        "auth.gateDesc": "Regístrate gratis para acceder a quizzes, laboratorios, recursos y más.",
        "auth.benefit1": "Quizzes interactivos con retroalimentación",
        "auth.benefit2": "Laboratorios prácticos hands-on",
        "auth.benefit3": "Dashboard de progreso y gamificación",
        "auth.benefit4": "Certificados digitales verificables",
        "auth.benefit5": "Recursos y materiales de estudio",
        "auth.registerFree": "Registrarse Gratis",
        "auth.loginExisting": "Ya tengo cuenta",
        "auth.contactWhatsApp": "Consultar por WhatsApp"
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
        "onboard.comenzar": "Get Started",

        // Nav (extended)
        "nav.inicio": "Home",
        "nav.miAula": "My Classroom",
        "nav.labs": "Labs",
        "nav.recursos": "Resources",
        "nav.calendario": "Calendar",
        "nav.certificados": "Certificates",

        // Labs page
        "labs.badge": "Hands-On",
        "labs.titulo": "Hands-On Labs",
        "labs.subtitulo": "Practice in real environments without installing anything. Code, spreadsheets, and interactive exercises directly in your browser.",
        "labs.todos": "All",
        "labs.codigo": "Code",
        "labs.excel": "Excel / Sheets",
        "labs.datos": "Data & SQL",
        "labs.diseno": "Design",
        "labs.externas": "External Tools",
        "labs.externasDesc": "Access free practice platforms recommended by your instructors.",
        "labs.volver": "Back to Labs",
        "labs.iniciar": "Start Lab",

        // Recursos page
        "recursos.badge": "Library",
        "recursos.titulo": "Resource Library",
        "recursos.subtitulo": "Support materials organized by course: PDFs, presentations, templates, cheat sheets, and recommended external resources.",
        "recursos.buscar": "Search resource by name or course...",
        "recursos.todos": "All",
        "recursos.pdfs": "PDFs",
        "recursos.plantillas": "Templates",
        "recursos.cheatsheets": "Cheat Sheets",
        "recursos.videos": "Videos",
        "recursos.externos": "External",
        "recursos.extRecomendados": "Recommended External Resources",
        "recursos.extRecomendadosDesc": "YouTube channels, free courses, and websites that complement your training.",

        // Calendario page
        "cal.badge": "Organization",
        "cal.titulo": "Calendar & Schedule",
        "cal.subtitulo": "Stay up to date with live classes, deadlines, exams, and academy events.",
        "cal.hoy": "Today",
        "cal.dom": "Sun",
        "cal.lun": "Mon",
        "cal.mar": "Tue",
        "cal.mie": "Wed",
        "cal.jue": "Thu",
        "cal.vie": "Fri",
        "cal.sab": "Sat",
        "cal.claseVivo": "Live class",
        "cal.entrega": "Deadline",
        "cal.examen": "Exam",
        "cal.eventoEspecial": "Special event",
        "cal.proximosEventos": "Upcoming Events",
        "cal.agregarCalendario": "Add to my calendar",
        "cal.googleCalDesc": "Sync all dates with your personal calendar.",

        // Certificados page
        "cert.titulo": "Certificate Generator",
        "cert.subtitulo": "Fill in the student details to generate a professional course completion certificate.",
        "cert.datosCert": "Certificate Details",
        "cert.nombre": "Student full name *",
        "cert.curso": "Completed course *",
        "cert.seleccionar": "— Select course —",
        "cert.fecha": "Issue date",
        "cert.calificacion": "Final grade (0-100) *",
        "cert.instructor": "Instructor name",
        "cert.vistaPrevia": "Preview",
        "cert.descargarPDF": "Download PDF",
        "cert.certFinalizacion": "Certificate of Completion",
        "cert.seOtorga": "This certificate is awarded to",
        "cert.porCompletar": "For successfully completing the course",

        // About page
        "about.badge": "Our Story",
        "about.titulo": "About Us",
        "about.subtitulo": "Committed to quality technical education and accessible professional development for all of Latin America.",
        "about.mision": "Our Mission",
        "about.vision": "Our Vision",
        "about.numeros": "Our Numbers",
        "about.impacto": "Impact in Numbers",
        "about.metodologia": "Methodology",
        "about.enfoque": "Our Approach",
        "about.tecnologia": "Technology",
        "about.caracteristicas": "Platform Features",
        "about.comenzar": "Start Your Training Today",
        "about.verCursos": "View Available Courses",

        // Placement test page
        "pt.titulo": "English Level Test",
        "pt.subtitulo": "Discover your level according to the Common European Framework of Reference (CEFR). 25 adaptive questions that adjust difficulty based on your answers.",
        "pt.duracion": "Estimated duration",
        "pt.adaptativo": "Adaptive",
        "pt.ajustaDificultad": "Adjusts difficulty",
        "pt.nivelesEvaluados": "Levels assessed",
        "pt.nivelesCEFR": "CEFR Levels",
        "pt.comenzar": "Start Test",

        // FAQ page
        "faq.badge": "Help",
        "faq.titulo": "Frequently Asked Questions",
        "faq.subtitulo": "Find answers to the most common questions about the platform, courses, and features.",
        "faq.contacto": "Didn't find what you were looking for?",
        "faq.contactoDesc": "We're here to help. Contact us and we'll resolve your questions.",
        "faq.contactoBtn": "Contact Support",

        // 404 page
        "error.titulo": "Page not found",
        "error.desc": "Sorry, the page you're looking for doesn't exist or has been moved. Try navigating from the homepage.",
        "error.popularTitle": "Popular pages",

        // Authentication
        "auth.welcome": "Welcome",
        "auth.welcomeDesc": "Access all platform content",
        "auth.login": "Log In",
        "auth.register": "Sign Up",
        "auth.email": "Email address",
        "auth.emailOrUser": "Email or username",
        "auth.emailError": "Account not found. Want to sign up?",
        "auth.password": "Password",
        "auth.passwordWrong": "Incorrect password",
        "auth.createPassword": "Password *",
        "auth.passwordShort": "Password must be at least 6 characters",
        "auth.fullName": "Full name *",
        "auth.emailLabel": "Email address *",
        "auth.phone": "Phone / WhatsApp",
        "auth.phoneHint": "To receive information about your courses",
        "auth.courseInterest": "Course of interest",
        "auth.nameError": "Please enter your full name",
        "auth.emailExists": "This email is already registered. Please log in.",
        "auth.loginBtn": "Log In",
        "auth.registerBtn": "Create Free Account",
        "auth.registerWhatsApp": "Register via WhatsApp",
        "auth.noAccount": "Don't have an account?",
        "auth.registerHere": "Sign up here",
        "auth.hasAccount": "Already have an account?",
        "auth.loginHere": "Log in",
        "auth.gateTitle": "Exclusive Student Content",
        "auth.gateDesc": "Sign up for free to access quizzes, labs, resources and more.",
        "auth.benefit1": "Interactive quizzes with feedback",
        "auth.benefit2": "Hands-on practical labs",
        "auth.benefit3": "Progress dashboard & gamification",
        "auth.benefit4": "Verifiable digital certificates",
        "auth.benefit5": "Study resources & materials",
        "auth.registerFree": "Sign Up Free",
        "auth.loginExisting": "I have an account",
        "auth.contactWhatsApp": "Ask on WhatsApp"
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
 * Supports both new pill toggle (.lang-toggle) and legacy single button
 */
function actualizarBotonIdioma() {
    const idioma = getIdioma();

    // New pill toggle
    const langOptions = document.querySelectorAll('.lang-option');
    if (langOptions.length) {
        langOptions.forEach(function(opt) {
            if (opt.getAttribute('data-lang') === idioma) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // Legacy single button fallback
    const btn = document.getElementById('langToggle');
    if (btn && btn.tagName === 'BUTTON') {
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
