const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttendanceDataSchemaForUser = Schema({
  status: {
    type: String,
    enum: ["Ontime", "Absent", "Late"],
    default: "Absent",
    required: true,
  },
  // current date
  date: {
    type: Date,
    //default: Date.now,
  },
  month: {
    type: String
  },
  year: {
    type: String
  },
  //reason for the delay
  reason: {
    type: String,
  },
  today: {
    type: Date
  }
});
//Attendance schema
const AttendanceSchema = Schema({
  //username to uniquely identify the user's attendance
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  attendance: [AttendanceDataSchemaForUser],
});
module.exports = {
  AttendanceDataSchemaForUser: mongoose.model(
    "attendancedataschemaforusers",
    AttendanceDataSchemaForUser
  ),
  Attendance: mongoose.model("attendances", AttendanceSchema),
};