

class Player {
    constructor(){
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById("player");
    }
    moveLeft(){ // want to modify the position of the player
        this.positionX--;
        this.playerElm.style.left = this.positionX + 'vw';
    }
    moveRight(){
        this.positionX++;
        this.playerElm.style.left = this.positionX + 'vw';
    }
}

// every time a new instance of this class is created, we can append a new element to the DOM
class Obstacle { 
    constructor(){
        this.positionX = 50; // initial values for position
        this.positionY = 100;
        this.obstacleElm = null // storing a dom node --> good practice to have this line in constructor, but not necessary
        this.createDomElement(); // call on this function every time a new obstacle is created
    }
    // create DOM element
    createDomElement(){ // extract this to a function in order to give it a name and keep things clear
        this.obstacleElm = document.createElement('div');
        this.obstacleElm.className = "obstacle";
        this.obstacleElm.style.left = this.positionX + 'vw'; // making the obstacle appear in the middle of the screen

        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.obstacleElm);
        // ^ three steps for adding a new DOM node
    }
    moveDown(){
        this.positionY--;
        this.obstacleElm.style.bottom = this.positionY + 'vh';
    }
}


const myPlayer = new Player();
const obstaclesArr = []; // storing an array of objects (instances of the class Obstacle)

// how can we store the information about our obstacles?
// we will need to move all the obstacles, may need to create an array to store our obstacles

// interval to create obstacles
setInterval(function(){
    const myObstacle = new Obstacle();
    obstaclesArr.push(myObstacle);
}, 3000);

// make the obstacle move down the screen automatically
setInterval(function(){
    obstaclesArr.forEach( (obstacleInstance) => {
        obstacleInstance.moveDown();
    });
}, 100);



//attach event listeners
document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft"){
        myPlayer.moveLeft();
    } else if (e.key === "ArrowRight"){
        myPlayer.moveRight();
    }
});
