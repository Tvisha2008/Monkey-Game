 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

 var monkey,monkey_running;
 var ground;
 var banana,bananaImage;
 var obstacle,obstacleImage;
 var bananaGroup,obstacleGroup;
 var score;
 var survivalTime=0;

function preload(){
  
 monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,390,900,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  survivalTime=0;
  stroke="white";
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke=("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
 background("white");
 console.log(monkey.y);
  
if (gameState===PLAY){  
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
 }
} 
  drawSprites(); 
}


if (gameState === END) {

    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }
  
function spawnBananas(){
  if (frameCount % 80 === 0){
    
    var banana = createSprite(400,180, 20, 20 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-2;           
    banana.lifetime = 200;
    bananaGroup.add(banana);
    
  }
  
} 

function spawnObstacles(){
  if (frameCount % 300 === 0){
    
    var obstacle = createSprite(400,360,20,20);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
  }
  
}
    
