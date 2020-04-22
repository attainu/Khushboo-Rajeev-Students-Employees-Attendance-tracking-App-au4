const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceDataSchemaForUser = Schema({
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    default: "Absent",
    required: true,
  },
  // current date
  date: {
    type: Date,
    //default: Date.now,
  },
  //reason for the delay
  reason: {
    type: String,
  },
})


//Attendance schema
const AttendanceSchema = Schema({
  //username to uniquely identify the user's attendance
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  attendance: [
    AttendanceDataSchemaForUser
  ]
});

module.exports = {
  AttendanceDataSchemaForUser: mongoose.model("attendancedataschemaforusers", AttendanceDataSchemaForUser),
  Attendance: mongoose.model("attendances", AttendanceSchema)
}

