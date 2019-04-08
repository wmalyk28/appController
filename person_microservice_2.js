const http = require('http');
const fs = require('fs');
var qs = require('querystring');

const hostname = '0.0.0.0';
const port = 3006;
const bodyParser = require("body-parser");
const server = http.createServer((req0, res0) => {
  res0.setHeader('Access-Control-Allow-Origin', '*');
  res0.setHeader('Access-Control-Allow-Headers', 'content-type');
  res0.setHeader('Content-Type', 'application/json');
  
  if (req0.method == 'OPTIONS') {
    res0.statusCode = 200;
    res0.end();
  }else if (req0.method == 'POST') {
    var body = '';

    req0.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    req0.on('end', function () {
        var post = eval("("+body+")");
        
        res0.statusCode = 200;
        res0.setHeader('Content-Type', 'application/json');

        var response = null;
      
        //Simple switch statement, simulating a database pull
        var people = [
          {name: "Joe Smith", address: 1},
          {name: "Jack Smith", address: 1},
          {name: "Jim Smith", address: 3},          
          {name: "Jessica Smith", address: 2},          
          {name: "Jerry Smith", address: 1}
        ]
        
        var person = people[post.id * 1];
      
        if(person){
            var options = {
                'method': 'POST',
                'hostname': '35.193.70.238',
                'path': '/api/fabric/AddressBook/GetDetails',
                'headers': {
                  'X-Auth-Token': 'd2de0bf9-fc03-44f6-89cc-49aff9b9db4c'
                }
              };
        
            var req = http.request(options, function (res) {
                var chunks = [];
              
                res.on("data", function (chunk) {
                  chunks.push(chunk);
                });
              
                res.on("end", function (chunk) {
                  var body = Buffer.concat(chunks);
                  console.log(body.toString());
                  person.address = body;
                  res0.end(JSON.stringify(person));
                });
              
                res.on("error", function (error) {
                  console.error(error);
                });
              });
            var postDataIn =  "{\n  id: " + person.address + "\n}";
            req.write(postData);
            req.end();
            return;
        }
        
        
        res0.end(JSON.stringify(person));
     });        
  }else{
    res0.statusCode = 405;
    res0.end();
  } 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
