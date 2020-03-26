//RETURNS A PROMISE THAT RESOLVES TO AN ARRAY OF OBJECTS FROM A CSV FILE

var csv = require("fast-csv");
var chardet = require('chardet');
var fs = require('fs')
var iconv = require('iconv-lite');

module.exports = function(CSVpath) {

  return new Promise((resolve, reject) =>{
    var dataArr = []

    //because we read files created in excel, we need the encoding
    chardet.detectFile(CSVpath, (err, encoding) => {

      if(err){
        console.log("error reading encoding of file")
        throw err
      }
      //else
      var csvStream = csv
        .parse({headers: true})
        .on("data", function(data){
          dataArr.push(data)
        })
        .on("end", function(){
          returnObj = {data: dataArr,
          originalEncoding: encoding }
          resolve(returnObj)
        })
        .on("error", function(err){
          reject(err)
        });

      fs.createReadStream(CSVpath)
        .pipe(iconv.decodeStream(encoding))
        .pipe(csvStream)

    })

  })

    
}