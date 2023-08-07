const mongoose=require('mongoose');
const express=require('express');
const app=express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const User =require('./User');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

var session = require('express-session')
app.use(session({
    secret: 'rohitsinghgour',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback:true,
    scope: ["profile", "email"],
  },
 async function(request,response, accessToken, refreshToken, profile, done) {
    let result= await User.findOne({email:profile.emails[0].value});
    console.log(result);
    if(!result){
      console.log("user not found");
      let userdata=new User({
        name:profile.name.givenName,
        email:profile.emails[0].value,
        password:profile._json.given_name+profile._json.family_name,
        cpassword:profile._json.given_name+profile._json.family_name,
    })
    userdata.save();
  }
  done(null,profile);

  }

));