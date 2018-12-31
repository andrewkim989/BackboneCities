//require controllers
var cities = require('./../controllers/cities.js');

module.exports = function(app){
	app.get('/cities', cities.all);

	app.get('/cities/:id', cities.show);

	app.post('/cities', cities.create);

	app.put('/cities/:id', cities.update);

	app.delete('/cities/:id', cities.destroy);

}
