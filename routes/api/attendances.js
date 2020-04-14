const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/test2", (req, res) => res.json({ msg: "Working" }));
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

const Attendance = require("../../models/Attendance");

// posting attendance to db
router.post(
  "/postattendance",
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
router.get("/getattendance",passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const newAttendance = await Attendance.find();
    res.send(newAttendance);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
