
var csv = require("fast-csv");
var fs = require('fs')
var iconv = require('iconv-lite');

module.exports = function(CSVpath, data, encoding) {

  return new Promise((resolve, reject) =>{
    
    // a default
    if (!encoding){
      encoding = "UTF-8"
    }

    csv
    .writeToStream(
      iconv.encodeStream(encoding).pipe(fs.createWriteStream(CSVpath, {encoding: null})), data, {headers: true})
    .on("finish", () => {
        resolve();
    })
    .on("error", err => {
      reject(err)
    });

  })
  
}