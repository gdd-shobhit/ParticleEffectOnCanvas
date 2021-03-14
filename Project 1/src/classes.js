import * as utils from "./utils.js";

class Target{
    constructor(x=1280/2,y=720/2,width = 25,color = utils.getRandomColor()){
        this.x = x;
        this.y = y;
        this.width = width;
        this.color = color;
    }

    die(ctx){

        ctx.fillStyle= "black";
        ctx.fillRect(0,0,1280, 720); 
        ctx.fillStyle = this.color;
      
    }
    move(){
        let x = utils.getRandomInt(20,1260);
        let y = utils.getRandomInt(20,700);

        this.x = x;
        this.y = y;
    }

    collision(mousePos,ctx){
        if(utils.getDistance(this.x,mousePos.x,this.y,mousePos.y) < 5){
            this.die(ctx);
            console.log("hit");
        }
    }
}

class CrossHair{
    constructor(x=0,y=0,centerOffset=2,lineWidth=2,color='red'){
        this.x=x;
        this.y=y;
        this.centerOffset=centerOffset;
        this.lineWidth=lineWidth;
        this.color=color;
    }

    move(mousePosX,mousePosY){        
        this.x=mousePosX;
        this.y=mousePosY;
    }
}

export {Target,CrossHair};