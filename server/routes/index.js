var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb').MongoClient

let DB_conn_str = 'mongodb://localhost:27017/mall'

let database = ''

MongoClient.connect(DB_conn_str,(err,db) => {
  if(err){
    console.log(err);
  }else {
    database = db;
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express','database':database.toString()});
});

module.exports = router;
