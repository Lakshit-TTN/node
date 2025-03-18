// var fs = require('fs');
//  var contents = fs.readFile('data.txt','utf8', function(err,content){
//    console.log(content);
// });
//  console.log("Hello Node");


//USING EXPORT
// exports.funcExport = function () {
//     console.log("using exports");
// };

// using module.exports
// module.exports = function funcModuleExport() {
//     console.log("using module.exports");
// };

//if we try to use both 
//module.export gets priority 


const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3001;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  const todo = fs.readFileSync("index.html");
  res.end(todo);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});






