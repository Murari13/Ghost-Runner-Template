var play=1;
var end=0;
var gamestates=play;


function preload(){
  GhostImage=loadImage("ghost-standing.png");
  DoorImage=loadImage("door.png");
  ClimberImage=loadImage("climber.png");
  TowerImage=loadImage("tower.png");
  SpookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  Tower=createSprite(300,300);
  Tower.addImage("tower",TowerImage);
  Tower.velocityY=1;
  
  Ghost=createSprite(300,300);
  Ghost.addImage("ghost",GhostImage);
  Ghost.scale=0.5;
  
  DoorGroup=new Group();
  ClimberGroup=new Group();
  invisibleBarGroup=new Group();
}

function draw(){
  background("black");
  
  
  
  if(gamestates==play){
     if(Tower.y>600){
    Tower.y=300;
  }
  
   if(keyDown("right_arrow")){
     Ghost.x=Ghost.x+3;
   }
  
    if(keyDown("left_arrow")){
       Ghost.x=Ghost.x-3;
    }
  
    if(keyDown("space")){
       Ghost.velocityY=-10;
    }
    Ghost.velocityY=Ghost.velocityY+0.5

    if(Ghost.isTouching(ClimberGroup)){
       Ghost.velocityY=0;
    }
     createdoor(); 
  }
  
  if(Ghost.isTouching(invisibleBarGroup)||Ghost.y>600){
    gamestates=end;
    Ghost.destroy();
  }
  
  if(gamestates==end){
    textSize(30);
    text("Game Over",200,250);
    //SpookySound.play();
  }
  
  drawSprites();
}

function createdoor(){
  if(frameCount%200===0){
    Door=createSprite(300,0);
    Door.addImage("door",DoorImage);
    Door.velocityY=1;
    Door.lifetime=600;
    Door.x=Math.round(random(100,500));
    Ghost.depth=Door.depth+1
    DoorGroup.add(Door);
    
    Climber=createSprite(Door.x,60);
    Climber.addImage("climber",ClimberImage);
    Climber.velocityY=1;
    Climber.lifetime=600;
    ClimberGroup.add(Climber);
    
    invisibleBar=createSprite(Door.x,70,Climber.width,2);
    invisibleBar.velocityY=1;
    invisibleBar.lifetime=600;
    invisibleBar.visible=false;
    invisibleBarGroup.add(invisibleBar);
  }
}