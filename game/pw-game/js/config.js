export const FPS = 120
export const TAMX = 600
export const TAMY = 900
export const MARGIN = 60 // limitar o espaço de criação da enemy ship

export const DIFFICULTY = {
  speedMultiplier: 1,
  SPEED_INCREMENT: 0.1,          // +10% a cada minuto
  SPEED_UP_INTERVAL_MS: 60000,   // 1 minuto

  enemySpawnProb: 0.009,
  enemySpawnIncrement: 0.002,    // aumenta spawn em 0.2% a cada minuto

  ufoSpawnProb: 0.002,
  ufoSpawnIncrement: 0.001,      // aumenta spawn em 0.1% a cada minuto

  meteorSpawnProb: 0.01,
  meteorSpawnIncrement: 0.002,   // aumenta spawn em 0.2% a cada minuto
};
export const FIRE_COOLDOWN_MS = 250; // Limitar pra não poder segurar o espaço pra atirar

export const SPEEDX_UFO = 1.2
export const SPEEDY_UFO = 1.2

export const SPEEDX_METEOR_BIG = 2
export const SPEEDY_METEOR_BIG = 2

export const SPEEDX_METEOR_SMALL = 5
export const SPEEDY_METEOR_SMALL = 5
