const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2VsbHlhYmxlYWwiLCJhIjoiY2tjeXE5bG1oMGNndTJ0cXJ6YXQyNGtrcCJ9.Fd4vxnljpwdtwGCMOju4SA&limit=1'
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to conect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode