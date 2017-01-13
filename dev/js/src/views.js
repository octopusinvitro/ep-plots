
function showCount(data, term, ids) {
  var partiesCountMap = itemsCount(getParties(membershipsByTerm(data["memberships"], term)));
  document.getElementById(ids["bars"]).appendChild(object2datalist(partiesCountMap));
  document.getElementById(ids["partyCount"]).innerHTML = object2list(partiesCountMap);
  document.getElementById(ids["totalCount"]).innerHTML = total(partiesCountMap);
}
