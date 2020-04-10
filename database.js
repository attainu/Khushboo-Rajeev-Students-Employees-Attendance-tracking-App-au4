const Sequelize = require("sequelize");

//const db = new Sequelize(dbname, username, password, {
const db = new Sequelize("employeesattendance", "khushboogoyal", "", {
    host: "localhost",
    dialect: "postgres"
});
//for checking connection has been established--
db.authenticate().then(() => {
    console.log("DB connection is established");
});

module.exports = db;
