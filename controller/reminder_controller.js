let database = require("../database");
let { userModel, keywordToImage } = require("../models/userModel");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { user : req.user, reminders: req.user.reminders });
  },

    new: (req, res) => {
        res.render("reminder/create");
    },

  listOne: async (req, res) => {
      let reminderToFind = req.params.id;
      let searchResult = req.user.reminders.find(function (reminder) {
        return reminder.id == reminderToFind;
      });
      if (searchResult) {
        const banner = await keywordToImage(searchResult.title);
        res.render("reminder/single-reminder", { user : req.user, reminderItem: searchResult, banner: banner });
      } else {
        res.status(404).send('Reminder not found');
      }
    },

    create: async (req, res) => {
        let banner = await keywordToImage(req.body.keyword);
        let reminder = {
            id: req.user.reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            banner: banner,
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