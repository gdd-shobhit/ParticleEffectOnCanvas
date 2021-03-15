import * as utils from "./utils.js";
import * as classes from "./classes.js";

        let ctx,ctxTop,canvas,canvasTop;
        const canvasWidth = 1280, canvasHeight = 720;
        let target;
        let mousePos ={};
        let speed=1;
        let targetCount = 30;
        let currentCount = 0;
        let fps,fpsInterval, startTime, now, then ,elapsed;
        let spawnTimer=0;
        let img;
        let gunSoundList;
        let gunSound = "Sheriff";
    const GameState = Object.freeze({
        START:   		Symbol("START"),
        MAIN:  			Symbol("MAIN"),
        GAMEOVER: 	Symbol("GAMEOVER")
    });

        let gameState = GameState.START;

		// #1 call the init function after the pages loads
		function init(){	
			canvas = document.querySelector('canvas[id=layer1]');
            // layer2 for mostly text
            canvasTop = document.querySelector('canvas[id=layer2]');

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvasTop.width = canvasWidth;
            canvasTop.height = canvasHeight;
            // for Main menu
            img = document.querySelector("img");
			ctx = canvas.getContext('2d');
            ctxTop = canvasTop.getContext('2d');
            // only 1 target, if its killed, it just moves to a new place
            target= new classes.Target();

            // tried to incorporate fps
            fps=60;
            fpsInterval= 1000/fps;
            then = Date.now();
            startTime = then;
            
            setupUI();

			ctx.fillStyle = 'black'; 
            ctx.fillRect(0,0,canvasWidth, canvasHeight); 

            drawHUD();                        
        };
        
        function setupUI(){
            // All the UI functionality is here
            let radioButtons = document.querySelectorAll("input[type=radio][name=speed]");
            let fpsRadioButtons = document.querySelectorAll("input[type=radio][name=fps]");
            let resetButton = document.querySelector("button");
            gunSoundList = document.querySelector("select");

            for (let r of radioButtons){
                r.onchange = function(e){
                        speed = Number(e.target.value);                      
                }
            }

            // setting fps if radio button changed
            for(let fps of fpsRadioButtons){
                fps.onchange = function(e){
                    fps= Number(e.target.value);
                    fpsInterval= 1000/fps;
                }
            }

            gunSoundList.onchange = function(e){
                gunSound = e.target.value;
            }

            // reset button for resetting the game
            resetButton.onclick = function(e){
                currentCount=0;
                targetCount= 30;
                gameState = GameState.START;
                drawHUD();
            }
        }

        // Basically responsible for gameState and what to draw depending on it
        function drawHUD(){
            ctxTop.save(); 
            
            switch(gameState){
                case GameState.START:
                ctxTop.save();       
                drawMainMenuText();
                targetCount=30;
                currentCount = 0;
                window.onkeypress = function(e){
                    
                    gameState= GameState.MAIN;
                    // calling the HUD again so that gameState changes get applied and it checks it
                    drawHUD();
                }
                
                break;
        
                case GameState.MAIN:          
                gameLoop();
                break;
                
                
                case GameState.GAMEOVER:
                ctx.fillRect(0,0,1280,720);
      
                drawGameOverText(ctxTop);
                window.onkeypress = function(e){
                    gameState= GameState.START;
                    drawHUD();    
                }
                break;
                
                default:
                throw new Error("error in HUD");
            
            }
            
            ctxTop.restore();
            
        }        
        
function gameLoop(){
 
    let myReq = requestAnimationFrame(gameLoop);
    
    now = Date.now();
    elapsed = now - then;
    // number of seconds to spawn
    spawnTimer = (now - startTime)/1000;

    // FPS incorporation
    if(elapsed>fpsInterval){
        then = now - (elapsed%fpsInterval);

        canvasTop.onmousedown = getMouseDown;
        
        if(utils.getDistance(mousePos.x,mousePos.y,target.x,target.y) <= target.width/2){
            drawTarget(target);
            drawInGameText();
            currentCount++;
            targetCount--;
            startTime=now;
            spawnTimer=0;
        }

        if(targetCount < 0){
            gameState = GameState.GAMEOVER;
        }

        if(spawnTimer > speed){
            drawTarget(target);
            drawInGameText();
            spawnTimer=0;
            targetCount--;
            // setting it to now so that spawn timer can be 0 because its now-startTime
            startTime= now;
        }

        if(gameState == GameState.GAMEOVER){
            drawHUD();
            
            // ending the loop
            cancelAnimationFrame(myReq);
        }


    }
}




// Helper Functions
function drawMainMenuText(){

ctxTop.fillRect(0,0,1280,720);
ctxTop.font = "30px sans-serif";
ctxTop.fillStyle = utils.getRandomColor();
ctxTop.drawImage(img,500,canvasHeight/2 -60);
ctxTop.fillStyle = "lightblue";
ctxTop.fillText("Instructions: Shoot Targets",480,680);
ctxTop.fillStyle = utils.getRandomColor();
ctxTop.fillText("Press any key to start the game.... ",440,canvasTop.height/2 + 100);
}

function drawInGameText(){

    ctxTop.save();
    ctxTop.clearRect(0,0,1280,720);
    ctxTop.fillStyle= "lightblue";
    ctxTop.font = "30px sans-serif";
    ctxTop.fillText("Targets Remaining: " + targetCount, 10, 50);
    ctxTop.fillText("Targets Shot: " + currentCount, 1000, 50);
    ctxTop.restore();
}

function drawGameOverText(){

    ctxTop.save();
    ctxTop.clearRect(0,0,1280,720);
    ctxTop.fillStyle= "lightblue";
    ctxTop.font = "30px sans-serif";
    ctxTop.fillText("Your score was: "+ currentCount, 500, 300);
    let accuracy = (currentCount/30)*100;
    ctxTop.fillText("Your accuracy was: " + accuracy +"%", 470, 400);
    ctxTop.fillText("Press any key to practice again",450,500);
    ctxTop.restore();
}

        function drawTarget(incomingTarget){
            ctx.save();
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,1280,720);
            target.move();     
			ctx.fillStyle = incomingTarget.color;		
			ctx.fillRect(incomingTarget.x-incomingTarget.width/2,incomingTarget.y-incomingTarget.width/2,incomingTarget.width/2,incomingTarget.width/2);         
            ctx.restore();
        }
	
        // get mouse coodinated when clicked and play sound
        function getMouseDown(e){
             mousePos = utils.getMouse(e);
             let localSound = new sound("./sound/"+gunSound+".wav");
             localSound.play();
        }

        // function to get sound or to create sound
        function sound(src) {
            this.sound = new Audio(src);
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function(){
              this.sound.play();
            }
            this.stop = function(){
              this.sound.pause();
              this.sound.currentTime = 0;
            }
          }

export {init};