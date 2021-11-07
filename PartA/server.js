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
app.use(express.json());


//------------MYSQL Methods--------------

// Create a connection to the MYSQL database
var connection =  mysql.createConnection({
  host: "mysql1",
  user: "root",
  password: "admin",
  database: "doughnuts_database",
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

/* Table for the staff
CREATE TABLE customer(staff_ID INT unsigned NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  salary INT unsigned,
  PRIMARY KEY (staff_ID)
);
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| staff_ID  | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| firstname | varchar(255)     | NO   |     | NULL    |                |
| lastname  | varchar(255)     | NO   |     | NULL    |                |
| title     | varchar(255)     | NO   |     | NULL    |                |
| salary    | int(10) unsigned | YES  |     | NULL    |                |
+-----------+------------------+------+-----+---------+----------------+
*/

/* Table for customer
CREATE TABLE customer(customer_ID INT unsigned NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255),
  order_details VARCHAR(1000),
  order_amount INT unsigned,
  PRIMARY KEY (customer_ID) );
+---------------+------------------+------+-----+---------+----------------+
| Field         | Type             | Null | Key | Default | Extra          |
+---------------+------------------+------+-----+---------+----------------+
| customer_ID   | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| firstname     | varchar(255)     | NO   |     | NULL    |                |
| lastname      | varchar(255)     | YES  |     | NULL    |                |
| order_details | varchar(1000)    | YES  |     | NULL    |                |
| order_amount  | int(10) unsigned | YES  |     | NULL    |                |
+---------------+------------------+------+-----+---------+----------------+
*/

function addstaff( firstname, lastname, title, salary ){

    // The MYSQL command to insert the topic, data, and timestamp of the post into the posts table
    var sql = "INSERT INTO staff (firstname, lastname, title, salary) VALUES ('" + firstname +"', '"+ lastname +"', '" + title +"', '" + salary + "')";

    connection.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("New Staff added");
    });
}
//----------------------------------------

app.post("/addstaff", function(req, res) {
    console.log(req.body);
    res.sendStatus(200)
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/homepage.html");
});

app.use('/', express.static(__dirname));

app.listen(PORT, HOST);
console.log('Server is running on port ' + PORT);
