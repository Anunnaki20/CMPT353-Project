'use strict'

// load the packages
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Set the ports and the ip address also assign app to express
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//------------MYSQL Methods--------------

// Create a connection to the MYSQL database
var connection =  mysql.createConnection({
  host: "mysql1",
  user: "root",
  password: "admin",
  database: "assignment",
  port: "3306"
});

connection.connect((err) => {
  if (err) { 
    throw err;
  }
  else{
    console.log("Connected!");
  }
});

function postmessage( topic, data ){

    // The MYSQL command to insert the topic, data, and timestamp of the post into the posts table
    var sql = "INSERT INTO posts (topic, data, timestamp) VALUES ('" + topic +"', '"+data +"', '" + new Date() +"')";

    connection.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("Saved post!");
    });
}
//----------------------------------------

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/pages/posting.html");
// });

app.use('/', express.static('pages'));


app.listen(PORT, HOST);
console.log('Server is running on port ' + PORT);
