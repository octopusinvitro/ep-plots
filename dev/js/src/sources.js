function listOfUrls(urls) {
  return urls.map(function(url) {
    return '<li><a href="' + url + '">' + url + '</a></li>';
  }).join('');
}

function showSources(data, id) {
  document.getElementById(id).innerHTML = listOfUrls(data["meta"]["sources"]);
}

function showCountriesSources(countries, id) {
  countries.map(function(country) {
    showSources(country.data, id + country.name.toLowerCase());
  });
}
