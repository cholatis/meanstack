const mysql = require('mysql');
const mysqlconfig = require('../config/mysqldatabase');


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

module.exports.getTable = function(selector, selector2, callback) {
  mysqlcon.query('SELECT * FROM INFORMATION_SCHEMA.TABLES where ? and ?', [selector, selector2], function(err, val) {
    if(err) {
      return callback(err);
    }

    callback(null, val);
  });
}

module.exports.getEvent = function(callback) {
  mysqlcon.query('SELECT id, eventname, imgname, createuser, createdt FROM event', function(err, val) {
    if(err) {
      return callback(err);
    }
    callback(null, val);
  });
}


module.exports.insLog = function(selector, selector2, selector3, selector4, callback) {
  mysqlcon.query('INSERT INTO log(logdesc, logtype, logmsg, createdt) VALUES (?, ?, ?, ?)', [selector, selector2, selector3, selector4], function(err, val) {
    if(err) {
      return callback(err);
    }

    callback(null, val);
  });
}
