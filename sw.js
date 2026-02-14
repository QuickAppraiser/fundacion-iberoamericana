/**
 * Service Worker — Fundación Iberoamericana PWA
 * Cache-first strategy for static assets, network-first for data.
 */

const CACHE_NAME = 'fi-cache-v4';
const STATIC_ASSETS = [
    './',
    './index.html',
    './dashboard.html',
    './quizzes.html',
    './labs.html',
    './recursos.html',
    './certificados.html',
    './calendario.html',
    './placement-test.html',
    './cursos/curso.html',
    './about.html',
    './privacidad.html',
    './terminos.html',
    './css/styles.css',
    './css/dashboard.css',
    './css/pages.css',
    './css/extras.css',
    './js/main.js',
    './js/animations.js',
    './js/extras.js',
    './js/dashboard.js',
    './js/gamification.js',
    './js/i18n.js',
    './js/curso-detalle.js',
    './js/quizzes.js',
    './js/recursos.js',
    './js/labs.js',
    './js/calendario.js',
    './js/certificados.js',
    './manifest.json'
];

// Install: cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch: cache-first for static, network-first for data
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external resources (CDN fonts, icons, etc.)
    if (url.origin !== location.origin) return;

    // JSON data files: network-first
    if (url.pathname.endsWith('.json') && url.pathname.includes('data/')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Static assets: cache-first
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return cached || fetch(event.request).then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            });
        })
    );
});
