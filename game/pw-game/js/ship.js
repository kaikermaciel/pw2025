import { TAMX, DIFFICULTY } from "./config.js"
import { space } from "./space.js"
import { Bullet } from "./bullet.js"
import { enemyShips } from "./enemyShip.js"
import { meteors } from "./meteor.js"
import { FIRE_COOLDOWN_MS } from "./config.js"
import { ufos } from "./ufo.js";


const directions = [
    "./assets/spaceArt/png/playerLeft.png",
    "./assets/spaceArt/png/player.png",
    "./assets/spaceArt/png/playerRight.png",
    "./assets/spaceArt/png/playerDamaged.png"
]

class Ship{
    constructor(){
        this.element = document.createElement("img")
        this.element.id = "ship"
        this.direction = 1
        this.element.src = directions[this.direction]
        this.element.style.bottom = `20px` 
        this.element.style.left = `${TAMX/2 - 50}px`

        space.element.appendChild(this.element)
        this.lives = 3;   
        this.score = 0;    
        this.isDamaged = false;    // flag de dano
        this.isImmune = false;     // flag de imunidade       
        this.blinkInterval = null;  
        this.lastFireTime = 0; // timestamp do último tiro
        this.bullets = [];
    }

    changeDirection(giro) {
        if (this.isDamaged) return;  // não muda sprite se estiver danificado

        if (this.direction + giro >= 0 && this.direction + giro <= 2) {
            this.direction = this.direction + giro;
            this.element.src = directions[this.direction];
        }
    }

    setDirection(giro){
        if (this.isDamaged) return;
        if (giro === 0){
            this.direction = this.direction[giro]
            this.element.src = directions[this.direction]
        } else if (giro === 2){
            this.direction = this.direction[giro]
            this.element.src = directions[this.direction]
        } else {
            this.direction = this.direction[giro]
            this.element.src = directions[this.direction]
        }
    }


    move() {
        const parentRect = this.element.parentElement.getBoundingClientRect();
        const rect = this.element.getBoundingClientRect();
        
        const baseSpeed = 2; 
        const speed = baseSpeed * DIFFICULTY.speedMultiplier;

        const relativeLeft = rect.left - parentRect.left;

        const leftLimit = 0;
        const rightLimit = TAMX - rect.width;

        if (this.direction === 0 && relativeLeft > leftLimit) {
            this.element.style.left = `${relativeLeft - speed}px`;
        }
        if (this.direction === 2 && relativeLeft < rightLimit) {
            this.element.style.left = `${relativeLeft + speed}px`;
        }
        
    }

    startBlinking() {
        let visible = true;
        this.blinkInterval = setInterval(() => {
        this.element.style.opacity = visible ? "0.2" : "1";
        visible = !visible;
        }, 200); // pisca a cada 200 ms
    }

    stopBlinking() {
        clearInterval(this.blinkInterval);
        this.element.style.opacity = "1";  
        this.blinkInterval = null;
    }

    takeDamage() {
        if (this.isImmune) return;

        this.isDamaged = true;
        this.isImmune = true;
        this.element.src = directions[3]; // Bota o shipDamaged

        this.startBlinking();

        setTimeout(() => {
        this.isImmune = false;
        this.isDamaged = false;
        this.stopBlinking();
        this.element.src = directions[this.direction];
        }, 3000);
    }

    loseLife() {
        if (this.isImmune) return;  // Fica imune se levar dano

        this.lives -= 1;
        updateHUD(this.lives, this.score);

        this.takeDamage();

        if (this.lives <= 0) {
            const gameOverScreen = document.getElementById("game-over-screen");
            const finalScore = document.getElementById("final-score");
            finalScore.textContent = `Pontuação final: ${this.score}`;
            gameOverScreen.style.display = "block";
            window.gameOver = true;
        }
    }




    addScore(points) {
        this.score += points;
        console.log("Pontos:", this.score);
        updateHUD(this.lives, this.score);
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastFireTime < FIRE_COOLDOWN_MS) {
            return; // ainda está no cooldown, não atira
        }

        this.lastFireTime = now;

        // restante do código que cria o tiro
        console.log("Tiro disparado!");
        const shipRect = this.element.getBoundingClientRect();

        const bulletWidth = 8;
        const bulletHeight = 24;

        const x = shipRect.left - this.element.parentElement.getBoundingClientRect().left + shipRect.width / 2 - bulletWidth / 2;
        const y = shipRect.top - this.element.parentElement.getBoundingClientRect().top - bulletHeight;

        this.bullets.push(new Bullet(x, y));
    }



    collision() {

        // enemy ship
        enemyShips.forEach((enemy, index) => {
        const shipRect = this.element.getBoundingClientRect();
        const enemyRect = enemy.element.getBoundingClientRect();

        if (
            shipRect.left < enemyRect.right &&
            shipRect.right > enemyRect.left &&
            shipRect.top < enemyRect.bottom &&
            shipRect.bottom > enemyRect.top
        ) {
            enemy.element.remove();
            enemyShips.splice(index, 1);
            this.loseLife();
        }
        });

        //ufo
        for (let i = ufos.length - 1; i >= 0; i--) {
            const ufo   = ufos[i];
            const shipRect = this.element.getBoundingClientRect();
            const ufoRect  = ufo.element.getBoundingClientRect();

            if (
            shipRect.left   < ufoRect.right &&
            shipRect.right  > ufoRect.left  &&
            shipRect.top    < ufoRect.bottom&&
            shipRect.bottom > ufoRect.top
            ) {
            ufo.destroy();       
            ufos.splice(i, 1);   
            this.loseLife();     
            }
        }

        // meteoro
        const shipRect = this.element.getBoundingClientRect();

        meteors.forEach((meteor, meteorIndex) => {
            const meteorRect = meteor.element.getBoundingClientRect();

            
            if (
                shipRect.left < meteorRect.right &&
                shipRect.right > meteorRect.left &&
                shipRect.top < meteorRect.bottom &&
                shipRect.bottom > meteorRect.top
            ) {
                meteor.remove();
                meteors.splice(meteorIndex, 1);
                this.loseLife();
            }
        });    
    }



    updateBullets() {
        this.bullets.forEach((bullet, i) => {
            bullet.move();
            const bulletShoted = bullet.element.getBoundingClientRect();

            if (bulletShoted.bottom <= 0) {
                bullet.remove();
                this.bullets.splice(i, 1);
                return;
            }

            enemyShips.forEach((enemy, enemyIndex) => {
                const enemyRect = enemy.element.getBoundingClientRect();

                if (
                    bulletShoted.left < enemyRect.right &&
                    bulletShoted.right > enemyRect.left &&
                    bulletShoted.top < enemyRect.bottom &&
                    bulletShoted.bottom > enemyRect.top
                ) {
                    bullet.remove();
                    this.bullets.splice(i, 1);

                    enemy.element.remove();
                    enemyShips.splice(enemyIndex, 1);
                    
                    this.addScore(50); // adiciona 10 pontos por inimigo destruído
                    
                }

            });
            for (let ufoIndex = ufos.length - 1; ufoIndex >= 0; ufoIndex--) {
                const ufo   = ufos[ufoIndex];
                const ufoRect    = ufo.element.getBoundingClientRect();

                if (
                    bulletShoted.left   < ufoRect.right &&
                    bulletShoted.right  > ufoRect.left  &&
                    bulletShoted.top    < ufoRect.bottom&&
                    bulletShoted.bottom > ufoRect.top
                ) {
                    bullet.remove();
                    this.bullets.splice(i, 1);

                    ufo.destroy();
                    ufos.splice(ufoIndex, 1);

                    this.addScore(20);  // ajuste os pontos como desejar
                    
                    break;  // sai do loop de UFOS
                }
            }
            meteors.forEach((meteor, meteorIndex) => {
                const meteorRect = meteor.element.getBoundingClientRect();
                if (
                        bulletShoted.left < meteorRect.right &&
                        bulletShoted.right > meteorRect.left &&
                        bulletShoted.top < meteorRect.bottom &&
                        bulletShoted.bottom > meteorRect.top
                    ) {
                        bullet.remove();
                        this.bullets.splice(i, 1);
                        
                        meteor.remove();
                        meteors.splice(meteorIndex, 1);

                        // Pontos diferentes dependendo do tipo
                        if (meteor.type === "small") {
                            this.addScore(100);
                        } 
                        else if (meteor.type === "big") {
                            this.addScore(10);
                        }
                    }
            })
        });
    }

}
    // Função para atualizar HUD (vida e pontos)
export function updateHUD(lives, score) {
  const livesContainer = document.getElementById("lives-container");
  const scoreEl = document.getElementById("score");

  // Limpa vidas antigas
  livesContainer.innerHTML = "";

  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img");
    img.src = "./assets/spaceArt/png/life.png";  // ajuste o caminho para onde o life.png está no seu projeto
    img.style.width = "24px";
    img.style.height = "24px";
    img.style.marginRight = "5px";
    livesContainer.appendChild(img);
  }

  if (scoreEl) {
    scoreEl.textContent = `Pontos: ${score}`;
  }
}



export const ship = new Ship()