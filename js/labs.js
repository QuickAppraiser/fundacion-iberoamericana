/**
 * labs.js — Laboratorios Prácticos
 * Fundación Iberoamericana
 *
 * Funcionalidades:
 * - Catálogo de labs organizados por categoría
 * - Filtrado por tipo (código, excel, datos, diseño)
 * - Apertura de labs con instrucciones e iframe embebido
 */

// =========================
// DATOS DE LABS
// =========================

const labsData = [
    {
        id: 'html-basico',
        titulo: 'Mi Primera Página Web',
        descripcion: 'Crea una página HTML desde cero con encabezados, párrafos, imágenes y enlaces.',
        categoria: 'codigo',
        categoriaLabel: 'Desarrollo Web',
        color: '#FF5722',
        icono: 'fa-code',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '30 min',
        herramienta: 'CodePen',
        url: 'https://codepen.io/pen/',
        instrucciones: [
            'Abre el editor de CodePen haciendo clic en "Iniciar Lab".',
            'En la sección HTML, escribe un encabezado <h1> con tu nombre.',
            'Agrega un párrafo <p> describiendo tus intereses.',
            'Inserta una imagen usando la etiqueta <img src="url">.',
            'Agrega una lista con tus 3 cursos favoritos usando <ul> y <li>.',
            'Experimenta con diferentes etiquetas HTML semánticas.'
        ]
    },
    {
        id: 'css-estilos',
        titulo: 'Estilizando con CSS',
        descripcion: 'Aplica colores, fuentes, espaciado y diseño de caja a una página HTML.',
        categoria: 'codigo',
        categoriaLabel: 'Desarrollo Web',
        color: '#2196F3',
        icono: 'fa-palette',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '40 min',
        herramienta: 'CodePen',
        url: 'https://codepen.io/pen/',
        instrucciones: [
            'En CodePen, escribe una estructura HTML básica con un header, sección y footer.',
            'En la pestaña CSS, cambia el color de fondo del body.',
            'Aplica una fuente de Google Fonts al texto.',
            'Usa padding y margin para espaciar los elementos.',
            'Crea una tarjeta con border-radius, box-shadow y padding.',
            'Haz el diseño responsivo usando max-width y margin auto.'
        ]
    },
    {
        id: 'js-variables',
        titulo: 'JavaScript: Variables y Funciones',
        descripcion: 'Aprende a declarar variables, crear funciones y mostrar resultados en consola.',
        categoria: 'codigo',
        categoriaLabel: 'Programación',
        color: '#FFB800',
        icono: 'fab fa-js-square',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '35 min',
        herramienta: 'Replit',
        url: 'https://replit.com/languages/javascript',
        instrucciones: [
            'Declara variables con let y const para tu nombre, edad y curso favorito.',
            'Usa console.log() para imprimir cada variable.',
            'Crea una función "saludar" que reciba un nombre y retorne un saludo.',
            'Crea una función "calcularPromedio" que reciba 3 calificaciones.',
            'Usa condicionales (if/else) para clasificar: Aprobado (>= 70) o Reprobado.',
            'Ejecuta el código y verifica los resultados en la consola.'
        ]
    },
    {
        id: 'python-intro',
        titulo: 'Python: Primeros Pasos',
        descripcion: 'Escribe tus primeros scripts en Python: variables, listas y ciclos.',
        categoria: 'codigo',
        categoriaLabel: 'Programación',
        color: '#3776AB',
        icono: 'fab fa-python',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '40 min',
        herramienta: 'Replit',
        url: 'https://replit.com/languages/python3',
        instrucciones: [
            'Crea variables para tu nombre, edad y una lista de tus cursos.',
            'Imprime un saludo usando f-strings: f"Hola, {nombre}".',
            'Crea una lista de calificaciones y calcula el promedio.',
            'Usa un ciclo for para imprimir cada curso con su índice.',
            'Crea una función que clasifique una calificación (A, B, C, D, F).',
            'Prueba la función con diferentes valores.'
        ]
    },
    {
        id: 'excel-formulas',
        titulo: 'Excel: Fórmulas Esenciales',
        descripcion: 'Practica SUMA, PROMEDIO, BUSCARV, SI y otras fórmulas fundamentales.',
        categoria: 'excel',
        categoriaLabel: 'Excel & Sheets',
        color: '#4CAF50',
        icono: 'fa-file-excel',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '45 min',
        herramienta: 'Google Sheets',
        url: 'https://docs.google.com/spreadsheets/create',
        instrucciones: [
            'Crea una tabla con 10 productos: Nombre, Precio, Cantidad, Subtotal.',
            'Usa =Precio*Cantidad para calcular el Subtotal de cada fila.',
            'Calcula el total general con =SUMA(rango).',
            'Calcula el precio promedio con =PROMEDIO(rango).',
            'Usa =SI(Subtotal>500, "Alto", "Normal") para clasificar ventas.',
            'Crea un BUSCARV para buscar un producto por nombre.'
        ]
    },
    {
        id: 'excel-tablas-dinamicas',
        titulo: 'Excel: Tablas Dinámicas',
        descripcion: 'Crea tablas dinámicas para analizar datos de ventas y generar reportes.',
        categoria: 'excel',
        categoriaLabel: 'Excel & Sheets',
        color: '#4CAF50',
        icono: 'fa-table',
        dificultad: 'intermedio',
        dificultadLabel: 'Intermedio',
        duracion: '50 min',
        herramienta: 'Google Sheets',
        url: 'https://docs.google.com/spreadsheets/create',
        instrucciones: [
            'Crea una tabla de ventas con: Fecha, Vendedor, Región, Producto, Monto.',
            'Ingresa al menos 20 filas de datos de ejemplo.',
            'Selecciona los datos e inserta una Tabla Dinámica.',
            'Configura: Filas=Vendedor, Columnas=Producto, Valores=SUMA de Monto.',
            'Agrega un filtro por Región.',
            'Crea un gráfico de barras a partir de la tabla dinámica.'
        ]
    },
    {
        id: 'sql-consultas',
        titulo: 'SQL: Consultas Básicas',
        descripcion: 'Practica SELECT, WHERE, ORDER BY y GROUP BY en un sandbox interactivo.',
        categoria: 'datos',
        categoriaLabel: 'Datos & SQL',
        color: '#2196F3',
        icono: 'fa-database',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '40 min',
        herramienta: 'W3Schools SQL',
        url: 'https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all',
        instrucciones: [
            'Ejecuta SELECT * FROM Customers para ver todos los clientes.',
            'Filtra clientes de México: WHERE Country = "Mexico".',
            'Ordena por nombre: ORDER BY CustomerName ASC.',
            'Cuenta clientes por país: SELECT Country, COUNT(*) GROUP BY Country.',
            'Usa LIKE para buscar clientes cuyo nombre empiece con "A".',
            'Practica JOINs entre las tablas Customers y Orders.'
        ]
    },
    {
        id: 'sql-joins',
        titulo: 'SQL: JOINs y Subconsultas',
        descripcion: 'Domina INNER JOIN, LEFT JOIN y subconsultas para consultas complejas.',
        categoria: 'datos',
        categoriaLabel: 'Datos & SQL',
        color: '#2196F3',
        icono: 'fa-project-diagram',
        dificultad: 'intermedio',
        dificultadLabel: 'Intermedio',
        duracion: '50 min',
        herramienta: 'W3Schools SQL',
        url: 'https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all',
        instrucciones: [
            'Usa INNER JOIN para combinar Orders con Customers.',
            'Usa LEFT JOIN para mostrar todos los clientes (incluso sin órdenes).',
            'Haz un JOIN de 3 tablas: Orders + Customers + OrderDetails.',
            'Crea una subconsulta: clientes con más pedidos que el promedio.',
            'Usa HAVING con GROUP BY para filtrar grupos.',
            'Combina todo: reporte de ventas por país con totales.'
        ]
    },
    {
        id: 'canva-presentacion',
        titulo: 'Diseño: Presentación Profesional',
        descripcion: 'Crea una presentación de negocios con plantillas, gráficos e imágenes.',
        categoria: 'diseno',
        categoriaLabel: 'Diseño',
        color: '#00BCD4',
        icono: 'fa-paint-brush',
        dificultad: 'facil',
        dificultadLabel: 'Básico',
        duracion: '30 min',
        herramienta: 'Canva',
        url: 'https://www.canva.com',
        instrucciones: [
            'Abre Canva y busca "presentación profesional" en plantillas.',
            'Selecciona una plantilla y personaliza la portada con tu tema.',
            'Agrega una diapositiva de agenda con 4-5 puntos.',
            'Inserta un gráfico o diagrama para mostrar datos.',
            'Agrega una diapositiva de conclusión con resumen.',
            'Descarga como PDF y como PowerPoint.'
        ]
    },
    {
        id: 'powerbi-dashboard',
        titulo: 'Power BI: Mi Primer Dashboard',
        descripcion: 'Conecta datos de Excel y crea tu primer dashboard interactivo.',
        categoria: 'datos',
        categoriaLabel: 'Datos & BI',
        color: '#FFB800',
        icono: 'fa-chart-pie',
        dificultad: 'intermedio',
        dificultadLabel: 'Intermedio',
        duracion: '60 min',
        herramienta: 'Power BI',
        url: 'https://app.powerbi.com',
        instrucciones: [
            'Descarga el archivo de datos de ejemplo de Google Drive.',
            'En Power BI, importa el archivo Excel.',
            'Crea un gráfico de barras con ventas por categoría.',
            'Agrega una tarjeta con el total de ventas.',
            'Crea un gráfico de líneas con la tendencia mensual.',
            'Agrega filtros interactivos por región y fecha.'
        ]
    }
];

// =========================
// VARIABLES DE ESTADO
// =========================
let categoriaLabActiva = 'all';

// =========================
// INICIALIZACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof inicializarI18n === 'function') inicializarI18n();
    renderizarLabs();
    inicializarHamburger();
});

// =========================
// RENDERIZADO
// =========================

function renderizarLabs() {
    const grid = document.getElementById('labsGrid');
    if (!grid) return;

    let labsFiltrados = labsData;
    if (categoriaLabActiva !== 'all') {
        labsFiltrados = labsFiltrados.filter(l => l.categoria === categoriaLabActiva);
    }

    if (labsFiltrados.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-flask"></i>
                <p>No hay laboratorios en esta categoría todavía.</p>
            </div>`;
        return;
    }

    grid.innerHTML = labsFiltrados.map(lab => crearTarjetaLab(lab)).join('');
    if (typeof refreshStaggerGrids === 'function') refreshStaggerGrids();
}

function crearTarjetaLab(lab) {
    const iconoClass = lab.icono.startsWith('fab') ? lab.icono : `fas ${lab.icono}`;
    return `
    <div class="lab-card" onclick="abrirLab('${lab.id}')">
        <div class="lab-card-banner" style="background: linear-gradient(135deg, ${lab.color}, ${lab.color}88);"></div>
        <div class="lab-card-body">
            <div class="lab-card-category" style="color:${lab.color};">
                <i class="${iconoClass}"></i> ${lab.categoriaLabel}
            </div>
            <h3>${lab.titulo}</h3>
            <p>${lab.descripcion}</p>
            <div class="lab-card-meta">
                <span><i class="fas fa-clock"></i> ${lab.duracion}</span>
                <span><i class="fas fa-wrench"></i> ${lab.herramienta}</span>
            </div>
            <div class="lab-card-footer">
                <span class="lab-difficulty ${lab.dificultad}">${lab.dificultadLabel}</span>
                <button class="course-btn" style="font-size:0.82rem;padding:8px 16px;">
                    Iniciar Lab <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// =========================
// FILTRADO
// =========================

window.filterLabs = function(categoria, e) {
    categoriaLabActiva = categoria;
    document.querySelectorAll('#labTabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    if (e && e.target) e.target.classList.add('active');
    renderizarLabs();
};

// =========================
// ABRIR / CERRAR LAB
// =========================

window.abrirLab = function(labId) {
    const lab = labsData.find(l => l.id === labId);
    if (!lab) return;

    // Ocultar grid y mostrar workspace
    document.getElementById('labsGrid').style.display = 'none';
    document.getElementById('labTabs').style.display = 'none';
    document.getElementById('externalLabs').style.display = 'none';

    const workspace = document.getElementById('labWorkspace');
    workspace.style.display = 'block';

    document.getElementById('labTitle').textContent = lab.titulo;
    document.getElementById('labDesc').textContent = lab.descripcion;

    // Instrucciones
    const instrHTML = lab.instrucciones.map(i => `<li>${i}</li>`).join('');
    document.getElementById('labInstructions').innerHTML = `
        <h4><i class="fas fa-list-ol" style="color:var(--teal);"></i> Instrucciones</h4>
        <ol>${instrHTML}</ol>
    `;

    // Iframe with loading state
    const embedContainer = document.querySelector('.lab-embed-container');
    if (embedContainer) embedContainer.classList.add('loading');
    const iframe = document.getElementById('labIframe');
    iframe.onload = function() {
        if (embedContainer) embedContainer.classList.remove('loading');
    };
    iframe.src = lab.url;

    // Scroll arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.cerrarLab = function() {
    document.getElementById('labsGrid').style.display = '';
    document.getElementById('labTabs').style.display = '';
    document.getElementById('externalLabs').style.display = '';
    document.getElementById('labWorkspace').style.display = 'none';
    document.getElementById('labIframe').src = '';
};

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
