const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ObstacleArray = [];
let scoreFetcher = document.querySelector("#score span");
let score = 0;

let button = document.getElementsByClassName("button")[0]

const bgMusic = new Audio("./Dragon Ball Z Opening 8 bit.mp3");

button.addEventListener("click", function () {
  bgMusic.volume = 0.4
  ObstacleArray = []
  myIntervalID = setInterval(animationLoop, 16);
  bgMusic.play();
  scoreFetcher.innerHTML = 0;
  score = 0
});

ctx.fillRect(0, 0, canvas.width, canvas.height);




const keys = {
  w: {
    pressed: false,
  },

  s: {
    pressed: false,
  },
};



let lastKey

const player = new Player(50, canvas.height / 2.5, 50, 50, gokuImg, gokuAttackImg);
const Obstacles = new Obstacle(
  canvas.width,
  canvas.height - 50,
  50,
  50,
  majinBuu
);
player.draw();



  
window.addEventListener("keydown", function (event) {
  event.preventDefault()
  switch (event.code) {
    case "KeyW":
     keys.w.pressed = true;
    lastKey = "w";
     player.moveUp();
      break;
    case "KeyS":
      keys.s.pressed = true;
     lastKey = "s";
      player.moveDown();
      console.log("s pressed");
      break;
    case "Space":
      const attackSound1 = new Audio("./gokuAttack.mp3");
      attackSound1.volume = 0.4
      console.log("f pressed");
      attackSound1.play()
      player.attack();


      break;
  }
});


window.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = false;
    player.stop();
      break;
    case "KeyS":
    keys.s.pressed = false;
    player.stop();
      console.log("s pressed");
      break;
  }
})
// function scoreAdder(Obstacle){
//     if (my){

//     }
// }
player.draw();

let myIntervalID;

let highScore = document.querySelector('#HighScore span')

let frameCount = 0;
animationLoop = () => {
  frameCount++;
  if (frameCount % 180 === 0) {
    const myNewObstacle = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle2 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );

    const myNewObstacle3 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle4 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle5 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle6 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    const myNewObstacle7 = new Obstacle(
      canvas.width,
      Math.random() * canvas.height,
      50,
      50,
      majinBuu
    );
    ObstacleArray.push(myNewObstacle);
    ObstacleArray.push(myNewObstacle2);
    ObstacleArray.push(myNewObstacle3);
    ObstacleArray.push(myNewObstacle4);
    ObstacleArray.push(myNewObstacle5);
    ObstacleArray.push(myNewObstacle6);
    ObstacleArray.push(myNewObstacle7);

  }
  //ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  background2.update()
  background3.update()
  cloud.update()
  cloud2.update()
  cloud3.update()
  cloud4.update()
  cloud5.update()
  
  player.update1()
  player.draw();
  if (frameCount % 15 === 0) {
    player.spriteFrame++;
    player.spriteFrame = player.spriteFrame % 4;
  }
  
   if (keys.w.pressed && lastKey === "w") {
     player.velocity.y = -5;
   } else if (keys.s.pressed && lastKey === "s") {
     player.velocity.y = 5;
   } 
  for (let i = ObstacleArray.length - 1; i >= 0; i--) {
    ObstacleArray[i].moveLeft();

    if (ObstacleArray[i].collisionCheck(player)) {
      bgMusic.pause();
      clearInterval(myIntervalID);
      
    }
    ObstacleArray[i].draw();

    if (ObstacleArray[i].x < 0) {
      ObstacleArray.splice(i, 1);

      console.log(score);
    }
    // If statement for hitbox collision.
    if (
      player.x + player.attackBox.width >= ObstacleArray[i].x &&
      player.x <= ObstacleArray[i].x + ObstacleArray[i].width &&
      player.y + player.attackBox.height >= ObstacleArray[i].y &&
      player.y <= ObstacleArray[i].y + ObstacleArray[i].height &&
      player.isAttacking
    ) {
      score++;
      scoreFetcher.innerHTML = score;
      if (score > Number(highScore.innerHTML)){
        highScore.innerHTML = score
      }
      player.isAttacking = false;
      console.log("good");
      const buuDeath = new Audio('Fat buu death.mp3')
      buuDeath.volume = 1
      buuDeath.play()
      ObstacleArray.splice(i, 1);
    }
  }
};


