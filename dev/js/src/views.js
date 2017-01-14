function createAgesParagraph(ages, term) {
  var p       = document.createElement("p");
  p.innerHTML = '<strong>Term:</strong> ' + term.replace('term/', '') + '. ' +
                '<strong>Total members:</strong> ' + ages.length + '.';
  return p;
}

function createAgesList(ages, binning) {
  var ul       = document.createElement("ul");
  ul.innerHTML = ages2list(applyBinning(itemsCount(ages), binning));
  return ul;
}

function createSparkItems(data, term, termsBaseURL) {
  var li       = document.createElement("li"),
      url      = termsBaseURL + term.replace('term/', '') + '.html';
  li.innerHTML = '<a href="' + url + '">' + term + '</a>' +
                 '<span class="sparkline">' + ages2sparkLines(itemsCount(agesByTerm(data, term))) + '</span>'
  return li;
}

function createSparkItemsSVG(data, term, termsBaseURL) {
  var li       = document.createElement("li"),
      termNum  = term.replace('term/', ''),
      url      = termsBaseURL + termNum + '.html';
  li.innerHTML = '<span class="svg-sparklines__term"><a href="' + url + '">Term ' + termNum + '</a></span>' +
                 '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"' +
                 'class="chart" viewBox="0 0 45 55" aria-labelledby="title" role="img">' +
                 '  <title id="title">A bar chart showing frequency of ages for term ' + termNum + '</title>' +
                 ages2sparkLinesSVG(itemsCount(agesByTerm(data, term)), url) +
                 '</svg>';
  return li;
}

function showCountInSVG(data, term, ids) {
  var partiesCountMap = itemsCount(getParties(membershipsByTerm(data["memberships"], term)));
  document.getElementById(ids['bars']).appendChild(object2svg(partiesCountMap));
  document.getElementById(ids["partyCount"]).innerHTML = object2list(partiesCountMap);
  document.getElementById(ids["totalCount"]).innerHTML = total(partiesCountMap);
}

function showCount(data, term, ids) {
  var partiesCountMap = itemsCount(getParties(membershipsByTerm(data["memberships"], term)));
  document.getElementById(ids["bars"]).appendChild(object2datalist(partiesCountMap));
  document.getElementById(ids["partyCount"]).innerHTML = object2list(partiesCountMap);
  document.getElementById(ids["totalCount"]).innerHTML = total(partiesCountMap);
}

function showCounts(data, terms, id) {
  var ages, binning = 10, frag = document.createDocumentFragment();
  terms.map (function(term) {
    ages = agesByTerm(data, term);
    ages.sort();
    frag.appendChild(createAgesParagraph(ages, term));
    frag.appendChild(createAgesList(ages, binning));
  });
  document.getElementById(id).appendChild(frag);
}

function showTotals(countries, id) {
  countries.map(function(country) {
    document.getElementById(id + country.name.toLowerCase())
      .innerHTML = total(itemsCount(gendersByTerm(country.data, country.term)));
  });
}

function showGenderCounts(countries, id) {
  countries.map(function(country) {
    document.getElementById(id + country.name.toLowerCase())
      .innerHTML = gender2list(itemsCount(gendersByTerm(country.data, country.term)));
  });
}

function showBars(countries) {
  var rowIndex = 0, male, female, frag = document.createDocumentFragment();
  countries.map(function(country) {
    counts = itemsCount(gendersByTerm(country.data, country.term))
    male   = percentage(counts, 'male');
    female = percentage(counts, 'female');
    rowIndex++;
    frag.appendChild(country2row(country, male, female, rowIndex));
  });
  document.querySelector("#table-bar-chart tbody").appendChild(frag);
}

function showSparklist(data, terms, termsBaseURL, id) {
  var frag = document.createDocumentFragment();
  terms.map(function(term) {
    frag.appendChild(createSparkItems(data, term, termsBaseURL));
  });
  document.getElementById(id).appendChild(frag);
}

function showSparklistSVG(data, terms, termsBaseURL, id) {
  var frag = document.createDocumentFragment();
  terms.map(function(term) {
    frag.appendChild(createSparkItemsSVG(data, term, termsBaseURL));
  });
  document.getElementById(id).appendChild(frag);
}
