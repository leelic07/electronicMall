/**
 * Created by Administrator on 2017/11/19 0019.
 */
let user = require('./User.js');

console.log(`userName:${user.userName}`);

console.log(`sayHello:${user.sayHello()}`);

let http = require('http');

let server = http.createServer((req,res) => {
  res.statusCode == 200;

  res.setHeader('Content-Type','text/plain;charset=utf-8');

  res.end('Hello,NodeJs');

});

server.listen(3000,'127.0.0.1',() => {
  console.log("please access 'http://127.0.0.1:3000'");
});
