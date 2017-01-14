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
function personIds(memberships) {
  return memberships.map(function(membership) {
    return membership["person_id"];
  });
}

function personsById(persons, ids) {
  return persons.filter(function(person) {
    return ids.some(function(id) { return id === person.id })
  });
}

function ages(persons) {
  return persons.map(function(person) {
    return guaranteedAge(person["birth_date"]);
  })
}

function agesByTerm(data, term) {
  var memberships = membershipsByTerm(data["memberships"], term),
      persons     = personsById(data["persons"], personIds(memberships));
  return ages(persons);
}

function gendersByTerm(data, term) {
  var memberships = membershipsByTerm(data["memberships"], term),
      persons     = personsById(data["persons"], personIds(memberships));
  return persons.map(function(person) {
    return person["gender"];
  });
}
