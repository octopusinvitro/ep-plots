function createRequest() {
  var result = null;

  // FireFox, Safari, etc.
  if (window.XMLHttpRequest) {
    result = new XMLHttpRequest();
    if (typeof result.overrideMimeType != 'undefined') {
      result.overrideMimeType('application/json');
    }
  }

  // MSIE
  else if (window.ActiveXObject) {
    result = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // Error
  else {
    console.log('Connection error');
  }

  return result;
}

function get(url, country, terms, useData) {
  var req = createRequest();
  req.onreadystatechange = function() {
    if (req.readyState !== 4) return;
    if (req.status !== 200)   return;
    useData(req.responseText, country, terms);
  }
  req.open('GET', url, true);
  req.send();
}
