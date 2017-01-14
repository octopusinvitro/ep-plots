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

function object2rect(object, key, textY, rectY) {
  var svgNS = 'http://www.w3.org/2000/svg',
      perc  = percentage(object, key),
      group = document.createElementNS(svgNS, 'g');
  group.innerHTML = '<text class="svg-bar__text" y="'+ (10 + textY) + '" dy=".35em">' + key + '</text>' +
                    '<text class="svg-bar__text" y="'+ (10 + textY) + '" dy=".35em" x="80">' + perc + '%</text>' +
                    '<rect class="svg-bar__bar" width="' + (5 * perc) + '" height="30" x="150" y="' + rectY + '"></rect>';
  return group;
}

function object2svg(object) {
  var frag = document.createDocumentFragment(), textY = 10, rectY = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      frag.appendChild(object2rect(object, key, textY, rectY));
      textY += 40;
      rectY += 40;
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
             + '<span>' + display(age) + '</span></span>,</span> ';
    }
  }
  return list;
}

function ages2sparkLinesSVG(agesCounts, url) {
  var binning = 10, list = '', position = 0, width = 6, binned = applyBinning(agesCounts, binning);
  for (age in binned) {
    if (binned.hasOwnProperty(age)) {
      list += drawSVGBars(age, binned, position, width);
      position += width;
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

function array2paragraphs(array) {
  var par, frag = document.createDocumentFragment();
  array.map (function(item) {
    par = document.createElement('p');
    par.innerHTML = '<strong>Term ' + item['term'] + ':</strong> ' + item['female'] + ' of ' + item['total']+ '.';
    frag.appendChild(par);
  });
  return frag;
}

function counts2points(counts) {
  var i=0, dataPoints = '';
  counts.map(function(term) {
    i++;
    dataPoints += '<circle cx="' + (150 * i - 50) +
                  '" cy="' + (370 - 360.0/75.0 * term['female']) +
                  '" data-value="' + term['female'] + '" r="4"></circle>';
  });
  return dataPoints;
}
