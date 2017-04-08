const xml2js = require('xml2js');
const xmlParser = new xml2js.Parser();

const BusDataParser = (data) => {
  return new Promise ((resolve, reject) => {
    xmlParser.parseString(data, (err, result) => {
      if ( err ) reject(err)
      resolve(busDataCleaner(result))
    })
  });
}

const busDataCleaner = (data) => {
  let field = Object.assign({}, data[Object.keys(data)[0]])
  for(var key in field){
    if(field[key].length > 1){
      field[key].map(item => {
        for(var i in item){
          item[i] = item[i][0]
        }
      })
    }else{
      field[key] = field[key][0]
    }
  }
  return field;
}

module.exports = BusDataParser
