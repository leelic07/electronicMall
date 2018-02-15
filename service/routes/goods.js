/**
 * Created by Administrator on 2018/2/4 0004.
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
let User = require('../models/users');
//连接mongodb
mongoose.connect('mongodb://localhost/dumall');

mongoose.connection.on('connected', () => console.log('mongoose has been connected'));
mongoose.connection.on('error', () => console.log('mongoose has been error'));
mongoose.connection.on('disconnected', () => console.log('mongoose has been disconnected'));

//查询商品列表数据
router.get('/list', (req, res, next) => {
  // Goods.remove((err, docs) => {
  //   console.log(docs);
  // });
  // Goods.insertMany([{
  //   "productId": "10001",
  //   "productName": "小米6",
  //   "salePrice": "2499",
  //   "productImage": "mi6.jpg",
  //   "productNum": 10,
  //   "checked": ""
  // },
  //   {
  //     "productId": "10002",
  //     "productName": "小米笔记本",
  //     "salePrice": "3999",
  //     "productImage": "note.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10003",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "mi6.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10004",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "1.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10005",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "2.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10006",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "3.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10007",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "4.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10008",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "5.jpg",
  //     "productNum": 10,
  //     "checked": ""
  //   }], (err, docs) => {
  //   console.log(docs);
  // });
  // Goods.find((err, docs) => {
  //   console.log(docs);
  // });
  // Goods.find({productId: {$in: ["10002"]}}, (err, docs) => {
  //   docs.forEach((item, index, arr) => {
  //     item.productImage += 'g';
  //     item.save();
  //   });
  //   console.log(docs);
  // });

  // Goods.updateMany({productName: '小米笔记本'}, {productImage: 'note.jpg'}, (err, doc) => {
  //   !err && console.log(doc);
  // });

  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let skip = (page - 1) * pageSize;
  let sort = req.param('sort');
  let priceLevel = req.param('priceLevel');
  let priceGt = '', priceLt = '';
  let params = {};
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '1':
        priceGt = 0;
        priceLt = 100;
        break;
      case '2':
        priceGt = 100;
        priceLt = 500;
        break;
      case '3':
        priceGt = 500;
        priceLt = 1000;
        break;
      case '4':
        priceGt = 1000;
        priceLt = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lt: priceLt
      }
    }
  }
  // else {
  //   skip = 0;
  //   params = {};
  // }

  Goods.find(params).skip(skip).limit(pageSize).sort({'salePrice': sort}).exec((err, docs) => {
    if (err)
      res.json({
        status: 1,
        msg: err.message
      });
    else if (!err)
      res.json({
        status: 0,
        msg: '',
        result: {
          count: docs.length,
          list: docs
        }
      });
  });
});

router.post('/addCart', (req, res, next) => {
  // User.insertMany([{
  //   userId: '100000077',
  //   userName: 'lcc',
  //   userPwd: '123456',
  //   orderList: [],
  //   cartList: [],
  //   addressList: []
  // }, {
  //   userId: '100000078',
  //   userName: 'ccl',
  //   userPwd: '123456',
  //   orderList: [],
  //   cartList: [],
  //   addressList: []
  // }, {
  //   userId: '100000079',
  //   userName: 'lcl',
  //   userPwd: '123456',
  //   orderList: [],
  //   cartList: [],
  //   addressList: []
  // }], (err, docs) => {
  //   !err && console.log(docs);
  // });

  let userId = req.cookies.userId, productId = req.body.productId;
  User.findOne({userId: userId}, (err, user) => {
    if (err) res.json({
      status: '1',
      msg: err.message
    });
    else if (!err)
      user && Goods.findOne({productId: productId}, (err, goods) => {
        if (err) res.json({
          status: '1',
          msg: err.message
        });
        else if (!err) {
          let goodItem;
          user.cartList.forEach(good => good.productId === productId && good.productNum++ && (goodItem = good));
          if (goodItem)
            user.save(err => {
              if (err) res.json({
                status: '1',
                msg: err.message
              });
              else if (!err)
                res.json({
                  status: '0',
                  msg: '',
                  result: 'success'
                });
            });
          else if (!goodItem) {
            goods.productNum = 1;
            goods.checked = '1';
            user.cartList.push(goods);
            user.save(err => {
              if (err) res.json({
                status: '1',
                msg: err.message
              });
              else if (!err)
                res.json({
                  status: '0',
                  msg: '',
                  result: 'success'
                });
            });
          } else res.json({
            status: '1',
            msg: '未找到对应商品！'
          });
        }
      }) || res.json({
        status: '1',
        msg: '未找到对应用户！'
      })
  });
});

module.exports = router;
