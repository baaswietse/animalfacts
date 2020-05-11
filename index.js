var catFacts = require('cat-facts');
var dogFacts = require('dog-facts')
var randomPuppy = require('random-puppy');
var request = require('request')
var parser = require('fast-xml-parser');
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req,res){
    res.redirect("/dog/jpg")
})

app.get("/cat/jpg", function(req,res){
	request('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=jpg', function(error, response, body){
    if(!error && response.statusCode == 200){
    	//Parse the xml to json
        var jsonObj = parser.parse(body);						
        var catPicture = jsonObj.response.data.images.image.url
        res.render("indexCat.ejs", {fact: catFacts.random(), picture: catPicture})
    };
    
})        
})

app.get("/cat/gif", function(req,res){
	request('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=gif&', function(error, response, body){
    if(!error && response.statusCode == 200){
    	//Parse the xml to json
        var jsonObj = parser.parse(body);						
        var catPicture = jsonObj.response.data.images.image.url
        res.render("indexCat.ejs", {fact: catFacts.random(), picture: catPicture})
    };
    
})        
})

app.get("/dog/jpg", function(req,res){
    randomPuppy().then(url => {
        var dogPicture = url
        res.render("indexDog.ejs", {fact: dogFacts.random(), picture: dogPicture})
    })
})

app.get("/dog/gif", function(req,res){
	request('https://api.giphy.com/v1/gifs/random?api_key=PJrcNHhF4L8Uqq9Xtjv96uXAQbr499YR&tag=cute funny dog&rating=G', function(error, response, body){
    if(!error && response.statusCode == 200){
        var dogPicture = JSON.parse(body)
        res.render("indexDog.ejs", {fact: dogFacts.random(), picture: dogPicture.data.image_url})
    };
    
})        
})

app.listen(3000);
