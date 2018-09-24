const Comment = require('../models/comment');
const Review = require('../models/review')
module.exports = (app) => {

app.post('/reviews/comments', (req, res) => {

  Comment.create(req.body)
  .then(comment => {
    res.redirect(`/reviews/${comment.reviewId}`);
  })
  .catch((err) => {
    console.log(err.message);
  });
});

app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})


}