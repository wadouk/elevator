

function elevator() {

    this.MAX_FLOORS = 19;

    this.reset = function() {
        function initTable(length) {
            var a = new Array(length);
            for (var i = 0; i <= length;i++) {
                a[i] = false;
            }
            return a;
        }

        this.floors = initTable(this.MAX_FLOORS);
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

        if (this.doorsOpen == true) {
            this.doorsOpen  = false;
            return 'CLOSE';
        }
        if (this.floors[this.currentFloor]) {
            this.doorsOpen = true;
            this.floors[this.currentFloor] = false;
            return 'OPEN';
        }

        if (this.currentFloor == this.MAX_FLOORS) {
            this.way = 'DOWN';
        } else if (this.currentFloor == 0) {
            if (allFalse.call(this)) {
                this.way = "NOTHING";
            } else {
                this.way = 'UP';
            }
        } else {
            var distanceDown = this.floors.slice(0,this.currentFloor).reverse().indexOf(true);
            var distanceUp = this.floors.slice(this.currentFloor).indexOf(true);
            if (distanceDown == -1 && distanceUp == -1) {
                this.way = 'NOTHING';
            } else if (distanceDown == -1) {
                this.way = 'UP';
            } else if (distanceUp == -1) {
                this.way = 'DOWN'
            } else {
                this.way = this.way == 'DOWN' ? 'DOWN' : 'UP'
            }
        }
        this.currentFloor = this.nextFloor();

        return this.way;
    };

    this.nextFloor = function (){
        var sign = 0;
        switch (this.way) {
            case 'UP' : sign = 1;
                break;
            case 'DOWN' : sign = -1;
                break;
        }
        return this.currentFloor + sign;
    };

    this.reset();
}

module.exports = new elevator();