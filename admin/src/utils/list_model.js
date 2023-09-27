function ListModel(nop) {
    this.numberOfItemsInPage = parseInt(nop) || 10;
    this.items = [];
}

ListModel.prototype = {
    nextPageIndex: function () {
        return this.numberOfItemsInPage <= 0 ? 0 :
            Math.ceil(this.items.length / this.numberOfItemsInPage) + 1;
    },
    append: function (data, refresh) {
        this.items = (refresh ? [] : this.items).concat(data);
        return data.length !== 0 && (data.length % this.numberOfItemsInPage) === 0;
    }
}

export {
    ListModel 
}