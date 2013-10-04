function elevator() {

    this.reset = function() {
        this.stairs = [false,false,false,false,false,false];
        this.stair = 0;
        this.way = 'UP';
        this.to = '';
    };

    this.go = function(arg) {
        console.log(arg);
        this.stairs[arg.floorToGo] = true;
        return this;
    };

    this.call = function(arg) {
        console.log(arg);
        this.stairs[arg.atFloor] = true;
        return this;
    };

    this.nextCommand = function () {
        if (this.stairs[this.stair]) {
            if (this.way == 'OPEN') {
                this.way = 'CLOSE';
                this.stairs[this.stair] = false;
            } else {
                this.way = 'OPEN';
            }
        } else if (this.stair == 5) {
            this.way = 'DOWN';
        } else {
            if (this.stair == 0) {
                this.way = 'UP';
            }
            else {
                if (this.way == 'CLOSE') {
                    this.way = 'UP';
                }
            }
        }

        this.stair = this.way == 'UP' ? this.stair+1 : this.way == 'DOWN' ? this.stair-1 : this.stair;
        return this.way;
    };

    this.reset();
}

module.exports = new elevator();