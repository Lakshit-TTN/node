import passport from 'passport'
import pkg from 'passport-google-oauth20'
import 'dotenv/config.js'
import { Strategy as LocalStrategy } from "passport-local";
import GitHubStrategy from 'passport-github';
import pool from '../../db/index.js';
import bcrypt from 'bcrypt'
import config from '../../../config/index.js';


//google
const GoogleStratergy = pkg.Strategy;
passport.use(new GoogleStratergy({

    clientID: config.googleClientID,
    clientSecret: config.githubClientSecret,
    callbackURL: config.googleCallbackURL,

},
    function (req, accesstoken, refreshtoken, profile, done) {
        return done(null, profile)//this proifle is sending to my controller api callback
    }
))


//github
passport.use(new GitHubStrategy({
    clientID:config.githubClientID,
    clientSecret:config.githubClientSecret,
    callbackURL:config.githubCallbackURL,
},
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(profile)
    return cb(null, {email: 'lakshit40@gmail.com'})
  }
));


//local
passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                return done(null, false, { message: "User not found" });
            }
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, { name: user.name, email: user.email, age: user.age });

        } catch (err) {
            console.error("Error in authentication:", err);
            return done(err);
        }
    })
);

//to store email in session
passport.serializeUser((user, done) => {
    done(null, user.email);
});


//to retrieve email
passport.deserializeUser(async (email, done) => {
    try {
        const result = await pool.query("SELECT name, email, age FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return done(null, false);
        }
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

export default passport;