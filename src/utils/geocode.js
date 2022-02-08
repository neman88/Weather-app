const request = require("request");

const geoCode = (lon, lat, callback) => {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=1f397ae74104ce2c4edb862a779b2a21`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the services!", undefined);
    } else if (body.message) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        country: body[0].country,
        state: body[0].state,
        city: body[0].name,
      });
    }
  });
};

module.exports = geoCode;
