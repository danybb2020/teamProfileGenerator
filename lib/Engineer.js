const Employee = require("../lib/Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email, github);
        this.github = github;
       
    }

    getRole(){
        return this.title = "Engineer"
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;