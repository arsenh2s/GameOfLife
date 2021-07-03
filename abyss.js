class Abyss {
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat(){
        var emptyCells2 = this.chooseCell(2)
        var newCell2 = random(emptyCells2)

        var emptyCells3 = this.chooseCell(3)
        var newCell3 = random(emptyCells3)

        var emptyCells4 = this.chooseCell(4)
        var newCell4 = random(emptyCells4)
        


        if(newCell2){
            var newX = newCell2[0]
            var newY = newCell2[1]
            
            matrix[newY][newX] = 0
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(newCell3){
            var newX = newCell3[0]
            var newY = newCell3[1]
            
            matrix[newY][newX] = 0
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else if(newCell4){
            var newX = newCell4[0]
            var newY = newCell4[1]
            
            matrix[newY][newX] = 0
            for (var i in titansArr) {
                if (this.x == titansArr[i].x && this.y == titansArr[i].y) {
                    titansArr.splice(i, 1);
                    break;
                }
            }
        }



        // for (var i in grassEaterArr) {
        //     if (newX == grassEaterArr[i].x || predatorArr && newY == grassEaterArr[i].y) {
        //         grassEaterArr.splice(i, 1)
        //         break
        //     }
        // }
        // for (var i in predatorArr) {
        //     if (newX == predatorArr[i].x || predatorArr && newY == predatorArr[i].y) {
        //         predatorArr.splice(i, 1)
        //         break
        //     }
        // }
        // for (var i in titansArr) {
        //     if (newX == titansArr[i].x || titansArr && newY == titansArr[i].y) {
        //         titansArr.splice(i, 1)
        //         break
        //     }
        // }



    }
}