function setActiveClass(buttons, button) {
  for(var i=0, n=buttons.children.length; i<n; i++) {
    buttons.children[i].classList.remove('active');
    button.classList.add('active');
  }
}

function showGenderByPartyCounts(totalGenders) {
  var maleCount   = percentage(totalGenders, 'male'),
      femaleCount = percentage(totalGenders, 'female'),
      otherCount  = percentage(totalGenders, 'undefined');

  document.getElementById('male').style.strokeDasharray    = maleCount   + ' ' + 100;
  document.getElementById('female').style.strokeDasharray  = femaleCount + ' ' + 100;
  document.getElementById('female').style.strokeDashoffset = -maleCount;
  document.getElementById('male-perc').innerHTML   = maleCount   + '%';
  document.getElementById('female-perc').innerHTML = femaleCount + '%';
  document.getElementById('other-perc').innerHTML  = otherCount  + '%';
}

function createButtons(totalGenders, id) {
  var button,
      frag    = document.createDocumentFragment(),
      buttons = document.getElementById(id),
      parties = Object.keys(totalGenders);

  parties.map(function(party) {
    button = document.createElement('button');
    button.innerText = party;
    if (party === "_IND") { button.innerText = "NO PARTY"; }
    button.setAttribute('data-party', party);
    frag.appendChild(button);
  });

  buttons.appendChild(frag);
  buttons.addEventListener('click', function(e) {
    if (e.target != e.currentTarget) {
      var button = e.target,
          party  = button.getAttribute('data-party');
      showGenderByPartyCounts(totalGenders[party]);
      setActiveClass(buttons, button);
    }
    e.stopPropagation();
  });

  showGenderByPartyCounts(totalGenders[Object.keys(totalGenders)[0]]);
  setActiveClass(buttons, buttons.children[0]);
}

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

function genderCounts(data, terms) {
  var counts;
  return terms.map(function(term) {
    counts = itemsCount(gendersByTerm(data, term));
    return {
      'term':   term,
      'female': counts['female'],
      'total':  total(counts)
    };
  });
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

function showFemaleCounts(data, terms, id) {
  document.getElementById(id).appendChild(array2paragraphs(genderCounts(data, terms)));
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

function showPoints(data, terms, id) {
  document.getElementById(id).innerHTML = counts2points(genderCounts(data, terms));
}
