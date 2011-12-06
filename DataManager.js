function DataManager() { //(container[], put(a) )
    this.container = new Array();
    this.put = function (request, something) {
        this.container.push(something);
    }
}

module.exports = DataManager;
