const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});
const methodOverride = require('method-override')



// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Hello World!' });
// })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.post('/reviews', (req, res) => {
//   console.log(req.body);
//   // res.render('reviews-new', {});
// })
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id,).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
