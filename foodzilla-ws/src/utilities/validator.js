let Validator = {};

//to validate first name
Validator.validateFirstName = function (firstName) {
    if(firstName == ""){
        let err = new Error('Please enter the first name.');
        err.status = 400;
        throw err;
    }
    let check = String(firstName).match( /^[a-zA-Z]+[a-zA-Z ]*$/ )
    if (!check) {
        let err = new Error('Not a valid first name. First Name should contain only alphabets and space.');
        err.status = 400;
        throw err;
    }
}

//to validate last name
Validator.validateLastName = function (lastName) {
    if(lastName == ""){
        let err = new Error('Please enter the last name.');
        err.status = 400;
        throw err;
    }
    let check = String(lastName).match( /^[a-zA-Z]+[a-zA-Z ]*$/ )
    if (!check) {
        let err = new Error('Not a valid last name. Last Name should contain only alphabets and space.');
        err.status = 400;
        throw err;
    }
}

//to validate emailId
Validator.validateEmailId = function (emailId) {
    if(emailId == ""){
        let err = new Error('Please enter the email id.');
        err.status = 400;
        throw err;
    }
    let check = String(emailId).match( /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)$/ )
    if (!check) {
        let err = new Error('Not a valid emailId.');
        err.status = 400;
        throw err;
    }
}

//to validate password
Validator.validatePassword = function (password) {
    if(password == ""){
        let err = new Error('Please enter the password.');
        err.status = 400;
        throw err;
    }
    let check = String(password).match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/ )
    if (!check) {
        let err = new Error('Not a valid password. Password should contain atleast one lowercase letter, uppercase letter, digit and special character having length between 8 and 20.');
        err.status = 400;
        throw err;
    }
}

Validator.validateRole = function (role) {
    if(role == ""){
        let err = new Error('Please enter the role.');
        err.status = 400;
        throw err;
    }
}

module.exports = Validator;