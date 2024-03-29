const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//set up route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jason J Brunet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Jason J Brunet'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jason J Brunet',
        message: 'Wherever you are celebrating Thanksgiving today, please remember that'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "An address is required."
        })
    }
    const location = req.query.address
    geocode(location, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, {summary, temp, rain, humidity}) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                location,
                summary,
                temp,
                rain,
                address: location,
                humidity: humidity
            })
        }) 
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jason J Brunet',
        message: 'Help is on the way!'
    })
})

//404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jason J Brunet',
        message: '404ed!!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})