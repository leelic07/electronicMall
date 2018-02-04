/**
 * Created by Administrator on 2018/2/4 0004.
 */
let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  productId: {type: String, required: true},
  productName: String,
  salePrice: Number,
  checked: String,
  productNum: Number,
  productImage: String
});

module.exports = mongoose.model('Goods', productSchema);
