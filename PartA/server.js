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

// Connect the the MYSQL databse
connection.connect((err) => {
  if (err) { 
    throw err;
  }
  else{
    console.log("Connected to doughnuts_database!");
  }
});

//----------------------------------------



/* Table for the staff
CREATE TABLE staff(staff_ID INT unsigned NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
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
  order_amount INT unsigned,
  PRIMARY KEY (customer_ID) );
+---------------+------------------+------+-----+---------+----------------+
| Field         | Type             | Null | Key | Default | Extra          |
+---------------+------------------+------+-----+---------+----------------+
| customer_ID   | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| firstname     | varchar(255)     | NO   |     | NULL    |                |
| lastname      | varchar(255)     | YES  |     | NULL    |                |    
| order_amount  | int(10) unsigned | YES  |     | NULL    |                |
+---------------+------------------+------+-----+---------+----------------+
*/

/* Table for customer_reports
CREATE TABLE customer_reports (firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    report VARCHAR(10000),
    PRIMARY KEY (lastname));
+-----------+----------------+------+-----+---------+-------+
| Field     | Type           | Null | Key | Default | Extra |
+-----------+----------------+------+-----+---------+-------+
| firstname | varchar(255)   | NO   |     | NULL    |       |
| lastname  | varchar(255)   | NO   | PRI | NULL    |       |
| report    | varchar(10000) | YES  |     | NULL    |       |
+-----------+----------------+------+-----+---------+-------+
*/




//--------------------------STAFF Functions--------------------------------

function addstaff( firstname, lastname, title, salary ){

    // The MYSQL command to insert the topic, data, and timestamp of the post into the posts table
    var sql = "INSERT INTO staff (firstname, lastname, title, salary) VALUES ('" + firstname +"', '"+ lastname +"', '" + title +"', '" + salary + "')";

    connection.query(sql, function (err, result) {
        if (err) { throw err; }
        console.log("New Staff added");
    });
}

function updatestaff( staffID, firstname, lastname, title, salary ){

  if (firstname.length > 0){
    var sql = "UPDATE staff SET firstname='" + firstname +"' WHERE staff_ID=" + staffID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }
  if (lastname.length > 0){
    var sql = "UPDATE staff SET lastname='" + lastname +"' WHERE staff_ID=" + staffID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }
  if (title.length > 0){
    var sql = "UPDATE staff SET title='" + title +"' WHERE staff_ID=" + staffID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }
  if (salary.length > 0){
    var sql = "UPDATE staff SET salary='" + salary +"' WHERE staff_ID=" + staffID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }

  console.log("Updated staff");
}

function deletestaff( staffID ){

  var sql = "DELETE FROM staff WHERE staff_ID=" + staffID;
  connection.query(sql, function (err, result) {
    if (err) { throw err; }
  });

  console.log("Deleted staff");
}
//--------------------------------------------------------------------------



//-------------------------CUSTOMER FUNCTIONS-------------------------------
function addcustomer(firstname, lastname, order_amount){
  // The MYSQL command to insert the topic, data, and timestamp of the post into the posts table
  var sql = "INSERT INTO customer (firstname, lastname, order_amount) VALUES ('" + firstname +"', '"+ lastname +"', '" + order_amount + "')";

  connection.query(sql, function (err, result) {
      if (err) { throw err; }
      console.log("New Customer added");
  });
}

function updatecustomer( customerID, firstname, lastname, order_amount ){

  if (firstname.length > 0){
    var sql = "UPDATE customer SET firstname='" + firstname +"' WHERE customer_ID=" + customerID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }
  if (lastname.length > 0){
    var sql = "UPDATE customer SET lastname='" + lastname +"' WHERE customer_ID=" + customerID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }
  if (order_amount.length > 0){
    var sql = "UPDATE customer SET order_amount='" + order_amount +"' WHERE customer_ID=" + customerID;
    connection.query(sql, function (err, result) {
      if (err) { throw err; }
    });
  }

  console.log("Updated customer");
}

function deletecustomer( customerID ){

  var sql = "DELETE FROM customer WHERE customer_ID=" + customerID;
  connection.query(sql, function (err, result) {
    if (err) { throw err; }
  });

  console.log("Deleted staff");
}
//--------------------------------------------------------------------------



//-------------------------REPORT FUNCTIONS---------------------------------

function addreport(firstname, lastname, order_report){
  // The MYSQL command to insert the topic, data, and timestamp of the post into the posts table
  var sql = "INSERT INTO customer_reports (firstname, lastname, report) VALUES ('" + firstname +"', '"+ lastname +"', '" + order_report + "')";

  connection.query(sql, function (err, result) {
      if (err) { throw err; }
      console.log("New Report added");
  });
}
//------------------------------------------------------------------------




//------------ Stuff for messing with the staff database ------------
app.post("/addstaff", function(req, res) {

    addstaff(req.body.firstname, req.body.lastname, req.body.title, req.body.salary );
    res.sendStatus(200);;
});

app.get("/getstaff", function(req, res) {
  var sql = "SELECT * FROM staff";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    let staff_data = "";

    // Get the data from the keys
    Object.keys(result).forEach(function(key) {
        var row = result[key];

        // Get the topic
        if (staff_data.length <= 0){
          staff_data = "ID: " + row.staff_ID + ", ";
        }
        else {
          staff_data += "ID: " + row.staff_ID + ", ";
        }
        
        // Get the data and timestamp
        staff_data += "" + row.firstname + " ";
        staff_data += "" + row.lastname + ", ";
        staff_data += "Title: " + row.title +", ";
        staff_data += "Salary: $" + row.salary +"\n";
    });
    console.log("Retrevied Staff Data");
    res.send(staff_data);
  });

});

app.put("/updatestaff", function(req, res) {

  updatestaff(req.body.staffID, req.body.firstname, req.body.lastname, req.body.title, req.body.salary );
  res.sendStatus(200);
});

app.delete("/deletestaff", function(req, res) {

  deletestaff( req.body.staffID );
  res.sendStatus(200);
});
//---------------------------------------------------------------------




//------------ Stuff for messing with the customer database ------------
app.post("/addcustomer", function(req, res) {

  addcustomer(req.body.firstname, req.body.lastname, req.body.order_amount );
  res.sendStatus(200);;
});

app.get("/getcustomer", function(req, res) {
  var sql = "SELECT * FROM customer";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    let customer_data = "";

  // Get the data from the keys
  Object.keys(result).forEach(function(key) {
      var row = result[key];

      // Get the topic
      if (customer_data.length <= 0){
        customer_data = "ID: " + row.customer_ID + ", ";
      }
      else {
        customer_data += "ID: " + row.customer_ID + ", ";
      }
      
      // Get the data and timestamp
      customer_data += "" + row.firstname + " ";
      customer_data += "" + row.lastname + ", ";
      customer_data += "Order Amount: " + row.order_amount +"\n";
  });

  console.log("Retrevied Customer Data");
  res.send(customer_data);
});

});

app.put("/updatecustomer", function(req, res) {
  updatecustomer(req.body.customerID, req.body.firstname, req.body.lastname, req.body.order_amount );
  res.sendStatus(200);
});

app.delete("/deletecustomer", function(req, res) {
  deletecustomer( req.body.customerID );
  res.sendStatus(200);
});
//------------------------------------------------------------------



//--------------Stuff for messing witht the report database---------
app.get("/getcustomerreports", function(req, res) {
  var sql = "SELECT * FROM customer_reports";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    let customer_report = "";

  // Get the data from the keys
  Object.keys(result).forEach(function(key) {
      var row = result[key];

      // Get the topic
      if (customer_report.length <= 0){
        customer_report = "" + row.firstname + ", ";
      }
      else {
        customer_report += "" + row.firstname + ", ";
      }
      
      // Get the data and timestamp
      customer_report += "" + row.lastname + ", ";
      customer_report += "REPORT: " + row.report +"\n";
  });

  console.log("Retrevied Customer Report");
  res.send(customer_report);
});

});

app.post("/addreport", function(req, res) {

  addreport(req.body.firstname, req.body.lastname, req.body.order_report );
  res.sendStatus(200);;
});
//------------------------------------------------------------------





// Get the html file
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/homepage.html");
});

// Use the root directory. Needed to link html and the css file
app.use('/', express.static(__dirname));

app.listen(PORT, HOST);
console.log('Server is running on port ' + PORT);
