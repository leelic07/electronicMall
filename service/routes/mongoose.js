/**
 * Created by Administrator on 2018/2/3 0003.
 */
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mall', (err) => {
  if (err)
    console.log('连接失败！');
  else if (!err) {
    console.log('连接成功！');
    let schema = mongoose.Schema({name: {type: String, required: true}, age: {type: Number, default: 18}});
    let myModel = mongoose.model('myModel', schema);
    // myModel.create({name: '白雪公主', age: 60}, {name: '灰姑娘', age: 75}, (err, doc1, doc2) => {
    //   console.log(doc1, doc2);
    // });
    // myModel.find({
    //   $where: function () {
    //     return new RegExp('灰').exec(this.name);
    //   }
    // }, (err, doc) => {
    //   !err && console.log(doc);
    // });
    // myModel.updateMany({name: new RegExp('雪')}, {age: 23}, (err, raw) => {
    //   console.log(raw);
    //   myModel.find((err, doc) => {
    //     !err && console.log(doc);
    //   });
    // });
    // myModel.find({name: {$regex: '灰'}}, (err, docs) => {
    //   !err && docs.forEach((item, key, arr) => {
    //     item.name = '灰姑娘你好吗？';
    //     item.save();
    //   });
    //   console.log(docs);
    // });
    // myModel.find().sort('-age').exec((err, docs) => {
    //   !err && console.log(docs);
    // })
    // myModel.find().skip(1).limit(3).exec((err, docs) => {
    //   !err && console.log(docs);
    // })
    myModel.find().select('-_id').exec((err, docs) => {
      !err && console.log(docs);
    })
  }
});

// setTimeout(() => {
//   mongoose.disconnect((err) => {
//     if (!err) console.log('断开连接！');
//   });
// }, 1000);

