var express = require('express');
var router = express.Router();
let User = require('../models/users');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne(params, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message
    });
    else if (!err) {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      } else {
        res.json({
          status: '1',
          msg: '用户名或密码不正确！'
        });
      }
    }
  });
});

module.exports = router;
