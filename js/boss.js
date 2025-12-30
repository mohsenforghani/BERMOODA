 const Boss = (() => {
  let boss = null;
  let bossBullets = [];
  let lastFireTime = 0;
  let fireCount = 0;
  let active = false;
  let movePhase = "enter"; // enter | hold | relocate | dead
  let lastBossTime = 0;

 // ========================================================== 

  function spawn(canvas) {
    boss = {
      x: canvas.width / 2 -50,
      y: -200,
      w: 100,
      h: 133,
      life: 100,
      targetX: canvas.width / 2 -100,
      targetY: canvas.height / 2 - 100,
      speed: 1,
      img: bossImage
    };


    bossBullets = [];
    fireCount = 0;
    movePhase = "enter";
    active = true;
    lastFireTime = performance.now();
    isBossActive = true;   // ⛔ توقف اسپاون دشمن‌ها و شهاب‌سنگ‌ها
    
  }
// ==========================================================
  function fire() {
    const cx = boss.x + boss.w / 2;
    const cy = boss.y + boss.h / 2;

    for (let a = 0; a < 360; a += 20) {
      const rad = a * Math.PI / 180;
      bossBullets.push({
        x: cx,
        y: cy,
        vx: Math.cos(rad) * 3,
        vy: Math.sin(rad) * 3,
        w: 10,
        h: 20
      });
    }

    fireCount++;
  }
// ==========================================================
  function update(delta, canvas, player) {
    if (!active) {
      if (performance.now() - lastBossTime > BOSS_INTERVAL) {
        spawn(canvas);
        lastBossTime = performance.now();
      }
      return;
    }

    /* ---- Movement ---- */
    if (movePhase === "enter") {
      boss.y += boss.speed;
      if (boss.y >= boss.targetY) {
        boss.y = boss.targetY;
        movePhase = "hold";
      }
    }

    if (movePhase === "hold") {
      if (performance.now() - lastFireTime > FIRE_DELAY) {
        fire();
        lastFireTime = performance.now();

        if (fireCount >= MAX_FIRE) {
          movePhase = "relocate";
          boss.targetX = 100;
          boss.targetY = 50;
        }
      }
    }

    if (movePhase === "relocate") {
      boss.x += (boss.targetX - boss.x) * 0.02;
      boss.y += (boss.targetY - boss.y) * 0.02;
    }

    /* ---- Boss Bullets ---- */
    for (let i = bossBullets.length - 1; i >= 0; i--) {
      const b = bossBullets[i];
      b.x += b.vx;
      b.y += b.vy;

      // برخورد با بازیکن
     if (
            airplane.x < b.x &&
            airplane.x + airplane.w > b.x &&
            airplane.y < b.y &&
            airplane.y + airplane.h > b.y
        ) {
        explodeAirplane();
        bossBullets.splice(i, 1);
      }

      if (
        b.x < -100 || b.x > canvas.width + 100 ||
        b.y < -100 || b.y > canvas.height + 100
      ) {
        bossBullets.splice(i, 1);
      }
    }
// ==========================================================
    /* ---- Player Bullets Hit Boss ---- */
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      if (
        b.x > boss.x &&
        b.x < boss.x + boss.w &&
        b.y > boss.y &&
        b.y < boss.y + boss.h
      ) {
        bullets.splice(i, 1);
        boss.life--;

        if (boss.life <= 0) {
          killBoss();
          return;
        }
      }
    }
  }
// ==========================================================
  function killBoss() {
    createExplosion(boss.x + boss.w / 2, boss.y + boss.h / 2, 300, 300);
    addScore(GAME_CONFIG.BOOS_ONE_LIFE);

    boss = null;
    bossBullets = [];
    active = false;
    isBossActive = false;
   

 if (window.Tunnel && Tunnel.destroy) {
    Tunnel.destroy();
  }

    // ⏱ بازگشت دشمن‌ها بعد از 5 ثانیه
     setTimeout(() => {
     isBossActive = false;
     resetTimer();
    }, 5000);
  }
// ==========================================================
 

 function draw(ctx) {
    if (!active || !boss) return;

   ctx.drawImage(boss.img, boss.x, boss.y, boss.w, boss.h);



// ===== Boss Health Bar ========================================================

const lifeRatio = boss.life / GAME_CONFIG.BOSS_MAX_LIFE;
const barWidth = boss.w * lifeRatio;

const barX = boss.x;
const barY = boss.y - GAME_CONFIG.HEALTH_BAR_OFFSET;

// پس‌زمینه (خاکستری تیره)
ctx.fillStyle = "rgba(0,0,0,0.6)";
ctx.fillRect(barX, barY, boss.w, GAME_CONFIG.HEALTH_BAR_HEIGHT);

// رنگ نوار
if (boss.life < 30) {
  ctx.fillStyle = "#ff3333"; // قرمز
} else {
  ctx.fillStyle = "#00ff66"; // سبز
}

// خود نوار
ctx.fillRect(barX, barY, barWidth, GAME_CONFIG.HEALTH_BAR_HEIGHT);

// حاشیه
ctx.strokeStyle = "#000";
ctx.lineWidth = 1;
ctx.strokeRect(barX, barY, boss.w, GAME_CONFIG.HEALTH_BAR_HEIGHT);


// ===================================================================

    bossBullets.forEach(b => {
      ctx.fillStyle = "#00ffff";
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 15;
      ctx.fillRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
      ctx.shadowBlur = 0;
    });
  }

// ==========================================================
function resetTimer() {
  lastBossTime = performance.now();
}

 const BossAPI = {
  update,
  draw,
  resetTimer
};

return BossAPI;

})();
window.Boss = Boss;


