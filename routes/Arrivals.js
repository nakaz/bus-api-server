const {
  http,
  express,
  router,
  BUS_KEY,
  BusAPIQuery
} = require('./helpers')

const ARRIVAL_URL = 'http://api.thebus.org/arrivals/?key=';
const STOP_PARAM = '&stop=';

const ARRIVAL_URI = `${ARRIVAL_URL}${BUS_KEY}${STOP_PARAM}`

router.get('/stop/:stopId', (req, res) => {
  const stopId = req.params.stopId
  BusAPIQuery(ARRIVAL_URI, stopId)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500)
      res.json({error: err})
    })
})

module.exports = router
