/* =====================================================
   CEFR PLACEMENT TEST ENGINE
   25 adaptive questions across A1-C1
   ===================================================== */

(function () {
    'use strict';

    /* ---------- CEFR LEVEL CONFIG ---------- */
    const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const LEVEL_COLORS = { A1: '#4CAF50', A2: '#8BC34A', B1: '#FF9800', B2: '#F44336', C1: '#9C27B0' };
    const LEVEL_NAMES = {
        A1: 'Principiante (Beginner)',
        A2: 'Elemental (Elementary)',
        B1: 'Intermedio (Intermediate)',
        B2: 'Intermedio Alto (Upper-Intermediate)',
        C1: 'Avanzado (Advanced)'
    };
    const LEVEL_DESCRIPTIONS = {
        A1: 'Puedes entender y usar expresiones cotidianas básicas. Puedes presentarte y hacer preguntas sencillas sobre información personal.',
        A2: 'Puedes comunicarte en tareas simples y rutinarias. Puedes describir aspectos de tu entorno y necesidades inmediatas.',
        B1: 'Puedes manejar la mayoría de las situaciones al viajar. Puedes producir textos sencillos sobre temas familiares y describir experiencias.',
        B2: 'Puedes interactuar con fluidez y espontaneidad. Puedes producir textos claros y detallados sobre diversos temas y argumentar tu punto de vista.',
        C1: 'Puedes expresarte con fluidez y precisión. Puedes usar el idioma de forma flexible para fines sociales, académicos y profesionales.'
    };

    /* ---------- QUESTION BANK (5 per level = 25 total) ---------- */
    const QUESTIONS = [
        // === A1 (5 questions) ===
        { level: 'A1', id: 1, text: 'She _____ a student.', options: ['am', 'is', 'are', 'be'], correct: 1 },
        { level: 'A1', id: 2, text: 'What is the plural of "child"?', options: ['childs', 'childes', 'children', 'childrens'], correct: 2 },
        { level: 'A1', id: 3, text: '_____ you like coffee?', options: ['Are', 'Do', 'Is', 'Has'], correct: 1 },
        { level: 'A1', id: 4, text: 'I go to school _____ bus.', options: ['in', 'on', 'by', 'with'], correct: 2 },
        { level: 'A1', id: 5, text: 'My brother _____ football every Saturday.', options: ['play', 'plays', 'playing', 'is play'], correct: 1 },

        // === A2 (5 questions) ===
        { level: 'A2', id: 6, text: 'I _____ to the cinema last night.', options: ['go', 'goes', 'went', 'going'], correct: 2 },
        { level: 'A2', id: 7, text: 'There is _____ milk in the fridge.', options: ['a', 'any', 'some', 'many'], correct: 2 },
        { level: 'A2', id: 8, text: 'She is _____ than her sister.', options: ['tall', 'taller', 'tallest', 'more tall'], correct: 1 },
        { level: 'A2', id: 9, text: 'What _____ you doing right now?', options: ['do', 'are', 'is', 'does'], correct: 1 },
        { level: 'A2', id: 10, text: 'We _____ see the doctor tomorrow.', options: ['going', 'are going to', 'go to', 'will to'], correct: 1 },

        // === B1 (5 questions) ===
        { level: 'B1', id: 11, text: 'If it rains tomorrow, we _____ stay home.', options: ['would', 'will', 'can to', 'are'], correct: 1 },
        { level: 'B1', id: 12, text: 'She _____ here since 2019.', options: ['lives', 'is living', 'has lived', 'lived'], correct: 2 },
        { level: 'B1', id: 13, text: 'The report _____ by the manager yesterday.', options: ['wrote', 'was written', 'has written', 'is writing'], correct: 1 },
        { level: 'B1', id: 14, text: 'I wish I _____ more free time.', options: ['have', 'had', 'having', 'will have'], correct: 1 },
        { level: 'B1', id: 15, text: 'You should avoid _____ too much sugar.', options: ['eat', 'to eat', 'eating', 'ate'], correct: 2 },

        // === B2 (5 questions) ===
        { level: 'B2', id: 16, text: 'Had I known about the delay, I _____ earlier.', options: ['would leave', 'would have left', 'had left', 'will leave'], correct: 1 },
        { level: 'B2', id: 17, text: 'The project, _____ was due on Friday, has been postponed.', options: ['that', 'who', 'which', 'whom'], correct: 2 },
        { level: 'B2', id: 18, text: 'Not only _____ the exam, but she also got the highest score.', options: ['she passed', 'did she pass', 'she did pass', 'passed she'], correct: 1 },
        { level: 'B2', id: 19, text: 'By this time next year, I _____ my degree.', options: ['finish', 'will finish', 'will have finished', 'am finishing'], correct: 2 },
        { level: 'B2', id: 20, text: 'She insisted _____ paying for dinner.', options: ['in', 'on', 'at', 'for'], correct: 1 },

        // === C1 (5 questions) ===
        { level: 'C1', id: 21, text: 'Seldom _____ such a compelling argument in academic discourse.', options: ['I have encountered', 'have I encountered', 'I encountered', 'did I encountered'], correct: 1 },
        { level: 'C1', id: 22, text: 'The government\'s decision, albeit controversial, _____ to be effective in reducing emissions.', options: ['has been proved', 'has proven', 'had been proving', 'was being proved'], correct: 1 },
        { level: 'C1', id: 23, text: '_____ his extensive experience, he was surprisingly nervous during the presentation.', options: ['Despite', 'Although', 'However', 'Nevertheless'], correct: 0 },
        { level: 'C1', id: 24, text: 'It is imperative that she _____ the report before the deadline.', options: ['submits', 'submit', 'submitted', 'will submit'], correct: 1 },
        { level: 'C1', id: 25, text: 'The findings are _____ with previous research in the field.', options: ['consistent', 'persistent', 'resistant', 'insistent'], correct: 0 }
    ];

    /* ---------- STATE ---------- */
    let currentQuestion = 0;
    let currentLevel = 'A2';
    let answers = [];
    let scores = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
    let questionOrder = [];
    let timerInterval = null;
    let elapsedSeconds = 0;
    let selectedOption = null;

    /* ---------- ADAPTIVE ALGORITHM ---------- */
    function buildAdaptiveOrder() {
        const pool = {};
        LEVELS.forEach(l => { pool[l] = QUESTIONS.filter(q => q.level === l).map(q => q.id); });

        const order = [];
        let level = 'A2';
        let levelIdx = LEVELS.indexOf(level);
        let asked = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };

        while (order.length < 25) {
            const available = pool[LEVELS[levelIdx]];
            if (available.length > 0) {
                order.push(available.shift());
                asked[LEVELS[levelIdx]]++;
            }

            if (available.length === 0 || asked[LEVELS[levelIdx]] >= 5) {
                let moved = false;
                for (let i = levelIdx + 1; i < LEVELS.length; i++) {
                    if (pool[LEVELS[i]].length > 0) { levelIdx = i; moved = true; break; }
                }
                if (!moved) {
                    for (let i = levelIdx - 1; i >= 0; i--) {
                        if (pool[LEVELS[i]].length > 0) { levelIdx = i; moved = true; break; }
                    }
                }
                if (!moved) break;
            }
        }
        return order;
    }

    /* ---------- TIMER ---------- */
    function startTimer() {
        elapsedSeconds = 0;
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
            const s = String(elapsedSeconds % 60).padStart(2, '0');
            document.getElementById('ptTimer').textContent = m + ':' + s;
        }, 1000);
    }
    function stopTimer() { clearInterval(timerInterval); }

    /* ---------- START TEST ---------- */
    window.startTest = function () {
        questionOrder = buildAdaptiveOrder();
        currentQuestion = 0;
        answers = [];
        scores = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
        selectedOption = null;

        document.getElementById('ptIntro').style.display = 'none';
        document.getElementById('ptTest').style.display = 'block';
        document.getElementById('ptResults').style.display = 'none';

        startTimer();
        renderQuestion();
    };

    /* ---------- RENDER QUESTION ---------- */
    function renderQuestion() {
        selectedOption = null;
        const qId = questionOrder[currentQuestion];
        const q = QUESTIONS.find(x => x.id === qId);
        const levelColor = LEVEL_COLORS[q.level];

        const badge = document.getElementById('ptCurrentLevel');
        badge.textContent = q.level;
        badge.style.background = levelColor;
        currentLevel = q.level;

        const pct = ((currentQuestion) / questionOrder.length) * 100;
        document.getElementById('ptProgressFill').style.width = pct + '%';
        document.getElementById('ptProgressText').textContent = (currentQuestion + 1) + ' / ' + questionOrder.length;

        const letters = ['A', 'B', 'C', 'D'];
        const optionsHTML = q.options.map((opt, i) =>
            '<div class="pt-option" onclick="selectOption(' + i + ')" id="ptOpt' + i + '">' +
            '<div class="pt-option-letter">' + letters[i] + '</div>' +
            '<span>' + opt + '</span></div>'
        ).join('');

        const btnLabel = currentQuestion < questionOrder.length - 1
            ? 'Siguiente <i class="fas fa-arrow-right"></i>'
            : 'Ver Resultados <i class="fas fa-chart-bar"></i>';

        document.getElementById('ptQuestionArea').innerHTML =
            '<div class="pt-question-card">' +
            '<div class="pt-question-num">Pregunta ' + (currentQuestion + 1) + ' — Nivel ' + q.level + '</div>' +
            '<div class="pt-question-text">' + q.text + '</div>' +
            '<div class="pt-options">' + optionsHTML + '</div>' +
            '<button class="pt-next-btn" id="ptNextBtn" onclick="nextQuestion()" disabled>' + btnLabel + '</button>' +
            '</div>';
    }

    /* ---------- SELECT OPTION ---------- */
    window.selectOption = function (idx) {
        selectedOption = idx;
        for (let i = 0; i < 4; i++) {
            const el = document.getElementById('ptOpt' + i);
            if (el) el.classList.remove('selected');
        }
        const el = document.getElementById('ptOpt' + idx);
        if (el) el.classList.add('selected');
        document.getElementById('ptNextBtn').disabled = false;
    };

    /* ---------- NEXT QUESTION ---------- */
    window.nextQuestion = function () {
        if (selectedOption === null) return;

        const qId = questionOrder[currentQuestion];
        const q = QUESTIONS.find(x => x.id === qId);
        const isCorrect = selectedOption === q.correct;

        answers.push({ qId: qId, selected: selectedOption, correct: q.correct, isCorrect: isCorrect, level: q.level });
        if (isCorrect) scores[q.level]++;

        currentQuestion++;

        if (currentQuestion >= questionOrder.length) {
            stopTimer();
            showResults();
        } else {
            renderQuestion();
        }
    };

    /* ---------- CALCULATE LEVEL ---------- */
    function calculateLevel() {
        let determined = 'A1';
        for (let i = 0; i < LEVELS.length; i++) {
            var lv = LEVELS[i];
            if (scores[lv] >= 3) {
                determined = lv;
            }
        }
        return determined;
    }

    /* ---------- SHOW RESULTS ---------- */
    function showResults() {
        const level = calculateLevel();
        const color = LEVEL_COLORS[level];
        const totalCorrect = Object.values(scores).reduce(function(a, b) { return a + b; }, 0);
        const pct = Math.round((totalCorrect / 25) * 100);

        try {
            var prevLevel = localStorage.getItem('fi_cefr_level');
            localStorage.setItem('fi_cefr_level', level);
            localStorage.setItem('fi_cefr_score', JSON.stringify(scores));
            localStorage.setItem('fi_cefr_date', new Date().toISOString());
            // Save history for progress tracking
            var history = [];
            try { history = JSON.parse(localStorage.getItem('fi_cefr_history') || '[]'); } catch(e2) {}
            history.push({
                level: level,
                prevLevel: prevLevel || null,
                scores: Object.assign({}, scores),
                pct: pct,
                date: new Date().toISOString()
            });
            localStorage.setItem('fi_cefr_history', JSON.stringify(history));
        } catch (e) { /* silent */ }

        const breakdownHTML = LEVELS.map(function(lv) {
            var isActive = lv === level;
            return '<div class="pt-bd-item ' + (isActive ? 'highlight' : '') + '">' +
                '<div class="pt-bd-level" style="color:' + LEVEL_COLORS[lv] + '">' + lv + '</div>' +
                '<div class="pt-bd-score">' + scores[lv] + ' / 5</div></div>';
        }).join('');

        document.getElementById('ptTest').style.display = 'none';
        document.getElementById('ptResults').style.display = 'block';
        document.getElementById('ptProgressFill').style.width = '100%';

        var minutes = Math.floor(elapsedSeconds / 60);
        var seconds = elapsedSeconds % 60;

        document.getElementById('ptResults').innerHTML =
            '<div class="pt-results">' +
            '<div style="margin-bottom:8px;">' +
            '<span style="display:inline-block;padding:6px 16px;background:rgba(0,137,123,0.1);color:var(--teal);border-radius:20px;font-size:0.85rem;font-weight:700;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            '<i class="fas fa-check-circle"></i> Test Completado</span></div>' +
            '<div class="pt-result-badge" style="background:linear-gradient(135deg, ' + color + ', ' + color + 'dd);">' +
            '<div class="pt-result-level">' + level + '</div></div>' +
            '<div class="pt-result-title">' + LEVEL_NAMES[level] + '</div>' +
            '<div class="pt-result-desc">' + LEVEL_DESCRIPTIONS[level] + '</div>' +
            '<div style="display:flex;justify-content:center;gap:24px;margin-bottom:24px;flex-wrap:wrap;">' +
            '<div style="text-align:center;"><div style="font-size:1.8rem;font-weight:800;color:var(--teal);font-family:\'Plus Jakarta Sans\',sans-serif;">' + totalCorrect + '/25</div><div style="font-size:0.8rem;color:var(--text-light);">Respuestas correctas</div></div>' +
            '<div style="text-align:center;"><div style="font-size:1.8rem;font-weight:800;color:var(--teal);font-family:\'Plus Jakarta Sans\',sans-serif;">' + pct + '%</div><div style="font-size:0.8rem;color:var(--text-light);">Puntuación</div></div>' +
            '<div style="text-align:center;"><div style="font-size:1.8rem;font-weight:800;color:var(--teal);font-family:\'Plus Jakarta Sans\',sans-serif;">' + minutes + ':' + String(seconds).padStart(2,'0') + '</div><div style="font-size:0.8rem;color:var(--text-light);">Tiempo</div></div></div>' +
            '<h3 style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:1rem;font-weight:700;color:var(--text);margin-bottom:12px;">' +
            '<i class="fas fa-chart-bar" style="color:var(--teal);margin-right:6px;"></i>Desglose por Nivel</h3>' +
            '<div class="pt-breakdown">' + breakdownHTML + '</div>' +
            '<div class="pt-actions">' +
            '<a href="cursos/curso.html?id=ingles-general" class="pt-action-btn primary"><i class="fas fa-book-open"></i> Ir al Curso de Inglés ' + level + '</a>' +
            '<button class="pt-action-btn secondary" onclick="location.reload()"><i class="fas fa-redo"></i> Repetir Test</button>' +
            '<a href="index.html" class="pt-action-btn secondary"><i class="fas fa-home"></i> Inicio</a></div>' +
            '<div style="margin-top:32px;padding:16px;background:var(--bg);border-radius:var(--radius-sm);border:1px solid var(--border);">' +
            '<p style="font-size:0.85rem;color:var(--text-light);line-height:1.5;">' +
            '<i class="fas fa-info-circle" style="color:var(--teal);margin-right:6px;"></i>' +
            'Tu nivel ha sido guardado. Puedes verlo en el <a href="dashboard.html" style="color:var(--teal);font-weight:600;">Dashboard</a> y en tu ruta de aprendizaje de Inglés. ' +
            'Este test es una estimación — para una evaluación oficial, consulta un centro autorizado CEFR.</p></div></div>';
    }

    /* ---------- INIT ---------- */
    document.addEventListener('DOMContentLoaded', function() {
        // Check if user already has a result
        var savedLevel = localStorage.getItem('fi_cefr_level');
        if (savedLevel) {
            var savedDate = localStorage.getItem('fi_cefr_date');
            var dateStr = '';
            if (savedDate) {
                var d = new Date(savedDate);
                dateStr = ' (' + d.toLocaleDateString() + ')';
            }
            var heroP = document.querySelector('.pt-hero p');
            if (heroP) {
                heroP.innerHTML += '<br><br><span style="display:inline-block;padding:6px 14px;background:' + LEVEL_COLORS[savedLevel] + '22;color:' + LEVEL_COLORS[savedLevel] + ';border-radius:8px;font-size:0.85rem;font-weight:600;"><i class="fas fa-user-check"></i> Tu nivel actual: <strong>' + savedLevel + '</strong>' + dateStr + '</span>';
            }
        }
    });
})();
