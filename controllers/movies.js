const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('1844c1520492132df706918f9cb11a7a')
const Review = require('../models/review');

module.exports = app => {

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {

    // FIND THIS MOVIE'S REVIEWS
    Review.find({ movieId: req.params.id }).then(reviews => {
      // THEN RENDER THE MOVIES-SHOW TEMPLATE
      res.render('movies-show', { movie: movie, reviews: reviews });
    }).catch(console.error);

  }).catch(console.error);
});

}