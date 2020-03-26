var stringSimilarity = require('string-similarity');

module.exports = function(findMatchesFor, georeferenceArray, threshold) {
  var matches = stringSimilarity.findBestMatch(findMatchesFor, georeferenceArray) //gets the similarity values for all possible matches
  var filteredMatches = matches.ratings.filter(item => item.rating >= threshold)
  if(filteredMatches.length > 0){
    filteredMatches.sort((a, b) => a.rating > b.rating)
    return filteredMatches.map(item => item.target)
  }
  else {
    return []
  }
} 