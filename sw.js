// Service worker: wrapper page ko cache karta hai (install ke liye zaroori). App data hamesha live aata hai.
const CACHE = 'taskflow-shell-v1';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google') || e.request.url.includes('googleusercontent')) return;   // app ko kabhi cache mat karo
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
