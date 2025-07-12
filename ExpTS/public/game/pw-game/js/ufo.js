// ufo.js
import { space } from "./space.js";
import { DIFFICULTY, TAMX, TAMY } from "./config.js";

export class UFO {
  constructor() {
    // Define a posição inicial aleatória
    this.element = document.createElement("img");
    this.element.src = "./game/assets/spaceArt/png/enemyUFO.png";  
    this.element.className = "ufo";
    this.element.style.position = "absolute";

     // Inicializa com a UFO fora da tela (à esquerda ou à direita)
    this.element.style.top = `${Math.random() * 100}px`;  // começa aleatoriamente no topo
    if (Math.random() < 0.5) {
      this.element.style.left = `-${Math.random() * 100}px`;  // começa fora da tela pela esquerda
    } else {
      this.element.style.left = `${TAMX + Math.random() * 100}px`;  // começa fora da tela pela direita
    }

    space.element.appendChild(this.element);

    // Direção inicial (esquerda ou direita)
    this.direction = Math.random() < 0.5 ? -1 : 1;  // -1 para esquerda, 1 para direita

    // Velocidades em X e Y para o movimento diagonal
    this.speedX = Math.random() * 2 + 1; // velocidade horizontal (1 a 3)
    this.speedY = Math.random() * 2 + 1; // velocidade vertical (1 a 3)
  }

    move(){
        const top  = parseFloat(this.element.style.top);
        const left = parseFloat(this.element.style.left);

        // Aplica o multiplicador de velocidade
        this.element.style.left = `${left + this.speedX * this.direction}px`;
        this.element.style.top = `${top + this.speedY}px`;

        // Limite lateral: se sair dos limites, troca direção
        if (left <= 0 || left >= TAMX - this.element.width) {
          this.direction *= -1;  // troca a direção
        }

        if (top >= window.innerHeight) {
          this.resetPosition();
        }
    }

    resetPosition() {
      this.element.style.top = `-${Math.random() * 100}px`;
      this.element.style.left = `${Math.random() < 0.5 ? -100 : TAMX + 100}px`;
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
    ufos.push(new UFO())
  }
}

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