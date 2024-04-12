let userModel = require("../models/userModel");
let { sessionData, Store } = require("express-session")

let adminController = {
    getSessions: (req, res) => {
        const sessions = []; // so i can access the user 
        for (let sessionId in req.sessionStore.sessions) {
            const store = JSON.parse(req.sessionStore.sessions[sessionId]);
            if (store.passport && store.passport.user) {
                sessions.push({ sessionId: sessionId, user: store.passport.user }); // user is the userId 
            }
        }
        res.render("auth/admin", { store : sessions });
    },
    revoke: (req, res) => {
        const id = req.params.id;
        req.sessionStore.destroy(id, (err) => { // destroys session wth the matching id
            if (err) {
                console.log(err);
            } else {
                res.redirect("/admin"); 
            }
        })
    }
}
module.exports = adminController

