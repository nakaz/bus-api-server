const {
  http,
  express,
  router,
  BUS_KEY,
  BusAPIQuery
} = require('./helpers')

const ROUTE_URL = 'http://api.thebus.org/route/?key=';
const BUS_NUM_PARAM = '&route=';
const BUS_NAME_PARAM = '&headsign=';

const NUM_URI = `${ROUTE_URL}${BUS_KEY}${BUS_NUM_PARAM}`;
const NAME_URI = `${ROUTE_URL}${BUS_KEY}${BUS_NAME_PARAM}`;

router
  .get('/number/:number', (req, res) => {
    const routeNum = req.params.number
    BusAPIQuery(NUM_URI, routeNum)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500)
        res.json({error: err})
      })
  })
  .get('/name/:name', (req, res) => {
    const routeName = req.params.name
    BusAPIQuery(NAME_URI, routeName)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        res.status(500)
        res.json({error: err})
      })
  })

module.exports = router

