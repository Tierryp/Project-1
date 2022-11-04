const gokuImg = new Image()
gokuImg.src = '../Goku_Flying-removebg-preview (1).png'
const gokuAttackImg = new Image();
gokuAttackImg.src = '../Goku_Attack-removebg-preview.png';
const majinBuu = new Image();
majinBuu.src = '../Majin_Buu-removebg-preview (1).png'




class Background {
  constructor({ position, imageSrc, size, scale = 1 }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.size = size;
    this.scale = scale;
    this.vX = -1;
  }

  move() {
    this.position.x += this.vX;
    this.position.x %= canvas.width;
    this.position.y;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width * this.scale,
      this.size.height * this.scale
    );
    if (this.vX < 0) {
      ctx.drawImage(
        this.image,
        this.position.x + canvas.width,
        this.position.y,
        this.size.width * this.scale,
        this.size.height * this.scale
      );
    } else {
      ctx.drawImage(
        this.image,
        this.position.x - this.image.width,
        this.position.y,
        this.size.width * this.scale,
        this.size.height * this.scale
      );
    }
  }
  //   draw() {
  //     ctx.drawImage(
  //       this.image,
  //       this.position.x,
  //       this.position.y,
  //       this.size.width * this.scale,
  //       this.size.height * this.scale
  //     );
  //   }
  update() {
    this.move();
    this.draw();
  }
}
class Sprite {
  constructor({ position, imageSrc, size, scale = 1, framesMax = 1 }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.size = size;
    this.scale = scale;
    this.framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 1;
  }
  draw() {
    ctx.drawImage(
      this.image,
      //Use this to calculate the current frames we have within a certain image. (Background images have no frames therefore it prints no picture.)
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.size.width / this.framesMax,
      this.size.height,
      this.position.x,
      this.position.y,
      (this.size.width / this.framesMax) * this.scale,
      this.size.height * this.scale
    );
  }
  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else this.framesCurrent = 0;
    }
  }
}

class Player {
  constructor(x, y, width, height, img, attackImg,velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
this.velocity = {
    x:0,
    y:0
}
    this.img = img;
    this.attackImg = attackImg;
    this.attackBox = {
      width: 100,
      height: 50,
      color: "blue",
    };
    this.isAttacking;
    this.spriteFrame = 0;
  
}
update1() {
    this.y += this.velocity.y
}
stop (){
 this.velocity.y = 0
}
  draw() {
    

    //Only shows box if the "this.isAttacking  = true. Allows our hitbox to stay hidden."
    if (this.isAttacking) {
        //this.spriteFrame = 0;
      ctx.drawImage(
        this.attackImg,
        this.spriteFrame * 71,
        0,
        71,
        77,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
        ctx.drawImage(
          this.img,
          this.spriteFrame * 92,
          0,
          92,
          67,
          this.x,
          this.y,
          this.width,
          this.height
        );
    }
  }

  attack() {
    //Setting a time so the defualt attacking isn't true all the time so "setTimeout" is setting a time that after attack is invoked we will set it back to false.
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 1000);
  }
  moveUp() {
    
    this.velocity.y = -2
    
  }
  moveDown() {
    this.velocity.y = 2;
  }
}

class Obstacle extends Player {
  constructor(x, y, width, height,  img) {
    super(x, y, width, height, img);
    this.spriteFrame = 0;
  }

  moveLeft() {
    this.x -= 9 + score + 1 ;
  }
  collisionCheck(Obstacle) {
    if (
      this.x < Obstacle.x + Obstacle.width &&
      this.x + this.width > Obstacle.x &&
      this.y < Obstacle.y + Obstacle.height &&
      this.height + this.y > Obstacle.y
    ) {
      console.log("detected");
      // Collision detected!
      return true;
    } else {
      // No collision
      return false;
    }
  }
  draw() {
  
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
