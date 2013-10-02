function elevator() {

//    this.nextWay;
//    this.to;
//    this.atFloor;
//    this.way;
//    this.stair;

    this.reset = function() {
        this.stair = 0;
        this.way = 'UP';
        this.atFloor = -1;
        this.to = '';
        this.nextWay = '';
        this.floorToGo = -1;
    };

    this.go = function(arg) {
        this.floorToGo = arg.floorToGo;
    };

    this.call = function(arg) {
        this.atFloor = arg.atFloor;
        this.to = arg.to;
    };

    this.nextCommand = function () {
        if (this.stair == this.atFloor) {
            if (this.way == 'OPEN') {
                this.way = 'CLOSE';
            } else {
                this.way = 'OPEN';
            }
        } else if (this.stair == 5 && this.way == 'UP') {
            this.stair--;
            this.way = 'DOWN';
        } else {
            if (this.stair == 0 && this.way == 'DOWN') {
                this.way = 'UP';
                this.stair++;
            } else {
                if (this.way == 'UP') {
                    this.stair++;
                } else {
                    this.stair--;
                }
            }
        }
        return this.way;
    }
}

module.exports = new elevator();