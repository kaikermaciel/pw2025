import { TAMX, DIFFICULTY, MARGIN } from "./config.js"
import { PROB_ENEMY_SHIP } from "./config.js"
import { space } from "./space.js"
class EnemyShip{
    constructor(){
        this.element = document.createElement("img")
        this.element.className = "enemy-ship"
        this.element.src = "./assets/spaceArt/png/enemyShip.png"
        this.element.style.top = "-20px"
        this.element.style.left = `${MARGIN + Math.random() * (TAMX - 2 * MARGIN)}px`;
        this.element.style.right = `${MARGIN + Math.random() * (TAMX - 2 * MARGIN)}px`;

        
        space.element.appendChild(this.element)


        
    }
    move(){
        const inc = 1 * DIFFICULTY.speedMultiplier
        this.element.style.top = `${parseInt(this.element.style.top) + inc}px`
    }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
    if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip)

}

export const moveEnemyShips = () => {
    enemyShips.forEach(e => e.move())
}



export { enemyShips }