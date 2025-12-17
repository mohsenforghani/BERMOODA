// tunnel.js
(function(window){
  // ===== Tunnel module (lightweight, self-contained) =====
  const DEFAULTS = {
    SPAWN_INTERVAL_MS: 50_000,
    TRAVERSE_MS: 7500,
    INDICATOR_MS: 4200,
    WIDTH: 250,
    HEIGHT_MULT: 1.4,
    EDGE_THICK: 4,
    WALL_ALPHA: 0.90
  };

  // internal state (private)
  let cfg = Object.assign({}, DEFAULTS);
  let canvas = null;
  let ctx = null;
  let airplaneRef = null; // باید در init پاس بدی یا بعدا set کنی
  let onKillCallback = null; // اختیاری: تابعی که وقتی بازیکن خطا کرد صدا زده شود

  let currentTunnel = null;
  let lastSpawnMs = performance.now();
  let lastFrameMs = performance.now();

  // Public API object
  const Tunnel = {
    init,
    update,
    draw,
   drawIndicator: drawTunnelIndicator,
    spawnNow,
    setAirplaneRef,
    setConfig,
    destroy,
    onKill: (fn) => { onKillCallback = fn; }
  };

  // ========= API implementation =========
  function init(options = {}) {
    if (!options.canvas) {
      console.warn("Tunnel.init: canvas required");
      return;
    }
    canvas = options.canvas;
    ctx = canvas.getContext('2d');
    airplaneRef = options.airplane || null;
    if (options.config) setConfig(options.config);
    lastSpawnMs = performance.now();
    lastFrameMs = performance.now();
  }

  function setAirplaneRef(ap) {
    airplaneRef = ap;
  }

  function setConfig(obj) {
    cfg = Object.assign({}, cfg, obj || {});
  }

  function spawnNow() {
    const centerX = Math.round(
      Math.max(cfg.WIDTH/2 + 20,
        Math.min(canvas.width - cfg.WIDTH/2 - 20, Math.random()*canvas.width))
    );
   currentTunnel = {
  x: centerX,                 // موقعیت فعلی (نرم می‌شود)
  startX: centerX,            // شروع
  targetX: Math.round(
    Math.max(cfg.WIDTH/2 + 20,
      Math.min(canvas.width - cfg.WIDTH/2 - 20, Math.random()*canvas.width))
  ),
  width: cfg.WIDTH,
  y: -(canvas.height * 0.2),
  height: canvas.height * cfg.HEIGHT_MULT,
  createdMs: performance.now(),
  durationMs: cfg.TRAVERSE_MS,
  indicatorUntilMs: performance.now() + cfg.INDICATOR_MS
};

    lastSpawnMs = performance.now();
  }

  // update(nowMs, deltaMs) => called from main game loop
  function update(nowMs, deltaMs) {
    if (!canvas) return;
    // spawn timing
    if (!currentTunnel && (nowMs - lastSpawnMs) >= cfg.SPAWN_INTERVAL_MS) {
      spawnNow();
    }
    if (!currentTunnel) return;

    const t = (nowMs - currentTunnel.createdMs) / currentTunnel.durationMs;
// ---- حرکت نرم مرکز تونل ----
   const smoothRatio = 0.25; // هرچه کمتر، نرم‌تر
  currentTunnel.x += (currentTunnel.targetX - currentTunnel.x) * smoothRatio;


    const startY = -currentTunnel.height;
    const endY = canvas.height + 20;
    currentTunnel.y = startY + (endY - startY) * t;


  if (currentTunnel.y > canvas.height) {
  currentTunnel = null;
  return;
}

    // collision only if airplaneRef exists and tunnel overlaps middle screen (optional)
   // collision only if airplaneRef exists and tunnel overlaps airplane vertically
if (airplaneRef) {
  const tunnelTop = currentTunnel.y;
  const tunnelBottom = currentTunnel.y + currentTunnel.height;
  const airplaneTop = airplaneRef.y;
  const airplaneBottom = airplaneRef.y + airplaneRef.h;

  // بررسی برخورد فقط وقتی تونل روی هواپیما است
  if (airplaneBottom > tunnelTop && airplaneTop < tunnelBottom) {
    const left = currentTunnel.x - currentTunnel.width/2;
    const right = currentTunnel.x + currentTunnel.width/2;
    if (airplaneRef.x < left || (airplaneRef.x + airplaneRef.w) > right) {
      if (typeof onKillCallback === 'function') onKillCallback();
      else if (typeof window.killPlayer === 'function') window.killPlayer();
    }
  }
}

  }

  // draw(ctx) => called after drawBackground() and BEFORE drawing player
  function draw(ctxToUse) {
    if (!currentTunnel) return;
    const c = ctxToUse || ctx;
    if (!c) return;

    const x = currentTunnel.x;
    const w = currentTunnel.width;
    const yTop = currentTunnel.y;
    const h = currentTunnel.height;

    c.save();
    // dark walls (left & right)
    c.globalAlpha = cfg.WALL_ALPHA;
    c.fillStyle = "#0b0b0b";
    const leftW = Math.max(0, x - w/2);
    const rightX = x + w/2;
    const rightW = Math.max(0, canvas.width - rightX);
    if (leftW > 0) c.fillRect(0, yTop, leftW, h);
    if (rightW > 0) c.fillRect(rightX, yTop, rightW, h);

    // thin orange edge lines
    c.globalAlpha = 1;
    c.fillStyle = "rgba(255,140,0,1)";
    c.fillRect(x - w/2 - cfg.EDGE_THICK, yTop, cfg.EDGE_THICK, h);
    c.fillRect(x + w/2, yTop, cfg.EDGE_THICK, h);

    // optional small top indicator (transient)
  


    c.restore();
  }
 function drawTunnelIndicator(ctx) {
  if (!currentTunnel) return;
  if (performance.now() > currentTunnel.indicatorUntilMs) return;

  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, canvas.width, 30);

  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(255,160,60,0.95)";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("به تونل نزدیک می شوید....", canvas.width / 2, 40);
  ctx.restore();
}
  function destroy() {
    currentTunnel = null;
    lastSpawnMs = performance.now();
  }

  // attach
  window.Tunnel = Tunnel;

})(window);


