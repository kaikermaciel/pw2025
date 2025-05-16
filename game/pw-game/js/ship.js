import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
    "./assets/spaceArt/png/playerLeft.png",
    "./assets/spaceArt/png/player.png",
    "./assets/spaceArt/png/playerRight.png",
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
    }
    changeDirection(giro){ 
        console.log(this.direction+giro)
        if(this.direction + giro >= 0 && this.direction + giro <= 2){
            this.direction = this.direction + giro
            this.element.src = directions[this.direction]
        }
    }
    move(){
        if(this.direction === 0) this.element.style.left = `${parseInt(this.element.style.left ) -1}px`
        if(this.direction === 2) this.element.style.left = `${parseInt(this.element.style.left ) +1}px`

    }
    colisao(enemyShips){
        if(enemyShips){
            enemyShips.forEach(element => {
                const shipRect = this.element.getBoundingClientRect();
                const enemyRect = element.element.getBoundingClientRect();

                const hit = shipRect.left < enemyRect.right &&
                            shipRect.right > enemyRect.left &&
                            shipRect.top < enemyRect.bottom &&
                            shipRect.bottom > enemyRect.top;

                if (hit) {
                    console.log("Colisão detectada!");
                }
            });
        }
    }
}

export const ship = new Ship()