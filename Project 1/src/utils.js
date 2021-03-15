
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
	let diffX = x2-x1;
	let diffy = y2-y1;
	console.log(diffX);
    return Math.sqrt(diffX*diffX + diffy*diffy);
}

export {getRandomColor,getRandomInt,flipWeightedCoin,getMouse,getDistance};