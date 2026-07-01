const CACHE_NAME = 'wc2026-hub-v10';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './live-data.js',
  './app.js',
  './manifest.json',
  './assets/icon.svg',
  './assets/icon-maskable.svg'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// アクティベーション時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// フェッチ要求に対する Network-First (キャッシュフォールバック) 戦略
self.addEventListener('fetch', (event) => {
  // HTTP/HTTPSリクエストのみ処理（chrome-extension等を除外）
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).then((networkResponse) => {
      // ネットワークレスポンスが正常な場合はキャッシュに保存して返す
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      // ネットワーク接続エラーまたはオフライン時はキャッシュから返す
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
