/**
 * Created by Administrator on 2018/2/4 0004.
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');

//连接mongodb
mongoose.connect('mongodb://localhost/dumall');

mongoose.connection.on('connected', () => console.log('mongoose has been connected'));
mongoose.connection.on('error', () => console.log('mongoose has been error'));
mongoose.connection.on('disconnected', () => console.log('mongoose has been disconnected'));

//查询商品列表数据
router.get('/', (req, res, next) => {
  // Goods.remove((err, docs) => {
  //   console.log(docs);
  // });
  // Goods.insertMany([{
  //   "productId": "10001",
  //   "productName": "小米6",
  //   "salePrice": "2499",
  //   "productImage": "mi6.jp",
  //   "productNum": 10,
  //   "checked": ""
  // },
  //   {
  //     "productId": "10002",
  //     "productName": "小米笔记本",
  //     "salePrice": "3999",
  //     "productImage": "note.j",
  //     "productNum": 10,
  //     "checked": ""
  //   },
  //   {
  //     "productId": "10003",
  //     "productName": "小米6",
  //     "salePrice": "2499",
  //     "productImage": "mi6.jp",
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
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let skip = (page - 1) * pageSize;
  let sort = req.param('sort');
  Goods.find().skip(skip).limit(pageSize).sort({'salePrice': sort}).exec((err, docs) => {
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

module.exports = router;
