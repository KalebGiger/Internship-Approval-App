
const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "Students"})
});
var students = [
    // {
    //     name: "Node.js Programming",
    //     price: "300"
    // },
    // {
    //     name: "Big Data",
    //     price: "100"
    // }
];
console.log('in homeController pass 1');
router.showStudents = (req, res) => {
    res.render("students", {
        allStudents: students, title: "Student List"
    });
};
console.log('in homeController pass 2');
router.addStudents = (req, res) => {
    console.log("in homeController addStudent");
    var newstudentName = req.body.name;
    console.log("name " + newstudentName);
    var newAvgGrade = req.body.avgGrade;
    let allStudents = students;
    allStudents.push({name: newstudentName, avgGrade: newAvgGrade});
    res.render("students", {
        allStudents: students
    });
};

console.log('in homeController pass 3');
router.getNewStudent = (req, res) => {
    console.log("in homeController getNewStudent");
    res.render("newstudent", {title: "New Student"});
};
module.exports = router;

