const User = require('../model/User');
const userdb = require('../model/userModel');
const validator = require('../utilities/validator');

const bcrypt = require('bcrypt');

let UserService = {};

UserService.createUser = (UserObj) => {
    return userdb.findUserByEmail(UserObj.emailId).then(object => {
        {
            if (object != null) {
                let err = new Error("User already exists with this emailld");
                err.status = 404;
                throw err;
            } else {
                return userdb.createUser(UserObj).then((data) => {
                    if (data) {
                        return data;
                    }
                    else {
                        let err = new Error("Unable to Create");
                        err.status = 404;
                        throw err;
                    }
                })
            }
        }
    })
}

UserService.checkUser = (emailId, password) => {
    return userdb.findUserByEmail(emailId).then(object => {
        if (object == null) {
            let err = new Error("User not available!! Please register");
            err.status = 404;
            throw err;
        } else {
            if (object.emailId === emailId) {
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, object.password, (err, data) => {
                        if (data) {
                            return resolve(object);
                        } else {
                            err = new Error("Password is Incorrect");
                            err.status = 404;
                            return reject(err);
                        }
                    });
                })
            }
            else {
                let err = new Error("Authentication failed");
                err.status = 404;
                throw err;
            }          
        }
    })
}

UserService.getAllUsers = () => {
    return userdb.getAllUsers().then(users => {
        if (users.length == 0) {
            let error = new Error("No users found in the database");
            error.status = 404;
            throw error;
        }
        else
            return users;
    })
}

UserService.updateUser = (firstName, lastName, emailId, password, role) => {
    return userdb.findUserByEmail(emailId).then(object => {
        if (object && object.emailId == emailId) {
            return userdb.updateUser(firstName, lastName, emailId, password).then((data) => {
                if (data) {
                    return object.emailId;
                } else {
                    let err = new Error("User update failed");
                    err.status = 503;
                    throw err;
                }
            })
        } else {
            let err = new Error("User does not exist");
            err.status = 404;
            throw err;
        }
    })
}

UserService.deleteUser = (emailId) => {
    return userdb.findUserByEmail(emailId).then(object => {
        if (object && object.emailId == emailId) {
            return userdb.deleteUser(emailId).then((data) => {
                if (data) {
                    return object.emailId;
                } else {
                    let err = new Error("User delete failed");
                    err.status = 503;
                    throw err;
                }
            })
        } else {
            let err = new Error("User does not exist");
            err.status = 404;
            throw err;
        }
    })
}

module.exports = UserService;