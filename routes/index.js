let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/siwesReg', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
