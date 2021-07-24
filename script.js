var socket = io();

let side = 20;

function setup() {
    frameRate(20)
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

socket.on('send season', function(data) {
    currentSeason = data
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                if(currentSeason == 'summer') fill('#009300')
                else if(currentSeason == 'automn') fill('#B9D500')
                else if(currentSeason == 'winter') fill('#D8EDD8')
                else if(currentSeason == 'spring') fill('#00CD1B')
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
}

socket.on('send matrix', nkarel)


function burnGrass() {
    socket.emit('send burnGrass')
}
function explode(){
    socket.emit('send explode')
}