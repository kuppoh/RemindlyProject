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
        // implement later

    },

    registerSubmit: (req, res) => {
        // implement later
    },
};

module.exports = authController;
