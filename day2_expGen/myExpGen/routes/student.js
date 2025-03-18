var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");


const STUDENTS_FILE = path.join(__dirname, "../students.json");


const readStudent = () => {
    const data = fs.readFileSync(STUDENTS_FILE);
    return JSON.parse(data);
};

router.get("/", (req, res) => {
    var students = readStudent(); 
    const { branch } = req.query;
    if (branch) {
        students = students.filter(student => student.branch === branch);
    }
    res.render("students", {
        students, 
        branches: ["commerce", "science"],
    });
});

router.post("/delete/:rollno", (req, res) => {
    var students = readStudent();
    const rollno = Number(req.params.rollno); 
    students = students.filter(student => student.rollno !== rollno);
    fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf-8");
    res.send("Deleted successfully");
});




module.exports = router;



