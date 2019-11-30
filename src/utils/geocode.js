const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhyZWVuaW5qYXMiLCJhIjoiY2p6bHg4cmoxMTA5ajNocGdka3lodWJxcyJ9.S9gvPgYxU1YL5kH-yQ2FtQ&limit=1'

    request({
        url,
        json:true
    }, (error, {body}) => { console.log(url)
        if (error) {
            callback({error:'Unable to connect to location services.'})
        } else if (body.features.length === 0) {
            callback({error: 'Unable to find location. Try another search.'})
        } else { 
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode