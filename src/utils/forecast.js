const request = require("request");

const foreCast = (city, country, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=1f397ae74104ce2c4edb862a779b2a21`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to devices", undefined);
    } else if (body.message) {
      callback("Unable to find location, try another", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = foreCast;
