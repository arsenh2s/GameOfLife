class Lumberjack extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.energy = 10
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
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else if (this.energy <= 0) {
                this.rest(10)
            }
    }
    rest(time){
        for(var i = 0; i < time; i++){
            this.energy++
        }
    }
    cutDown(){
        let treeCells = this.chooseCell(6)
        let chosenTree = random(treeCells)
        if(chosenTree && this.energy > 0){
            let cuttedTreeX = chosenTree[0]
            let cuttedTreeY = chosenTree[1]
            matrix[cuttedTreeX][cuttedTreeY] = 0
        }
        for (var i in treesArr) {
            if (cuttedTreeX == treesArr[i].x && cuttedTreeY == treesArr[i].y) {
                treesArr.splice(i, 1)
                break
            }
        }
    }
}