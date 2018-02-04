/**
 * Created by Administrator on 2017/11/19 0019.
 */
let http = require('http');
let fs = require('fs');
let url = require('url');
let util = require('util');

let server = http.createServer((req,res) => {
  res.statusCode == 200;

  res.setHeader('Content-Type','text/plain;charset=utf-8');

  let pathname = url.parse(req.url).pathname;

  fs.readFile(pathname.substring(1),(err,data) => {
    if(err) {
      res.writeHead(404,{
        'Content-Type':'text/html'
      })
    }else {
      res.writeHead(200,{
        'Content-Type':'text/html'
      })

      res.write(data.toString());
    }

    res.end();
  })

});

server.listen(3000,'127.0.0.1',() => {
  console.log("please access 'http://127.0.0.1:3000'");
});
