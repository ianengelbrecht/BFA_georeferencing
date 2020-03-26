var readCSV = require("./readCSV")
var writeCSV = require('./writeCSV')

readCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/distinctLocalities 20190325.csv")
.then(data =>{
  var QDSregex = new RegExp(/.*\d{4}[ABCD]{2}$/)
  data.forEach(rec => {
    if (QDSregex.test(rec.verbatimLocality)) {
      var st = rec.verbatimLocality.trim()
      //get the QDS, add it to the QDS field, delete it from the verbatimLocality
      var qds = st.substr(st.length - 6)
      var locSansQDS = st.substring(0, st.length - 6).trim();
      rec.QDS = qds
      rec.verbatimLocality = locSansQDS;
    }
  });

  //write it out again
  writeCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/distinctLocalitiesSansQDS 20190325.csv", data)
  .then(() => {
    console.log('finished writing new file')
  })
  .catch(err => {
    throw err
  })
})
.catch(err => {
  console.log(err)
})
