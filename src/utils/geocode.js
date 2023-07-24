const request = require("request");

const geocode = (address, callback) => {
  // e5889fce44a8de4cb30330c97f1ab0c7

  const url =
    "http://api.weatherapi.com/v1/current.json?key=a2638618ff73401c82253556232007&q=" +
    address +
    "&aqi=yes";
  // 'https://api.weatherstack.com/current?access_key=77b9327b54aee665bea023c726e33bf5&query=india'
  // 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e5889fce44a8de4cb30330c97f1ab0c7';
  request(url, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
      // } else if (res.body.features.length === 0) {
      //   callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, { location: JSON.parse(res.body) });
    }
  });
};

module.exports = geocode;
