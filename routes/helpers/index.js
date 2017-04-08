const http = require('http')
const express = require('express')
const router = express.Router()
const BUS_KEY = process.env.DABUS_API_KEY;
const BusDataParser = require('../../lib/BusDataParser')

const BusAPIQuery = (URI, value) => {
  return new Promise ((resolve, reject) => {
    http.get(`${URI}${value}`, function (resp){
      let data = '';
      resp.on('data', function (chunk){
        data += chunk;
      });
      resp.on('end', function (){
        BusDataParser(data)
          .then(result => resolve(result))
          .catch(err => {
            reject(err)
          })
      });
    }).on('error', function (err){
      reject(err)
    });
  })
}

module.exports = {
  http,
  express,
  router,
  BUS_KEY,
  BusAPIQuery,
  BusDataParser
}

