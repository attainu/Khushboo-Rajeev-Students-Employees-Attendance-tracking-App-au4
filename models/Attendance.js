const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Attendance schema
const AttendanceSchema = Schema({
  //to get all the data from users collection in attendance
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  //status of attendance
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    default: "Absent",
    required: true,
  },
  // current date
  date: {
    type: Date,
    default: Date.now,
  },
  //reason for the delay
  reason: {
    type: String,
  },
});

module.exports = Attendance = mongoose.model("attendances", AttendanceSchema);
