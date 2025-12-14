// ===================================================
// 🎵 صدا
let gameMusic = new Audio("sounds/BermoodaSound.mp3");
let gameOverMusic = new Audio("sounds/gameOverSound.mp3");

// ===================================================
// 📦 تنظیمات ذخیره‌شده از پنل ادمین (در صورت وجود)
const __ADMIN_CONFIG__ = JSON.parse(
  localStorage.getItem("GAME_ADMIN_CONFIG") || "{}"
);

// تابع امن دریافت مقدار
function CFG(key, defaultValue) {
  return (__ADMIN_CONFIG__[key] !== undefined)
    ? __ADMIN_CONFIG__[key]
    : defaultValue;
}

// ===================================================
// ❤️ جان
const HEART_DROP_CHANCE = CFG("HEART_DROP_CHANCE", 0.01);
const HEART_FALL_SPEED  = CFG("HEART_FALL_SPEED", 2);
const HEART_SIZE        = CFG("HEART_SIZE", 24);
let lives               = CFG("lives", 3);
let maxLives            = CFG("maxLives", 4);
let scoreToHeart        = CFG("scoreToHeart", 1500);
const padding           = CFG("padding", 8);

// ===================================================
// 🎯 نوار گرما
let heat = 0;
let overheated = false;
let heatFillRate     = CFG("heatFillRate", 1.2);
let heatCoolRate     = CFG("heatCoolRate", 0.2);
let overheatDuration = CFG("overheatDuration", 3000);

// ===================================================
const SHEET_WEBAPP = CFG(
  "SHEET_WEBAPP",
  "https://script.google.com/macros/s/AKfycbzPI5V8LCbQW1aSee0gBpwz-T8YdPXbKFmWeBgU5V_mWJQwqowJRU88yKfEfrJ9EUsg/exec"
);

// ===================================================
// 🔫 تیر
const bulletInterval = CFG("bulletInterval", 100);
let bulletSpeed      = CFG("bulletSpeed", 10);
const shootDelay     = CFG("shootDelay", 70);

// ===================================================
// ⛽ سوخت
let fuel          = CFG("fuel", 100);
let displayedFuel = CFG("displayedFuel", 100);
let refuelRate    = CFG("refuelRate", 0.4);
let fuelAlarm     = new Audio("sounds/gasAlert.mp3");
let alarmfuel     = CFG("alarmfuel", 20);

// ===================================================
const noFlyZoneHeight = CFG("noFlyZoneHeight", 128);

// ===================================================
// ✈️ گرید تیر
let bulletGrade       = CFG("bulletGrade", 1);
let scoreGradeThree   = CFG("scoreGradeThree", 3000);
let scoreGradeTwo     = CFG("scoreGradeTwo", 1500);

// ===================================================
let missiles = CFG("missiles", 0);

// ===================================================
// 🤖 دشمن هوشمند
const hooshSettings = {
  spawnInterval : CFG("hoosh_spawnInterval", 30000),
  lifeTime      : CFG("hoosh_lifeTime", 10000),
  shotRate      : CFG("hoosh_shotRate", 1),
  evadeLookAhead: CFG("hoosh_evadeLookAhead", 1000),
  evadeRadius   : CFG("hoosh_evadeRadius", 100),
  maxSpeedX     : CFG("hoosh_maxSpeedX", 1),
  evadeForce    : CFG("hoosh_evadeForce", 0.10),
  imgList       : ["hooshmandP.png", "hooshmandP2.png"],
  scoreOnKill   : CFG("hoosh_scoreOnKill", 500)
};

// ===================================================
// 🌐 خروجی نهایی سراسری
window.GAME_CONFIG = {
  gameMusic,
  gameOverMusic,

  HEART_DROP_CHANCE,
  HEART_FALL_SPEED,
  HEART_SIZE,
  lives,
  maxLives,
  scoreToHeart,
  padding,

  heat,
  overheated,
  heatFillRate,
  heatCoolRate,
  overheatDuration,

  SHEET_WEBAPP,

  bulletInterval,
  bulletSpeed,
  shootDelay,

  fuel,
  displayedFuel,
  refuelRate,
  alarmfuel,

  noFlyZoneHeight,
  bulletGrade,
  scoreGradeThree,
  scoreGradeTwo,
  missiles,

  hooshSettings
};
