const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userdetails = new Schema(
  {
    user_name: {
      type: String,
      allowNull: false,
      required: true,
    },
    joining_date: {
      type: String,
      allowNull: false,
      required: true,
    },
    reg_email: {
      type: String,
      unique: true,
      allowNull: false,
      required: true,
    },
    reg_mobile: {
      type: String,
      allowNull: false,
      required: true,
    },
    department: {
      type: String,
      allowNull: false,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
let userdetails = mongoose.model("userdetails", Userdetails);
module.exports = userdetails;
// module.exports = Userdetails = mongoose.model("userdetails", Userdetails);
