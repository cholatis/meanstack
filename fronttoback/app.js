const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mysql = require('mysql');

const config = require('./config/database');
const mysqlconfig = require('./config/mysqldatabase');

//Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// Connect to mysql
const mysqlcon = mysql.createConnection({
  host : mysqlconfig.host,
  user : mysqlconfig.user,
  password : mysqlconfig.password,
  database : mysqlconfig.database,
  connectTimeout : 100000
});

mysqlcon.connect(function(err) {
  if(err) {
    console.log('Error connecting: '+err);
  }
  else {
    console.log('Mysql connected ');
  }

});


const app = express();

const users = require('./routes/users');

// port number
//const port = 3000;
const port= process.env.PORT || 8080;

// CORS middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

/* comment for test backend nodejs (need to stop and start)*/
// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

/**/
app.use('/users', users);


// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

/* comment for test backend nodejs (need to stop and start)*/
// Any route go to index.html
app.get('*', (req, res) => {
  //The path.join() method joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path.
  //path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
  // Returns: '/foo/bar/baz/asdf'
  //console.log(__dirname);
  // Prints: /Users/mjr
  res.sendFile(path.join(__dirname, 'public/index.html'))
});
/**/

// Start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
