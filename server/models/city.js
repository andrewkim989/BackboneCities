var citySchema = new mongoose.Schema({
	name: {type: String, required: true},
	population: {type: Number, required: true},
	country: {type: String, required: true}
});

mongoose.model('City', citySchema);