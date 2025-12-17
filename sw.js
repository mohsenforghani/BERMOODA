const CACHE_NAME = "bermooda-cache-v1";
const ASSETS = [
  "/BERMOODA/",

"/BERMOODA/Startbackground/a.png",    
"/BERMOODA/Startbackground/b.png",    
"/BERMOODA/Startbackground/c.png",    
"/BERMOODA/Startbackground/d.png",    
"/BERMOODA/Startbackground/e.png", 

"/BERMOODA/ex/ex1.png", 
"/BERMOODA/ex/ex2.png", 
"/BERMOODA/ex/ex3.png", 
"/BERMOODA/ex/ex4.png", 
"/BERMOODA/ex/ex5.png", 
"/BERMOODA/ex/ex6.png", 
"/BERMOODA/ex/ex7.png", 
"/BERMOODA/ex/ex8.png", 
"/BERMOODA/ex/ex9.png", 

 "/BERMOODA/icons/icon-192.png",
  "/BERMOODA/icons/icon-512.png",

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


  "/BERMOODA/airplane.png",
  "/BERMOODA/chatBackground1.png",
  "/BERMOODA/chatBackground2.png",
  "/BERMOODA/cloud1.png",
  "/BERMOODA/cloud2.png",
  "/BERMOODA/cloud3.png",
  "/BERMOODA/fuel.png",
  "/BERMOODA/help.png",
  "/BERMOODA/help2.png",
  "/BERMOODA/hooshmandP.png",
  "/BERMOODA/hooshmandP2.png",
  "/BERMOODA/index.html",
  "/BERMOODA/joon.png",
  "/BERMOODA/manifest.json",
  "/BERMOODA/mooshak.png",
  "/BERMOODA/mooshak2.png",
  "/BERMOODA/plane1.png",
  "/BERMOODA/plane10.png",
  "/BERMOODA/plane12.png",
  "/BERMOODA/plane2.png",
  "/BERMOODA/plane3.png",
  "/BERMOODA/plane30.png",
  "/BERMOODA/plane31.png",
  "/BERMOODA/plane32.png",
  "/BERMOODA/plane33.png",
  "/BERMOODA/plane34.png",
  "/BERMOODA/plane35.png",
  "/BERMOODA/plane36.png",
  "/BERMOODA/plane37.png",
  "/BERMOODA/plane38.png",
  "/BERMOODA/plane39.png",
  "/BERMOODA/plane4.png",
  "/BERMOODA/plane6.png",
  "/BERMOODA/plane8.png",
  "/BERMOODA/sang1.png",
  "/BERMOODA/sang2.png",
  "/BERMOODA/sang3.png",
  "/BERMOODA/sang4.png",
  "/BERMOODA/setting.js",
  "/BERMOODA/sw.js",
];

// نصب Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// فعال‌سازی
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
