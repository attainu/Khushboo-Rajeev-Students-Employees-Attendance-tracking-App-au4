
const express = require("express");
var cors = require("cors");
const app1 = express();

app1.use(cors());
app1.use(express.json());

/* const Table = require("./Models/Table");
const Waiter = require("./Models/Waiter");
const Menu = require("./Models/Menu");
const Bill = require("./Models/Bill"); */
const Userdetails = require("./models/Userdetails");
// CRUD FOR TABLE---
app1.post("/home", async (req, res) => {
    try {
        const { body } = req;
        let userdetails = await Userdetails.create({
            user_name: body.user_name,
            joining_date: body.joining_date,
            registered_emailid: body.registered_emailid,
            registered_contactno: body.registered_contactno,
            department: body.department
        });
        res.send(userdetails);
    } catch (error) {
        console.log(error);
    }
});

app1.get("/home/:email", async (req, res) => {
    try {
        let email = req.params.email
        let userdetails = await Userdetails.findAll({ where: { registered_emailid: email } });
        console.log("email id", email, userdetails);
        res.send(userdetails);
    } catch (error) {
        console.log(error);
    }
});

app1.put("/home/:id", async (req, res) => {
    try {
        const { body, params } = req;
        let userdetails = await Userdetails.update(
            { user_name: body.user_name, joining_date: body.joining_date, registered_emailid: body.registered_emailid, registered_contactno: body.registered_contactno, department: body.department },
            { where: { id: params.id } }
        );
        res.send(userdetails);
    } catch (error) {
        console.log(error);
    }
});

app1.delete("/home/:id", async (req, res) => {
    try {
        const { params } = req;
        await Userdetails.destroy({ where: { id: params.id } });
        res.send("Deleted successfully");
    } catch (error) {
        console.log(error);
    }
});



module.exports = app1;

