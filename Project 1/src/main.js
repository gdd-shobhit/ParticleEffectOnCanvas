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
        let gameStateChanged = false;

    const GameState = Object.freeze({
        START:   		Symbol("START"),
        MAIN:  			Symbol("MAIN"),
        GAMEOVER: 	Symbol("GAMEOVER")
    });

        let gameState = GameState.START;

		// #1 call the init function after the pages loads
		function init(){	
			canvas = document.getElementById('layer1');
            canvasTop = document.getElementById('layer2');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvasTop.width = canvasWidth;
            canvasTop.height = canvasHeight;
			ctx = canvas.getContext('2d');
            ctxTop = canvasTop.getContext('2d');
            target= new classes.Target();
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
            // #6 - note the attribute selector we are using here
            let radioButtons = document.querySelectorAll("input[type=radio][name=speed]");
            let resetButton = document.getElementById("resetButton");
            for (let r of radioButtons){
                r.onchange = function(e){
                    // #7 - form values are returned as Strings, so we have to convert them to a Number
                        speed = Number(e.target.value);                      
                }
            }
            resetButton.onmousedown = function(e){
                currentCount=0;
                targetCount= 30;
                gameState = GameState.START;
            }
        }

        function drawHUD(){
            ctxTop.save(); 
            
            switch(gameState){
                case GameState.START:
                ctxTop.save();       
                // Draw Text
                ctxTop.fillRect(0,0,1280,720);
                ctxTop.font = "30px sans-serif";
                ctxTop.fillStyle = utils.getRandomColor();
                ctxTop.fillText("Welcome to GameLab",500,canvasTop.height/2-20);
                ctxTop.fillText("Shoot Targets popping up",500 - 20,canvasTop.height/2+30);
                ctxTop.fillStyle = utils.getRandomColor();
                ctxTop.fillText("Click to start the game.... ",500,canvasTop.height/2 + 100);
                targetCount=30;
                currentCount = 0;
                window.onkeypress = function(e){
                    gameState= GameState.MAIN;
                    drawHUD();
                }
                
                break;
        
                case GameState.MAIN:          
                loop();
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
        
function loop(){
 
    let myReq = requestAnimationFrame(loop);
    
    now = Date.now();
    elapsed = now - then;
    spawnTimer = (now - startTime)/1000;

    if(elapsed>fpsInterval){
        then = now - (elapsed%fpsInterval);
        canvasTop.onmousedown = getMouseDown;
        

    //target.collision(mousePos,ctx);
        if(targetCount < 0){
            gameState = GameState.GAMEOVER;
        }

        if(gameState == GameState.GAMEOVER){
            drawHUD();
            
            cancelAnimationFrame(myReq);
        }

    }


    // if target has been for more than the speed of the radio button, destoy
    if(spawnTimer > speed){
        drawTarget(target);
        drawInGameText();
        spawnTimer=0;
        targetCount--;
        startTime= now;
    }
}




function drawInGameText(){

    ctxTop.save();
    ctxTop.clearRect(0,0,1280,720);
    ctxTop.fillStyle= target.color;
    ctxTop.font = "30px sans-serif";
    ctxTop.fillText("Targets Remaining: " + targetCount, 10, 50);
    ctxTop.fillText("Targets Shot: " + currentCount, 1000, 50);
    ctxTop.restore();
}

function drawGameOverText(){

    ctxTop.save();
    ctxTop.clearRect(0,0,1280,720);
    ctxTop.fillStyle= target.color;
    ctxTop.font = "30px sans-serif";
    ctxTop.fillText("Game Over", 500, 300);
    ctxTop.fillText("Press any key to go to the main screen",200,500);
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
		
        function getMouseDown(e){
             mousePos = utils.getMouse(e);
        }

        export {init};