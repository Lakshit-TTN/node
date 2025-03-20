var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const addCreatedOn = require("../middleware/createdOn");
const USER_FILE = path.join(__dirname, "../users.json");
const MYUSER_FILE = path.join(__dirname, "../myuser.json");

const readUsers = () => {
    const data = fs.readFileSync(USER_FILE);
    return JSON.parse(data);
};
const readMyUsers = () => {
    const data = fs.readFileSync(MYUSER_FILE);
    return JSON.parse(data);
};

router.get("/", (req, res) => {
    res.json(readUsers());
});

const writeUsers = (users) => {
    fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));
};

router.get("/home", (req, res) => {
    res.render("home", { users: readUsers() });
});

router.get("/add", (req, res) => {
    res.render("adduser");
});

router.get("/about", (req, res) => {
    const users = readUsers();
    res.render("about", { users });
});

router.post("/adduser", addCreatedOn, (req, res) => {
    let users = readUsers();
    const { id, username, email, created_on } = req.body;

    const newUser = { id, username, email, created_on };
    users.push(newUser);
    writeUsers(users);

    console.log("User added:", newUser);

    
    res.redirect("/users/home");
});


router.post("/delete/:id", (req, res) => {
    var users = readUsers();
    const idToDelete = parseInt(req.params.id);
    users = users.filter(user => user.id !== idToDelete);
    writeUsers(users);
    res.redirect("/users/home");
});


router.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    if (!query) return res.json([]);

    const users = readMyUsers().filter(user =>
        user.username.toLowerCase().includes(query)
    );

    res.json(users);
});


router.get("/searchmyuser", (req, res) => {
    const users = readMyUsers();
    res.render("myuser", { users }); 
});





module.exports = router;



