

function elevator() {
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
        this.MAX_FLOORS = 19;
    };

    this.enableFloor = function (floor) {
        this.floors[floor] = true;
        return this;
    };

    function allFalse() {
        return this.floors.reduce(function (previousValue, currentValue, index, array) { return previousValue && !currentValue}, true);
    }

    this.nextCommand = function () {

        if (this.force === true) {
            this.force = false;
            return 'resetmeplease';
        }
        if (this.doorsOpen === true) {
            this.doorsOpen  = false;
            return 'CLOSE';
        }
        if (this.floors[this.currentFloor]) {
            this.doorsOpen = true;
            this.floors[this.currentFloor] = false;
            return 'OPEN';
        }

        if (this.currentFloor == this.floors.length - 1) {
            this.way = 'DOWN';
        } else if (this.currentFloor == 0) {
            if (allFalse.call(this)) {
                this.way = "NOTHING";
            } else {
                this.way = 'UP';
            }
        } else {
            var notGoDown = this.floors.slice(0,this.currentFloor).reverse().indexOf(true) == -1;
            var notGoUp = this.floors.slice(this.currentFloor).indexOf(true) == -1;
            if (notGoDown && notGoUp) {
                this.way = 'NOTHING';
            } else if (notGoDown) {
                this.way = 'UP';
            } else if (notGoUp) {
                this.way = 'DOWN'
            } else {
                this.way = this.way == 'DOWN' ? 'DOWN' : 'UP'
            }
        }
        this.currentFloor = this.nextFloor();

        return this.way;
    };

    this.force = function() {
        this.force = true;
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

    this.force = true;
    this.reset();
}

module.exports = new elevator();
