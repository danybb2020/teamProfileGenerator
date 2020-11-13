const Employee = require("../lib/Employee");

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email)
        this.school = school;
        this.email = email;
        this.title = this.getRole();
    }
    
    getName(){
        return this.name
    }

    getId(){
        return this.id
    }

    getEmail(){
        return this.getEmail
    }

    getRole(){
        return this.title = "Intern"
    }

    getSchool(){
        return this.school
    }

}

module.exports = Intern;