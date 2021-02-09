var bg, bgi;
var boat, boatImage, boatSound, dashSound;
var s1,s2,s3,s4,s5;
var brd1,brd2;
var obs,obsGroup;
var score=0, lifeTime=0;
var highScore=0;
var gameState="play";
var life1,life2,life3, lifes,lifeImg;

function preload()
{
  bgi=loadImage("waterbg.png");
  boatImage=loadImage("s4.png")
  boatSound=loadSound("running boat.wav")
  dashSound=loadSound("dash.wav")
  lifeImg=loadImage("Life.png")
  s1=loadImage("s1.png")
  s2=loadImage("s2.png")
  s3=loadImage("s3.png")
  s4=loadImage("s4.png")
  s5=loadImage("boat.png")
}

function setup()
{
  createCanvas(windowWidth,windowHeight)
  bg=createSprite(width/2,height/2,width,height)
  bg.addImage(bgi);
  bg.scale=3.5
  bg.velocityY=5;
  
  boat=createSprite(width/2,height*3/4+50)
  boat.addImage(boatImage)
  boat.scale=0.6
  boat.debug=true; boat.setCollider("circle",0,-120,40)
  brd1=createSprite(width/6*2,height/2,2,height)
  brd2=createSprite(width/6*4,height/2,2,height)
  brd1.visible=false
  brd2.visible=false
  
  obsGroup= new Group();
  
  life1=createSprite(width/4*3,30,30,30)
  life1.shapeColor="red"
  life1.addImage(lifeImg)
  life1.scale=0.1
  life2=createSprite(width/4*3+40,30,30,30)
  life2.shapeColor="red"
  life2.addImage(lifeImg)
  life2.scale=0.1
  life3=createSprite(width/4*3+80,30,30,30)
  life3.shapeColor="red"
  life3.addImage(lifeImg)
  life3.scale=0.1
}

function draw()
{
  background(25)
  console.log("start")
    if(gameState==="play" )
  {    
    
    boatSound.play();
    
    if(bg.y>height-70) { bg.x=width/2; bg.y=height/2}
    
    score=score + Math.round(getFrameRate()/60)
    if(highScore<score){ highScore=score;}
    bg.velocityY=5+ score/200

    if(keyDown("left") )   
    {  
      boat.velocityX=-4;  
      boat.velocityY=0; 
    }
    if(keyDown("right") )  
    {  
      boat.velocityX=4; 
      boat.velocityY=0; 
    } 
    if(keyWentDown("up") )  
    {  
      boat.velocityY=-1; 
    } 
    if(keyWentDown("down"))  
    {  
      boat.velocityY=1; 
    } 
    boat.bounceOff(brd1); boat.bounceOff(brd2);

       getObs(); 
      

      if(obsGroup.isTouching(boat))
        {       
          console.log("touched")
          lifeTime++;
           dashSound.play(); 
           boatSound.stop();
              for(var i=0; i<obsGroup.length;i++) 
              {
                 obsGroup.get(i).destroy();
                 console.log(i)
              }  
                  if(lifeTime===1){life1.visible=false;} 
                  if(lifeTime===2){life2.visible=false;} 
                  if(lifeTime === 3)
                    {
                    life3.visible=false;  
                    gameState="End"
                    } 
                  console.log("lifeTime"+lifeTime)  
        } 
  }

 
    if(keyDown("r") && gameState==="End")
    {
      obsGroup.destroyEach();
      score=0;
      lifeTime=0
      gameState="play";
      life1.visible=true
      life2.visible=true
      life3.visible=true 
    // bg.velocityY=5;
    }

  drawSprites();
  if (gameState==="End")
  {
    bg.velocityY=0;
    boat.velocityX=0;
    boat.velocityY=0;
    obsGroup.setVelocityYEach(0)
    obsGroup.setLifetimeEach(-1)
    textSize(30)
      stroke("black")
      strokeWeight(5)
    fill("yellow");
    text('Press *** R *** to Restart',width/5*2,height/2)

  }
  strokeWeight(3)
  textSize(20)
  stroke("black")
  fill("green")
   text("Your Score : " + score,width/3,60)
   text("High Score:  " + highScore, width/3,30)
}



function getObs()
{
  if(frameCount % 40===0)
    {
     obsSize=random(15,40)
  obs=createSprite(random(width/6*2,width/6*4),-20,obsSize,obsSize+10)
  obs.debug=true;
  obsGroup.add(obs);
      num=Math.round(random(1,5))
      if(num===1){ obs.addImage(s1);obs.scale=0.3;obs.setCollider("rectangle",0,0,180,300)}
      if(num===2){ obs.addImage(s2);obs.scale=0.5;obs.setCollider("rectangle",0,0,120,350)}
      if(num===3){ obs.addImage(s3);obs.scale=0.8;obs.setCollider("rectangle",-10,0,50,170)}
      if(num===4){ obs.addImage(s5);obs.scale=0.2;obs.setCollider("rectangle",0,0,190,490)}
      if(num===5){ obs.addImage(s5);obs.scale=0.2;obs.setCollider("rectangle",0,0,190,490)}
  obs.velocityY=5+ score/100;
   obs.lifetime=1500;
      obs.depth=boat.depth
      boat.depth++
      //console.log(num)
    }
}
