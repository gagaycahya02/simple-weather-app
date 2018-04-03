const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = "9fb3769c30e6f2787654e3accc68aa6a";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/', (req,res) => {
    res.render('index', {weather:null,error:null});
});

app.post('/',(req,res) => {
    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    request(url, (err,response,body) => {
        if(err){
            res.render('index',{weather:null,error: 'Error, please try again.'});
        }else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{weather:null, error:'Error, please try again.'});
            }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name} !`;
                res.render('index',{weather:weatherText,error:null});
            }
        }
    });
});

app.listen(3000,() => {
    console.log('Listen on port 3000');
});