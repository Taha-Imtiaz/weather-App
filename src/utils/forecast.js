const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    `https://api.darksky.net/forecast/2acc0453a67699a9d6e2bc88aa97c759/${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {

    const {body} = response
    if (error) {
      // error occurs so 2nd argument in the callback is undefined by default or we can write undefined expilicitely
      //low level error(network disconnect)
      callback("Unable to connect to weather service!", undefined);
    }
    else if (body.error) {
          //giving wrong input error.
        callback("Unable to find location!", undefined)
    }
    else {
        callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out and there is ${body.currently.precipProbability}% chance of rain`)
    }
  });
};

module.exports = forecast