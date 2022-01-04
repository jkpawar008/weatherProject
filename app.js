const { response } = require("express");
const express = require("express");
const bodyParser= require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname +"/index.html");
})

app.post("/", function (req, res) {
  
  const city=req.body.cityname;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=927520edbb01a318a32d90d45c3f5429&units=metric";
  https.get(url, function (response) { 
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const tempLond=weatherData.main.temp;
      const weatherDesc =weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon;
      const imageUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weatherData.main.temp);
    //   console.log(weatherData.weather[0].description);
        res.write("<p>the weather in "+ city +" is " + weatherDesc + "</p>" );
        res.write("<h1> the temperature in "+ city +" is : " + tempLond + " degree celcius</h1>");
        res.write("<img src="+imageUrl+">");
        res.send();
    });
  });

});

app.listen(3000, function () {
  console.log("your server is up and running on port 3000.");
});
