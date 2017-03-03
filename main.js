var express = require('express');
var app = express();
const hostname = '127.0.0.1';
const port = 8090;

app.use(express.static('res'));
//
app.use("/js", express.static(__dirname + "/../resources/js"));
app.use("/img", express.static(__dirname + "/../resources/img"));
app.use("/css", express.static(__dirname + "/../resources/css"));
app.use("/fonts", express.static(__dirname + "/../resources/fonts"));

app.use("/page", express.static(__dirname + "/../templates"));

app.all("/*", function(req, res){
	res.sendFile( __dirname + "/res/" + "index.html" );
});//hey

app.listen(port, hostname, function(err){
   console.log("Started static resource server at http://%s:%s", hostname, port)
});//
