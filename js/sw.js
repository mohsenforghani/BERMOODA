const CACHE_NAME = "bermooda-cache-v3"; // هر نسخه جدید، شماره نسخه را تغییر دهید
const ASSETS = [
  "/BERMOODA/",
  "/BERMOODA/index.html",
  "/BERMOODA/js/tunnel.js",
  "/BERMOODA/js/setting.js",
  "/BERMOODA/js/cheat.js",
  "/BERMOODA/js/sw.js",
  "/BERMOODA/images/ex/ex1.png",
  // بقیه فایل‌ها ...
];

// نصب و کش کردن فایل‌ها
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // self.skipWaiting(); <-- این خط حذف شد
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// fetch از کش یا شبکه
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

// گوش دادن به پیام از صفحه (برای فعال‌سازی نسخه جدید)
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
