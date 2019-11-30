const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b9844caeab1557108de2562045b59eb9/'+latitude+','+longitude+'?units=us'

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            console.log({error:'Unable to connect to weather service.'})
        } else {
            if (body.error) {
                console.log({error:'Unable to find location.'})
            } else {
                callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temp: 'It is currently ' + body.currently.temperature + 'F outside.',
                    rain: 'There is a ' + body.currently.precipProbability + '% chance of rain.'
                })
            }
        }
    })
}

module.exports = forecast