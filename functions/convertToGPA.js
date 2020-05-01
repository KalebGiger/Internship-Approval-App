'use strict';

function convertToGPA(grade){
    if (grade.toLowerCase() === "f") {
        return 0;
    }
    else if (grade.toLowerCase() === "d-") {
        return .670;
    }
    else if (grade.toLowerCase() === "d") {
        
        return 1.00;
    }
    else if (grade.toLowerCase() === "d+") {
      
        return 1.33;
    }
    else if (grade.toLowerCase() === "c-") {
     
        return 1.67;
    }
    else if (grade.toLowerCase() === "c") {
        
        return 2.00;
    }
    else if (grade.toLowerCase() === "c+") {
       
        return 2.33;
    }
    else if (grade.toLowerCase() === "b-") {
      
        return 2.67;
    }
    else if (grade.toLowerCase() === "b") {
       
        return 3.00;
    }
    else if (grade.toLowerCase() === "b+") {
        
        return 3.30;
    }
    else if (grade.toLowerCase() === "a-") {
        
        return 3.67;
    }
    else if (grade.toLowerCase() === "a") {
        
        return 4.00;
    }
    else {
        return 0;
    }
}

module.exports = convertToGPA;