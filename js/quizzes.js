/**
 * quizzes.js — Motor de Quizzes Interactivos
 * Fundación Iberoamericana
 *
 * Funcionalidades:
 * - Cargar quizzes desde JSON
 * - Modo práctica (sin timer, feedback inmediato)
 * - Modo examen (con timer, feedback al final)
 * - Guardar resultados en localStorage
 * - Pantalla de resultados con desglose
 */

// =========================
// ESTADO DEL QUIZ
// =========================

let quizzesData = [];
let quizActual = null;
let preguntaActual = 0;
let respuestasUsuario = [];
let timerInterval = null;
let tiempoRestante = 0;
let quizIniciado = false;
let filtroActivo = 'all';

// Fallback de quizzes (por si falla el fetch)
const quizzesFallback = [
    {
        id: "quiz-excel-m2", cursoId: "excel-basico-avanzado", moduloId: "excel-m2",
        titulo: "Fórmulas y Funciones Esenciales", modo: "practica", tiempoLimite: null,
        preguntas: [
            { id: "q1", pregunta: "¿Cuál es la fórmula correcta para sumar las celdas A1 a A10?", tipo: "opcion-multiple", opciones: ["=SUMA(A1:A10)", "=SUM(A1-A10)", "=SUMAR(A1:A10)", "=ADD(A1:A10)"], respuestaCorrecta: 0, explicacion: "SUMA() es la función en español de Excel.", dificultad: "facil" },
            { id: "q2", pregunta: "¿Qué resultado devuelve =SI(10>5, \"Mayor\", \"Menor\")?", tipo: "opcion-multiple", opciones: ["10", "Mayor", "Menor", "VERDADERO"], respuestaCorrecta: 1, explicacion: "La función SI evalúa 10>5 (VERDADERO), devuelve \"Mayor\".", dificultad: "facil" },
            { id: "q3", pregunta: "En =BUSCARV(A2, B:D, 3, FALSO), ¿qué significa el 3?", tipo: "opcion-multiple", opciones: ["Busca en la fila 3", "Devuelve la tercera columna del rango", "Busca los primeros 3 resultados", "3 criterios de búsqueda"], respuestaCorrecta: 1, explicacion: "El tercer argumento indica la columna del rango de la cual obtener el resultado.", dificultad: "medio" }
        ]
    },
    {
        id: "quiz-web-m1", cursoId: "desarrollo-web", moduloId: "web-m1",
        titulo: "HTML5 — Estructura y Semántica", modo: "practica", tiempoLimite: null,
        preguntas: [
            { id: "q12", pregunta: "¿Cuál es la estructura básica correcta de HTML5?", tipo: "opcion-multiple", opciones: ["<!DOCTYPE html><html><head>...</head><body>...</body></html>", "<html><header>...</header><content>...</content></html>", "<!DOCTYPE html5><html>...</html>", "<html5><head>...</head></html5>"], respuestaCorrecta: 0, explicacion: "HTML5 empieza con <!DOCTYPE html> seguido de <html>, <head> y <body>.", dificultad: "facil" },
            { id: "q15", pregunta: "¿Cuál de estas etiquetas NO es semántica?", tipo: "opcion-multiple", opciones: ["<article>", "<nav>", "<div>", "<footer>"], respuestaCorrecta: 2, explicacion: "<div> es un contenedor genérico sin significado semántico.", dificultad: "facil" }
        ]
    },
    {
        id: "quiz-web-m3", cursoId: "desarrollo-web", moduloId: "web-m3",
        titulo: "JavaScript — Fundamentos", modo: "examen", tiempoLimite: 900,
        preguntas: [
            { id: "q17", pregunta: "¿Cuál es la diferencia entre let, const y var?", tipo: "opcion-multiple", opciones: ["No hay diferencia", "var: scope función; let/const: scope bloque. const no se reasigna", "let: números, const: texto, var: ambos", "const es más rápido"], respuestaCorrecta: 1, explicacion: "var tiene scope de función. let y const tienen scope de bloque. const no permite reasignación.", dificultad: "medio" },
            { id: "q19", pregunta: "¿Cuál es una arrow function que suma dos números?", tipo: "opcion-multiple", opciones: ["const sumar = (a, b) => a + b;", "function sumar => (a, b) { return a+b }", "const sumar = arrow(a,b) { a+b }", "let sumar = (a,b) -> a+b;"], respuestaCorrecta: 0, explicacion: "Las arrow functions usan =>. Con una sola expresión se omite return.", dificultad: "medio" }
        ]
    },
    {
        id: "quiz-python-m1", cursoId: "python-basico", moduloId: "py-m1",
        titulo: "Primeros Pasos con Python", modo: "practica", tiempoLimite: null,
        preguntas: [
            { id: "q21", pregunta: "¿Qué imprime: x=10; y=3; print(x // y)?", tipo: "opcion-multiple", opciones: ["3.33", "3", "3.0", "Error"], respuestaCorrecta: 1, explicacion: "// es división entera en Python. 10 // 3 = 3.", dificultad: "facil" },
            { id: "q25", pregunta: "¿Cuál es la forma correcta de un comentario en Python?", tipo: "opcion-multiple", opciones: ["// Comentario", "/* Comentario */", "# Comentario", "<!-- Comentario -->"], respuestaCorrecta: 2, explicacion: "En Python los comentarios empiezan con #.", dificultad: "facil" }
        ]
    }
];

// Mapa de cursos para nombres
const cursoNombres = {
    "excel-basico-avanzado": "Excel Básico a Avanzado",
    "desarrollo-web": "Desarrollo Web",
    "python-basico": "Python desde Cero",
    "sql-bases-datos": "SQL y Bases de Datos"
};

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    cargarQuizzes();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
});

async function cargarQuizzes() {
    try {
        const response = await fetch('data/quizzes.json');
        if (!response.ok) throw new Error('Fetch failed');
        quizzesData = await response.json();
    } catch (e) {
        console.warn('Usando quizzes de fallback:', e.message);
        quizzesData = quizzesFallback;
    }
    renderizarListaQuizzes();
}

// =========================
// LISTA DE QUIZZES
// =========================

window.filtrarQuizzes = function(filtro, e) {
    filtroActivo = filtro;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (e && e.target) e.target.classList.add('active');
    renderizarListaQuizzes();
};

function renderizarListaQuizzes() {
    const grid = document.getElementById('quizGrid');
    if (!grid) return;

    let quizzes = quizzesData;
    if (filtroActivo !== 'all') {
        quizzes = quizzes.filter(q => q.modo === filtroActivo);
    }

    if (quizzes.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><i class="fas fa-clipboard"></i><p>No hay quizzes disponibles con este filtro.</p></div>';
        return;
    }

    grid.innerHTML = quizzes.map(quiz => {
        const cursoNombre = cursoNombres[quiz.cursoId] || quiz.cursoId;
        const modoClass = quiz.modo === 'examen' ? 'examen' : 'practica';
        const modoLabel = quiz.modo === 'examen' ? t('quiz.examen') : t('quiz.practica');
        const tiempoText = quiz.tiempoLimite ? `${Math.floor(quiz.tiempoLimite / 60)} min` : 'Sin límite';

        return `
        <div class="quiz-select-card" onclick="iniciarQuiz('${quiz.id}')">
            <div class="quiz-mode-badge ${modoClass}">${modoLabel}</div>
            <h4>${quiz.titulo}</h4>
            <p>${cursoNombre}</p>
            <div class="quiz-meta">
                <span><i class="fas fa-question-circle"></i> ${quiz.preguntas.length} preguntas</span>
                <span><i class="fas fa-clock"></i> ${tiempoText}</span>
            </div>
        </div>`;
    }).join('');
}

// =========================
// INICIAR QUIZ
// =========================

window.iniciarQuiz = function(quizId) {
    quizActual = quizzesData.find(q => q.id === quizId);
    if (!quizActual) return;

    preguntaActual = 0;
    respuestasUsuario = new Array(quizActual.preguntas.length).fill(null);
    quizIniciado = true;

    // Cambiar vista
    document.getElementById('quizSelectView').style.display = 'none';
    document.getElementById('quizPlayView').style.display = 'block';
    document.getElementById('quizResultsView').style.display = 'none';

    // Título
    document.getElementById('quizTitle').textContent = quizActual.titulo;

    // Timer (solo modo examen)
    const timerEl = document.getElementById('quizTimer');
    if (quizActual.tiempoLimite && quizActual.modo === 'examen') {
        tiempoRestante = quizActual.tiempoLimite;
        timerEl.style.display = 'flex';
        actualizarTimer();
        timerInterval = setInterval(() => {
            tiempoRestante--;
            actualizarTimer();
            if (tiempoRestante <= 0) {
                clearInterval(timerInterval);
                finalizarQuiz();
            }
        }, 1000);
    } else {
        timerEl.style.display = 'none';
    }

    renderizarPregunta();
};

function actualizarTimer() {
    const min = Math.floor(tiempoRestante / 60);
    const seg = tiempoRestante % 60;
    const texto = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    const timerText = document.getElementById('quizTimerText');
    const timerEl = document.getElementById('quizTimer');

    if (timerText) timerText.textContent = texto;
    if (timerEl) {
        timerEl.classList.toggle('warning', tiempoRestante < 60);
    }
}

// =========================
// RENDERIZAR PREGUNTA
// =========================

function renderizarPregunta() {
    const pregunta = quizActual.preguntas[preguntaActual];
    const total = quizActual.preguntas.length;
    const esPractica = quizActual.modo === 'practica';
    const yaRespondio = respuestasUsuario[preguntaActual] !== null;

    // Progreso
    document.getElementById('quizProgressText').textContent = `${t('quiz.pregunta')} ${preguntaActual + 1} ${t('quiz.de')} ${total}`;
    document.getElementById('quizProgressBar').style.width = `${((preguntaActual + 1) / total) * 100}%`;

    // Letras para opciones
    const letras = ['A', 'B', 'C', 'D'];

    const area = document.getElementById('quizQuestionArea');
    area.innerHTML = `
        <div class="quiz-question">
            <h3>${pregunta.pregunta}</h3>
            <div class="quiz-options">
                ${pregunta.opciones.map((opcion, i) => {
                    let clases = 'quiz-option';
                    if (yaRespondio && esPractica) {
                        if (i === pregunta.respuestaCorrecta) clases += ' correct';
                        else if (i === respuestasUsuario[preguntaActual] && i !== pregunta.respuestaCorrecta) clases += ' incorrect';
                    } else if (respuestasUsuario[preguntaActual] === i) {
                        clases += ' selected';
                    }

                    return `
                    <div class="${clases}" onclick="seleccionarOpcion(${i})" data-opcion="${i}">
                        <span class="quiz-option-letter">${letras[i]}</span>
                        <span>${opcion}</span>
                    </div>`;
                }).join('')}
            </div>
            ${yaRespondio && esPractica ? `
                <div class="quiz-explanation">
                    <strong><i class="fas fa-lightbulb"></i> ${t('quiz.explicacion')}:</strong> ${pregunta.explicacion}
                </div>
            ` : ''}
        </div>
    `;

    // Botones de acción
    const acciones = document.getElementById('quizActions');
    const esUltima = preguntaActual === total - 1;

    if (esPractica && yaRespondio) {
        acciones.innerHTML = `
            <button class="btn btn-primary" onclick="${esUltima ? 'finalizarQuiz()' : 'siguientePregunta()'}">
                ${esUltima ? t('quiz.finalizar') : t('quiz.siguiente')} <i class="fas fa-arrow-right"></i>
            </button>
        `;
    } else if (!esPractica) {
        acciones.innerHTML = `
            <button class="btn btn-secondary" onclick="preguntaAnterior()" ${preguntaActual === 0 ? 'disabled style="opacity:0.3;"' : ''}>
                <i class="fas fa-arrow-left"></i> Anterior
            </button>
            <button class="btn btn-primary" onclick="${esUltima ? 'finalizarQuiz()' : 'siguientePregunta()'}">
                ${esUltima ? t('quiz.finalizar') : t('quiz.siguiente')} <i class="fas fa-arrow-right"></i>
            </button>
        `;
    } else {
        acciones.innerHTML = '';
    }
}

// =========================
// SELECCIONAR OPCIÓN
// =========================

window.seleccionarOpcion = function(indice) {
    const yaRespondio = respuestasUsuario[preguntaActual] !== null;
    const esPractica = quizActual.modo === 'practica';

    // En práctica, una vez respondida no se puede cambiar
    if (esPractica && yaRespondio) return;

    respuestasUsuario[preguntaActual] = indice;
    renderizarPregunta();
};

// =========================
// NAVEGACIÓN
// =========================

window.siguientePregunta = function() {
    if (preguntaActual < quizActual.preguntas.length - 1) {
        preguntaActual++;
        renderizarPregunta();
    }
};

window.preguntaAnterior = function() {
    if (preguntaActual > 0) {
        preguntaActual--;
        renderizarPregunta();
    }
};

// =========================
// FINALIZAR QUIZ
// =========================

window.finalizarQuiz = function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    quizIniciado = false;

    // Calcular resultado
    let correctas = 0;
    quizActual.preguntas.forEach((p, i) => {
        if (respuestasUsuario[i] === p.respuestaCorrecta) correctas++;
    });

    const total = quizActual.preguntas.length;
    const puntaje = Math.round((correctas / total) * 100);

    // Guardar resultado en localStorage
    const resultados = JSON.parse(localStorage.getItem('quiz_resultados') || '[]');
    resultados.push({
        quizId: quizActual.id,
        titulo: quizActual.titulo,
        cursoId: quizActual.cursoId,
        puntaje: puntaje,
        correctas: correctas,
        total: total,
        fecha: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('quiz_resultados', JSON.stringify(resultados));

    // Mostrar resultados
    mostrarResultados(puntaje, correctas, total);
};

function mostrarResultados(puntaje, correctas, total) {
    document.getElementById('quizSelectView').style.display = 'none';
    document.getElementById('quizPlayView').style.display = 'none';
    document.getElementById('quizResultsView').style.display = 'block';

    const scoreClass = puntaje >= 80 ? 'good' : puntaje >= 60 ? 'ok' : 'bad';
    const mensaje = puntaje >= 80 ? '🎉 ¡Excelente trabajo!' : puntaje >= 60 ? '👍 ¡Buen esfuerzo!' : '📚 Sigue practicando';

    const container = document.getElementById('quizResultsContent');
    container.innerHTML = `
        <div class="quiz-results-score ${scoreClass}">${puntaje}%</div>
        <h2>${mensaje}</h2>
        <p style="color:var(--text-light);margin-bottom:24px;">${quizActual.titulo}</p>

        <div class="quiz-results-breakdown">
            <div class="stat">
                <div class="stat-number" style="color:#4CAF50;">${correctas}</div>
                <div class="stat-label">${t('quiz.correctas')}</div>
            </div>
            <div class="stat">
                <div class="stat-number" style="color:#F44336;">${total - correctas}</div>
                <div class="stat-label">${t('quiz.incorrectas')}</div>
            </div>
            <div class="stat">
                <div class="stat-number" style="color:var(--navy);">${total}</div>
                <div class="stat-label">Total</div>
            </div>
        </div>

        <div class="quiz-results-actions">
            <button class="btn btn-primary" onclick="iniciarQuiz('${quizActual.id}')">
                <i class="fas fa-redo"></i> ${t('quiz.repetir')}
            </button>
            <button class="btn btn-outline" onclick="volverALista()">
                <i class="fas fa-arrow-left"></i> ${t('quiz.volver')}
            </button>
        </div>
    `;

    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================
// VOLVER A LISTA
// =========================

window.volverALista = function() {
    document.getElementById('quizSelectView').style.display = 'block';
    document.getElementById('quizPlayView').style.display = 'none';
    document.getElementById('quizResultsView').style.display = 'none';
    quizActual = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
