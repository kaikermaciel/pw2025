// floatingScore.js
import { space } from "./space.js";

export class FloatingScore {
  constructor(text, x, y) {
    this.element = document.createElement("div");
    this.element.textContent = text;
    this.element.style.position = "absolute";
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.element.style.color = "yellow";
    this.element.style.fontWeight = "bold";
    this.element.style.fontSize = "24px";
    this.element.style.textShadow = "0 0 5px black";
    this.element.style.pointerEvents = "none";
    this.element.style.userSelect = "none";
    this.element.style.transition = "opacity 1s ease-out";
    space.element.appendChild(this.element);

    this.opacity = 1;
    this.lifespan = 1000; // tempo em ms para sumir
    this.startTime = Date.now();
    console.log("boa jogador")
    this.animate();
  }

  animate() {
    const elapsed = Date.now() - this.startTime;
    if (elapsed >= this.lifespan) {
      this.element.remove();
      return;
    }
    // move para cima devagar (ou para baixo, altere o y para subir ou descer)
    const newY = parseFloat(this.element.style.top) - 0.5;  // sobe 0.5px por frame
    this.element.style.top = `${newY}px`;

    // vai sumindo aos poucos
    this.element.style.opacity = `${1 - elapsed / this.lifespan}`;

    requestAnimationFrame(() => this.animate());
  }
}
