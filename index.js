const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
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

app.use((req, res, next) => {
  if (typeof res.locals.includeNavbar === 'undefined') {
    res.locals.includeNavbar = true;
  }
  next();
});

app.set("view engine", "ejs");
app.set('layout includeNavbar', true);

// Routes start here
app.get('/reminders/', ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", ensureAuthenticated, reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Login and register page routes
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login, (req, res, next) => {
  res.locals.includeNavbar = false;
  next();
}, (req, res) => {
  res.render("login", { error: null });
});
app.post("/register", authController.registerSubmit);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Login route with passport and show error message if login fails
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { 
      res.locals.includeNavbar = false;
      return res.render("login", { error: "Invalid email or password." }); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect("/reminders");
    });
  })(req, res, next);
  authController.loginSubmit
});

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
        "Server running. Visit: http://localhost:3001/ in your browser 🚀"
    );
});