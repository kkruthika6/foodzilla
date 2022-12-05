const collection = require('../utilities/connection');

const userModel = {};

//To check whether the user with email id exist or not 
userModel.findUserByEmail = (emailId) => {
    return collection.getUserCollection().then(model => {
        return model.findOne({ "emailId": emailId }).then((userData) => {
            if (userData === null) {
                return null;

            } else {
                return userData;
            }
        })
    })
}

//to add a user
userModel.createUser = (newUser) => {
    return collection.getUserCollection().then(userModel => {
        return userModel.create(newUser).then(data => {
            if (data)
                return true;
            else
                return false;
        })
    })
}

//get all users
userModel.getAllUsers = () => {
    return collection.getUserCollection().then(userModel => {
        return userModel.find().then(users => users);
    });
}

//update user
userModel.updateUser = (firstName, lastName, emailId, password, role) => {
    return collection.getUserCollection().then(model => {
        return model.updateOne({ "emailId": emailId }, { $set: { "firstName":firstName, "lastName":lastName, "password": password, "role": role } }).then((data) => {
            if (data.modifiedCount == 1) {
                return emailId;
            } else {
                return null;
            }
        })
    })
}

//delete user
userModel.deleteUser = (emailId) => {
    return collection.getUserCollection().then(model => {
        return model.deleteOne({ "emailId": emailId }).then((data) => {
            if (data.deletedCount == 1) {
                return emailId;
            } else {
                return null;
            }
        })
    })
}

module.exports = userModel;