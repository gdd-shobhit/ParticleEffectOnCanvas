
// UTILS

function flipWeightedCoin(weight = 0.5){
    return Math.random() < weight;
}
function getRandomColor(){
function getByte(){
return 55 + Math.round(Math.random() * 200);
}
return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
}

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns mouse position in local coordinate system of element
function getMouse(e){
	var mouse = {}; // make an object
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
}


function getDistance(x1,y1,x2,y2){
    return Math.pow((Math.pow((x2-x1),2)+(Math.pow((y2-y1),2)),1/2));
}

export {getRandomColor,getRandomInt,flipWeightedCoin,getMouse,getDistance};