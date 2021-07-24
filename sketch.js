var PLAY = 1;
var END = 0;
var gameState = 1;

var jungle, jungleImage;
var ground;
var monkey, monkey_running ;
var banana , bananaImage, bananaGroup;
var obs ,obsImage, stoneGroup;
//var life= 5;
var monkey_stop;
var SCORE = 0;


function preload(){
  
  jungleImage = loadImage("jungle(2).jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obsImage = loadImage("stone.png");
  monkey_stop = loadAnimation("Monkey_01.png");
  
}

function setup(){
  createCanvas(displayWidth,displayHeight-100);
  
  jungle = createSprite(700,90,10,10);
  jungle.addImage("jungle" ,jungleImage);
  jungle.scale = 1.6;
  jungle.velocityX = -2;
  
  ground = createSprite(70,430,2400,10);
  
  monkey = createSprite(60,370,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.1;
  
  
  ground.visible = false;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
}

function draw(){
  background("white");
    
  camera.position.y = monkey.y
  //camera.position.y = SCORE.y

  if (gameState === PLAY){
 

    if (jungle.x < displayWidth/3){
      jungle.x = displayWidth*2/3;
   }

  if (keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -8;
  }
    
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(ground);
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      SCORE = SCORE +2;
    }

    
    fruits();
    stone();
    
     if (stoneGroup.isTouching(monkey)){
       gameState = END;
        stoneGroup.destroyEach();
    }
    
  }
  
  if (gameState === END){
    monkey.velocityY = 0;
     monkey.velocityX = 0;
     stoneGroup.setVelocityEach(0);
      bananaGroup.setVelocityEach(0);
     jungle.velocityX = 0;
      monkey.changeAnimation("stop",monkey_stop);
     end();
     
  }
  drawSprites();
  stroke("purple");
  textSize(40);
  fill("white");
 // text("SCORE: "+ SCORE,1000,130);
 text("SCORE: "+ SCORE,displayWidth-500,camera.position.y-250);

  
  function end(){
    console.log("game has ended");
  }
    
}
  
function fruits(){
  if (frameCount % 250 === 0){
  banana = createSprite(1000,40,5,5);
  banana.addImage("banana",bananaImage);
  banana.y = Math.round(random(300,1));
  banana.scale = 0.1;
  banana.velocityX = -6;
  banana.lifetime = 600;
 
  bananaGroup.add(banana);
  
 }
  
}

function stone(){
  if (frameCount % 300 === 0){
  obs = createSprite(380,400,10,10);
  obs.addImage("obstacle",obsImage);
  obs.x = Math.round(random(400,2300));
  obs.scale = 0.1;
  obs.velocityX = -6;
  obs.lifetime = 600;
  
  stoneGroup.add(obs);
    
  } 
  
}