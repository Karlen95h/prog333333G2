var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});



function matrixGenerator(matrixSize, grassCount, grassEaterCount, gishatichnerCount, hrashagorccount, vorsordcount, xotabuyscount) {
     var matrix = [];
    
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let j = 0; j < matrixSize; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 1;
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 2;
    }
    for (let i = 0; i < gishatichnerCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 3;
    }
    for (let i = 0; i < hrashagorccount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 4;
    }
    for (let i = 0; i < vorsordcount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 5;
    }
    for (let i = 0; i < xotabuyscount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        matrix[y][x] = 6;
    }

    return matrix
}

 matrix =  matrixGenerator(30, 30, 10, 10, 10, 10, 10)


io.sockets.emit("send matrix",matrix)


////charecter Arrays

 grassArr = [];
 grassEaterArr = [];
 gishatichner = [];
 hrashagorcarr = [];
 xotabuysarr = [];
 vorsordarr = [];


 /////modules

 let Grass = require("./grass")
 let GrassEater = require("./grassEater")
 let Gishatich = require("./gishatich")
 let Hrashagorc =require("./hrashagorc")
 let Vorsord = require("./vorsord")
 let Xotabuys = require("./xotabuys")



 ///

function createObject(matrix){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let eater = new Gishatich(x, y);
                gishatichner.push(eater);
            }
            else if (matrix[y][x] == 4) {
                let eater = new Hrashagorc(x, y);
                hrashagorcarr.push(eater);
            }
            else if (matrix[y][x] == 5) {
                let eater = new Vorsord(x, y);
                vorsordarr.push(eater);
            }
            else if (matrix[y][x] == 6) {
                let eater = new Xotabuys(x, y);
                xotabuysarr.push(eater);
            }
        }
    }


      io.sockets.emit("send matrix",matrix)
}





function game(){
    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
        eater.eat();
    }
    for (let i = 0; i < gishatichner.length; i++) {
        const gishatich = gishatichner[i];
        gishatich.eat();
    }
    for (let i = 0; i < hrashagorcarr.length; i++) {
        const hrashagorc = hrashagorcarr[i];
        hrashagorc.move();
    }
    for (let i = 0; i < vorsordarr.length; i++) {
        const vorsord = vorsordarr[i];
        vorsord.eat();
    }
    for (let i = 0; i < xotabuysarr.length; i++) {
        const xotabuys = xotabuysarr[i];
        xotabuys.move();
    }


    io.sockets.emit("send matrix",matrix)
}




setInterval(game ,  500)

//Add buttons

function AddGrass(){
    for(let i = 0 ; i < 7 ; i++){
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);

              if(matrix[y][x] == 0){
                            matrix[y][x] = 1

                            let grass = new Grass(x,y)
                            grassArr.push(grass)
              }
    }

    io.sockets.emit("send matrix",matrix)

}

//////statistics

var statistics = {
    
}


setInterval(function (){

      statistics.grass = grassArr.length
      statistics.grassEater = grassEaterArr.length
      statistics.gishatich = gishatichner.length
      statistics.hrashagorc = hrashagorcarr.length
      statistics.xotabuys = xotabuysarr.length
      statistics.vorsord = vorsordarr.length

    fs.writeFile("statistics.json", JSON.stringify(statistics) ,function(err) {
        //    console.log(" game of life statistics ");
    } )
},1000)








io.on("connection", function (socket){
    createObject(matrix)
    socket.on("addGrass", AddGrass);
})
