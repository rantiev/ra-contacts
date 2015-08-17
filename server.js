var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var mongooseQ = require('mongoose-q')();

var app = express();
var router = express.Router();

var ContactS = new mongooseQ.Schema({
	name: String,
	email: String,
	phone: String,
	dateOfBirth: Date
});

var ContactM = mongooseQ.model('Contact', ContactS);


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

router.get('/contacts', function(req, res){

	ContactM.findQ({})
		.then(function(contacts){
			res.status(200);
			res.json(contacts);
		})
		.catch(function(err){
			res.status(404)
			res.send();
		});

});

router.post('/contact', function(req, res){

	var contact = new ContactM(req.body);

	contact.saveQ()
		.then(function(contact){
			res.status(201);
			res.json(contact);
		})
		.catch(function(){
			res.status(404)
			res.send(err);
		});

});

app.use('/', router);

app.listen(9999, function(){
	console.log('Listening on port 9999');
});

mongoose.connect('mongodb://127.0.0.1:27017/ra-contacts');

