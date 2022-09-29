// Ciclo (1) se crea y guardan los caches
self.addEventListener('install',  (event) => {
    console.log('SW: Instalado');
    const promesaCache = caches.open('cache-v1').then((cache) => {
        return cache.addAll([
            './',
            './js/app.js',
            './index.html',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
            'https://cdn.jsdelivr.net/npm/sweetalert2@11',
        ]);
    });

    const promesaCache2 = caches.open('cache-v2').then((cache) => {
        return cache.addAll([
            'https://reqres.in/api/users?page=1',
            'https://reqres.in/api/users?page=2',
        ]);
    });

    event.waitUntil(Promise.all([promesaCache, promesaCache2]) )

}); 

// Ciclo (2) Se obtienen los caches guardados
self.addEventListener('activate', (event) => {
    console.log('SW: Activadoo');
});


// Ciclo (3) Solo cache con fetch de nuestro appshell
self.addEventListener('fetch', (event) => {
    console.log('SW: Fetch');
    

    if(event.request.url.includes('https://reqres.in/api/users')){
        event.respondWith(fetch(event.request));
    }

    // caches.match lo que hace es buscar todos nuestros archivos en el caches tengamos varias versiones de el
    event.respondWith(caches.match(event.request));

});