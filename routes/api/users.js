/* REGISTRATION + LOGIN API */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const gravatar = require("gravatar");

// Load input validation
const validateRegisterInput = require("../../validation/register");

//Load User models
const User = require("../../models/User");

//@ROUTE GET api/users/register
//@desc Registering new user

//registering user
router.post("/register", (req, res) => {
  // destructuring the errors
  const { errors, isValid } = validateRegisterInput(req.body);

  // if there are invalid input fields
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //finde if email exists then throw error
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    }
    //else allow user to register
    else {
      // setting up avatar from gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm", //default
      });
      //saving user details
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
        mobile: req.body.mobile,
        joined: req.body.joined,
        department: req.body.department,
      });
      // getting salt
      bcrypt.genSalt(10, (err, salt) => {
        // hashing password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // saving encrypted password
          newUser.password = hash;
          newUser
            .save()
            // after saving the password respond with the user details + hashed pasword
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@ROUTE GET api/users/login
//@desc Login user / returning JWT

//log user in
router.post("/login", (req, res) => {
  // storing form data in constants
  const email = req.body.email;
  const password = req.body.password;

  // looking up for the user by email id
  User.findOne({ email: email /* line 57 */ }).then((user) => {
    //check if user exists or not , if not throw error
    if (!user) {
      return res.status(404).json({ email: `User doesn't exist` });
    }
    //if user exists check passwords of db and user input
    else {
      bcrypt
        .compare(/* entered pass */ password, user.password /* hashed pass */)
        // if status of isMatch true then set JWTin else throw error
        .then((isMatch) => {
          if (isMatch) {
            // setting JWT

            // creating payload for jwt
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              mobile: user.mobile,
              department: user.department,
              joined: user.joined,
              date: user.date,
            };

            // signing the token
            jwt.sign(
              payload,
              keys.secretOrKey, //secret is stored in  config /keys.js
              { expiresIn: 604800 }, //expiration time of token
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer" + token, //bearer is  a type of protocol for making requests
                });
              }
            );
            // res.json({ msg: "success" });
          } else {
            return res.status(400).json({ password: "Incorrect password" });
          }
        });
    }
  });
});

//@ROUTE GET api/users/current
//@desc Returning current user

//set current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //send all the user data except for password on succesful login
    res.json({
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      mobile: req.user.mobile,
      department: req.user.department,
      joined: req.user.joined,
      date: req.user.date,
    });
    // res.json({ msg: "success" });
  }
);
module.exports = router;
