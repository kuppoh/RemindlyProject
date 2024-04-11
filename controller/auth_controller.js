let database = require("../database");
let userModel = require("../models/userModel")
let userController = require("./userController")

let authController = {
    login: (req, res) => {
        res.render("auth/login");

    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: (req, res) => {
        if (req.user && req.user.role === "admin") {
            res.redirect("/reminders")
        } else {
            res.redirect("/login")
        }
    },

    registerSubmit: (req, res) => {
        // implement later
    },
};

module.exports = authController;
