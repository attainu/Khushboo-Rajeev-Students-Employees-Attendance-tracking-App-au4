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
      reason: req.body.reason,
      /*  color: req.body.color //to be added later on */
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
      const usernameToLookFor = req.user.username;
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {
        res.send(Attendance);
      });
    });
  }
);

router.get("/report", passport.authenticate("jwt", { session: false }),

  (req, res) => {
    User.findOne({ user: req.user.username }).then((user) => {
      const usernameToLookFor = req.user.username;
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {

        //res.send(Attendance);

        /* I have to call function for calculating total attendances according to the status. */
        const attendanceCount = getTotalStatusWiseCount(Attendance)

        const attendance = {
          attendaceData: Attendance,
          totalAttendanceStatusWiseCount: attendanceCount
        }
        res.send(attendance);
      });
    });
  }

)

const getTotalStatusWiseCount = (attendance) => {
  let present = 0;
  let late = 0;
  let absent = 0;
  attendance.map((item) => {
    if (item.status === "Present") {
      present++;
    } else if (item.status === "Late") {
      late++;
    } else if (item.status === "Absent") {
      absent++;
    }
  })

  return { presentTotal: present, absentTotal: absent, lateTotal: late };

}

module.exports = router;

