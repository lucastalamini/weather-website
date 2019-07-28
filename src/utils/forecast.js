const request = require('request')

const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/58f329e43160d82016002ad2e5bbd122/' + latitude + ',' + longitude + '?units=si'
  
   request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
        callback('Unable to find location.', undefined)
    } else if ((parseFloat(body.currently.precipProbability) * 100) > 40) {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' °C out. There is a ' +  (parseFloat(body.currently.precipProbability) * 100) + '% chance of rain. Consider bringing an umbrella.')
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' °C out. There is a ' +  (parseFloat(body.currently.precipProbability) * 100) + '% chance of rain.')
    }
})
}

module.exports = forecast