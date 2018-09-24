const mongoose = require('mongoose');

const review = mongoose.model('Review',{
	title: String,
	movieTitle: String,
	movieRating: String,
	description: String,
});

 module.exports = review;