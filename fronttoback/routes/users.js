const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../model/user');

const mm = require('../model/mysqlmodel');
const moment = require('moment');

//Register
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  //res.send('AUTHENTICATE');
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;

    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week

        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //res.send('PROFILE');
  res.json({user: req.user});
});

//Table name
router.get('/tablename', (req, res, next) => {
  //res.send('VALIDATE');
  mm.getTable({'table_name' : 'building'}, {'table_schema' : 'lifestyle'}, function (err, val) {
    if(err) throw err;

    if(!val) {
      return res.json({success: false, msg: 'Query return no data'});
    }

    mm.insLog('tablename','normal', JSON.stringify(val), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), function(err2, val2) {
      if(err2) throw err2;

      if(!val2) {
        return res.json({success: false, msg: 'Insert log error'});
      }
      console.log(val2);
    });

    res.json(val);
    console.log(val);

  });
});

//event
router.get('/eventname', (req, res, next) => {
  mm.getEvent(function(err, val) {
    if(err) throw err;

    if(!val) {
      return res.json({success: false, msg: 'Event return no data'});
    }

    res.json(val);
  });
});

//restaurant list
// JSON body
//{
//	"eventid": "1"
//}
router.post('/restaurantlist', (req, res, next) => {
  mm.getRestaurant(req.body.eventid, function(err, val) {
    if(err) throw err;

    if(!val) {
      return res.json({success: false, msg: 'Restaurant list return no data'});
    }

    res.json(val);
  });
});

//Template node.js xx.xx.xx.xx/users/template
router.get('/template', (req, res, next) => {
  //res.send('TEMPLATE');
  //res.json({success: true});

});
module.exports = router;


/*
var db = require(__dirname + '/myDatabaseInstance.js');

var create = function (vals, next) {
  db.query('Insert INTO users SET ?', vals, next);
};

var load = function (selector, next) {
 db.query('SELECT * FROM users WHERE ?', selector, function (err, vals) {
   if(err) {
     return next(err);
    }
    //at this point you could return a user object
    //next(new User(vals[0]));
     //or just return the array.
    next(null, vals);
 });
};
module.exports = create;
module.exports = load;
I call it this way

var User = require(__dirname + '/user.js');
User.load({'id' : 1}, function (err, vals) {
  if (err) throw err;
  console.log(vals);
});
*/
