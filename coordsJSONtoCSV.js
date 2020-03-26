var fs = require('fs')
var parseString = require('xml2js').parseString;
var writeCSV = require('./writeCSV')

var XMLString = fs.readFileSync("C:\\Users\\engelbrechti\\Google Drive\\FBIP Baboon Spiders 2017\\Data Mobilization Grant 2016-2017\\Dimitri unique localities Google Maps check.kml", {encoding: "utf8"})


parseString(XMLString, function (err, result) {
  
  var newObjArray = []

  if(err){
    console.log(err)
  }
  else {
    var PlacemarkArra = result.kml.Document[0].Placemark
    var placemarkObject = PlacemarkArra[0]
    
    PlacemarkArra.forEach(el => {
      var test = ""

      var elExtendedDataArray = el.ExtendedData[0].Data

      var obj = {
        verbatimLocality: el.name[0]
      }

      elExtendedDataArray.forEach(d => {
        
        if(d.$.name != "locality") {
          obj[d.$.name] = d.value[0] || null
        }
      })

      newObjArray.push(obj)

    });

    writeCSV("C:\\Users\\engelbrechti\\Google Drive\\FBIP Baboon Spiders 2017\\Data Mobilization Grant 2016-2017\\Dimitri unique localities Google Maps check.csv",newObjArray)
    .then(() => {
      console.log('finished writing new file')
    })
    .catch(err => {
      throw err
    })
  }
  
});
  




