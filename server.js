var http = require('http');
var querystring=require('querystring');
var qs;
var module = require('./dbmodule');
var url = require('url');

 http.createServer(function(req, res) {  
		var data1= '';
		
	req.on('data', function(chunk) {   
					console.log(chunk);
					data1 += chunk;  
					console.log("Data in String format: "+data1);
					});
	req.on('end', function() {
				qs=querystring.parse(data1);
				var name = qs["name"];
				var age = qs["age"];
				var email = qs["email"];
				var  num= qs["num"];
                var  pass= qs["pass"];
				module.insertUser(name,age, email,num,pass, res);
				});

	}).listen(8000);

console.log("Server started");