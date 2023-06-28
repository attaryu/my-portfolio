const cacheKey = 'm-attar-asset_v1';
const cacheItems = [
  // font
  '/font/TuskerGrotesk-3500Medium.ttf',
  '/font/TuskerGrotesk-3600Semibold.ttf',
  '/font/TuskerGrotesk-3700Bold.ttf',

  // image
  '/chatfield.webp',
  '/david-statue-neo.webp',
  '/david-statue.webp',
  '/east-java-discovery.webp',
  '/snap-url.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheKey).then((cache) => {
      cache.addAll(cacheItems);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  if (request.destination === 'font' || request.destination === 'image') {
    event.respondWith(
      caches.open(cacheKey).then((cache) => {
        return cache.match(url.pathname).then((cachedResponse) => {
          return cachedResponse || fetch(request)
            .then((response) => {
              cache.put(url.pathname, response.clone());
              return response;
            });
        })

      })
    );

    return;
  }

  event.respondWith(
    caches.open(cacheKey).then((cache) => {
      return cache.match(url.pathname).then((cachedResponse) => {
        const fetchedResponse = fetch(request).then((response) => {
          cache.put(url.pathname, response.clone());
          return response;
        });
  
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
