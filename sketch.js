var level1bg;
var bullet,bulletImg;
var player1,player1Img;
var player2Img1,player2Img2,player2Img3;
var ground;
var plane,planeImg;
var shriken,shrikenGroup,shrikenImg;
var gameoverImg;
var level2bgm;
var edges;
var life = 20;
var superNinja,superNinjaImg;
var superPower=50;
var bulletGroup;
var gameState = "level1";
var sTime = 500;
function preload (){ 
  /* this is for level1 */
    player1Img = loadImage("images/player1.png");
    level1bg = loadImage("images/level1background.png");
    planeImg = loadImage("images/plane.png");
    bulletImg = loadImage("images/bullet.png");
    gameoverImg = loadImage("images/gameover.jpg");
 
    /* this is for level 2 */
   player2Img1 = loadAnimation("images/ninja2.png","images/ninja6.png"); 
   superNinjaImg= loadAnimation("images/ninja7.png","images/ninja14.png");
   shrikenImg=loadImage("images/shuriken.png");
   level2bgm = loadImage("images/background3.jpg") 

}
function setup() {
  createCanvas(windowWidth,windowHeight);
/* this is for level 1*/  
  plane=createSprite(width/2,80);
  plane.addImage(planeImg);
  plane.scale=0.3;
  plane.rotation=180;
  
  edges= createEdgeSprites();

  player1=createSprite(width/2,height-150);
  player1.addImage(player1Img);
  player1.scale=0.5;
  player1.debug=true;
  player1.setCollider("rectangle",0,0,220,670)
  
  bulletGroup = new Group();
  
  /* this is for level 2*/
  player2=createSprite(width/2-500,height-250);
  player2.addAnimation("ninja",player2Img1);
  player2.visible=false;   
  
  player2.addAnimation("power",superNinjaImg);

  ground=createSprite(width/2,height-150,width,10);
  ground.visible=false;
  shrikenGroup = new Group(); 
}

function draw() {
  superPower=superPower-1;
 if(gameState==="level1"){
    background(60,100,220);
    background(level1bg);
     textSize(40);
     text("❤:"+life,width-100,200);
     sTime = sTime - 1;
     if(sTime<0 && life>0){
       gameState='level2'
     } 
     if(frameCount%10===0){
    var planeX =Math.round(random(1,3)); 
   // text(mouseX+","+mouseY,mouseX,mouseY); 
     if(planeX===1){
       plane.x=width/2-450;
     } else if(planeX===2){
       plane.x=width/2;
     } else {
       plane.x=width/2+450;
     }
       
      
    }
    if(life===0){
      gameState="END";
    }
      if (keyDown(RIGHT_ARROW)&&player1.x<width-400){
      player1.x=player1.x+500;
      } 
      if(keyDown(LEFT_ARROW)&&player1.x>400){
      player1.x=player1.x-500;
     }
     var bullets = Math.round(random(1,15));
     if (bullets===1){
       spawnBullets();
     }
     
     for (var i=0; i<bulletGroup.length; i++){
      if(bulletGroup.get(i).isTouching(player1))
     { bulletGroup.get(i).destroy(); life = life - 1; } }
     drawSprites();
    
  }else if(gameState==="END"){
   background(gameoverImg);
  } else  if(gameState==="level2"){
    background(level2bgm)
    player1.destroy();
    plane.destroy();
    bulletGroup.visible=false;
   
    var heart=30;

    for (var i=0; i<shrikenGroup.length; i++){
      if(shrikenGroup.get(i).isTouching(player2))
     { shrikenGroup.get(i).destroy(); heart = heart - 1; } }
    
       
      
      
        player2.visible=true;
        player2.scale=0.5;
        player2.velocityY = player2.velocityY+0.8
        player2.collide(ground);
        if(keyDown("UP_ARROW")){
          player2.velocityY=-15;
        }
        if(frameCount%80===0){
        
        
          spawnShriken();
   
        }
        if(superPower<0){
          if(keyDown ("DOWN_ARROW")){
            player2.changeAnimation("power",superNinjaImg);
            heart=heart+20;
            player2.scale=5
            superPower=superPower+100;
          }
        }
      

        

           drawSprites();
      }


}
function spawnBullets(){
 bullet = createSprite(plane.x,plane.y+50);
 bullet.addImage(bulletImg);
 bullet.rotation=180;
 bullet.scale=0.5;
 bullet.debug=true;
 bullet.lifetime=width+100/10;
 bullet.velocityY=10;
  bulletGroup.add(bullet);
  
}

function spawnShriken(){
  shriken = createSprite(width+100,height-250);
  shriken.addImage(shrikenImg);
  shriken.rotation=180;
  shriken.scale=0.2;
  shriken.lifetime=height/10;
  shriken.velocityX=-10;
  shrikenGroup.add(shriken);
   
 }
