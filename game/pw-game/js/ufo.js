// ufo.js
import { space } from "./space.js";
import { TAMX, TAMY, DIFFICULTY, SPEEDY_UFO, SPEEDX_UFO } from "./config.js";

export class UFO {
  constructor() {
    this.element = document.createElement("img");
    this.element.src = "./assets/spaceArt/png/enemyUFO.png";  
    this.element.className = "ufo";
    this.element.style.position = "absolute";

    this.baseSpeedY = SPEEDY_UFO
    this.baseSpeedX = SPEEDX_UFO

    this.element.style.top  = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`

    space.element.appendChild(this.element)


    this.element.onload = () => {
      this.boundWidth  = this.element.width
      this.boundRightX = TAMX - this.boundWidth
    }
  }

    move(){
        const top  = parseFloat(this.element.style.top);
        const left = parseFloat(this.element.style.left);

        // Aplica o multiplicador de velocidade
        const deltaY = this.baseSpeedY * DIFFICULTY.speedMultiplier;
        const deltaX = this.baseSpeedX * DIFFICULTY.speedMultiplier;

        let newLeft = left + deltaX;
        let newTop  = top  + deltaY;

        const maxRight = TAMX - (this.boundWidth || this.element.width || 50); 

        if (newLeft <= 0) {
            newLeft = 0;
            this.baseSpeedX = Math.abs(this.baseSpeedX); 
        } else if (newLeft >= maxRight) {
            newLeft = maxRight;
            this.baseSpeedX = -Math.abs(this.baseSpeedX); 
        }

        this.element.style.left = `${newLeft}px`;
        this.element.style.top  = `${newTop}px`;
    }


  outOfBounds(){
    return parseFloat(this.element.style.top) > TAMY
  }

  destroy(){
    this.element.remove()
  }
}

const ufos = [];

export const createRandomUFO = () => {
  if (Math.random() < DIFFICULTY.ufoSpawnProb) {
    ufos.push(new UFO());
  }
};

export const moveUFOs = () => {
  for (let i = ufos.length - 1; i >= 0; i--) {
    const u = ufos[i]
    u.move()

    if (u.outOfBounds()) {
      u.destroy()
      ufos.splice(i,1)
    }
  }
}

export { ufos }