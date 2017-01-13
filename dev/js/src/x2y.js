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
