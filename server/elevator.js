function elevator() {

    this.reset = function() {
        this.stairs = [false,false,false,false,false,false];
        this.stair = 0;
        this.way = 'UP';
        this.to = '';
    };

    this.go = function(arg) {
        console.log(arg);
        this.stairs[arg.floorToGo-1] = true;
        return this;
    };

    this.call = function(arg) {
        console.log(arg);
        this.stairs[arg.atFloor-1] = true;
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
                    this.way = 'UP';
                    this.stair++;
                }
            }
        }
        return this.way;
    };

    this.reset();
}

module.exports = new elevator();