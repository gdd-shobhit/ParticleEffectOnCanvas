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
}

export {Target};