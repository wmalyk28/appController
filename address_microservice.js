const http = require('http');
const fs = require('fs');
var qs = require('querystring');

const hostname = '0.0.0.0';
const port = 3006;
const bodyParser = require("body-parser");
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method == 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  }else if (req.method == 'POST') {
    var body = '';

    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    req.on('end', function () {
        var post = eval("("+body+")");
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        var response = null;
      
        //Simple switch statement, simulating a database pull
        if(post.id * 1 == 1){
            response = {
              street: "Address 1",
              city: "New York",
              state: "NY",
              zip: "92312"
            }
        }
        if(post.id * 1 == 2){
            response = {
              street: "Address 2",
              city: "Chicago",
              state: "IL",
              zip: "24332"
            }
        }
        if(post.id * 1 == 3){
            response = {
              street: "Address 3",
              city: "San Francisco",
              state: "CA",
              zip: "54231"
            }
        }
      
        res.end(JSON.stringify(response));
     });        
  }else{
    res.statusCode = 405;
    res.end();
  } 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
