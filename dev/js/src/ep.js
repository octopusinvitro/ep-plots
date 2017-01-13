function membershipsByTerm(memberships, term) {
  return memberships.filter(function(membership) {
    return membership["legislative_period_id"] === term;
  });
}

function getParties(memberships) {
  return memberships.map(function(membership) {
    return membership["on_behalf_of_id"];
  });
}
