(function () {
  "use strict";

  const CHEAT = { infiniteShield: false };
  Object.defineProperty(window, "CHEAT_STATE", { value: CHEAT, writable: false });

  const SEQUENCE = [
    { zone: "right", count: 20 },
    { zone: "left", count: 20 },
    { zone: "center", count: 5 }
  ];

  let stage = 0, hits = 0, lastTapTime = 0, totalClicks = 0;
  const TIMEOUT = 3000;

  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  // ===== ایجاد لایه HTML برای نمایش labels و شمارنده =====
  const cheatOverlay = document.createElement("div");
  cheatOverlay.style.position = "fixed";
  cheatOverlay.style.top = 0;
  cheatOverlay.style.left = 0;
  cheatOverlay.style.width = "100%";
  cheatOverlay.style.height = "100%";
  cheatOverlay.style.pointerEvents = "none";
  cheatOverlay.style.zIndex = 99999;
  document.body.appendChild(cheatOverlay);

  // برچسب‌ها
  const leftLabel = document.createElement("div");
  leftLabel.innerText = "LEFT";
  leftLabel.style.position = "absolute";
  leftLabel.style.left = "5%";
  leftLabel.style.top = "50%";
  leftLabel.style.transform = "translateY(-50%)";
  leftLabel.style.color = "red";
  leftLabel.style.fontSize = "24px";
  leftLabel.style.fontWeight = "bold";
  cheatOverlay.appendChild(leftLabel);

  const centerLabel = document.createElement("div");
  centerLabel.innerText = "CENTER";
  centerLabel.style.position = "absolute";
  centerLabel.style.left = "50%";
  centerLabel.style.top = "50%";
  centerLabel.style.transform = "translate(-50%, -50%)";
  centerLabel.style.color = "yellow";
  centerLabel.style.fontSize = "24px";
  centerLabel.style.fontWeight = "bold";
  cheatOverlay.appendChild(centerLabel);

  const rightLabel = document.createElement("div");
  rightLabel.innerText = "RIGHT";
  rightLabel.style.position = "absolute";
  rightLabel.style.right = "5%";
  rightLabel.style.top = "50%";
  rightLabel.style.transform = "translateY(-50%)";
  rightLabel.style.color = "lime";
  rightLabel.style.fontSize = "24px";
  rightLabel.style.fontWeight = "bold";
  cheatOverlay.appendChild(rightLabel);

  // شمارنده کلیک‌ها
  const clickCounter = document.createElement("div");
  clickCounter.innerText = "Clicks: 0";
  clickCounter.style.position = "absolute";
  clickCounter.style.left = "50%";
  clickCounter.style.top = "10%";
  clickCounter.style.transform = "translateX(-50%)";
  clickCounter.style.color = "#00ffff";
  clickCounter.style.fontSize = "28px";
  clickCounter.style.fontWeight = "bold";
  clickCounter.style.textShadow = "0 0 10px #00ffff";
  cheatOverlay.appendChild(clickCounter);

  // ===== توابع اصلی چیت =====
  function getZoneFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    let x;
    if (e.touches) x = e.touches[0].clientX - rect.left;
    else x = e.clientX - rect.left;

    const w = rect.width;
    if (x > w * 0.66) return "right";
    if (x < w * 0.33) return "left";
    return "center";
  }

  function reset() { stage = 0; hits = 0; }

  function handleInput(e) {
    totalClicks++;
    clickCounter.innerText = "Clicks: " + totalClicks;

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

  // ===== رویدادها =====
  addEventListener("touchstart", e => handleInput(e), { passive: false });
  addEventListener("mousedown", e => handleInput(e));
})();
