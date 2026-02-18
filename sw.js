// --- KAI-X Service Worker Ver.7.1 (UI-Update) ---
// ★変更点: キャッシュ名を変更して、新しいindex.htmlを強制的に読み込ませる
const CACHE_NAME = 'kaix-v7.1-spec-analysis-ui';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// インストール処理
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// アクティベート処理：古いキャッシュを削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// フェッチ処理
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then((response) => {
        return response;
      });
    })
  );
});
