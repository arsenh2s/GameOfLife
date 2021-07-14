let LivingCreature = require('./class')

module.exports = class Lumberjack extends LivingCreature {
    constructor(x, y) {
        super(x, y)
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
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }
    move() {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    cutDown() {
        let treeCells = this.chooseCell(6)
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