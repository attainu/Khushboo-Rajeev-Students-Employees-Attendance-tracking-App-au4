const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/test2", (req, res) => res.json({ msg: "Working" }));
const User = require("../../models/User");
const Attendance = require("../../models/Attendance");

// posting attendance to db
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userattendance = new Attendance({
      username: req.body.username,
      date: req.body.date,
      status: req.body.status,
      reason: req.body.reason, //to be added later on
    });

    userattendance
      .save()
      .then((userattendance) => res.json(userattendance))
      .catch((err) => console.log(err));
  }
);

// getting attendance from db

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.username }).then((user) => {
      const usernameToLookFor = req.user.username; //req.body.username will go here or req.body.email
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {
        res.send(Attendance);
      });
    });
  }
);

module.exports = router;

/* Expected response from user

  date: 12/12/12
  status: present/absent
  reason: "if any"

  */

/*

  what we want to achieve
  1. create a collection after username(which will be unique)
  2. store the response in an object


  */
