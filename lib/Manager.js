const Employee = require("../lib/Employee")

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
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
        return this.email
    }

    getRole(){
        return this.title = "Manager"
    }

    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager;