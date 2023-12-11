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
}

let matrix =  matrixGenerator(30, 30, 10, 10, 10, 10, 10)


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


