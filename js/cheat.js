
(function () {
  "use strict";

  // ==== بخش چیت اصلی ====
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
    if (e.touches) x = e.touches[0].clientX - rect.left;
    else x = e.clientX - rect.left;

    const w = rect.width;
    if (x > w * 0.66) return "right";
    if (x < w * 0.33) return "left";
    return "center";
  }

  function reset() { stage = 0; hits = 0; }

  function handleInput(e) {
    const zone = getZoneFromEvent(e);
    if (!zone) return;

    // ==== به‌روزرسانی شمارنده و لیبل‌ها ====
    totalClicks++;
    updateUI(zone);

    // ==== منطق چیت ====
    if (CHEAT.infiniteShield) return;
    const now = performance.now();
    if (now - lastTapTime > TIMEOUT) reset();
    lastTapTime = now;

    const need = SEQUENCE[stage];
    if (!need || zone !== need.zone) { reset(); return; }

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

  // ==== بخش UI اضافه شده ====
  let totalClicks = 0;

  const uiDiv = document.createElement("div");
  uiDiv.style.position = "fixed";
  uiDiv.style.top = "10px";
  uiDiv.style.left = "50%";
  uiDiv.style.transform = "translateX(-50%)";
  uiDiv.style.background = "rgba(0,0,0,0.6)";
  uiDiv.style.color = "#fff";
  uiDiv.style.padding = "10px 20px";
  uiDiv.style.borderRadius = "8px";
  uiDiv.style.fontFamily = "sans-serif";
  uiDiv.style.fontSize = "16px";
  uiDiv.style.zIndex = "9999";
  document.body.appendChild(uiDiv);

  function updateUI(zone) {
    uiDiv.innerHTML = `
      <div>Clicked Zone: <b>${zone}</b></div>
      <div>Total Clicks: <b>${totalClicks}</b></div>
      <div style="margin-top:5px;">
        Zones: 
        <span style="color:red">LEFT</span> | 
        <span style="color:green">CENTER</span> | 
        <span style="color:blue">RIGHT</span>
      </div>
    `;
  }
})();
