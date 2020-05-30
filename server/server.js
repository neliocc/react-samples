const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors=require("cors");
app.use(cors());
const mongoose = require("mongoose");
const authenticatedRoutes=require('./authenticatedRoutes');
const router = express.Router();
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mytodos",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const JWT_SECRET="samplesecret";

const db=require("./models");
const md5=require("md5");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {

      db.User.findOne({
        username:username
      }).then(user=>{
        if (!user) {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
        if(user.password===md5(password)) {
          return cb(null, user, {message: 'Logged In Successfully'});
        } else {
          return cb(null, false, {message: 'Incorrect email or password.'});
        }
        
      },error=>cb(null, false, {message: 'Incorrect email or password1.'})).catch(error=>{
        cb(null, false, {message: 'Incorrect email or password2.'})
      });
    }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : JWT_SECRET
},
function (jwtPayload, cb) {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return db.User.findOne({_id:jwtPayload._id})
      .then(user => {
          const token = jwt.sign(user.toObject(), JWT_SECRET);
          return cb(null, {...user.toObject(),token});
      })
      .catch(err => {
          return cb(err);
      });
}
));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register",(req,res)=>{
  db.User.create({
    username:req.body.username,
    password:md5(req.body.password)
  }).then(user=>res.json(user),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
})


app.post("/login",(req,res)=>{
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
    const token = jwt.sign(user.toObject(), JWT_SECRET);
    return res.json({username:user.username, token});
})(req, res);
});

app.use('/authenticated', passport.authenticate('jwt', {session: false}), authenticatedRoutes);

app.get("/",(req,res)=>{
  res.sendStatus(200);
})
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
