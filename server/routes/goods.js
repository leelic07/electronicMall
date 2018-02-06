/**
 * Created by Administrator on 2017/11/26/026.
 */
let mongoose = require('mongoose');
require('mongodb');

mongoose.connect('mongodb://localhost:27017/mall', (err) => {
  if (err) console.log('连接失败！');
  else if (!err) {
    console.log('连接成功！');
    let schema = new mongoose.Schema({num: Number, name: String, size: String});
    let MyModel = mongoose.model('MyModel', schema);
    let doc1 = new MyModel({size: 'small'});
    console.log(doc1.size);
    doc1.save((err, doc) => {
      console.log(doc);
    });
  }
});

