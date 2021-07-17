let express = require("express")
let app = express()
let server = require('http').Server(app)
var io = require('socket.io')(server);
var fs = require("fs");

server.listen(3000)

app.use(express.static('.'))

app.get('/', function (res) {
    res.redirect('index.html')
})



function generator(matLen, gr, grEat, pr, titan, ab, tree, lumberjack) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < titan; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < ab; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < tree; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < lumberjack; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;
        }
    }
    return matrix;
}

matrix = generator(30, 300, 20, 3, 3, 6, 15, 3);

io.sockets.emit('send matrix', matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
titansArr = []
abyssArr = []
treesArr = []
lumberjackArr = []


Grass = require('./grass')
GrassEater = require("./grassEater")
Predator = require("./predator")
Titan = require("./titan")
Abyss = require("./abyss")
Tree = require("./tree")
Lumberjack = require("./lumberjack")



function createObject(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                var predat = new Predator(x, y)
                predatorArr.push(predat)
            }
            else if (matrix[y][x] == 4) {
                var t = new Titan(x, y)
                titansArr.push(t)
            }
            else if (matrix[y][x] == 5) {
                var predat = new Abyss(x, y)
                abyssArr.push(predat)
            }
            else if (matrix[y][x] == 6) {
                var tree = new Tree(x, y)
                treesArr.push(tree)
            }
            else if (matrix[y][x] == 7) {
                var lumberjack = new Lumberjack(x, y)
                lumberjackArr.push(lumberjack)
            }
        }
    }
    io.sockets.emit("send grass", grassArr)
    io.sockets.emit("send grassEater", grassEaterArr)
    io.sockets.emit("send predator", predatorArr)
    io.sockets.emit("send titans", titansArr)
    io.sockets.emit("send abyss", abyssArr)
    io.sockets.emit("send lumberjack", lumberjackArr)

    io.sockets.emit('send matrix', matrix)

}


function game() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (var j in titansArr) {
        titansArr[j].eat();
    }
    for (var j in abyssArr) {
        abyssArr[j].eat();
    }

    for (var i in lumberjackArr) {
        lumberjackArr[i].move();
        lumberjackArr[i].cutDown();
    }

    io.sockets.emit("send grass", grassArr)
    io.sockets.emit("send grass", grassEaterArr)
    io.sockets.emit("send grass", predatorArr)
    io.sockets.emit("send grass", titansArr)
    io.sockets.emit("send grass", abyssArr)
    io.sockets.emit("send grass", lumberjackArr)

    io.sockets.emit("send matrix", matrix);
}


setInterval(game, 1000)

io.on('connection', function (socket) {
    createObject(matrix)
})