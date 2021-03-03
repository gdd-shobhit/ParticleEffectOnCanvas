import * as utils from "./utils.js";
import * as classes from "./classes.js";

        let ctx,canvas;
		let gAlpha=1.0;
        const canvasWidth = 1280, canvasHeight = 720;
        let target;
        var mousePos;
        let speed;
        let elapsed=true;
		// #1 call the init function after the pages loads
		function init(){	
			canvas = document.querySelector('canvas');	
            canvas
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
			ctx = canvas.getContext('2d');
            setupUI()
            canvas.addEventListener('mousemove', function(evt) {
                mousePos = utils.getMousePos(canvas, evt);
                //console.log(mousePos);
              }, false);
			ctx.fillStyle = 'black'; 
            ctx.fillRect(0,0,canvasWidth, canvasHeight); 
            target= new classes.Target();
            loop();
		};

        function setupUI(){
            // #6 - note the attribute selector we are using here
            let radioButtons = document.querySelectorAll("input[type=radio][name=speed]");
            for (let r of radioButtons){
                r.onchange = function(e){
                    // #7 - form values are returned as Strings, so we have to convert them to a Number
                        speed = Number(e.target.value)*1000;                  
                        console.log(speed);
                }
            }
        }
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          
        async function randomPoping() {
            drawWalker(target);
            await sleep(speed);
            target.die(ctx);
            await sleep(speed);
        }

        function MakeCrosshair(){
            console.log(utils.getMousePos(canvas,target));
        }

        function loop(){
 
            randomPoping();
            if(elapsed){
                elapsed=true;
                requestAnimationFrame(loop);
            }
        
		}

        function drawWalker(incomingWalker){
            target.move();
			ctx.fillStyle = incomingWalker.color;		
			ctx.fillRect(incomingWalker.x-incomingWalker.width/2,incomingWalker.y-incomingWalker.width/2,incomingWalker.width/2,incomingWalker.width/2);
            
        }
		

        export {init};