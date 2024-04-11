let database = require("../database");
let userModel = require("../models/userModel")


let remindersController = {
    list: (req, res) => { 
        if (req.user) {
            res.render("reminder/index", { user : req.user, reminders: req.user.reminders });
        } else {
            res.redirect("/login")
        }
    }, 

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
        res.render("reminder/single-reminder", { user : req.user, reminderItem: searchResult });
        } else {
        res.render("reminder/index", { reminders: req.user.reminders });
        }
    },

    create: (req, res) => {
        let reminder = {
        id: req.user.reminders.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        };
        req.user.reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id; 
        let searchResult = req.user.reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
        });
        searchResult.title = req.body.title;
        searchResult.description = req.body.description;
        if (req.body.completed == "true") {
        searchResult.completed = true;
        } else {
        searchResult.completed = false;
        }
        res.redirect("/reminders");
    },

    delete: (req, res) => {
        // implementation here 👈
        let reminderToFind = req.params.id // gets the id of the current reminder
        // console.log(reminderToFind)

        // req.user.reminders[reminderToFind]
        // ex. jimmy.reminders[2]

        let searchResult = req.user.reminders.findIndex(function (reminder) {
        return reminder.id == reminderToFind;
        });
        // findIndex() = allows us to get the index of the reminder we are on
        // console.log(searchResult);

        req.user.reminders.splice(searchResult, 1);
        // searchResult = index of the reminder we are currently viewing
        // 1, how many elements to delete starting at searchResult

        res.redirect("/reminders");
    },
};

module.exports = remindersController;