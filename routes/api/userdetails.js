const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const http = require("http");

var cors = require("cors");

router.use(cors());
router.use(express.json());

// Load Userdetails model
const Userdetails = require("../../models/Userdetails");

// CRUD FOR User Details---

//Create userdetails collection
router.post("/home", (req, res) => {
  let userdetails = new Userdetails();
  userdetails.user_name = req.body.user_name;
  userdetails.joining_date = req.body.joining_date;
  userdetails.reg_email = req.body.reg_email;
  userdetails.reg_mobile = req.body.reg_mobile;
  userdetails.department = req.body.department;
  userdetails
    .save({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/home", async (req, res) => {
  try {
    let userdetails = await Userdetails.find();
    res.send(userdetails);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
