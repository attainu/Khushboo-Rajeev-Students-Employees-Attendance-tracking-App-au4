const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
router.get("/test2", (req, res) => res.json({ msg: "Working" }));
const User = require("../../models/User");

const {
  Attendance,
  AttendanceDataSchemaForUser,
} = require("../../models/Attendance");
// posting attendance to db
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let todaysDate = Date.now();

    let today = moment(todaysDate).format("DD-MM-YYYY")
    //console.log("today", today);

    let month = new Date().getMonth() + 1;
    if (month <= 10) {
      month = '0' + month
    }
    //console.log("month", month);
    let year = new Date().getFullYear();
    //console.log("year", year);
    const allattendance = new AttendanceDataSchemaForUser({
      date: req.body.date,
      month,
      year,
      today,
      status: req.body.status,
      reason: req.body.reason,
    });
    const userattendance = new Attendance({
      avatar: req.body.avatar,
      name: req.body.name,
      username: req.body.username,
      attendance: [allattendance],
    });
    Attendance.findOne({ username: req.body.username }).then(
      (attendancedata) => {
        // console.log("attendancedata", attendancedata);
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
          // console.log("uttttt", userat);
          Attendance.findOneAndUpdate(
            { username: req.body.username },
            { $set: { attendance: userat } },
            { new: true },
            (err, doc) => {
              // console.log("doc", doc);
              res.json(doc);
            }
          );
        }
      }
    );
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
//For Report-
router.get(
  "/report",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.username }).then((user) => {
      const usernameToLookFor = req.user.username;
      Attendance.find({ username: usernameToLookFor }).then((Attendance) => {
        // console.log("report", Attendance);
        const a = Attendance[0].attendance;
        // console.log("aaaaa", a);
        const attendanceCount = getTotalStatusWiseCount(a);
        const attendance = {
          attendaceData: a,
          totalAttendanceStatusWiseCount: attendanceCount,
        };
        res.send(attendance);
      });
    });
  }
);
const getTotalStatusWiseCount = (attendance) => {
  let ontime = 0;
  let late = 0;
  let absent = 0;
  let ontimePercentage = 0.0;
  const time = moment().format("M");
  attendance.map((item) => {
    if (item.status === "Ontime") {
      ontime++;
    } else if (item.status === "Late") {
      late++;
    } else if (item.status === "Absent") {
      absent++;
    }
  });
  let pTotal = ontime + late;
  // console.log("pTotal", pTotal);
  switch (time) {
    case "1":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "2":
      ontimePercentage = (pTotal / 28) * 100;
      break;
    case "3":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "4":
      ontimePercentage = (pTotal / 30) * 100;
      break;
    case "5":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "6":
      ontimePercentage = (pTotal / 30) * 100;
      break;
    case "7":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "8":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "9":
      ontimePercentage = (pTotal / 30) * 100;
      break;
    case "10":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    case "11":
      ontimePercentage = (pTotal / 30) * 100;
      break;
    case "12":
      ontimePercentage = (pTotal / 31) * 100;
      break;
    default:
      break;
  }
  return {
    ontimeTotal: ontime,
    absentTotal: absent,
    lateTotal: late,
    percentages: ontimePercentage.toPrecision(4),
  };
};
//For Leaderboards-
router.get(
  "/leaderboards",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Attendance.find({}).then((attendancedata) => {
      //console.log("attendancedata", attendancedata);
      var attendanceMap = [];
      attendancedata.forEach(function (user) {
        var b = user.attendance;
        // console.log("b", b);
        var dateMap = [];
        b.forEach(function (u) {
          /* var umonth = u.month;
          var uyear = u.year;
          console.log("umonth, uyear", umonth, uyear); */
          dateMap.push({ month: u.month, year: u.year });
          //console.log("dateMap", dateMap);
        })
        var count = getTotalStatusWiseCount(b);
        attendanceMap.push({
          avatar: user.avatar,
          username: user.username,
          name: user.name,
          prcount: count,
          dateMap
        });
        // console.log("atndc", attendanceMap);
      });
      const sortedresponce = sortDescending(attendanceMap);
      res.send(sortedresponce);
    });
  }
);
sortDescending = (sortedData) => {
  // console.log("sortedData", sortedData);
  sortedData.sort((a, b) => b.prcount.percentages - a.prcount.percentages);
  return sortedData;
};
//For Admin-
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Attendance.find({}).then((attendancedata) => {
      // console.log("attendancedata", attendancedata);
      var attendanceAdminMap = [];
      attendancedata.forEach(function (user) {
        var forAdmin = user.attendance;
        var monthYearMap = [];
        forAdmin.forEach(function (v) {
          /* var vmonth = v.month;
          var vyear = v.year;
          console.log("umonth, uyear", vmonth, vyear); */
          monthYearMap.push({ month: v.month, year: v.year });
        })
        var countAdmin = getTotalStatusWiseCount(forAdmin);
        attendanceAdminMap.push({
          avatar: user.avatar,
          username: user.username,
          name: user.name,
          prcount: countAdmin,
          monthYearMap
        });
      });
      res.send(attendanceAdminMap);
    });
  }
);
module.exports = router;