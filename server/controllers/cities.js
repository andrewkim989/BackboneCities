//require any models
var City = mongoose.model('City');

module.exports = (function (){
	return{
		all: function(req, res){
			City.find({}, function(err, cities){
				if (err){
					console.log('error grabbing cities');
					res.json(false);
				}else{
					res.json(cities);
				}
			});
		},
		show: function(req, res){
			City.findOne({_id: req.params.id}, function(err, city){
				if (err){
					console.log('error grabbing city');
					res.json(false);
				}else{
					res.json(city);
				}
			});
		},
		create: function(req, res){
			City.create({name: req.body.name, population: req.body.population, country: req.body.country}, function(err, city){
				if (err){
					console.log('city could not be saved');
					res.json(false);
				}else{
					console.log('city saved');
					res.json(true);
				}
			});
		},
		update: function(req, res){
			// console.log('update came in', req.body);

			City.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name, country: req.body.country, population: req.body.population }}, function (err, city){
				if (err){
					console.log('error updating city info');
					res.json(false);
				}else{
					console.log('updated city info!');
					res.json(true);
				}
				// console.log(city, ' is being updated to ...');
				// City.findOne({_id: req.params.id}, function(err, city){
				// 	var cityUpdates = city;
				// 	console.log(cityUpdates);
				// });
			});

		},
		destroy: function(req, res){
			City.findOneAndRemove({_id: req.params.id}, function (err){
				if (err){
					console.log('error destroying city');
					res.json(false);
				}else{
					console.log('city destroyed!');
					res.json(true);
				}
			});
		}
	}
})();
