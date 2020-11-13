const Employee = require("../lib/Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
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
        return this.title = "Engineer"
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;