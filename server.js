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

season = "summer"

setInterval(function () {
    if (season == 'summer') season = 'automn'
    else if (season == 'automn') season = 'winter'
    else if (season == 'winter') season = 'spring'
    else if (season == 'spring') season = 'summer'

    io.emit('send season', season)
}, 6000)

function generator(matLen, gr, grEat, pr, titan, ab, tree, lumberjack) {
    matrix = [];
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
                let abs = new Abyss(x, y)
                abyssArr.push(abs)
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

    fs.writeFileSync("statistics.txt", grassArr.length + ", " + grassEaterArr.length + ", " + predatorArr.length + ", " + titansArr.length + ", " + abyssArr.length + ", " + lumberjackArr.length + " ")

    io.sockets.emit("send matrix", matrix);

    var readME = fs.readFileSync("statistics.txt", { encoding: 'utf8' })
    console.log(readME)
}


setInterval(game, 1000)

flag = true

io.on('connection', function (socket) {
    if (flag) {
        createObject(matrix)
        flag = false
    }

    socket.on("send burnGrass", kill)
    socket.on('send explode', explode)
})


function kill() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 0
            }
        }
    }

    grassArr = []

}
function explode() {
    var x = 10
    var y = 10
    let directions = [
        [x, y],
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
        [x, y - 2],
        [x - 1, y - 2],
        [x - 2, y - 2],
        [x - 2, y - 1],
        [x - 2, y],
        [x - 2, y + 1],
        [x - 2, y + 2],
        [x - 1, y + 2],
        [x, y + 2],
        [x + 1, y + 2],
        [x + 2, y + 2],
        [x + 2, y + 1],
        [x + 2, y],
        [x + 2, y - 1],
        [x + 2, y - 2],
        [x + 1, y - 2],
    ];

    for (let j in directions){
        console.log(directions);
        
        boomX = directions[j][0]
        boomY = directions[j][1]
       
        if (matrix[boomY][boomX] == 1){
            for (var i in grassArr) {
                if (boomX == grassArr[i].x && boomX == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else if (matrix[boomY][boomX] == 2){
            for (var i in grassEaterArr) {
                if (boomX == grassEaterArr[i].x && boomY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[boomY][boomX] == 3){
            for (var i in predatorArr) {
                if (boomX == predatorArr[i].x && boomY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[boomY][boomX] == 4){
        }
        else if (matrix[boomY][boomX] == 5){
        }
        
        matrix[boomY][boomX] = 0
    }


}