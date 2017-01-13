function itemsCount(items) {
  return items.reduce(function(countMap, item) {
    countMap[item] = ++countMap[item] || 1;
    return countMap;
  }, {});
}

function total(object) {
  return Object.values(object).reduce(function (a, b) {return a + b;}, 0);
}

function percentage(object, key) {
  object[key]    = object[key] || 0;
  var percentage = Math.fround(object[key]/total(object)) * 100.0;
  return percentage.toFixed(0);
}
