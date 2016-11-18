var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=PUT
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Import the burgers table template from models/burgers.js and the Sequelize methods from models/index.js
var burgers;
var models  = require('./models');

var sequelizeConnection = models.sequelize;

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0').then(function(){
	return sequelizeConnection.sync() //{force:true} empties the table
})

//Redirect the default path to /burgers
app.get('/', function(req, response) {
	response.redirect('/burgers');
});

//Display all burgers via Handlebars format
app.get('/burgers', function(req, response){
	models.burgers.findAll({})
	.then(function(data){
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		return response.render('index', hbsObject);
	});
});

//Update "devoured" from false to true on the posted ID, referenced in the burgers table
app.put('/burgers/update/:id', function(req,response){
	models.burgers.update({
		devoured: true
	},
	{ where: {id : req.params.id} }).then (function(){
		response.redirect('/burgers');
	});
});

//Insert new burger name to burgers table by receiving content from the posted string
app.post('/burgers/create/', function(req,response){
	models.burgers.create({
		burger_name: String([req.body.name]),
		devoured: false //False is the default status
	}).then (function(){
		response.redirect('/burgers');
	});
})

//Listener on remote or local environment
app.listen(process.env.PORT || 8080);