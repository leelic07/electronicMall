/**
 * Created by Administrator on 2018/1/31/031.
 */
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mall', (err) => {
  if (err) console.log('连接失败！');
  else if (!err) {
    console.log('连接成功！');
    // let schema = new mongoose.Schema({age: Number, name: String});
    // let myModel = mongoose.model('myModel', schema);
    // myModel.create({name: '蓝精灵', age: 80}, {name: '小矮人', age: 65}, (err, ...doc) => {
    //   doc.map(d => console.log(d));
    // });
    //
    // mongoose.model('yourModel', schema).insertMany([{name: '灰姑娘', age: 75}, {name: '白雪公主', age: 85}], (err, ...docs) => {
    //   docs.map(doc => console.log(doc));
    // });
    let schema = new mongoose.Schema({age: Number, name: String});
    let myModel = mongoose.model('myModel', schema);
    let yourModel = mongoose.model('yourModel', schema);
    // myModel.find({age: {$gt: 60}, name: new RegExp('小')}, {name: 1, _id: 0}, {skip: 1}, (err, doc) => {
    //   !err && console.log(doc);
    // });
    // yourModel.find((err, doc) => {
    //   !err && console.log(doc);
    // })

    // let tempArr = [];
    // myModel.find((err, docs) => {
    //   !err && docs.forEach((item, index, arr) => {
    //     tempArr.push(item._id);
    //   });
    //   myModel.findById(tempArr[0]).exec((err, doc) => {
    //     !err && console.log(doc);
    //   });
    // });

    myModel.find({
      $where: function () {
        return this.name === '蓝精灵'
      }
    }, (err, doc) => {
      !err && console.log(doc);
    });
  }
});
