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
