import { space } from "./space.js";
import {  TAMX, DIFFICULTY, SPEEDY_METEOR_SMALL, SPEEDY_METEOR_BIG, SPEEDX_METEOR_BIG, SPEEDX_METEOR_SMALL } from "./config.js";

export class Meteor {
  constructor(type = "small") {
    this.type = type;
    this.element = document.createElement("img");

    if (type === "small") {
      this.element.src = "./game/assets/spaceArt/png/meteorSmall.png";
      this.width = 30;
      this.height = 30;
    
    } else if (type === "big") {
      this.element.src = "./game/assets/spaceArt/png/meteorBig.png";
      this.width = 60;
      this.height = 60;
      
    }

    this.baseSpeedY = type === "small" ? SPEEDY_METEOR_SMALL : SPEEDY_METEOR_BIG
    this.baseSpeedX = type === "small" ? SPEEDX_METEOR_SMALL : SPEEDX_METEOR_BIG

    if (Math.random() < 0.5) {
      // Entrando pela esquerda
      this.element.style.left = `-${this.width}px`; 
      this.baseSpeedX = Math.abs(type === "small" ? SPEEDX_METEOR_SMALL : SPEEDX_METEOR_BIG); 
    } else {
      // Entrando pela direita
      this.element.style.left = `${TAMX + this.width}px`; 
      this.baseSpeedX = -Math.abs(type === "small" ? SPEEDX_METEOR_SMALL : SPEEDX_METEOR_BIG); 
    }

    this.element.className = "meteor";
    this.element.style.position = "absolute";
    this.element.style.top = "100px";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    space.element.appendChild(this.element);
  }

  move() {
    const top  = parseFloat(this.element.style.top)
    const left = parseFloat(this.element.style.left)

    this.element.style.top  = `${ top  + this.baseSpeedY * DIFFICULTY.speedMultiplier }px`
    this.element.style.left = `${ left + this.baseSpeedX * DIFFICULTY.speedMultiplier }px`
  }

  remove() {
    this.element.remove();
  }
}

export const meteors = []


export const createRandomMeteor = () => {
  if (Math.random() < DIFFICULTY.meteorSpawnProb) {
    const type = Math.random() < 0.20 ? "small" : "big"; 
    meteors.push(new Meteor(type));
  }
};

export function moveMeteors() {
  meteors.forEach((meteor, i) => {
    meteor.move();
    const rect = meteor.element.getBoundingClientRect();

    if (
      rect.top > window.innerHeight ||
      rect.left < 0 ||
      rect.right > window.innerWidth
    ) {
      meteor.remove();
      meteors.splice(i, 1);
    }
  });
}

