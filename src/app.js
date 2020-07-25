const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
 
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Use hbs
app.set('views', viewsPath) // Set the views directory
hbs.registerPartials(partialsPath)

// Expose public folder (setup static directory to serve)
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render(('index'), {
        title: 'Weather',
        name: 'Kelly Neves'            
    })
})

app.get('/about', (req, res) => {
    res.render(('about'), {
        title: 'About',
        name: 'Kelly Neves'
    })
})

app.get('/help', (req, res) => {
    res.render(('help'), {
        title: 'Help',
        message: 'Help page.',
        name: 'Kelly Neves'     
    })
})

app.get('/help/*', (req, res) => {
    res.render(('404'), {
        title: 'Page not found',
        message: 'Help article not found.',
        name: 'Kelly Neves'    
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })

    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: 'Unable to find the latitude and longitude for the address.'
            })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Unable to find forecast data for the address.'
                })
            }
            
            res.send(
                {
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                }
            )
        })
        
    })

})

app.get('*', (req, res) => {
    res.render(('404'), { title: "Page not found", message: 'My 404 page.'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})