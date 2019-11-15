const client = require("cloud-config-client");
var http = require("http");
var configs = ""
client.load({
    application: "invoices",
    endpoint: "http://10.0.18.19:8888"
}).then((config) => {
    // Look for a key
    const value1 = config.get("info.foo");
    config.forEach((key, value) => console.log(key + ":" + value)); 
    configs = config.get("info.foo");
    // Using a prefix, this is equivalent to .get("this.is.another.key");
    const value2 = config.get("this.is", "another.key");
});


http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('info.foo param is: ' + configs);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
