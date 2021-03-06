//for chrome: vo=.2 a = .01
//for safari: vo=.5 a = .05
var vo = 2;
var v1 = 1;
var a = 0.05;
var cloudX = 400;
var cloudY = 100;
var cloudX1 = 100;
var cloudY1 = 500;
var cloudX2 = 500;
var cloudY2 = 500;
var stillPlaying = true;
var pigY = 200;
var shouldDisplayApple = false;
var appleX = 600;
var appleY = 300;
var numApples = 0;
var numCloudsShot = 0;
var shouldDisplayCarrot = false;
var carrotX = 600;
var carrotY = 300;
var numLasers = 0;
var shouldDisplayLaser = false;
var laserX = 100;
var laserY = 500;
var carrotX = 600;
var carrotY = 300;
var haveMadeKeyListener = false;
var theme = new Audio('SuperPig-Music/SuperPig-Theme.m4a');
var fast = new Audio('SuperPig-Music/SuperPig-Fast.m4a');
var die = new Audio('SuperPig-Music/SuperPig-Die.m4a');
var carrotSpawnRate = 400;//use 5000 for chrome, 3000 for safari
var appleSpawnRate = 100;
var keyLog = "";
var hasCheated = false;
//Changes speeds for chrome because chrome is weird and has a different refresh rate
//if(navigator.userAgent.indexOf('Chrome') > 0) {
  //vo = 1.5;
  //a = .01;
  //carrotSpawnRate = 5000;
//}
var instructionScreen = true;

function loadCanvas() {
  var canvas = document.getElementById('canvas');

  if(canvas.getContext('2d')) {
    var startScreen = true;

    //Prints background and game title
    var context = canvas.getContext('2d');

    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    //handle keyboard inputs
    //up: 38 down: 40 space: 32
    var keysDown = {};
    addEventListener("keydown", function (e) {
       var x = e.keyCode;
       keysDown[x] = true;
       if(x == 32 || 67)startScreen = false;
       if(37 <= x && x <= 40 || x == 65 || x == 66 || x == 67) keyLog += x;
       if(keyLog.indexOf("38384040373937396665") >= 0) {
         keyLog = "";
         numLasers = Number.MAX_VALUE;
         hasCheated = true;
       }
     }, false);
     addEventListener("keyup", function (e) {
       delete keysDown[e.keyCode];
      }, false);


    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    context.font = '80px OCR A Std';
    context.textAlign = 'center';
    context.fillText('SuperPig' , 300 , 300);

    context.font = '20px OCR A Std';
    context.fillText('Press space to begin' , 300 , 475);

    context.fillText('Press c for credits' , 300 , 450);

    theme.play();
    theme.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);

    //date object for animation purposes
    var start = (new Date).getTime();
    context.save();
    var intervalID = window.requestAnimationFrame(moveClouds , 50);


    function moveClouds() {
      if(startScreen) {
        var cloud1 = new Image();
        var cloud2 = new Image();
        var cloud3 = new Image();
        cloud1.addEventListener("load", function() {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 230);
          context.fillRect(0 , 500 , 600 , 100);

          if(cloudX > -150) cloudX -= v1;
          else {
            cloudX = 600;

          }
          context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
          if(cloudX1 > -150) cloudX1 -= v1;
          else {
            cloudX1 = 600;

          }
          context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
          if(cloudX2 > -150) cloudX2 -= v1;
          else {
            cloudX2 = 600;

          }
          context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);
          window.requestAnimationFrame(moveClouds , 50);
        }, false);
        cloud1.src = 'cloud1.png';
        cloud2.src = 'cloud2.png';
        cloud3.src = 'cloud3.png';
      }
      else{
        if(keyLog.indexOf('67') >= 0) {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 600);
          context.font = '30 OCR A Std';
          context.textAlign = 'center';
          context.fillStyle = '#FFFFFF';
          context.fillText('Credits' , 300 , 50);
          context.font = '20 OCR A Std';
          context.fillText('Concept: Bryce' , 300 , 150);
          context.fillText('Coding: Sarah and Russell' , 300 , 200);
          context.fillText('Sprites: Jacque and Tyler' , 300 , 250);
          context.fillText('Music: Amari and Russell' , 300 , 300);
          context.fillText('Maracas: Amari' , 300 , 350);
          context.fillText('Want to contribute? Visit' , 300 , 400);
          context.fillText('github.com/russell-stewart/SuperPig-Game' , 300 , 430);
          context.fillText('Press space to begin' , 300 , 550);
          addEventListener("keydown", function (e) {
             var x = e.keyCode;
             keysDown[x] = true;
             if(x==32){
               if(instructionScreen){
                 document.getElementById('canvas').style.display = 'none';
                 instructionScreen = false;
                 document.getElementById('game').style.display = 'inline';
                 game();
             }
           }
           }, false);
        } else {
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        context.fillStyle = '#FFFFFF';
        context.font = '20px OCR A Std';
        context.textAlign = 'left';
        context.fillText("Instructions" , 200 , 50);
        var cloud = new Image();
        var apple = new Image();
        var carrot = new Image();
        var laser = new Image();
        laser.addEventListener("load", function(){
          context.drawImage(cloud, 50, 70, 100, 66);
          context.drawImage(apple, 75, 150, 50, 50 );
          context.drawImage(carrot, 75, 220, 50, 50);
          context.drawImage(laser, 75, 300, 50, 10);
          context.font = '12px OCR A Std';
          context.fillText("Use the up and down arrows to dodge clouds!", 160, 110);
          context.fillText("Eat apples to gain points!", 160, 180);
          context.fillText("Eat carrots to get laser vision!", 160, 250);
          context.fillText("Press the right arrow to fire a laser!", 160, 310);
          context.font = '20px OCR A Std';
          context.fillText('Press space to begin' , 150 , 475);
        }, false);

        addEventListener("keydown", function (e) {
           var x = e.keyCode;
           keysDown[x] = true;
           if(x==32){
             if(instructionScreen){
               document.getElementById('canvas').style.display = 'none';
               instructionScreen = false;
               document.getElementById('game').style.display = 'inline';
               game();
           }
         }


         }, false);
         addEventListener("keyup", function (e) {
           delete keysDown[e.keyCode];
          }, false);


        cloud.src = 'cloud1.png';
        apple.src = 'apple.png';
        carrot.src = 'carrot.png';
        laser.src = 'laser.png'
      }



    }
    }
  }else alert('error');
}




function game() {
  theme.pause();
  fast.play();
  fast.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  var start = (new Date).getTime();
  cloudX = 400;
  cloudY = Math.floor((Math.random() * 600) + 1);
  cloudX1 = 700;
  cloudY1 = Math.floor((Math.random() * 600) + 1);
  cloudX2 = 1000;
  cloudY2 = Math.floor((Math.random() * 600) + 1);
  if(!haveMadeKeyListener) {
    var keysDown = {};
    addEventListener("keydown", function (e) {
      var x = e.keyCode;
      keysDown[x] = true;

      if(x == 38){
        pigY -= 10;
      }
      if(x == 39 && numLasers > 0) shouldDisplayLaser = true;
      if(x == 40){
        pigY += 10;
      }

    }, false);
    addEventListener("keyup", function (e) {
      delete keysDown[e.keyCode];
      }, false);
      haveMadeKeyListener = true;
  }

  var game = document.getElementById('game');
  if(game.getContext('2d')) {
    var context = game.getContext('2d');
    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.save();
    var intervalID = window.requestAnimationFrame(movePig);
    function movePig() {
      if(pigY <= cloudY + 50 && pigY >= cloudY - 50 && cloudX <= 110 && cloudX >= 0) stillPlaying = false;
      if(pigY <= cloudY1 + 50 && pigY >= cloudY1 - 50 && cloudX1 <= 110 && cloudX1 >= 0) stillPlaying = false;
      if(pigY <= cloudY2 + 50 && pigY >= cloudY2 - 50 && cloudX2 <= 110 && cloudX2 >= 0) stillPlaying = false;
      if(shouldDisplayApple && pigY <= appleY + 25 && pigY >= appleY - 25 && appleX <= 110 && appleX >= 10) {
        numApples++;
        shouldDisplayApple = false;
        appleX += 600;
        appleY = Math.floor(Math.random() * 500 + 1);
      }
      if(shouldDisplayCarrot && pigY <= carrotY + 25 && pigY >= carrotY - 25 && carrotX <= 110 && carrotX >= 10) {
        numLasers += 3;
        laserX = 100;
        shouldDisplayCarrot = false;
        carrotX += 600;
        carrotY = Math.floor(Math.random() * 500 + 1);
      }
      if(!shouldDisplayApple) {
        var r1 = Math.floor(Math.random()*appleSpawnRate);
        var r2 = Math.floor(Math.random()*appleSpawnRate);
        if(r1 == r2) shouldDisplayApple = true;
      }
      if(!shouldDisplayCarrot) {
        var r1 = Math.floor(Math.random()*carrotSpawnRate);
        var r2 = Math.floor(Math.random()*carrotSpawnRate);
        if(r1 == r2) shouldDisplayCarrot = true;
      }
      if(shouldDisplayLaser && laserX >= cloudX && laserX <= cloudX + 150 && laserY >= cloudY && laserY <= cloudY + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX += 800;
        cloudY = Math.floor((Math.random() * 500) + 1);
      }
      if(shouldDisplayLaser && laserX >= cloudX1 && laserX <= cloudX1 + 150 && laserY >= cloudY1 && laserY <= cloudY1 + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX1 += 800;
        cloudY1 = Math.floor((Math.random() * 500) + 1);
      }
      if(shouldDisplayLaser && laserX >= cloudX2 && laserX <= cloudX2 + 150 && laserY >= cloudY2 && laserY <= cloudY2 + 100) {
        numLasers--;
        numCloudsShot ++;
        shouldDisplayLaser = false;
        laserX = 100;
        cloudX2 += 800;
        cloudY2 = Math.floor((Math.random() * 500) + 1);
      }
      if(laserX > 600) {
        numLasers--;
        shouldDisplayLaser = false;
        laserX = 100;
      }

      var pig = new Image();
      var cloud1 = new Image();
      var cloud2 = new Image();
      var cloud3 = new Image();
      if(shouldDisplayApple) var apple = new Image();
      if(shouldDisplayCarrot) var carrot = new Image();
      var laser = new Image();
      laser.addEventListener('load' , function(){
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        var now = (new Date).getTime();
        if(shouldDisplayLaser) {
          if(laserX == 100) laserY = pigY + 20;
          laserX += 10*vo;
        }
        if(shouldDisplayLaser) context.drawImage(laser , laserX , laserY , 50 , 10);

        if(pigY < 0) pigY = 0;
        if(pigY > 520) pigY = 520;
        context.drawImage(pig , 10 , pigY);

        if(cloudX > -150) cloudX -= vo + a*(now - start)/1000;
        else {
          cloudX = 600;
          cloudY = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
        if(cloudX1 > -150) cloudX1 -= vo + a*(now - start)/1000;
        else {
          cloudX1 = 600;
          cloudY1 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
        if(cloudX2 > -150) cloudX2 -= vo + a*(now - start)/1000;
        else {
          cloudX2 = 600;
          cloudY2 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);


        if(shouldDisplayApple) {
          if(appleX > -50) appleX -= vo + a*(now - start) / 1000;
          else {
            appleX = 600;
            appleY = Math.floor(Math.random() * 500 + 1);
            shouldDisplayApple = false;
          }
        }
        if(shouldDisplayApple) context.drawImage(apple , appleX , appleY , 50 , 50);

        if(shouldDisplayCarrot) {
          if(carrotX > -50) carrotX -= vo + a*(now - start) / 1000;
          else {
            carrotX = 600;
            carrotY = Math.floor(Math.random() * 500 + 1);
            shouldDisplayCarrot = false;
          }
        }
        if(shouldDisplayCarrot) context.drawImage(carrot , carrotX , carrotY , 50 , 50);


        context.fillStyle = '#000000';
        context.font = '20px OCR A Std';
        context.fillText('Score: ' + (Math.floor((now - start)/1000) + numApples*20 + numCloudsShot*10) , 10 , 50);
        if(numLasers > 0) {
          context.fillStyle = 'rgb(255 , 0 , 0)';
          if(!hasCheated){
            context.fillText('Lasers: ' + numLasers , 10 , 70);
          }
          else context.fillText('Lasers: all of them', 10, 70);
        }

      if(stillPlaying) window.requestAnimationFrame(movePig);
      else {
        instructionScreen = true;
        fast.pause();
        fast.currentTime = 0;
        die.play();
        context.fillStyle = '#000000';
        context.font = '80px OCR A Std';
        context.textAlign = 'left';
        context.fillText('Game over!' , 30 , 300);
        context.font = '20px OCR A Std';
        context.fillText('Press space to try again' , 125 , 450);

        addEventListener('keydown' , function(e1){

          var key = e1.keyCode;
          if(key == 32 && !stillPlaying){
            stillPlaying = true;
            die.pause();
            die.currentTime = 0;
            numApples = 0;
            numLasers = 0;
            numCloudsShot = 0;
            shouldDisplayLaser = false;
            laserX = 100;
            shouldDisplayApple = false;
            shouldDisplayCarrot = false;
            appleX = 600;
            carrotX = 600;

            game;
          }
        } , false);
      }
      } , false);
      pig.src = 'superpig.png';
      cloud1.src = 'cloud1.png';
      cloud2.src = 'cloud2.png';
      cloud3.src = 'cloud3.png';
      if(shouldDisplayApple) apple.src = 'apple.png';
      if(shouldDisplayCarrot) carrot.src = 'carrot.png';
      laser.src = 'laser.png';
    }
  } else alert('error!');
}

function doNothing(){}
