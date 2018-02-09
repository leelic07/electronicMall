/**
 * Created by Administrator on 2018/2/9/009.
 */
let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [{
    productId: String,
    productName: String,
    salePrice: String,
    productImage: String,
    checked: String,
    productNum: String
  }],
  addressList: Array
});

module.exports = mongoose.model('User', userSchema);
