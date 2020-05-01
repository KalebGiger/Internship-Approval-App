
const express = require('express');
const router = express.Router();
const calculatePartialGPA = require('../functions/calculatePartialGPA');
//const convertToGPA = require('../functions/convertToGPA');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "Students"})
});
const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017",
    dbName = "studentsdb";

const collectionName = "students";
var test = require('assert');
var col;
var grades = [];
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
var validGrades = [
    "a", "a-", "b+", "b", "b-", "c+", "c", "c-", "d+", "d", "d-", "f"
]
MongoDB.connect(dbURL, {useUnifiedTopology:  true,
                useNewUrlParser:  true,
                useCreateIndex:  true},
                (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    col = db.collection(collectionName, {safe:false, useUnifiedTechnology:  true}, (err, r) => {
        if (err) {
            console.log("Something is wrong in db.collection");
        }
    } );

    col.find()
        .toArray((error, userData) => {
            if (error) throw error;
            students = userData; //store all students in the array students[]
            console.log(userData);
        });
    //console.log('All students:  ${students}');
    });//MongoDB database is here

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
    //var totalGPA = 0;
    var csc141 = req.body.csc141.toLowerCase();
    
    if(validGrades.includes(csc141)){
        grades.push(csc141);
    }
    else{
        return res.render("newstudent", {invalid: true});
    }
    var csc142 = req.body.csc142.toLowerCase();
    if(validGrades.includes(csc142)){
        grades.push(csc142);
    }
    else{
        return res.render("newstudent", {invalid: true});
    }
    var csc240 = req.body.csc240.toLowerCase();
    if(validGrades.includes(csc240)){
        grades.push(csc240);
    }
    else{
        return res.render("newstudent", {invalid: true});
    }
    var csc241 = req.body.csc241.toLowerCase();
    if(validGrades.includes(csc241)){
        grades.push(csc241);
    }
    else{
        return res.render("newstudent", {invalid: true});
    }
    var PartialGPA = calculatePartialGPA(grades);
    let allStudents = students;

    col.insertOne({name:  newstudentName, PartialGPA:  PartialGPA}, function(err, r) {
        test.equal(null, err);
        test.equal(1, r.insertedCount);
        col.find({}).toArray( (err,studentData) => {
            console.log("record found:  ", studentData);
            students = studentData;
    });
        
        //db.close();
    });
        students.push({name:  newstudentName, PartialGPA:  PartialGPA})
    
    res.render("students", {
        allStudents: students, title: "Student List"
    });

};

console.log('in homeController pass 3');

router.getNewStudent = (req, res) => {
    console.log("in homeController getNewStudent");
    res.render("newstudent", {title: "New Student Form"});
}; 

/* router.postSignUpForm = (req, res) => {
    console.log("in homeController postSignUpForm method");
    res.render("StudentForm", {title:  "New Student Sign Up"});
}; */

module.exports = router;

