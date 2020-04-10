const db = require("../database");
const Sequelize = require("sequelize");

let Userdetails = db.define(
    "userdetails",
    {
        user_name: {
            type: Sequelize.CHAR,
            allowNull: false,
            required: true
        },
        joining_date: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        registered_emailid: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            required: true
        },
        registered_contactno: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true
        },
        department: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true

        },

    },

    {
        timestamps: false
    }
);
db.sync().then(res => {
    console.log("Userdetails DB has been created", res);
});

module.exports = Userdetails;
