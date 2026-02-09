/**
 * gamification.js — XP, Streaks, Levels & Learning Path
 * Fundación Iberoamericana
 *
 * localStorage-based gamification engine.
 * Tracks XP, streaks, levels, and renders learning path.
 */

// =========================
// CONSTANTS
// =========================

const XP_LEVELS = [
    { level: 1,  title: 'Novato',        xpRequired: 0,    icon: 'fa-seedling',  color: '#4CAF50' },
    { level: 2,  title: 'Aprendiz',      xpRequired: 100,  icon: 'fa-leaf',      color: '#66BB6A' },
    { level: 3,  title: 'Estudiante',    xpRequired: 250,  icon: 'fa-book-open', color: '#42A5F5' },
    { level: 4,  title: 'Dedicado',      xpRequired: 500,  icon: 'fa-fire',      color: '#FF7043' },
    { level: 5,  title: 'Avanzado',      xpRequired: 800,  icon: 'fa-bolt',      color: '#FFA726' },
    { level: 6,  title: 'Experto',       xpRequired: 1200, icon: 'fa-star',      color: '#FFB800' },
    { level: 7,  title: 'Maestro',       xpRequired: 1800, icon: 'fa-crown',     color: '#AB47BC' },
    { level: 8,  title: 'Leyenda',       xpRequired: 2500, icon: 'fa-gem',       color: '#E91E63' },
    { level: 9,  title: 'Élite',         xpRequired: 3500, icon: 'fa-trophy',    color: '#FF5722' },
    { level: 10, title: 'Gran Maestro',  xpRequired: 5000, icon: 'fa-chess-king', color: '#FFD700' }
];

const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

// Learning paths (category-based)
const LEARNING_PATHS = [
    {
        id: 'office',
        name: 'Office & Productividad',
        color: '#4CAF50',
        icon: 'fa-file-excel',
        courses: ['excel-basico-avanzado', 'google-workspace']
    },
    {
        id: 'programacion',
        name: 'Programación',
        color: '#FF5722',
        icon: 'fa-code',
        courses: ['desarrollo-web', 'python-basico']
    },
    {
        id: 'datos',
        name: 'Datos & BI',
        color: '#2196F3',
        icon: 'fa-database',
        courses: ['sql-bases-datos', 'power-bi', 'analitica-datos']
    },
    {
        id: 'gestion',
        name: 'Gestión',
        color: '#FF9800',
        icon: 'fa-diagram-project',
        courses: ['gestion-proyectos-scrum']
    },
    {
        id: 'idiomas',
        name: 'Idiomas',
        color: '#E91E63',
        icon: 'fa-language',
        courses: ['ingles-general']
    }
];

const COURSE_NAMES = {
    'excel-basico-avanzado': 'Excel',
    'google-workspace': 'Google WS',
    'desarrollo-web': 'Web Dev',
    'python-basico': 'Python',
    'sql-bases-datos': 'SQL',
    'power-bi': 'Power BI',
    'analitica-datos': 'Analítica',
    'gestion-proyectos-scrum': 'Scrum',
    'ingles-general': 'Inglés'
};

// =========================
// GAMIFICATION ENGINE
// =========================

const Gamification = {
    getXP() {
        return parseInt(localStorage.getItem('fi_xp') || '0');
    },

    addXP(amount, reason) {
        const current = this.getXP();
        const oldLevel = this.getLevel();
        const newTotal = current + amount;
        localStorage.setItem('fi_xp', newTotal);

        const newLevel = this.getLevelForXP(newTotal);
        if (newLevel.level > oldLevel.level && typeof showToast === 'function') {
            showToast(`Subiste a Nivel ${newLevel.level}: ${newLevel.title}!`, 'success', 4000);
            if (typeof triggerConfetti === 'function') triggerConfetti();
        }

        this.recordActivity();
        return newTotal;
    },

    getLevel() {
        return this.getLevelForXP(this.getXP());
    },

    getLevelForXP(xp) {
        let current = XP_LEVELS[0];
        for (const lvl of XP_LEVELS) {
            if (xp >= lvl.xpRequired) current = lvl;
            else break;
        }
        return current;
    },

    getNextLevel() {
        const current = this.getLevel();
        const idx = XP_LEVELS.findIndex(l => l.level === current.level);
        return idx < XP_LEVELS.length - 1 ? XP_LEVELS[idx + 1] : null;
    },

    getXPProgress() {
        const xp = this.getXP();
        const current = this.getLevel();
        const next = this.getNextLevel();
        if (!next) return { current: xp, needed: current.xpRequired, percent: 100 };
        const progress = xp - current.xpRequired;
        const range = next.xpRequired - current.xpRequired;
        return { current: xp, needed: next.xpRequired, percent: Math.round((progress / range) * 100) };
    },

    // Streak system
    getStreak() {
        return parseInt(localStorage.getItem('fi_streak') || '0');
    },

    recordActivity() {
        const today = new Date().toDateString();
        const lastActivity = localStorage.getItem('fi_last_activity');

        if (lastActivity === today) return; // Already recorded today

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActivity === yesterday.toDateString()) {
            // Consecutive day
            const streak = this.getStreak() + 1;
            localStorage.setItem('fi_streak', streak);

            if (STREAK_MILESTONES.includes(streak) && typeof showToast === 'function') {
                showToast(`Racha de ${streak} días! +${streak * 5} XP bonus`, 'success', 3000);
                const bonus = streak * 5;
                const current = parseInt(localStorage.getItem('fi_xp') || '0');
                localStorage.setItem('fi_xp', current + bonus);
            }
        } else if (lastActivity !== today) {
            // Streak broken or first activity
            localStorage.setItem('fi_streak', 1);
        }

        localStorage.setItem('fi_last_activity', today);
    },

    // Daily login XP
    checkDailyLogin() {
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('fi_last_login');
        if (lastLogin !== today) {
            localStorage.setItem('fi_last_login', today);
            this.addXP(25, 'Login diario');
            this.recordActivity();
            return true;
        }
        return false;
    }
};

// =========================
// GAMIFICATION UI RENDERS
// =========================

function renderGamificationWidget() {
    const container = document.getElementById('gamificationWidget');
    if (!container) return;

    const xp = Gamification.getXP();
    const level = Gamification.getLevel();
    const next = Gamification.getNextLevel();
    const progress = Gamification.getXPProgress();
    const streak = Gamification.getStreak();

    container.innerHTML = `
        <div class="gam-widget">
            <div class="gam-level-badge" style="background:${level.color}15;border-color:${level.color}40;">
                <i class="fas ${level.icon}" style="color:${level.color};"></i>
                <div class="gam-level-info">
                    <span class="gam-level-num">Nivel ${level.level}</span>
                    <span class="gam-level-title">${level.title}</span>
                </div>
            </div>
            <div class="gam-xp-section">
                <div class="gam-xp-header">
                    <span class="gam-xp-label"><i class="fas fa-star" style="color:var(--gold);"></i> ${xp} XP</span>
                    ${next ? `<span class="gam-xp-next">${next.xpRequired} XP para Nivel ${next.level}</span>` : '<span class="gam-xp-next">Nivel máximo!</span>'}
                </div>
                <div class="gam-xp-bar">
                    <div class="gam-xp-fill" style="width:${progress.percent}%;background:linear-gradient(90deg, ${level.color}, ${next ? next.color : level.color});"></div>
                </div>
            </div>
            <div class="gam-streak">
                <div class="gam-streak-flame ${streak >= 3 ? 'active' : ''}">
                    <i class="fas fa-fire"></i>
                    <span>${streak}</span>
                </div>
                <span class="gam-streak-label">${streak === 1 ? 'día de racha' : 'días de racha'}</span>
            </div>
        </div>
    `;
}

function renderGamificationSidebar() {
    const badge = document.getElementById('sidebarLevel');
    if (!badge) return;

    const level = Gamification.getLevel();
    badge.innerHTML = `<i class="fas ${level.icon}" style="color:${level.color};"></i> Nivel ${level.level}`;
}

// =========================
// LEARNING PATH RENDERER
// =========================

function renderLearningPath() {
    const container = document.getElementById('learningPathContent');
    if (!container) return;

    const progreso = JSON.parse(localStorage.getItem('progreso') || '{}');
    const cursosInscritos = JSON.parse(localStorage.getItem('cursos_inscritos') || '[]');

    container.innerHTML = LEARNING_PATHS.map(path => {
        const nodesHTML = path.courses.map((courseId, idx) => {
            const isEnrolled = cursosInscritos.includes(courseId);
            const prog = progreso[courseId];
            const percent = prog ? prog.porcentaje : 0;
            const isComplete = percent >= 100;
            const isActive = isEnrolled && !isComplete;
            const isLocked = !isEnrolled;

            let nodeClass = 'lp-node';
            if (isComplete) nodeClass += ' complete';
            else if (isActive) nodeClass += ' active';
            else nodeClass += ' locked';

            const connectorHTML = idx < path.courses.length - 1
                ? `<div class="lp-connector ${isComplete ? 'complete' : ''}"></div>`
                : '';

            return `
                <div class="${nodeClass}" style="--path-color:${path.color};" onclick="window.location.href='cursos/curso.html?id=${courseId}'">
                    <div class="lp-node-circle">
                        ${isComplete ? '<i class="fas fa-check"></i>' :
                          isActive ? `<span class="lp-node-pct">${percent}%</span>` :
                          '<i class="fas fa-lock" style="font-size:0.7rem;"></i>'}
                    </div>
                    <span class="lp-node-label">${COURSE_NAMES[courseId] || courseId}</span>
                </div>
                ${connectorHTML}
            `;
        }).join('');

        return `
            <div class="lp-path">
                <div class="lp-path-header" style="color:${path.color};">
                    <i class="fas ${path.icon}"></i>
                    <span>${path.name}</span>
                </div>
                <div class="lp-path-nodes">
                    ${nodesHTML}
                </div>
            </div>
        `;
    }).join('');
}

// =========================
// POMODORO TIMER
// =========================

let pomodoroState = {
    running: false,
    mode: 'focus',  // 'focus' or 'break'
    timeLeft: 25 * 60,
    interval: null,
    sessions: 0
};

function initPomodoro() {
    const fab = document.getElementById('pomodoroFab');
    if (!fab) return;
    renderPomodoroUI();
}

function renderPomodoroUI() {
    const body = document.getElementById('pomodoroBody');
    if (!body) return;

    const mins = Math.floor(pomodoroState.timeLeft / 60);
    const secs = pomodoroState.timeLeft % 60;
    const totalTime = pomodoroState.mode === 'focus' ? 25 * 60 : 5 * 60;
    const progressPct = ((totalTime - pomodoroState.timeLeft) / totalTime) * 100;

    body.innerHTML = `
        <div class="pomo-mode ${pomodoroState.mode}">
            <i class="fas ${pomodoroState.mode === 'focus' ? 'fa-brain' : 'fa-coffee'}"></i>
            ${pomodoroState.mode === 'focus' ? 'Modo Enfoque' : 'Descanso'}
        </div>
        <div class="pomo-timer-ring">
            <svg viewBox="0 0 120 120">
                <circle class="pomo-ring-bg" cx="60" cy="60" r="52" />
                <circle class="pomo-ring-fill ${pomodoroState.mode}" cx="60" cy="60" r="52"
                    stroke-dasharray="326.7"
                    stroke-dashoffset="${326.7 - (326.7 * progressPct / 100)}" />
            </svg>
            <div class="pomo-time">${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}</div>
        </div>
        <div class="pomo-controls">
            ${pomodoroState.running
                ? `<button class="pomo-btn pause" onclick="pausePomodoro()"><i class="fas fa-pause"></i></button>`
                : `<button class="pomo-btn play" onclick="startPomodoro()"><i class="fas fa-play"></i></button>`}
            <button class="pomo-btn reset" onclick="resetPomodoro()"><i class="fas fa-redo"></i></button>
        </div>
        <div class="pomo-sessions">
            <i class="fas fa-fire" style="color:var(--gold);"></i> ${pomodoroState.sessions} sesiones hoy
        </div>
    `;
}

function startPomodoro() {
    pomodoroState.running = true;
    pomodoroState.interval = setInterval(() => {
        pomodoroState.timeLeft--;
        if (pomodoroState.timeLeft <= 0) {
            clearInterval(pomodoroState.interval);
            pomodoroState.running = false;

            if (pomodoroState.mode === 'focus') {
                pomodoroState.sessions++;
                Gamification.addXP(30, 'Sesión Pomodoro');
                if (typeof showToast === 'function') {
                    showToast('Sesión completada! +30 XP. Toma un descanso.', 'success', 4000);
                }
                pomodoroState.mode = 'break';
                pomodoroState.timeLeft = 5 * 60;
            } else {
                if (typeof showToast === 'function') {
                    showToast('Descanso terminado. A seguir aprendiendo!', 'info', 3000);
                }
                pomodoroState.mode = 'focus';
                pomodoroState.timeLeft = 25 * 60;
            }

            // Play notification sound
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 800;
                gain.gain.value = 0.3;
                osc.start();
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                osc.stop(ctx.currentTime + 0.5);
            } catch(e) {}

            renderGamificationWidget();
        }
        renderPomodoroUI();
    }, 1000);
    renderPomodoroUI();
}

function pausePomodoro() {
    clearInterval(pomodoroState.interval);
    pomodoroState.running = false;
    renderPomodoroUI();
}

function resetPomodoro() {
    clearInterval(pomodoroState.interval);
    pomodoroState.running = false;
    pomodoroState.mode = 'focus';
    pomodoroState.timeLeft = 25 * 60;
    renderPomodoroUI();
}

window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetPomodoro = resetPomodoro;

let pomodoroOpen = false;

window.togglePomodoro = function() {
    const win = document.getElementById('pomodoroWindow');
    if (!win) return;
    pomodoroOpen = !pomodoroOpen;
    win.classList.toggle('open', pomodoroOpen);

    const btn = document.querySelector('.pomo-toggle i:not(.pomo-pulse)');
    if (btn) {
        btn.className = pomodoroOpen ? 'fas fa-times' : 'fas fa-stopwatch';
    }
};

// =========================
// INITIALIZATION
// =========================

document.addEventListener('DOMContentLoaded', () => {
    Gamification.checkDailyLogin();
    renderGamificationWidget();
    renderGamificationSidebar();
    renderLearningPath();
    initPomodoro();
    renderPomodoroUI();

    // Load saved pomodoro sessions
    const savedSessions = localStorage.getItem('fi_pomo_sessions_' + new Date().toDateString());
    if (savedSessions) pomodoroState.sessions = parseInt(savedSessions);
});

// Save pomodoro sessions periodically
setInterval(() => {
    localStorage.setItem('fi_pomo_sessions_' + new Date().toDateString(), pomodoroState.sessions);
}, 5000);

window.Gamification = Gamification;
