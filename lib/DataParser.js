// Converts Array values ot it's first string value

const busParser = (data) => {
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

module.exports = busParser
