let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id; 
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
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

    let searchResult = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    // findIndex() = allows us to get the index of the reminder we are on
    // console.log(searchResult);

    database.cindy.reminders.splice(searchResult, 1);
    // searchResult = index of the reminder we are currently viewing
    // 1, how many elements to delete starting at searchResult

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
