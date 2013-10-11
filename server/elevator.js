function elevator() {

    this.reset = function() {
        this.floors = [false,false,false,false,false,false];
        this.currentFloor = 0;
        this.way = 'UP';
        this.to = '';
    };

    this.go = function(arg) {
        console.log(arg);
        this.floors[arg.floorToGo] = true;
        return this;
    };

    this.call = function(arg) {
        console.log(arg);
        this.floors[arg.atFloor] = true;
        return this;
    };

    function shouldGoUp() {
        function reduceOr (previousValue, currentValue, index, array) {
            return previousValue || currentValue;
        }
        return this.floors.slice(this.currentFloor).reduce(reduceOr, false);
    }

    this.nextCommand = function () {
        if (this.floors[this.currentFloor]) {
            if (this.way == 'OPEN') {
                this.way = 'CLOSE';
                this.floors[this.currentFloor] = false;
            } else {
                this.way = 'OPEN';
            }
        } else if (this.currentFloor == 5) {
            this.way = 'DOWN';
        } else if (this.currentFloor == 0) {
            this.way = 'UP';
        } else if (this.way == 'CLOSE') {
            if (shouldGoUp.call(this)) {
                this.way = 'UP';
            } else {
                this.way = 'DOWN';
            }
        }

        this.currentFloor = this.way == 'UP' ? this.currentFloor + 1 : this.way == 'DOWN' ? this.currentFloor - 1 : this.currentFloor;
        return this.way;
    };

    this.reset();
}

module.exports = new elevator();