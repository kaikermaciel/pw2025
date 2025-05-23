import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { updateHUD } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips, enemyShips } from "./enemyShip.js"
import { createRandomMeteor, moveMeteors, meteors } from "./meteor.js";
import { createRandomUFO, moveUFOs, ufos   } from "./ufo.js";
import { DIFFICULTY } from "./config.js"

window.isPaused = false;
window.gameStarted = false;

function init(){
    setInterval(run, 1000 / FPS)
}

function restartGame() {
  const gameOverScreen = document.getElementById("game-over-screen");
  if (gameOverScreen) {
    gameOverScreen.style.display = "none";
  }

  window.gameOver = false;
  window.isPaused = false;

  ship.lives = 3;
  ship.score = 0;
  updateHUD(ship.lives, ship.score);

  enemyShips.forEach(e => e.element.remove());
  enemyShips.length = 0;

  ship.bullets.forEach(b => b.remove());
  ship.bullets.length = 0;

  meteors.forEach(m => m.remove());
  meteors.length = 0;

  ufos.forEach(u => u.destroy());
  ufos.length = 0;
}


setInterval(() => {
  DIFFICULTY.speedMultiplier += DIFFICULTY.SPEED_INCREMENT
  console.log("Nova dificuldade (speedMultiplier):", DIFFICULTY.speedMultiplier.toFixed(2))
}, DIFFICULTY.SPEED_UP_INTERVAL_MS)




window.addEventListener("keydown", e => {
  if (e.code === "KeyP") {
    window.isPaused = !window.isPaused;

    const pauseScreen = document.getElementById("pause-screen");
    if (window.isPaused) {
      pauseScreen.style.display = "block";
    } else {
      pauseScreen.style.display = "none";
    }
  }

  if (e.code === "KeyR") {
    e.preventDefault();
    restartGame();
  }

  if (window.isPaused) return; // bloqueia outras ações enquanto pausado

  if (e.code === "Space") {
    e.preventDefault();
    ship.shoot();
  }
  if (e.code === "ArrowLeft") ship.changeDirection(-1);
  if (e.code === "ArrowRight") ship.changeDirection(+1);
});



document.getElementById("restart-btn").addEventListener("click", () => {
  // Esconde a tela de game over
  const gameOverScreen = document.getElementById("game-over-screen");
  gameOverScreen.style.display = "none";

  // Reseta estado do jogo
  window.gameOver = false;

  // Reseta a nave (vidas, pontuação)
  ship.lives = 3;
  ship.score = 0;
  updateHUD(ship.lives, ship.score);

  // Remove todos inimigos e tiros da tela e arrays
  enemyShips.forEach(e => e.element.remove());
  enemyShips.length = 0;

 // ship.bullets.forEach(b => b.remove());
  //ship.bullets.length = 0;
});

document.getElementById("start-game-btn").addEventListener("click", () => {
  window.gameStarted = true;
  document.getElementById("tutorial-screen").style.display = "none";

  // opcional: pode iniciar som, animações etc
});


const bgMusic = new Audio("./assets/audio/[8 BIT] Interstellar Main Theme(Soundtrack) - Hans Zimmer [8 BIT].mp3");
bgMusic.volume = 0.02;   // volume em 10%
bgMusic.loop = true;



function run(){
    updateHUD(ship.lives, ship.score)
    if (!window.gameStarted) return; 
    if (window.gameOver || window.isPaused) return;  // pausa o jogo
    space.move();
    ship.move();
    createRandomEnemyShip();
    moveEnemyShips();
    createRandomMeteor();
    moveMeteors();
    createRandomUFO();
    moveUFOs()
    ship.updateBullets();
    ship.colisao();
    ship.checkMeteorCollisions();
    bgMusic.play().catch(e => {
      console.log("Erro ao tentar tocar música:", e);
    });
}

setInterval(run, 1000 / FPS);


