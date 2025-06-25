import { TAMX, DIFFICULTY, MARGIN } from "./config.js"
import { space } from "./space.js"
class EnemyShip{
    constructor(){
        this.element = document.createElement("img")
        this.element.className = "enemy-ship"
        this.element.src = "./assets/spaceArt/png/enemyShip.png"
        this.element.style.top = "-20px"

        this.element.style.left = `${parseInt(Math.random() * TAMX)}px`

        
        space.element.appendChild(this.element)


        
    }
    move(){
        const inc = 1 * DIFFICULTY.speedMultiplier
        this.element.style.top = `${parseInt(this.element.style.top) + inc}px`
    }
    remove(){
        this.element.remove()
    }
}

const enemyShips = []

export const createRandomEnemyShip = () => {
  if (Math.random() < DIFFICULTY.enemySpawnProb) {
    enemyShips.push(new EnemyShip());
  }
};

export function moveEnemyShips() {
        enemyShips.forEach((enemyShip, enemyIndex) => {
            enemyShip.move()
            const rect = enemyShip.element.getBoundingClientRect()

            if(
                rect.top > window.innerHeight ||
                rect.left < 0 ||
                rect.right > window.innerHeight
            ){
                enemyShip.remove()
                enemyShips.splice(enemyIndex, 1);
            }
        })
}



export { enemyShips }