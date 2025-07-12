import { FPS, TAMX } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { updateHUD } from "./ship.js"
import { createRandomEnemyShip, moveEnemyShips, enemyShips } from "./enemyShip.js"
import { createRandomMeteor, moveMeteors, meteors } from "./meteor.js";
import { createRandomUFO, moveUFOs, ufos   } from "./ufo.js";
import { DIFFICULTY } from "./config.js"


let speedUpTimeout
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
  ship.element.style.left = `${TAMX/2 - 50}px`
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


function showSpeedUpMessage() {
  const msg = document.getElementById("speedup-message");
  if (!msg) return;

  msg.style.display = "block";

  if (speedUpTimeout) clearTimeout(speedUpTimeout);

  speedUpTimeout = setTimeout(() => {
    msg.style.display = "none";
    speedUpTimeout = null;
  }, 1500);
}





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
  if (e.code === "ArrowLeft") e.preventDefault();
  if (e.code === "ArrowRight") e.preventDefault();
  if (e.code === "ArrowRight") ship.changeDirection(+1);
});


  

document.getElementById("restart-btn").addEventListener("click", () => {
  const gameOverScreen = document.getElementById("game-over-screen");
  gameOverScreen.style.display = "none";

  window.gameOver = false;

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

});

document.getElementById("start-game-btn").addEventListener("click", () => {
  window.gameStarted = true;
  document.getElementById("tutorial-screen").style.display = "none";
});

window.addEventListener("keydown", (e) => {
  if (!window.gameStarted && e.code === "Space") {
    e.preventDefault();
    window.gameStarted = true;
    document.getElementById("tutorial-screen").style.display = "none";
  }
});



function increaseDifficulty() {
  if(window.isPaused || window.gameOverScreen || !window.gameStarted) return;
  
  DIFFICULTY.speedMultiplier += DIFFICULTY.SPEED_INCREMENT;
  DIFFICULTY.enemySpawnProb += DIFFICULTY.enemySpawnIncrement;
  DIFFICULTY.ufoSpawnProb += DIFFICULTY.ufoSpawnIncrement;
  DIFFICULTY.meteorSpawnProb += DIFFICULTY.meteorSpawnIncrement;

  showSpeedUpMessage();
}





const bgMusic = new Audio("./assets/audio/[8 BIT] Interstellar Main Theme(Soundtrack) - Hans Zimmer [8 BIT].mp3");
bgMusic.volume = 0.7;   // volume em 2%
bgMusic.loop = true;



function run(){
    updateHUD(ship.lives, ship.score) // atualiza o hud
    if (window.gameOver || window.isPaused || !window.gameStarted) return;  // pausa e jogo pausead
    
    space.move();
    ship.move();
    
    // cria os inimigo/obstaculos
    createRandomEnemyShip();
    moveEnemyShips();
    createRandomMeteor();
    moveMeteors();
    createRandomUFO();
    moveUFOs()
    
    ship.updateBullets();
    ship.collision();

    
    bgMusic.play().catch(e => {
      console.log("Erro ao tentar tocar música:", e);
    });

}

setInterval(run, 1000 / FPS);
setInterval(increaseDifficulty, DIFFICULTY.SPEED_UP_INTERVAL_MS);


