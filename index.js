const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const router = express.Router();
const session = require('express-session');

const passport = require('./middleware/passport');
const userController = require('./controller/userController');
const adminController = require('./controller/adminController');


app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

// Added code for passport
app.use(
        session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
        })
);
const { forwardAuthenticated, ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Routes start here
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
//app.post("/login", authController.loginSubmit);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// admin route

//app.get("/admin", adminController.getSessions)

app.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
    }),
    authController.loginSubmit
    
);

app.get("/admin", ensureAuthenticated, isAdmin, adminController.getSessions);
app.post("/revoke-session/:id", ensureAuthenticated, isAdmin, adminController.revoke);

app.post('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});



app.listen(3001, function () {
    console.log(
        "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
    );
});