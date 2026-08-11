const CACHE_NAME = 'daka-v2';
const urlsToCache = [
  'daka.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// 安装：缓存关键文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 激活：删除旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// 拦截请求：缓存优先，网络回退
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});