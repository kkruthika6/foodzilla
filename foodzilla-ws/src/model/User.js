class User {
    constructor( obj ) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.emailId = obj.emailId;
        this.password = obj.password;
        this.role = obj.role;
    }
}

module.exports = User;