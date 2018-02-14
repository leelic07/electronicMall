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

//登出接口
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '退出登录成功！',
    result: ''
  });
});

//获取用户的购物车接口
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message
    });
    else res.json({
      status: '0',
      msg: '',
      result: doc.cartList
    });
  });
});

//删除商品接口
router.post('/cartDel', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  User.update({userId: userId}, {
    $pull: {
      cartList: {
        productId: productId
      }
    }
  }, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
    else res.json({
      status: '0',
      msg: '删除商品成功！',
      result: ''
    });
  });
});

//编辑商品接口
router.post('/editCart', (req, res, next) => {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({userId: userId, 'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: '编辑商品数量失败',
      result: ''
    });
    else res.json({
      status: '0',
      msg: '编辑商品成功',
      result: ''
    });
  });
});

//查询地址列表功能
router.get('/addressList', (req, res, next) => {
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, (err, docs) => {
    if (err) res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
    else res.json({
      status: '1',
      msg: '',
      result: docs.addressList
    });
  });
});

module.exports = router;
