export const AddFakeNewStrategy = function() {
  this.strategy = null;
};

AddFakeNewStrategy.prototype = {
  setStrategy: function (newsStrategy) {
    this.strategy = newsStrategy;
  },
  applyNewsStrategy: function () {
    this.strategy();
  }
};

// news strategies
export const topFakeNew = function(item) {
  this.newsList.unshift(item);
};
export const bottomFakeNew = function(item) {
  this.newsList.push(item);
};
