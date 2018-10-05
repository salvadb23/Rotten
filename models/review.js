const mongoose = require('mongoose');

const Review = mongoose.model('Review',{
	title: String,
	movieTitle: String,
	movieRating: String,
	description: String,
	movieId: { type: String, required: true }
});

 module.exports = Review;