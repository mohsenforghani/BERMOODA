(function () {
  "use strict";

  // ===============================
  // Cheat State (کاملاً ایزوله)
  // ===============================
  const CHEAT = {
    infiniteShield: false
  };

  // فقط این آبجکت به بیرون اکسپورت می‌شود
  Object.defineProperty(window, "CHEAT_STATE", {
    value: CHEAT,
    writable: false,
    configurable: false
  });

  // ===============================
  // توالی ضربه‌ها
  // ===============================
  const SEQUENCE = [
    { zone: "right", count: 20 },
    { zone: "left", count: 20 },
    { zone: "center", count: 5 }
  ];

  let stage = 0;
  let hits = 0;
  let lastTapTime = 0;
  const TIMEOUT = 2000;

  function getZone(x) {
    const w = innerWidth;
    if (x > w * 0.66) return "right";
    if (x < w * 0.33) return "left";
    return "center";
  }

  function reset() {
    stage = 0;
    hits = 0;
  }

  function handleTap(x) {
    if (CHEAT.infiniteShield) return;

    const now = performance.now();
    if (now - lastTapTime > TIMEOUT) reset();
    lastTapTime = now;

    const need = SEQUENCE[stage];
    if (!need) return;

    if (getZone(x) !== need.zone) {
      reset();
      return;
    }

    hits++;

    if (hits >= need.count) {
      stage++;
      hits = 0;

      if (stage === SEQUENCE.length) {
        CHEAT.infiniteShield = true;
        console.log("CHEAT ENABLED: Infinite Shield");
        navigator.vibrate?.(200);
        reset();
      }
    }
  }

  // ===============================
  // Listenerها (بدون وابستگی)
  // ===============================
  addEventListener("touchstart", e => {
    if (e.touches[0]) handleTap(e.touches[0].clientX);
  }, { passive: true });

  addEventListener("mousedown", e => handleTap(e.clientX));

})();
