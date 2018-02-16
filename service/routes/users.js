var express = require('express');
var router = express.Router();
let User = require('../models/users');
require('../util/util');
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
      status: '0',
      msg: '',
      result: docs.addressList
    });
  });
  // User.findOne((err, doc) => {
  //   if (!err) {
  //     doc.userId = '1000077';
  //     doc.userName = 'lcc';
  //     doc.userPwd = '123456';
  //     doc.addressList = [{
  //       addressId: '1001',
  //       userName: 'lcc',
  //       streetName: '芙蓉北路',
  //       postCode: 410006,
  //       tel: 18645738234,
  //       isDefault: false
  //     }, {
  //       addressId: '1002',
  //       userName: 'lcc',
  //       streetName: '劳动西路',
  //       postCode: 410005,
  //       tel: 18645738234,
  //       isDefault: true
  //     }, {
  //       addressId: '1003',
  //       userName: 'lcc',
  //       streetName: '侯家塘',
  //       postCode: 410007,
  //       tel: 18645738234,
  //       isDefault: false
  //     }, {
  //       addressId: '1004',
  //       userName: 'lcc',
  //       streetName: '曙光中路',
  //       postCode: 410008,
  //       tel: 18645738234,
  //       isDefault: false
  //     }];
  //     doc.save((err, doc) => {
  //       !err && console.log(doc);
  //     })
  //   }
  // });
});

//设置默认的收获地址
router.post('/setDefault', (req, res, next) => {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;
  User.findOne({userId: userId}, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
    else {
      doc.addressList.forEach(item => {
        item.addressId === addressId && (item.isDefault = true) || (item.isDefault = false);
      });
      doc.save((err, doc) => {
        if (err) res.json({
          status: '1',
          msg: '设置默认地址失败',
          result: ''
        });
        else res.json({
          status: '0',
          msg: '设置默认地址成功',
          result: ''
        });
      });
    }
  })
});

//删除地址接口
router.post('/delAddress', (req, res, next) => {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;
  if (!addressId) res.json({
    status: '1',
    msg: '收件地址id不能为空',
    result: ''
  });
  else User.update({userId: userId}, {
    $pull: {
      addressList: {
        addressId: addressId
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
      msg: '删除收件地址成功',
      result: ''
    });
  })
});

//生成订单接口
router.post('/payment', (req, res, next) => {
  let userId = req.cookies.userId,
    orderTotal = req.body.orderTotal,
    addressId = req.body.addressId;
  User.findOne({userId: userId}, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
    else {
      if (doc) {
        //获取用户的地址信息
        let address;
        doc.addressList.forEach(item => item.addressId === addressId && (address = item));
        //获取用户的商品订单信息
        let goodsList = doc.cartList.filter(item => item.checked === '1');

        let platCode = '622';
        let r1 = ~~(Math.random() * 10);
        let r2 = ~~(Math.random() * 10);
        let sysTime = new Date().Format('yyyyMMddhhmmss');
        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let orderId = `${platCode}${r1}${sysTime}${r2}`;
        let order = {
          orderId: orderId,
          orderTotal: orderTotal,
          orderStatus: '1',
          addressInfo: address,
          goodsList: goodsList,
          createDate: createDate
        };
        doc.orderList.push(order);
        doc.save((err, doc) => {
          if (err) res.json({
            status: '1',
            msg: err.message,
            result: ''
          });
          else res.json({
            status: '0',
            msg: '生成订单成功',
            result: {
              orderTotal: orderTotal,
              orderId: orderId
            }
          });
        });
      }
    }
  })
});

//查询订单信息
router.get('/orderDetail', (req, res, next) => {
  let userId = req.cookies.userId,
    orderId = req.param('orderId');
  User.findOne({userId: userId}, (err, doc) => {
    if (err) res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
    else {
      if (orderId) {
        let order = doc.orderList.find(item => item.orderId === orderId);
        if (order) res.json({
          status: '0',
          msg: '查询订单成功',
          result: {
            orderId: order.orderId,
            orderTotal: order.orderTotal
          }
        });
        else res.json({
          status: '120001',
          msg: '无此订单',
          result: {
            orderId: '',
            orderTotal: ''
          }
        });
      } else res.json({
        status: '120002',
        msg: '请提供查询的订单号',
        result: ''
      });
    }
  });
});

module.exports = router;
