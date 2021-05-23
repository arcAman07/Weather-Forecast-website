const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
  res.sendFile(__dirname+"/second.html");


  })
  app.post("/",function(req,res){
    const query = req.body.cityName
  const address = "https://api.openweathermap.org/data/2.5/find?q="+query+"&units=metric&appid=cbbf3324be040d15fb8a5e5e49da11da";
  https.get(address,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const final_data = JSON.parse(data)
      const temp = final_data.list[0].main.temp
      const description = final_data.list[0].weather[0].description
      const latitude = final_data.list[0].coord.lat
      const longitude = final_data.list[0].coord.lon
      const rain = final_data.list[0].rain
      const humid = final_data.list[0].main.humidity
      const icon=final_data.list[0].weather[0].icon
      const id = final_data.list[0].weather[0].id
      const icon_url = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write('<h2>The Temperature in '+query+ ' is ' +temp+' degrees Celsius.</h2>');
      res.write('<p>The Weather Description in '+query+ ' is '+ description+'.</p>');
      res.write('<p>The Latitude of '+query+ ' is '+latitude+' degrees.</p>');
      res.write('<p>The Longitude of '+query+ ' is '+longitude+' degrees.</p>');
      res.write('<p>The Probability of Rain in '+query+ ' is '+rain+'.</p>');
      res.write('<p>The Percentage of Humidity in '+query+ ' is '+humid+'.</p>');
      res.write('<h3>The Weather Id of '+query+ ' is '+id+'.</h3');
      res.write("<img src="+ icon_url +">");
      res.write('<h3>For details regarding the Weather Id: Refer the link given below.</h3');
      res.write('<a href="https://openweathermap.org/weather-conditions"> For More Details regarding Weather Id: </a');
      res.send();
  })
})
})
app.listen(3000, function(){
  console.log("The server is perfectly working");
})
