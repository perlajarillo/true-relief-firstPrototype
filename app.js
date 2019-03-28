var express = require("express");
/* session and cookie-parser middleware*/
var cookieParser = require("cookie-parser");
var session = require("express-session");
var app = express();
// set the view engine to ejs
app.set("view engine", "ejs");
var path = require("path");

app.set("views", path.join(__dirname, "/files"));

var bodyParser = require("body-parser");
//Specify the directory where the css, images and other resources are
app.use(express.static("files"));
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//bcrypt-nodejs
var bcrypt = require("bcrypt");

app.use(cookieParser());
app.use(
  session({
    secret: "True Relief secret is patient",
    resave: true,
    saveUninitialized: true
  })
);

//MySQL connection//
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "your-host",
  user: "your-user",
  password: "your-password",
  database: "your-db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/" + "files/index.html");
});

app.post("/demographic", urlencodedParser, function(req, res) {
  // Prepare output in JSON format
  /*  patient = {
   	  fname:req.body.fname,
      mname:req.body.mname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password
   };*/
  var saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      // Store hash in your password DB.
      var sql =
        "INSERT INTO patient (fname, mname, lname, email, password) VALUES ('" +
        req.body.fname +
        "', '" +
        req.body.mname +
        "', '" +
        req.body.lname +
        "', '" +
        req.body.email +
        "', '" +
        hash +
        "')";
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Patient inserted: " + result.affectedRows);
        var sql_select = "SELECT max(id_patient) as id FROM patient";
        con.query(sql_select, function(err, result_id) {
          if (err) throw err;
          console.log("Patient log in: " + result_id[0].id);

          var newUser = { id_patient: result_id[0].id, email: req.body.email };
          req.session.user = newUser;
          //res.render('demographic', {varfname: req.body.fname, varmname: req.body.mname, varlname: req.body.lname});
          res.render("demographic");
          //res.redirect("demographic");
        });
      });
    });
  });
});

app.post("/sign_on", urlencodedParser, function(req, res_post) {
  res_post.redirect("/sign_on.html");
});

app.post("/presentation_pain_history", urlencodedParser, function(req, res) {
  var sql = "INSERT INTO patient_need (id_patient, id_need) VALUES (";
  var fields = "";
  for (var key in req.body) {
    console.log(req.body[key]);
    fields =
      fields + req.session.user.id_patient + "," + req.body[key] + "), (";
  }
  fields = fields.substr(0, fields.length - 9);
  sql = sql + fields;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Patient need inserted: " + result.affectedRows);
  });
  res.render("presentation_pain_history");
});

app.post("/pain_history", urlencodedParser, function(req, res) {
  pain_history_view(res);
});

app.post("/plan", urlencodedParser, function(req, res) {
  var sql = "INSERT INTO patient_challenge (id_patient, id_challenge) VALUES (";
  var fields = "";
  for (var key in req.body) {
    console.log(req.body[key]);
    fields =
      fields + req.session.user.id_patient + "," + req.body[key] + "), (";
  }
  fields = fields.substr(0, fields.length - 9);
  sql = sql + fields;
  console.log(sql);
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Patient challenge inserted: " + result.affectedRows);
  });
  res.render("plan");
});

app.post("/ask_other_condition", urlencodedParser, function(req, res) {
  //If the patient has selected a pain condition
  if (req.body.pain_condition) {
    var sql_pain_condition =
      "INSERT INTO patient_pain_condition (id_patient, id_condition, how_long_condition) VALUES (" +
      req.session.user.id_patient +
      ", " +
      req.body.pain_condition +
      ", '" +
      req.body.how_long_condition +
      "')";
    con.query(sql_pain_condition, function(err, result) {
      if (err) throw err;
      console.log("Patient pain condition inserted: " + result.affectedRows);
    });
  }
  //If the patient has selected a procedure
  if (req.body.procedure_radio == "1") {
    var sql_patient_procedure =
      "INSERT INTO patient_procedure (id_patient, id_procedure, how_worked_proc) VALUES (" +
      req.session.user.id_patient +
      ", " +
      req.body.procedure +
      ", '" +
      req.body.how_procedure_worked +
      "')";
    con.query(sql_patient_procedure, function(err, result) {
      if (err) throw err;
      console.log("Patient procedure inserted: " + result.affectedRows);
    });
  }

  //If the patient has selected a procedure
  if (req.body.non_pharmac_radio == "1") {
    var sql_patient_non_pharmac =
      "INSERT INTO patient_nonpharma (id_patient, id_non_pharma, how_worked_nonpharm) VALUES (" +
      req.session.user.id_patient +
      ", " +
      req.body.non_pharmac +
      ", '" +
      req.body.how_non_pharmac_worked +
      "')";
    con.query(sql_patient_non_pharmac, function(err, result) {
      if (err) throw err;
      console.log("Patient non_pharmac inserted: " + result.affectedRows);
    });
  }
  res.render("ask_more_conditions");
});

app.post("/has_more_conditions", urlencodedParser, function(req, res) {
  if (req.body.other_condition == "1") {
    pain_history_view(res);
  } else {
    challenges_view(res);
  }
});
//Building the challenges view
function challenges_view(res) {
  //Building preferences view with the database information
  var sql_select = "SELECT * FROM challenge";
  con.query(sql_select, function(err, result_challenges) {
    if (err) throw err;
    console.log(result_challenges);
    res.render("challenges", { challenges: result_challenges });
  });
}
function pain_history_view(res) {
  //first we select all the conditions storaged in the database
  var sql_select = "SELECT * FROM pain_condition";
  con.query(sql_select, function(err, result_conditions) {
    if (err) throw err;
    console.log(result_conditions);
    //now we select all the procedures storaged in the database
    var sql_select_procedures = "SELECT * FROM procedures";
    con.query(sql_select_procedures, function(err, result_procedures) {
      if (err) throw err;
      console.log(result_procedures);
      //now we select all the non_pharmacological storaged in the database

      var sql_select_non_pharmac = "SELECT * FROM non_pharmacologial";
      con.query(sql_select_non_pharmac, function(err, result_non_pharmac) {
        if (err) throw err;
        console.log(result_non_pharmac);

        //Building pain_history view with the database information
        res.render("pain_history", {
          conditions: result_conditions,
          procedures: result_procedures,
          non_pharmacs: result_non_pharmac
        });
      });
    });
  });
}

app.post("/habits", urlencodedParser, function(req, res) {
  if (req.session.user) {
    var sql =
      "UPDATE patient SET gender='" +
      req.body.gender +
      "', weight=" +
      req.body.weight +
      ", height=" +
      req.body.height +
      ", dbirth='" +
      req.body.birthdate +
      "' WHERE id_patient=" +
      req.session.user.id_patient;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Patient updated: " + result.affectedRows);
      res.render("habits");

      //res.redirect("habits" );
    });
  }
});

app.post("/preferences", urlencodedParser, function(req, res_post) {
  if (req.session.user) {
    var var_drinks_of_alcohol;
    var var_kind_drink;
    var var_cups_of_coffee;
    var var_kind_coffee;

    if (!req.body.drinks_of_alcohol) {
      var_drinks_of_alcohol = 0;
    } else {
      var_drinks_of_alcohol = req.body.drinks_of_alcohol;
    }
    if (!req.body.kind_drink) {
      var_kind_drink = "";
    } else {
      var_kind_drink = req.body.kind_drink;
    }
    //coffee cups and kind validation
    if (!req.body.cups_of_coffee) {
      var_cups_of_coffee = 0;
    } else {
      var_cups_of_coffee = req.body.cups_of_coffee;
    }

    if (!req.body.kind_coffee) {
      var_kind_coffee = "";
    } else {
      var_kind_coffee = req.body.kind_coffee;
    }

    var sql =
      "UPDATE patient SET smoke=" +
      req.body.smoke +
      ", factivity='" +
      req.body.physical_activity +
      "', sleep_hours='" +
      req.body.sleep_hours +
      "', q_sleep='" +
      req.body.quality_sleep +
      "', alcohol=" +
      req.body.alcohol +
      ", alcohol_frecuency='" +
      req.body.often_alcohol +
      "', coffee=" +
      req.body.coffee +
      ", coffee_frecuency='" +
      req.body.often_coffee +
      "', health_status='" +
      req.body.status_health +
      "', cups_of_coffee=" +
      var_cups_of_coffee +
      ", kind_coffee='" +
      var_kind_coffee +
      "', drinks_of_alcohol=" +
      var_drinks_of_alcohol +
      ", kind_drink='" +
      var_kind_drink +
      "' WHERE id_patient=" +
      req.session.user.id_patient;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Patient updated: " + result.affectedRows);
    });
    preferences_view(res_post);
  }
});

function preferences_view(res) {
  //Building preferences view with the database information
  var sql_select = "SELECT * FROM need";
  con.query(sql_select, function(err, result_needs) {
    if (err) throw err;
    console.log(result_needs);

    res.render("preferences", { needs: result_needs });
  });
}

app.post("/signin", urlencodedParser, function(req, res_post) {
  if (!req.body.emailA || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    //    var sql="SELECT email, password FROM patient WHERE email = '"+req.body.emailA+"' and password='"+req.body.password+"'";
    var sql =
      "SELECT id_patient, email, password, coffee, gender FROM patient WHERE email = '" +
      req.body.emailA +
      "'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        if (result) {
          console.log(result[0].password);
          bcrypt.compare(req.body.password, result[0].password, function(
            err,
            res
          ) {
            if (res == true) {
              var newUser = {
                id_patient: result[0].id_patient,
                email: req.body.emailA
              };
              req.session.user = newUser;
              //if the user has been filled the demographic section...
              if (result[0].gender != null) {
                if (result[0].coffee != null) {
                  //the user has been filled the habits section
                  var sql2 =
                    "SELECT id_patient FROM patient_need WHERE id_patient = " +
                    req.session.user.id_patient;
                  con.query(sql2, function(err, result_needs_sql2) {
                    if (err) throw err;
                    if (result_needs_sql2.length > 0) {
                      //the user has been filled the needs and will be redirected to pain history
                      if (result_needs_sql2) {
                        var sql_select_pain_condition =
                          "SELECT * FROM patient_pain_condition WHERE id_patient = " +
                          req.session.user.id_patient;
                        con.query(sql_select_pain_condition, function(
                          err,
                          patient_pain_condition_res
                        ) {
                          if (err) throw err;
                          //If the patient already fill the pain history...
                          if (patient_pain_condition_res.length > 0) {
                            //Now we want to know if the patient already fill the challenges form
                            var sql_select_challenge =
                              "SELECT * FROM patient_challenge WHERE id_patient = " +
                              req.session.user.id_patient;
                            con.query(sql_select_challenge, function(
                              err,
                              patient_challenges_res
                            ) {
                              if (err) throw err;
                              //If the patient already fill the pain history...
                              if (patient_challenges_res.length > 0) {
                                //Bringing plan view
                                res_post.render("plan");
                              } else {
                                //Building challenge view
                                challenges_view(res_post);
                              }
                            });
                          }
                          //If the patient has not filled the pain history form
                          else pain_history_view(res_post);
                        });
                      }
                    } // the user needs to select preferences
                    else {
                      preferences_view(res_post);
                      //res_post.render("preferences");
                    }
                  });
                } //the user needs to fill the habits section
                else {
                  res_post.render("habits");
                }
              } else {
                //no profile has been filled
                res_post.render("demographic");
              }
            } //end, when the user exists
            else {
              res_post.redirect("/sign_in.html?resp=0");
            }
          });
        }
      }
    });
  }
});

function checkSignIn(req, res) {
  if (req.session.user) {
    console.log(req.session.user);
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err); //Error, trying to access unauthorized page!
  }
}
app.get("/profile", function(req, res) {
  if (req.session.user) {
    res.render("demographic"); //console.log(req.session.user);

    //  res.redirect("demographic");
  } else res.redirect("/sign_in.html?resp=0");
});

app.get("/logout", function(req, res) {
  req.session.destroy(function() {
    console.log("user logged out.");
  });
  res.redirect("/sign_in.html");
});
