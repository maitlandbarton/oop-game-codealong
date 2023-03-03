

class Player {
    constructor(){
        this.positionX = 0;
        this.positionY = 0;
        this.width = 20; // add unit later
        this.height = 10;
        this.playerElm = document.getElementById("player");

        this.playerElm.style.width = this.width + 'vw';
        this.playerElm.style.height = this.height + 'vh';
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
        this.width = 20;
        this.height = 10;
        
        

        this.obstacleElm = null // storing a dom node --> good practice to have this line in constructor, but not necessary
        this.createDomElement(); // call on this function every time a new obstacle is created
    }
    // create DOM element
    createDomElement(){ // extract this to a function in order to give it a name and keep things clear
        this.obstacleElm = document.createElement('div');
        this.obstacleElm.className = "obstacle";

        this.obstacleElm.style.width = this.width + 'vw';
        this.obstacleElm.style.height = this.height + 'vh';

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

class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; // storing an array of objects (instances of the class Obstacle)
  }

  start() {
    this.player = new Player(); // could also do this part in the constructor

    this.attachEventListeners();

    // interval to create obstacles
    setInterval(() => {
      const myObstacle = new Obstacle();
      this.obstaclesArr.push(myObstacle);
    }, 2000);

    // move all obstacles
    setInterval(() => {
      this.obstaclesArr.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        // every time we move an obstacle we check if there was a collision between that obstacle and the player
        this.detectCollision(obstacleInstance);
      });
    }, 16);
  }

  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }

  detectCollision(obstacleInstance) {
    // obstacle not in the scope
    if (
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width && // checking horizontal posiiton of the player
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + obstacleInstance.height && // checking vertical position of the player
      this.player.height + this.player.positionY > obstacleInstance.positionY
    ) {
      console.log("game over!");
      // window.location.href = "./gameover.html"; // javascript redirect to URL for a game over page
    }
  }
}


// how can we store the information about our obstacles?
// --> need an array because we want to move many obstacles, not just one!

const myGame = new Game();
myGame.start();


// collision detection!
// mdn 2D collision detection
/* if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
     Collision detected! */