const reviews = require('./controllers/reviews');
const Review = require('./models/review')
const Comment = require('./models/comment');
const comments = require('./controllers/comments');
const express = require('express');
const app = express()
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
const methodOverride = require('method-override')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
reviews(app);
comments(app);




app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


