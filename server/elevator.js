function elevator() {

    this.reset = function() {
        this.floors = [false,false,false,false,false,false];
        this.currentFloor = 0;
        this.way = 'UP';
        this.to = '';
    };

    this.enableFloor = function (floor) {
        this.floors[floor] = true;
        return this;
    };

    function reduceOr (previousValue, currentValue, index, array) {
        return previousValue || currentValue;
    }

    function shouldGoUp() {
        return this.floors.slice(this.currentFloor).reduce(reduceOr, false);
    }

    function allFalse() {
        return this.floors.reduce(function (previousValue, currentValue, index, array) { return previousValue && !currentValue}, true);
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
            if (allFalse.call(this)) {
                this.way = "NOTHING";
            } else {
                this.way = 'UP';
            }
        } else if (this.way == 'CLOSE') {
            if (shouldGoUp.call(this)) {
                this.way = 'UP';
            } else {
                this.way = 'DOWN';
            }
        } else {
            var distanceDown = this.floors.slice(0,this.currentFloor).indexOf(true);
            var distanceUp = this.floors.slice(this.currentFloor).indexOf(true);
            if (distanceDown == -1 && distanceUp == -1) {
                this.way = 'NOTHING';
            } else if (distanceDown == -1) {
                this.way = 'UP';
            } else if (distanceUp == -1) {
                this.way = 'DOWN'
            } else {
                this.way = (distanceUp > distanceDown) ? 'DOWN' : 'UP'
            }
        }

        this.currentFloor = this.way == 'UP' ? this.currentFloor + 1 : this.way == 'DOWN' ? this.currentFloor - 1 : this.currentFloor;
        return this.way;
    };

    this.reset();
}

module.exports = new elevator();