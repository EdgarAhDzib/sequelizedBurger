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

var burgers;
var models  = require('./models');

var sequelizeConnection = models.sequelize;

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0').then(function(){
	return sequelizeConnection.sync() //{force:true} empties the table
})

app.get('/', function(req, response) {
	response.redirect('/burgers');
});

app.get('/burgers', function(req, response){
	models.burgers.findAll({})
	.then(function(data){
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		return response.render('index', hbsObject);
	});
});

app.put('/burgers/update/:id', function(req,response){
	models.burgers.update({
		devoured: true
	},
	{ where: {id : req.params.id} }).then (function(){
		response.redirect('/burgers');
	});
});

app.post('/burgers/create/', function(req,response){
	models.burgers.create({
		burger_name: String([req.body.name]),
		devoured: false
	}).then (function(){
		response.redirect('/burgers');
	});
})

app.listen(process.env.PORT || 8080);