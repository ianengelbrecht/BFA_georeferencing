var readCSV = require("./readCSV")
var writeCSV = require('./writeCSV')

readCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/IntegratedData.csv")
.then(originalCSVObj=> {
  readCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/georeferencedLocalitiesFinal.csv")
  .then(georefCSVObj => {

    originalData = originalCSVObj.data
    originalEncoding = originalCSVObj.originalEncoding
    georefs = georefCSVObj.data

    //counters
    var updatedOriginalRecords = 0
    var georeferencesUsed = 0
    var georefMultipleMatches = 0

    var georefsNotUsed = []
    var originalsNotUpdated = []
    var originalsWithMultipleMatches = {}
    var georefsForMultipleMatches = {}

    georefs.forEach(georef => {

      var georefUsed = false;

      //find the relevant records in originalData
      originalData.forEach(original => {
        if (georef.verbatimLocality && original.verbatimLocality && georef.verbatimLocality.trim() == original.verbatimLocality.trim()){

          if (original.georefUpdated) {
            georefMultipleMatches++
            
            
            if (!originalsWithMultipleMatches[original.datsetRecordID]){
              originalsWithMultipleMatches[original.datasetRecordID] = original
              georefsForMultipleMatches[original.datasetRecordID] = [georef]
            }
            else {
              georefsForMultipleMatches[original.datasetRecordID].push(georef)
            }

          }
          else {
            original.country = georef.country
            original.stateProvince = georef.stateProvince
            original.county = georef.county
            original.decimalLatitude = georef.decimalLatitude
            original.decimalLongitude = georef.decimalLongitude
            original.coordinateUncertaintyInMeters = georef.coordinateAccuracyInMeters
            original.georeferencedBy = georef.georeferencedBy
            original.georeferencedDate  = georef.georeferencedDate
            original.georeferenceSources = georef.georeferenceSources
  
            if (georef.georeferenceRemarks.trim()) {
              var originalremarks = original.georeferenceRemarks
              original.georeferenceRemarks = georef.georeferenceRemarks + "; " + originalremarks
            }
            else {
              original.georeferenceRemarks = original.georeferenceRemarks.trim()
            }
  
            updatedOriginalRecords++
  
            if (!georefUsed){
              georeferencesUsed++
              georefUsed = true
            }

            original.georefUpdated = true

          }
        }
      })

      if (!georefUsed){
        georefsNotUsed.push(georef)
      }

    });

    //loop through them again to find those not updated
    originalData.forEach(original => {

      if (!original.georefUpdated){
        originalsNotUpdated.push(original)
      }

    })

    console.log(updatedOriginalRecords + " of " + originalData.length + " original records updated")
    console.log("potential multiple updates: " + georefMultipleMatches)
    console.log(georeferencesUsed + " of " + georefs.length + " georeferences used")

    georefNamesNotUsed = georefsNotUsed.filter(i => i.decimalLatitude).map(i => i.verbatimLocality).join("; ")

    console.log("Georeferences not used: " + georefNamesNotUsed)

    //write it out again
    writeCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/IntegratedDataUpdated.csv", originalData, "win1252")
    .then(() => {
      console.log('finished writing updated data file')
      writeCSV("C:/Users/engelbrechti/Google Drive/FBIP Baboon Spiders 2017/Data Mobilization Grant 2016-2017/originalsNotUpdated.csv", originalsNotUpdated, "win1252")
      .then(() => {
        console.log('finished writing originals not updated file')
      })
      .catch(err => {
        throw err
      })
    })
    .catch(err => {
      throw err
    })

  }).catch(err => {
    console.log(err)
  })
})
.catch(err => {
  console.log(err)
})