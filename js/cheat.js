(function () {
  "use strict";

  const CHEAT = { infiniteShield: false };
  Object.defineProperty(window, "CHEAT_STATE", { value: CHEAT, writable: false });

  const SEQUENCE = [
    { zone: "right", count: 20 },
    { zone: "left", count: 20 },
    { zone: "center", count: 5 }
  ];

  let stage = 0, hits = 0, lastTapTime = 0;
  const TIMEOUT = 3000; // موبایل کمی آهسته تر

  function getCanvas() { return document.querySelector("canvas"); }

  function getZoneFromEvent(e) {
    const canvas = getCanvas();
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let x;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = e.clientX - rect.left;
    }

    const w = rect.width;
    if (x > w * 0.66) return "right";
    if (x < w * 0.33) return "left";
    return "center";
  }

  function reset() { stage = 0; hits = 0; }

  function handleInput(e) {
    if (CHEAT.infiniteShield) return;
    const now = performance.now();
    if (now - lastTapTime > TIMEOUT) reset();
    lastTapTime = now;

    const zone = getZoneFromEvent(e);
    const need = SEQUENCE[stage];
    if (!zone || !need || zone !== need.zone) { reset(); return; }

    hits++;
    if (hits >= need.count) {
      stage++; hits = 0;
      if (stage === SEQUENCE.length) {
        CHEAT.infiniteShield = true;
        console.log("CHEAT ENABLED: Infinite Shield");
        navigator.vibrate?.(200);
        reset();
      }
    }
  }

  addEventListener("touchstart", e => handleInput(e), { passive: false });
  addEventListener("mousedown", e => handleInput(e));
})();
