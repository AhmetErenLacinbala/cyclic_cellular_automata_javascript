//Made by Ahmet Eren Laçinbala in 02.22.2022
//ahmetlacinbala@gmail.com


function make2DArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}


function makeColorArray (colorNumber){
    let arr = new Array(colorNumber);
        for (let i = 0; i<arr.length; i++){
            arr[i] = new Array (3); 
        }
        return arr;
}

function copyArray(arr){
    if(arr[0] instanceof Array){
        var new_arr = new Array(arr.length);
        for(var i = arr.length; i--;)
            new_arr[i] = copyArray(arr[i]);
    }
    else{var new_arr = arr.slice(0);}
    return new_arr;
}

function colorforCells(colorNumber){
    colorArr=makeColorArray(colorNumber);
    let totalColor = 1535;
    let colorDivided = floor(totalColor/colorNumber);
    let colorMultipiled = 0;
    colorArr[0][0]=255;
    colorArr[0][1]=0;
    colorArr[0][2]=0;
    for (let i = 1; i < colorNumber; i++){
        colorMultipiled = colorDivided*i; 
        if (colorMultipiled<256){
            colorArr[i][0]=255;
            colorArr[i][1]=colorMultipiled%256;
            colorArr[i][2]=0;
        } 
        else if (colorMultipiled>=256 && colorMultipiled<256*2){
            colorArr[i][0]=255-colorMultipiled%256;
            colorArr[i][1]=255;
            colorArr[i][2]=0;
        }
        else if (colorMultipiled>=256*2 && colorMultipiled<256*3){
            colorArr[i][0]=0;
            colorArr[i][1]=255;
            colorArr[i][2]=colorMultipiled%256;
        }
        else if (colorMultipiled>=256*3 && colorMultipiled<256*4){
            colorArr[i][0]=0
            colorArr[i][1]=255-colorMultipiled%256;
            colorArr[i][2]=255;
        }
        else if (colorMultipiled>=256*4 && colorMultipiled<256*5){
            colorArr[i][0]=colorMultipiled%256;
            colorArr[i][1]=0;
            colorArr[i][2]=255;
        }
        else if (colorMultipiled>=256*5 && colorMultipiled<256*6){
            colorArr[i][0]=255;
            colorArr[i][1]=0;
            colorArr[i][2]=255-colorMultipiled%256;
        }

        
    }
    return colorArr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let colorNumber = 3;
let colorArr;
let threshold = 3;
let eventCycle = 0;
let newGrid;

function setup(){
    createCanvas(600, 600);
    cols = width / resolution;
    rows = height / resolution;

    colorArr = colorforCells(colorNumber);
    grid = make2DArray(cols, rows);
    newGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j]=floor(random(colorNumber)); 
                       
        }
    }
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++) {newGrid[i][j] = 0;
        }
    }
    frameRate(30);
}


function draw() {
    background(0);
    
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            let x = i * resolution;
            let y = j * resolution;
            let color = grid[i][j];       
            fill(floor(colorArr[color][0]),floor(colorArr[color][1]),floor(colorArr[color][2]));
            noStroke();
            rect(x, y, resolution, resolution);
            
        }
    }

    //console.log("before for: "+grid[control[0]][control[1]]);

    for (let i = 0; i < cols; i++ ){
        for (let j = 0; j < rows; j++){
            let count = 0;
            for (let k = -1; k < 2; k++){
                for (let l = -1; l < 2; l++){

                    let col = (i + k + cols) % cols;
                    let row = (j + l + rows) % rows;


                    if ((grid[i][j]+1)%(colorNumber) == (grid[col][row])%(colorNumber)) {
                        count++;
                    }
                                           
                }                
            }
            if (i==7&&j==2&&eventCycle==1){
                console.log("here");
            }
            if (count >= threshold){
                newGrid[i][j] = (grid[i][j]+1)%(colorNumber);
            }
            else{
                newGrid[i][j] = grid[i][j];
            }
        }
    }
    grid = newGrid.map(arr => arr.slice());   
}

function keyPressed(){
    
    

}
  


