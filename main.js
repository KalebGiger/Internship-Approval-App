'use strict';

const port = 3000;
//var  http = require("http");
//var  httpStatus = require("http-status-codes");
var express = require('express');
const app = express();
console.log('pass 1');
//var  router = require("./router");
console.log('pass 2');
//var  contentTypes = require("./contentTypes");
console.log('pass 3');
//var  utils = require("./utils");
console.log('pass 4');
const layouts = require("express-ejs-layouts");
const homeController = require("./controllers/homeController");
const errorController = require('./controllers/errorcontroller');

app.use (
  express.urlencoded({
    extended: false
  })
);
console.log('pass 5');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.set( 'view engine', 'ejs' );

app.use(layouts);
console.log('pass 6');

app.get( '/', (req,res) => {
  res.render('index', {title: "CSC Courses"});
});

console.log("+get homeController");
app.get( '/', homeController);


console.log('pass 7');
app.get('/students', homeController.showStudents);
console.log('pass 8');

app.get('/newstudent', homeController.getNewStudent);
app.post ('/students/submit', homeController.addStudents);

//app.post('/newstudent', homeController.addStudents);  //, homeController.showStudents
console.log('pass 9');


//app.createServer( router.handle )

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen( app.get("port"),  () => {
  console.log(`Server running on port ${port}`);
} );
   