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
