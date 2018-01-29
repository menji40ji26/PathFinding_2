"use strict"

var rows, cols;

function setup() {

    createCanvas(1000,1000);
    rows = 9;
    cols = 9;
    
    drawMap();
}

function draw(){


}

function drawMap(){

    background(0);
    fill(50);

    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < cols + 1; j++) {
            
            rect(100 * i - 50, 100 * j - 50, 100,100);
        }
    }


}

function findPath(startX, startY, endX, endY){

    var openSet = [],
        closeSet = [],
        result = [],
        resultIndex;

    openSet.push({x:startX,y:startY,G:0});

    do{
        var currentPoint = openSet.pop();
        var surroundPoints = getSurroundings(currentPoint);

        closeSet.push(currentPoint);

        for(var i in surroundPoints) {
            var point = surroundPoints[i];
            if( point.x >= 1 && point.y >= 1 && point.x <= rows && point.y <= cols
            && !findInList(point, closeSet) ) {
                //????
                var g = currentPoint.G + ((currentPoint.x - point.x) * (currentPoint.y - point.y) == 0 ? 10 : 14);
                if(!findInList(point, openSet)){
                    point['H'] = Math.abs(endX - point.x) * 10 + Math.abs(endY - point.y) * 10;
                    point['G'] = g;
                    point['F'] = point.H + point.G;
                    point['lastPoint'] = currentPoint;
                    openSet.push(point);
                } else  {
                    var index = findInList(point, openSet);
                    if (g < openSet[index].G) {
                        openSet[index].lastPoint = currentPoint;
                        openSet[index].G = g;
                        openSet[index].F = g + openSet[index].H;
                    }
                }
            }
        }
        
        if(openSet.length == 0) {
            break;
        }

        openSet.sort(sortF);
        
    } while(!(resultIndex = findInList({x:endX, y:endY}, openSet)));

    if(!resultIndex){
        result = [];
    } else {
        var currentObj = openSet[resultIndex];
        do {
            result.unshift({
                x: currentObj.x,
                y: currentObj.y
            });
            currentObj = currentObj.lastPoint;
        } while( currentObj.x != startX || currentObj.y != startY);

    }
    
    for (let i = 0; i < result.length; i++) {
        drawPath(result[i].x, result[i].y);
        console.log(result[i]);
    }
    return result;

}

function sortF(a, b) {
    return b.F - a.F;
}

function getSurroundings(currentPoint){    
    var x = currentPoint.x,
        y = currentPoint.y;

    return [
        {x:x-1,y:y-1},
        {x:x,y:y-1},
        {x:x+1,y:y-1},
        {x:x+1,y:y},
        {x:x+1,y:y+1},
        {x:x,y:y+1},
        {x:x-1,y:y+1},
        {x:x-1,y:y}
    ]
}

function findInList(point, list) {
    for(var i in list) {
        if(point.x==list[i].x && point.y==list[i].y) {
            return i;
        }
    }
    return false;
}

function drawPath(x,y){
    
    fill(255);
    rect(100 * x - 50, 100 * y - 50, 100, 100);
}

function mouseClicked(){
    if(mouseX >= 50 && mouseY >= 50 && mouseX < 950 && mouseY < 950){
        drawMap();
        findPath(floor((mouseX-50)/100), floor((mouseY-50)/100), 9, 9);
    }

}
