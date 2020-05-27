var express = require("express");
var router = express.Router();
const { getForecast } = require("../modules/openweathermap");

/* GET weather page. */
router.get("/", async function(req, res) {

  if(!validateWeatherRequest(res, req.query)) return;

  getForecast(req.query.city)
    .then((response) => {
      const startDate = new Date(req.query.startDate).toLocaleDateString("pt-PT")
      const endDate = new Date(req.query.endDate).toLocaleDateString("pt-PT")
      const list = response.data.list
      let _items = []
      let i = 0
      let date = (new Date(list[0].dt * 1000).toLocaleDateString("pt-PT"))
      let weather_main = list[0].weather[0].main
      let weather_description = list[0].weather[0].description
      let maxs = []
      let mins = []
      while(i < list.length) {
        let temp_date = new Date(list[i].dt * 1000).toLocaleDateString("pt-PT")
        if(temp_date !== date){
          _items.push({
            date: date,
            min: Math.min.apply(Math, mins),
            max: Math.max.apply(Math, maxs),
            weather_main: weather_main,
            weather_description: weather_description
          })
          maxs = [list[i].main.temp_max]
          mins = [list[i].main.temp_min]
          date = temp_date
          weather_main = list[i].weather[0].main
          weather_description = list[i].weather[0].description
        } else {
          maxs.push(list[i].main.temp_max)
          mins.push(list[i].main.temp_min)
        }
        i++
      }

      let data = []
      _items.forEach(item => {
        if(item.date >= startDate && item.date <= endDate){
          data.push(item)
        }
      })
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: 'An error occured while getting the forecast',
        error: err
      })
    })
});

// Validate get weather request
validateWeatherRequest = (res, query) => {
  if(query.city === undefined){
    res.status(400).send({
      message: 'No city provided for weather forecast'
    })
    return false;
  }

  return true;
}

module.exports = router;
