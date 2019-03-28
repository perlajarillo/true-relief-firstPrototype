
var mysql = require('mysql');
//var connection = mysql.createConnection({multipleStatements: true});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "truereliefDBNew"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql;
  var sql = "CREATE TABLE need (id_need INT AUTO_INCREMENT PRIMARY KEY NOT NULL,need_description VARCHAR(250) NOT NULL"+
  ")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("need Table created");
  });

  sql="CREATE TABLE challenge ("+
                "id_challenge INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "challenge_description VARCHAR(250) NOT NULL"+
  ")";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Challenge Table created");
  });
sql="CREATE TABLE non_pharmacologial ("+
                "id_non_pharma INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "non_pharma_name VARCHAR(200) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Non-pharmacological Table created");
  });

sql="CREATE TABLE procedures ("+
                "id_procedure INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "procedure_name VARCHAR(200) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Procedures Table created");
  });

sql="CREATE TABLE medication ("+
                "id_medication INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "medication_name VARCHAR(200) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Medication Table created");
  });

sql="CREATE TABLE pain_condition ("+
                "id_condition INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "pain_description_condition VARCHAR(150) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Pain_condition Tables created");
  });
sql="CREATE TABLE patient ("+
                "id_patient INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "email VARCHAR(250) NOT NULL,"+
                "password VARCHAR(250) DEFAULT NULL,"+
                "fname VARCHAR(30) NOT NULL,"+
                "mname VARCHAR(30) DEFAULT NULL,"+
                "lname VARCHAR(30) NOT NULL,"+
                "gender VARCHAR(10) DEFAULT NULL,"+
                "weight FLOAT DEFAULT NULL,"+
                "dbirth DATE DEFAULT NULL,"+
                "smoke BOOLEAN DEFAULT NULL,"+
                "factivity VARCHAR(30) DEFAULT NULL,"+
                "sleep_hours VARCHAR(13) DEFAULT NULL,"+
                "q_sleep VARCHAR(40) DEFAULT NULL,"+
                "alcohol BOOLEAN DEFAULT NULL,"+
                "alcohol_frecuency VARCHAR(30) DEFAULT NULL,"+
                "coffee BOOLEAN DEFAULT NULL,"+
                "coffee_frecuency VARCHAR(30) DEFAULT NULL,"+
                "health_status VARCHAR(40) DEFAULT NULL,"+
                "height FLOAT DEFAULT NULL,"+
                "drinks_of_alcohol INT DEFAULT NULL,"+
                "kind_drink VARCHAR(20) DEFAULT NULL,"+
                "cups_of_coffee INT DEFAULT NULL,"+
                "kind_coffee VARCHAR(20) DEFAULT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient Table created");
  });
sql="CREATE TABLE plan ("+
                "id_plan INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "date DATE NOT NULL,"+
                "id_patient INT NOT NULL,"+
                "id_non_pharma INT NOT NULL,"+
                "id_medication INT NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Plan Table created");
  });

sql="CREATE TABLE patient_need ("+
                "id_patient_need INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "id_patient INT NOT NULL,"+
                "id_need INT NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient need Tables created");
  });
sql="CREATE TABLE patient_challenge ("+
                "id_patient_challenge INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "id_patient INT NOT NULL,"+
                "id_challenge INT NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient challeng Table created");
  });
sql="CREATE TABLE patient_nonpharma ("+
                "id_patient_nonpharma INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "how_worked_nonpharm VARCHAR(250) NOT NULL,"+
                "id_non_pharma INT NOT NULL,"+
                "id_patient INT NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient_nonpharma Table created");
  });
sql="CREATE TABLE patient_procedure ("+
                "id_patient_procedure INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "how_worked_proc VARCHAR(250) NOT NULL,"+
                "id_procedure INT NOT NULL,"+
                "id_patient INT NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient procedure Tables created");
  });

sql="CREATE TABLE patient_medication ("+
                "id_patient_medication INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "id_medication INT NOT NULL,"+
                "id_patient INT NOT NULL,"+
                "how_worked_med VARCHAR(250) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient_medication Table created");
  });

sql="CREATE TABLE patient_pain_condition ("+
                "id_patient_pain_condition INT AUTO_INCREMENT PRIMARY KEY NOT NULL,"+
                "id_patient INT NOT NULL,"+
                "id_condition INT NOT NULL,"+
                "how_long_condition VARCHAR(30) NOT NULL"+
")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Patient_pain_condition Table created");
  });

sql="ALTER TABLE patient_need ADD CONSTRAINT need_patient_need_fk "+
"FOREIGN KEY (id_need) "+
"REFERENCES need (id_need) "+
" ON DELETE NO ACTION "+
"ON UPDATE NO ACTION ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient need tables modified");
  });
sql="ALTER TABLE patient_challenge ADD CONSTRAINT challenge_patient_challenge_fk "+
"FOREIGN KEY (id_challenge) "+
"REFERENCES challenge (id_challenge)"+
" ON DELETE NO ACTION "+
"ON UPDATE NO ACTION ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient challenge tables modified");
  });
sql="ALTER TABLE patient_nonpharma ADD CONSTRAINT non_pharmacologial_patient_fk "+
"FOREIGN KEY (id_non_pharma) "+
"REFERENCES non_pharmacologial (id_non_pharma) "+
" ON DELETE NO ACTION"+

" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient nonpharma table modified");
  });
sql="ALTER TABLE plan ADD CONSTRAINT non_pharmacologial_plan_fk "+
"FOREIGN KEY (id_non_pharma) "+
"REFERENCES non_pharmacologial (id_non_pharma) "+
"ON DELETE NO ACTION "+
"ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("plan table modified");
  });
sql="ALTER TABLE patient_procedure ADD CONSTRAINT procedure_patient_procedure_fk "+
"FOREIGN KEY (id_procedure) "+
"REFERENCES procedures (id_procedure) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient procedure table modified");
  });

sql="ALTER TABLE plan ADD CONSTRAINT medication_plan_fk "+
"FOREIGN KEY (id_medication) "+
"REFERENCES medication (id_medication) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("plan table modified");
  });
sql="ALTER TABLE patient_medication ADD CONSTRAINT medication_patient_medication_fk "+
"FOREIGN KEY (id_medication) "+
"REFERENCES medication (id_medication) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient medication table modified");
  });

sql="ALTER TABLE plan ADD COLUMN id_procedure INT";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("plan table modified");
  });

sql="ALTER TABLE plan ADD CONSTRAINT procedure_plan_fk "+
"FOREIGN KEY (id_procedure) "+
"REFERENCES procedures (id_procedure) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("plan table modified");
  });
sql="ALTER TABLE patient_pain_condition ADD CONSTRAINT pain_condition_patient_fk "+
"FOREIGN KEY (id_condition) "+
"REFERENCES pain_condition (id_condition) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient pain table modified");
  });
sql="ALTER TABLE patient_pain_condition ADD CONSTRAINT patient_patient_pain_condition_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient pain table modified");
  });

sql="ALTER TABLE patient_medication ADD CONSTRAINT patient_patient_medication_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient medication table modified");
  });
sql="ALTER TABLE patient_procedure ADD CONSTRAINT patient_patient_procedure_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient procedure table modified");
  });
sql="ALTER TABLE patient_nonpharma ADD CONSTRAINT patient_patient_non_pharma_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient nonpharma table modified");
  });
sql="ALTER TABLE patient_challenge ADD CONSTRAINT patient_patient_challenge_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient challenge table modified");
  });
sql="ALTER TABLE patient_need ADD CONSTRAINT patient_patient_need_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
"ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("patient need table modified");
  });
sql="ALTER TABLE plan ADD CONSTRAINT patient_plan_fk "+
"FOREIGN KEY (id_patient) "+
"REFERENCES patient (id_patient) "+
" ON DELETE NO ACTION "+
" ON UPDATE NO ACTION";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Plan Table modified");
  });

  //This will insert the information to start in the database
  //Pain condition table
  var sql_pain_condition = "INSERT INTO pain_condition (pain_description_condition) VALUES ('Post - surgical pain'),('Kidney stones'),('Chronical lower-back pain'),('Peripheral neuropathy'),('Cancer pain'),('Posherpetic Neuralgia'),('Trigeminal Neuralgia'),('Interstitial Cystitis'),('Complex Regional Pain Syndrome'),('Cluster headaches'),('Abdominal pain'),('Neck pain'),('Chest pain')";
     con.query(sql_pain_condition, function(err, result) {
     if (err) throw err;
      console.log("Pain condition information inserted: " + result.affectedRows);
    });

  //need table
  var sql_need = "INSERT INTO need (need_description) VALUES ('Coping strategies'),('Tracking pain'),('Communicating pain status and the easy way with my doctor'),('Learning about my pain condition'),('New ways to treat my pain'),('learn about treatmens'),('Identifying providers for treatments in my area')";
     con.query(sql_need, function(err, result) {
     if (err) throw err;
      console.log("Need information inserted: " + result.affectedRows);
    });

  //procedures table
  var sql_procedures = "INSERT INTO procedures (procedure_name) VALUES ('surgery'), ('injections')";
     con.query(sql_procedures, function(err, result) {
     if (err) throw err;
      console.log("Procedures information inserted: " + result.affectedRows);
    });

 //non - pharmacological table
  var sql_non_pharmac = "INSERT INTO non_pharmacologial (non_pharma_name) VALUES"+
"('Massage'), ('Relaxation techniques'), ('Acupunture'),"+
"('Physical therapy'), ('Pet therapy'), ('Gel packs'),"+
"('Meditation'), ('Magnets'), ('Chiropractic services'),"+
"('Homeopathy'), ('Reiki'), ('Music therapy'),"+
"('Prayer'), ('Acupressure'), ('Deep breathing'),"+
"('Distraction'), ('Guided imagery'), ('Hypnosis and self hypnosis'),"+
"('Herbs and dietary supplements')";
     con.query(sql_non_pharmac, function(err, result) {
     if (err) throw err;
      console.log("Procedures information inserted: " + result.affectedRows);
    });
      //challenges table
  var sql_challenge = "INSERT INTO challenge (challenge_description) VALUES"+
"('Remembering my medications'),('Knowing how to handle stress'),('Eating healthy'),('Socialize')";
     con.query(sql_challenge, function(err, result) {
     if (err) throw err;
      console.log("Procedures information inserted: " + result.affectedRows);
    });
   //  console.log("ALL TABLES HAVE BEEN CREATED ");
});



