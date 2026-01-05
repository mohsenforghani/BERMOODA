const CACHE_NAME = "bermooda-cache-v2";

const ASSETS = [
"/BERMOODA/",

"/BERMOODA/images/ex/ex1.png", 
"/BERMOODA/images/ex/ex2.png", 
"/BERMOODA/images/ex/ex3.png", 
"/BERMOODA/images/ex/ex4.png", 
"/BERMOODA/images/ex/ex5.png", 
"/BERMOODA/images/ex/ex6.png", 
"/BERMOODA/images/ex/ex7.png", 
"/BERMOODA/images/ex/ex8.png", 
"/BERMOODA/images/ex/ex9.png", 

"/BERMOODA/images/icons/icon-192.png",
"/BERMOODA/images/icons/icon-512.png",

"/BERMOODA/images/Startbackground/a.png",    
"/BERMOODA/images/Startbackground/b.png",    
"/BERMOODA/images/Startbackground/c.png",    
"/BERMOODA/images/Startbackground/d.png",    
"/BERMOODA/images/Startbackground/e.png", 




"/BERMOODA/sounds/explosion/explosion1.wav",
"/BERMOODA/sounds/explosion/explosion2.wav",
"/BERMOODA/sounds/explosion/explosion3.wav",
"/BERMOODA/sounds/explosion/explosion4.wav",
"/BERMOODA/sounds/explosion/explosion5.wav",
"/BERMOODA/sounds/explosion/explosion6.wav",

"/BERMOODA/sounds/BermoodaSound.mp3",
"/BERMOODA/sounds/gameOverSound.mp3",
"/BERMOODA/sounds/gasAlert.mp3",
"/BERMOODA/sounds/shotSoundAirplane.mp3",

  "/BERMOODA/js/tunnel.js",
  "/BERMOODA/js/setting.js",
  "/BERMOODA/js/setting.js",
  "/BERMOODA/js/sw.js",
  "/BERMOODA/js/cheat.js",
  "/BERMOODA/js/manifest.json",






  "/BERMOODA/images/airplane.png",

  "/BERMOODA/images/boss1.png",
  "/BERMOODA/images/boss2.png",
  "/BERMOODA/images/boss3.png",

  "/BERMOODA/images/chatBackground1.png",
  "/BERMOODA/images/chatBackground2.png",

  "/BERMOODA/images/cloud1.png",
  "/BERMOODA/images/cloud2.png",
  "/BERMOODA/images/cloud3.png",

  "/BERMOODA/images/fuel.png",

  "/BERMOODA/images/help.png",
  "/BERMOODA/images/help2.png",

  "/BERMOODA/images/hooshmandP.png",
  "/BERMOODA/images/hooshmandP2.png",

  "/BERMOODA/images/joon.png",

  "/BERMOODA/images/mehradGames.png",
  "/BERMOODA/images/mehradGames2.png",

  "/BERMOODA/images/mooshak.png",
  "/BERMOODA/images/mooshak2.png",

 "/BERMOODA/images/plane1.png",
 "/BERMOODA/images/plane2.png",
  "/BERMOODA/images/plane3.png",
  "/BERMOODA/images/plane4.png",
  "/BERMOODA/images/plane5.png",
  "/BERMOODA/images/plane6.png",
  "/BERMOODA/images/plane7.png",
  "/BERMOODA/images/plane8.png",
  "/BERMOODA/images/plane9.png",
  "/BERMOODA/images/plane10.png",
 "/BERMOODA/images/plane11.png",
  "/BERMOODA/images/plane12.png",
 
  "/BERMOODA/images/plane30.png",
  "/BERMOODA/images/plane31.png",
  "/BERMOODA/images/plane32.png",
  "/BERMOODA/images/plane33.png",
  "/BERMOODA/images/plane34.png",
  "/BERMOODA/images/plane35.png",
  "/BERMOODA/images/plane36.png",
  "/BERMOODA/images/plane37.png",
  "/BERMOODA/images/plane38.png",
  "/BERMOODA/images/plane39.png",

  "/BERMOODA/images/sang1.png",
  "/BERMOODA/images/sang2.png",
  "/BERMOODA/images/sang3.png",
  "/BERMOODA/images/sang4.png",
  "/BERMOODA/images/sang5.png",

  "/BERMOODA/images/separ.png",

  "/BERMOODA/images/shootPic.png",

  "/BERMOODA/images/whatsapp.png",

  "/BERMOODA/index.html"
];

// نصب Service Worker و کش کردن فایل‌ها
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
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

// fetch کردن فایل‌ها از کش یا شبکه
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
