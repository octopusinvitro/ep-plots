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

function membershipsByParty(memberships) {
  var party = '';
  return memberships.reduce(function(partyMap, membership) {
    party = membership["on_behalf_of_id"];
    partyMap[party] = partyMap[party] || []
    partyMap[party].push(membership);
    return partyMap;
  }, {});
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

function personsByParty(persons, partyMemberships) {
  var ids, partyMembers = {};
  for (var party in partyMemberships) {
    if (partyMemberships.hasOwnProperty(party)) {
      partyMemberIds      = personIds(partyMemberships[party]);
      partyMembers[party] = personsById(persons, partyMemberIds);
    }
  }
  return partyMembers;
}

function personsGenders(persons) {
  return persons.map(function(person) {
    return person['gender'];
  });
}

function genderCount(persons) {
  return itemsCount(personsGenders(persons))
}

function gendersByParty(partyMembers) {
  var totalGenders = {};
  for (var party in partyMembers) {
    if (partyMembers.hasOwnProperty(party)) {
      totalGenders[party] = genderCount(partyMembers[party]);
    }
  }
  return totalGenders;
}

function ages(persons) {
  return persons.map(function(person) {
    return guaranteedAge(person["birth_date"]);
  });
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

function totalGenders(data, term) {
  var termMemberships  = membershipsByTerm(data["memberships"], term),
      partyMemberships = membershipsByParty(termMemberships),
      partyMembers     = personsByParty(data["persons"], partyMemberships);
  return gendersByParty(partyMembers);
}
