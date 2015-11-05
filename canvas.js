function loadCanvas() {
  var canvas = document.getElementById('canvas');

  if(canvas.getContext('2d')) {
    var startScreen = true;

    //handle keyboard inputs
    //up: 38 down: 40 space: 32
    var keysDown = {};
    addEventListener("keydown", function (e) {
       var x = e.keyCode;
       keysDown[x] = true;
       if(x == 32) startScreen = false;
     }, false);
     addEventListener("keyup", function (e) {
       delete keysDown[e.keyCode];
      }, false);

    //Prints background and game title
    var context = canvas.getContext('2d');

    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.fillStyle = '#FFFFFF';
    context.font = '80px OCR A Std';
    context.textAlign = 'left';
    context.fillText('SuperPig' , 65 , 300);

    context.font = '20px OCR A Std';
    context.fillText('Press space to begin' , 150 , 475);

    //date object for animation purposes
    var start = new Date();
    context.save();
    var intervalID = window.requestAnimationFrame(moveClouds() , 50);

    function moveClouds() {
      if(startScreen) {
        var cloud1 = new Image();
        var cloud2 = new Image();
        var cloud3 = new Image();
        cloud1.addEventListener("load", function() {
          context.fillStyle = lingrad;
          context.fillRect(0 , 0 , 600 , 230);
          context.fillRect(0 , 500 , 600 , 100);

          context.translate(0.01*start.getSeconds() , 0);
          context.drawImage(cloud1 , 100 , 100, 150, 100);
          context.drawImage(cloud2 , 300 , 500, 150, 100);
          context.drawImage(cloud3 , 0 , 500, 150, 100);
          context.restore();
          window.requestAnimationFrame(moveClouds() , 50);
        }, false);
        cloud1.src = 'cloud1.png';
        cloud2.src = 'cloud2.png';
        cloud3.src = 'cloud3.png';
      } else {
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        game();
      }

    }
  }else alert('error');
}

var stillPlaying = true;
var pigY = 200;
var cloudX = 400;
var cloudY = Math.floor((Math.random() * 600) + 1);
var cloudX1 = 600;
var cloudY1 = Math.floor((Math.random() * 600) + 1);
var cloudX2 = 800;
var cloudY2 = Math.floor((Math.random() * 600) + 1);
var start = (new Date).getTime();
//for chrome: vo=.2 a = .01
//for safari: vo=.5 a = .05
var vo = 0.5;
var a = 0.05;
var shouldDisplayApple = false;
var appleX = 600;
var appleY = 300;
var numApples = 0;

function game() {

  var keysDown = {};
  addEventListener("keydown", function (e) {
     var x = e.keyCode;
     keysDown[x] = true;

     if(x == 38){
       pigY -= 10;
     }
     if(x == 40){
       pigY += 10;
     }

   }, false);
   addEventListener("keyup", function (e) {
     delete keysDown[e.keyCode];
    }, false);

  var game = document.getElementById('game');
  if(game.getContext('2d')) {
    var context = game.getContext('2d');
    var lingrad = context.createLinearGradient(0,0,0,600);
    lingrad.addColorStop(0, '#417AFC');
    lingrad.addColorStop(1, '#CCF8FF');
    context.fillStyle = lingrad;
    context.fillRect(0 , 0 , 600 , 600);

    context.save();
    var intervalID = window.requestAnimationFrame(movePig());
    function movePig() {
      if(pigY <= cloudY + 50 && pigY >= cloudY - 50 && cloudX <= 110 && cloudX >= 10) stillPlaying = false;
      if(pigY <= cloudY1 + 50 && pigY >= cloudY1 - 50 && cloudX1 <= 110 && cloudX1 >= 10) stillPlaying = false;
      if(pigY <= cloudY2 + 50 && pigY >= cloudY2 - 50 && cloudX2 <= 110 && cloudX2 >= 10) stillPlaying = false;
      if(shouldDisplayApple && pigY <= appleY + 25 && pigY >= appleY - 25 && appleX <= 110 && appleX >= 10) {
        numApples++;
        shouldDisplayApple = false;
        appleX = 600;
        appleY = Math.floor(Math.random() * 500 + 1);
      }
      if(!shouldDisplayApple) {
        var r1 = Math.floor(Math.random()*500);
        var r2 = Math.floor(Math.random()*500);
        if(r1 == r2) shouldDisplayApple = true;
      }
      var pig = new Image();
      var cloud1 = new Image();
      var cloud2 = new Image();
      var cloud3 = new Image();
      if(shouldDisplayApple) var apple = new Image();
      cloud3.addEventListener('load' , function(){
        context.fillStyle = lingrad;
        context.fillRect(0 , 0 , 600 , 600);
        if(pigY < 0) pigY = 0;
        if(pigY > 520) pigY = 520;
        context.drawImage(pig , 10 , pigY);
        var now = (new Date).getTime();
        if(cloudX > 0) cloudX -= vo + a*(now - start)/1000;
        else {
          cloudX = 600;
          cloudY = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud1 , cloudX , cloudY , 150 , 100);
        if(cloudX1 > 0) cloudX1 -= vo + a*(now - start)/1000;
        else {
          cloudX1 = 600;
          cloudY1 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud2 , cloudX1 , cloudY1 , 150 , 100);
        if(cloudX2 > 0) cloudX2 -= vo + a*(now - start)/1000;
        else {
          cloudX2 = 600;
          cloudY2 = Math.floor((Math.random() * 500) + 1);
        }
        context.drawImage(cloud3 , cloudX2 , cloudY2 , 150 , 100);


        if(shouldDisplayApple) {
          if(appleX > 0) appleX -= vo + a*(now - start) / 1000;
          else {
            appleX = 600;
            appleY = Math.floor(Math.random() * 500 + 1);
            shouldDisplayApple = false;
          }
        }
        if(shouldDisplayApple) context.drawImage(apple , appleX , appleY , 50 , 50);
        context.fillStyle = '#000000';
        context.font = '20px OCR A Std';

        context.fillText('Score: ' + (Math.floor((now - start)/1000) + numApples*20) , 10 , 50);

      if(stillPlaying) window.requestAnimationFrame(movePig());
      else {
        context.fillStyle = '#000000';
        context.font = '80px OCR A Std';
        context.textAlign = 'left';
        context.fillText('Game over!' , 30 , 300);
        context.font = '20px OCR A Std';
        context.fillText('Press space to try again' , 125 , 450);
        addEventListener('keydown' , function(e1){
          var key = e1.keyCode;
          if(key == 32) location.reload(true);
        } , false);
      }
      } , false);
      pig.src = 'superpig.png';
      cloud1.src = 'cloud1.png';
      cloud2.src = 'Cloud2.png';
      cloud3.src = 'cloud3.png';
      if(shouldDisplayApple) apple.src = 'apple.png';
    }
  } else alert('error!');
}

function doNothing(){}
