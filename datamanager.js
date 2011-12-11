function DataManager() { //(container[], put(a) )
    this.container = new Array();
    this.put = function (request, something) {
        something.request = request;
        this.container.push(something);
    }
}

module.exports = DataManager;
