var mysql = require("mysql");

var con = mysql.createConnection({
  host: "your-host",
  user: "your-user",
  password: "your-password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE truereliefDBNew", function(err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
