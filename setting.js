// 🎵 صدا
let gameMusic = new Audio("sounds/BermoodaSound.mp3");
let gameOverMusic = new Audio("sounds/gameOverSound.mp3");


const BOSS_MAX_LIFE = 100;
const HEALTH_BAR_HEIGHT = 6;
const HEALTH_BAR_OFFSET = 10; 
const BOOS_ONE_LIFE = 1500;
const BOSS_INTERVAL = 30000;
const FIRE_DELAY = 4000;
const MAX_FIRE = 5;




// ❤️ جان
const HEART_DROP_CHANCE = 0.01;
const HEART_FALL_SPEED  = 2;
const HEART_WIDTH = 45;
const HEART_HEIGHT = 23;
let lives = 3;
let maxLives = 4;
let scoreToHeart = 1500;
const padding = 8;




// 🎯 نوار گرما
let heat = 0;
let overheated = false;
let heatFillRate  = 1.2;
let heatCoolRate = 0.2;
let overheatDuration = 3000;



// 🔗 سرور
const SHEET_WEBAPP = "https://script.google.com/macros/s/AKfycbzPI5V8LCbQW1aSee0gBpwz-T8YdPXbKFmWeBgU5V_mWJQwqowJRU88yKfEfrJ9EUsg/exec";



// 🔫 تیر
const bulletInterval = 100;
let bulletSpeed = 10;
const shootDelay = 70;



// ⛽ سوخت
let fuel = 100;
let displayedFuel = 100;
let refuelRate = 0.4;
let fuelAlarm = new Audio("sounds/gasAlert.mp3");
let alarmfuel = 20;



// ✈️ گرید تیر
const noFlyZoneHeight = 128;
let bulletGrade= 1;
let scoreGradeThree = 3000;
let scoreGradeTwo  = 1500;
let missiles = 0;



// 🤖 دشمن هوشمند
const hooshSettings = {
  spawnInterval : 30000,
  lifeTime : 10000,
  shotRate : 1,
  evadeLookAhead: 1000,
  evadeRadius : 100,
  maxSpeedX : 1,
  evadeForce  : 0.10,
  imgList  : ["hooshmandP.png", "hooshmandP2.png"],
  scoreOnKill   : 500
};





// 🌐 خروجی نهایی
window.GAME_CONFIG = {
  

  gameMusic,
  gameOverMusic,


  HEART_DROP_CHANCE,
  HEART_FALL_SPEED,
  HEART_WIDTH ,
  HEART_HEIGHT,
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
  hooshSettings,



 BOSS_MAX_LIFE,
 HEALTH_BAR_HEIGHT,
 HEALTH_BAR_OFFSET,
 BOOS_ONE_LIFE,
 BOSS_INTERVAL ,
 FIRE_DELAY ,
 MAX_FIRE 
};
