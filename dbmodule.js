var databaseUrl = "localhost/mydb";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
var fs=require('fs');
var express = require('express');
var app = express();
console.log("Connected to MongoDB");

exports.authenticateUser = function(name, pass, response) {
db.users.find({ "name": name, "password": pass },
function(err, users)
{
if (err || !users) {

response.write("<h1><b>Not authorized user</b></h1>");
response.end();
}

else if (users.length == 0) {

    response.write("<h1><b>Not authorized user</b></h1>");
    response.end();

}

else {
    response.writeHead(302, {
        location: "http://localhost:8080/",
      });
      response.end();
}
});
}

exports.insertUser = function(name,age, email,number,password, response) {
console.log('Saving user to mongo');
db.users.insert({ "name": name,"age":age, "email": email,"number":number,"password":password },
function(err, saved)

{
if (err || !saved)
console.log(err);
else

response.write("<h1 style='text-align:center;padding:255px 255px;background-color:yellow'>User Saved</h1>");

response.end();

});
}

