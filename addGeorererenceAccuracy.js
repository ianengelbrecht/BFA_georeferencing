//this also writes out just the fields wanted as the final georeferences

var readCSV = require("./readCSV")
var writeCSV = require('./writeCSV')


readCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/testing encoding.csv")
.then(data =>{

  var newData = []

  data.forEach(rec => {
    var verbatimAcc = rec.accuracy
    var regex = new RegExp(/(\d+)/)
    if (verbatimAcc && regex.test(verbatimAcc)) { //test not blank and it includes a number
      var num = verbatimAcc.trim().match(regex)[0]
      if(verbatimAcc.toLowerCase().includes("km")) {
        rec.coordinateAccuracyInMeters = num * 1000
      }
      else if (verbatimAcc.toLowerCase().includes("m")) {
        rec.coordinateAccuracyInMeters = num
      }
    }

    //map the new records
    var newRec = {
      oldCountry: rec.country,
      verbatimLocality: rec.verbatimLo,
      country: rec.ADM0,
      stateProvince: rec.ADM1? rec.ADM1 + " " + rec.admin1_type : null,
      county: rec.ADM2? rec.ADM2 + " " + rec.admin2_type : null,
      decimalLatitude: rec.fixedLat? Number(rec.fixedLat) : null,
      decimalLongitude: rec.fixedLng? Number(rec.fixedLng) : null,
      coordinateAccuracyInMeters: rec.coordinateAccuracyInMeters || null,
      georeferencedBy: rec.georeferencedBy,
      georeferencedDate: rec.georeferencedDate,
      georeferenceSources: rec.source || null,
      georeferenceRemarks: rec.georeferenceRemarks || null
    }

    newData.push(newRec)

  });

  //write it out again
  writeCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/georeferencedLocalitiesFinal.csv", newData)
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
