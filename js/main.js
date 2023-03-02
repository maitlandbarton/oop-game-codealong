

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


const myPlayer = new Player();
myPlayer.moveRight();


//attach event listeners
document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft"){
        myPlayer.moveLeft();
    } else if (e.key === "ArrowRight"){
        myPlayer.moveRight();
    }
});
