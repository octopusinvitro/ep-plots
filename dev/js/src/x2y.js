function display(age) {
  return (age === '0') ? '?' : age;
}

function object2list(object) {
  var list = '';
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      list += '<li><strong>' + key + ':</strong> ' + object[key] + '</li>';
    }
  }
  return list;
}

function object2datalist(object) {
  var dd, perc, frag = document.createDocumentFragment();
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      perc = percentage(object, key),
      dd   = document.createElement('dd'),
      dd.className = 'bar percentage-' + perc;
      dd.innerHTML = '<span class="bar-text">' + key + ': ' + perc + '%</span>';
      frag.appendChild(dd);
    }
  }
  return frag;
}

function gender2list(object) {
  var unknown = total(object) - object['male'] - object['female'];
  return '<li><strong>Male count:</strong> '    + object['male']   + '</li>' +
         '<li><strong>Female count:</strong> '  + object['female'] + '</li>' +
         '<li><strong>Other/Unknown:</strong> ' + unknown + '</li>';
}

function age2display(current, next) {
  var append = (next === undefined) ? '+' : ' - ' + (next - 1);
  return (current === 0) ? 'unknown' : (current + append);
}

function drawSVGBars(age, binned, position, width) {
  var height  = binned[age];
  return '<g transform="translate(' + position + ',0)">' +
         '<rect class="svg-sparklines__bar" height="' + height + '" y="' + (40 - height) + '" width="' + width + '"></rect>' +
         '<text class="svg-sparklines__text" x="1" y="44">' + display(age) + '</text>' +
         '</g>';
}

function ages2list(agesCount) {
  var i, n, list = '', ages = stringsToIntegers(Object.keys(agesCount));
  for (i=ages[0], n=ages.slice(-1)[0]; i<n; i++) {
    if (agesCount.hasOwnProperty(ages[i])) {
      list += '<li>Age ' + age2display(ages[i], ages[i+1]) + ': ' + agesCount[ages[i]] + ' members.</li>';
    }
  }
  return list;
}

function ages2sparkLines(agesCounts) {
  var binning = 10, list = '', scale = 2,
      binned = applyBinning(agesCounts, binning);
  for (age in binned) {
    if (binned.hasOwnProperty(age)) {
      list   += '<span class="sparklines-index"><span class="count" style="height: '
             + (binned[age] * scale) + '%;">'
             + '<span>' + display + '</span></span>,</span> ';
    }
  }
  return list;
}

function country2row(country, male, female, index) {
  var tr       = document.createElement("tr");
  tr.id        = 'row-' + index;
  tr.className = 'country-row';
  tr.innerHTML = '<th scope="row">' + country.name + '</th>' +
                 '<td class="male bar-tables"   style="height: ' + male   * 2.5
                 + 'px"><p>' + male   + '%</p></td>' +
                 '<td class="female bar-tables" style="height: ' + female * 2.3
                 + 'px"><p>' + female + '%</p></td>';
  return tr;
}
