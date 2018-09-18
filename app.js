const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');