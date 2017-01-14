function itemsCount(items) {
  return items.reduce(function(countMap, item) {
    countMap[item] = ++countMap[item] || 1;
    return countMap;
  }, {});
}

function total(object) {
  return Object.values(object).reduce(function (a, b) {return a + b;}, 0);
}

function stringsToIntegers(array) {
  return array.map(function(item) {
    return parseInt(item, 10)
  });
}

function ageInYears(birthdate) {
  today     = new Date(),
  msPerYear = 365*24*60*60*1000;
  return Math.floor((today - birthdate)/msPerYear);
}

function guaranteedAge(birthdate) {
  if (birthdate === undefined) { return 0; }
  return ageInYears(new Date(birthdate));
}

function percentage(object, key) {
  object[key]    = object[key] || 0;
  var percentage = Math.fround(object[key]/total(object)) * 100.0;
  return percentage.toFixed(0);
}

function applyBinning(agesCounts, binning) {
  var first = stringsToIntegers(Object.keys(agesCounts))[0],
      binNumber, binStart, binned = {};
  for(age in agesCounts) {
    if (agesCounts.hasOwnProperty(age)) {
      binNumber         = Math.floor((age - first) / binning);
      binStart          = first + binNumber * binning;
      binned[binStart]  = binned[binStart] || 0;
      binned[binStart] += agesCounts[age];
    }
  }
  return binned;
}
