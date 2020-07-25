const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e038dd4d98137e7c54cfa5e3ec660e3&query=' + latitude + "," + longitude
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to conect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                forecast: "It's " + body.current.observation_time + " in " + body.location.name + ", " + body.location.region + " - " + body.location.country,
                temperature: body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.",
                humidity: "Humidity: " + body.current.humidity
            })
        }
    })
}

module.exports = forecast