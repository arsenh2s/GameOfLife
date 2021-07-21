var socket = io();

let side = 20;

function setup() {
    frameRate(20)
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("brown");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }

        }
    }
    socket.on("send grass", showGrass)
    socket.on("send grassEater", showGrassEater)
    socket.on("send predator", showPredator)
    socket.on("send titans", showTitan)
    socket.on("send abyss", showAbyss)
    socket.on("send lumberjack", showLumberjack)
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
)


function showGrass(a) {
    document.getElementsByClassName('table_grass').innerHTML = a.length + ""
}
function showGrassEater(a) {
    document.getElementsByClassName('table_grassEater').innerHTML = a.length + ""
}
function showPredator(a) {
    document.getElementsByClassName('table_predator').innerHTML = a.length + ""
}
function showTitan(a) {
    document.getElementsByClassName('table_titan').innerHTML = a.length + ""
}
function showAbyss(a) {
    document.getElementsByClassName('table_abyss').innerHTML = a.length
}
function showLumberjack(a) {
    document.getElementsByClassName('table_lumberjack').innerHTML = a.length
}