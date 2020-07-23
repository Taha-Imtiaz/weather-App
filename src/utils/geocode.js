const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGFoYWltdGlheiIsImEiOiJja2NkZzU0a2cwZTh6MnpvYm00ZGw2YXFmIn0.zEj_kW-6EIsVYV6JN6U5mQ&limit=1"
    
    request({url:url, json:true}, (error,response) => {

        const {body} = response
    
        if(error) {
            // error occurs so 2nd argument in the callback is undefined by default or we can write undefined expilicitely
            //network connection error
            callback("Unable to connect to location services!", undefined)
        }
        else if (body.features.length === 0) {
            //wrong input error
        callback("Unable to find location.Try another search", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    
    }

    module.exports = geocode