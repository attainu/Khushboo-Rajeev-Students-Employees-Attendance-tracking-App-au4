const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");

router.get("/test2", (req, res) => res.json({ msg: "Working" }));
const User = require("../../models/User");
const { Attendance, AttendanceDataSchemaForUser } = require("../../models/Attendance");


// posting attendance to db
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const allattendance = new AttendanceDataSchemaForUser({
      date: req.body.date,
      status: req.body.status,
      reason: req.body.reason,
    })
    const userattendance = new Attendance({
      name: req.body.name,
      username: req.body.username,
      attendance: [allattendance]
    });
    Attendance
      .findOne({ username: req.body.username }).then((attendancedata) => {
        console.log("attendancedata", attendancedata);
        //If User's Attendance data is not present then create it. 
        if (!attendancedata) {
          //For creating a new doc.
          userattendance
            .save()
            .then((userattendance) => res.json(userattendance))
            .catch((err) => console.log(err));
        }
        //If User's Attendance data is already present then update the data by inserting new entries.
        else {
          var userat = attendancedata.attendance;
          userat.push(allattendance);
          console.log("uttttt", userat);
          Attendance.findOneAndUpdate({ username: req.body.username }, { $set: { attendance: userat } }, { new: true }, (err, doc) => {
            console.log("doc", doc);
            res.json(doc);
          })

        }
      })
  })

// getting attendance from db
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.body.username }).then((user) => {
      const usernameToLookFor = user.username;
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {
        res.send(Attendance);
      });
    });
  }
);

//For Report-
router.get("/report", passport.authenticate("jwt", { session: false }),

  (req, res) => {
    User.findOne({ user: req.body.username }).then((user) => {
      const usernameToLookFor = user.username;
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {
        console.log("report", Attendance);
        const a = Attendance[0].attendance;
        console.log("aaaaa", a);
        const attendanceCount = getTotalStatusWiseCount(a)

        const attendance = {
          attendaceData: a,
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
  let presentPercentage = 0.0;
  const time = moment().format("M");

  attendance.map((item) => {
    if (item.status === "Present") {
      present++;
    } else if (item.status === "Late") {
      late++;
    } else if (item.status === "Absent") {
      absent++;
    }
  })

  let pTotal = present + late;
  console.log("pTotal", pTotal);

  switch (time) {
    case '1': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '2': presentPercentage = ((pTotal / 28) * 100);
      break;

    case '3': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '4': presentPercentage = ((pTotal / 30) * 100);
      break;

    case '5': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '6': presentPercentage = ((pTotal / 30) * 100);
      break;

    case '7': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '8': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '9': presentPercentage = ((pTotal / 30) * 100);
      break;

    case '10': presentPercentage = ((pTotal / 31) * 100);
      break;

    case '11': presentPercentage = ((pTotal / 30) * 100);
      break;

    case '12': presentPercentage = ((pTotal / 31) * 100);
      break;

    default:
      break;
  }

  return { presentTotal: present, absentTotal: absent, lateTotal: late, percentages: presentPercentage.toPrecision(4) };
}

//For Leaderboards-
router.get(
  "/leaderboards",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Attendance.find({}).then((attendancedata) => {
      console.log("attendancedata", attendancedata);

      var attendanceMap = [];
      attendancedata.forEach(function (user) {
        var b = user.attendance;

        var count = getTotalStatusWiseCount(b);
        attendanceMap.push({ username: user.username, name: user.name, prcount: count });
      });

      res.send(attendanceMap);
    });
  }
);

//For Admin-
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Attendance.find({}).then((attendancedata) => {
      console.log("attendancedata", attendancedata);

      var attendanceAdminMap = [];
      attendancedata.forEach(function (user) {
        var forAdmin = user.attendance;

        var count = getTotalStatusWiseCount(forAdmin);
        attendanceAdminMap.push({ username: user.username, name: user.name, prcount: count });
      });

      res.send(attendanceAdminMap);
    });
  }
);

module.exports = router;

