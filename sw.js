const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';

// Ciclo (1)se crea y guardan los caches
self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            './',
            './js/app.js',
            './index.html',
            './manifest.json',
            './images/icons/android-launchericon-48.png',
            './images/icons/android-launchericon-72.png',
            './images/icons/android-launchericon-96.png',
            './images/icons/android-launchericon-144.png',
            './images/icons/android-launchericon-192.png',
            './images/icons/android-launchericon-512.png',
            './images/cover.jpg',
        ]);
    });

    const inmutableCache = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.ttf'
        ]);
    });
    
    event.waitUntil(Promise.all[(staticCache, inmutableCache)]);
});

// Ciclo (2) Se obtienen los caches guardados
self.addEventListener('activate', (event) => {
    console.log('SW: Activadoo');
});

// Ciclo (3) Primero intentamos siempre ir a web, sino cache
self.addEventListener('fetch', (event) => {
    const respuesta = caches
        .match(event.request)
        .then((respCache) => respCache);
    event.respondWith(respuesta);
});
