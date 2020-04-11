
/* const Sequelize = require("sequelize");

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
 */

const Sequelize = require("sequelize");

//const db = new Sequelize(dbname, username, password, {
const db = new Sequelize(
    "easyattend",
    "easyattend@easyattend",
    "Khushboo-Rajeev-Students-Employees-Attendance-tracking-App-au4",
    {
        host: "easyattend.postgres.database.azure.com",
        // Do not hard code your username and password.
        // Consider using Node environment variables.
        port: 5432,
        dialect: "postgres",
    }
);
//for checking connection has been established--
db.authenticate().then(() => {
    console.log("DB connection is established");
});

module.exports = db;
