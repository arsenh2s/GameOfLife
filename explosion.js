module.exports = class Lumberjack {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
            [this.x, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y - 2],
        ];
    }
    chooseCell() {
        var found = [];
        for (var i in  this.directions) {
            var x = explodeDir[i][0];
            var y = explodeDir[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    
    cutDown() {
        let treeCells = this.chooseCell()
        let chosenTree = treeCells[Math.floor(Math.random() * treeCells.length)]
        if (chosenTree) {
            let cuttedTreeX = chosenTree[0]
            let cuttedTreeY = chosenTree[1]
            matrix[cuttedTreeY][cuttedTreeX] = 0

            for (var i in treesArr) {
                if (cuttedTreeX == treesArr[i].x && cuttedTreeY == treesArr[i].y) {
                    treesArr.splice(i, 1)
                    break
                }
            }
        }
    }
}