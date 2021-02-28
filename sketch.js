var PLAY = 1;
var END = 0;

var gameState = PLAY;

var sword, alien, gameOver, swoosh, gOverMusic, fruit;
var swordImg, orangeImg, appleImg, pearImg, bananaImg, alienImg, gameOverImg;
var fruitGroup, alienGroup;
var score, fruitName, highScore;

function preload() {
  swordImg = loadImage("sword.png");
  orangeImg = loadImage("fruit1.png");
  appleImg = loadImage("fruit2.png");
  pearImg = loadImage("fruit3.png");
  bananaImg = loadImage("fruit4.png");
  alienImg = loadAnimation("alien1.png","alien2.png");
  
  gameOverImg = loadImage("gameover.png");
  swoosh = loadSound("knifeSwooshSound.mp3");
  gOverMusic = loadSound("gameover.wav");
}

function setup() {
  createCanvas(500, 500);

  sword = createSprite(250, 250, 20, 50);
  sword.addImage(swordImg);
  sword.scale = 0.6;
  sword.setCollider("rectangle", 0, 0, 30, 50);

  gameOver = createSprite(250, 230, 20, 50);     
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  //creating groups
  fruitGroup = createGroup();
  alienGroup = createGroup();

  score = 0;
}

function draw() {
  background(100, 200, 100);
  if (gameState === PLAY) {
    
    sword.position.y = mouseY;
    sword.position.x = mouseX;
    
    //generate fruits and aliens
    var fruitName1 =fruitFunction();
    alienFunction();

    if (sword.isTouching(fruitGroup)) {
      fruitGroup.collide(sword, destroyFunction);
      swoosh.play();
      if (fruitName1 === "orange" ) {
      score = score + 4;
      } else if (fruitName1 === "banana"){
        score = score + 3;
      } else if (fruitName1 === "pear") {
        score = score + 2;
      } else {
        score = score + 1;
      }
    }
    
    if (sword.isTouching(alienGroup)) {
      gameState = END;
      gOverMusic.play();
      
     // highScore = score;
    }
  }
  drawSprites();
  
   fill("red");
   textSize(20);
  
  if (gameState === END) {
      sword.x = 240;
      sword.y = 240;
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      gameOver.visible = true;
    
      text("Press 'Space Bar' if you want to play again", 60, 400)
    if (score >100) {
     text("You have played Very Well!!" , 130, 330);
     }
    if(keyDown("space")) {
       gameState = PLAY;
       gameOver.visible = false;
       score = 0;
      }
  }

   text("Score:" + score, 400, 30);
   
  
}

function fruitFunction() {
  if (frameCount % 15 === 0) {
    fruit = createSprite(400, random(30, 440), 20, 20);
    var selectFruit = Math.round(random(1, 4));
 
    switch (selectFruit) {
      case 1:
        fruit.addImage(orangeImg);
        fruitName = "orange";
        break;
      case 2:
        fruit.addImage(appleImg);
        fruitName = "apple";
        break;
      case 3:
        fruit.addImage(pearImg);
        fruitName = "pear";
        break;
      case 4:
        fruit.addImage(bananaImg);
        fruitName = "banana";
        break;
      default:
        break;
    }
  
  fruit.scale = 0.2;
  position = Math.round(random(1,2));
  if (position === 1){
    fruit.x = -20;
    fruit.velocityX = (10+(score/5));
  } else {
    fruit.x = 520;
    fruit.velocityX = -(10+(score/5));
  }
  fruit.velocityY = random(-3,3);
  fruit.lifetime = 80;
  fruitGroup.add(fruit);
  }
  return fruitName;
}
  
function alienFunction() {
   if (frameCount % 60 === 0) {
    alien = createSprite(510, random(30, 470), 20, 20);
    alien.addAnimation("moving", alienImg);
    alien.scale = 1.2;
    //alien.velocityX = -(10+(score/10));
    alien.velocityY = random(-2, 2); 
    alien.lifetime = 60;
    alienGroup.add(alien);
    position1 = Math.round(random(1,2));
    if (position1 === 1){
      alien.x = -20;
      alien.velocityX = (10+(score/10));
    } else {
      alien.x = 520;
      alien.velocityX = -(10+(score/10));
    }
   }
  }

function destroyFunction(fruit, sword) {
    fruit.destroy();
  }