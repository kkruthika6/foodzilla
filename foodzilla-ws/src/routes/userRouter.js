const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userService = require('../service/userService');
const User = require('../model/User')
const validator = require('../utilities/Validator');

router.post('/create', async (req, res, next) => {

    try {
        validator.validateFirstName(req.body.name);
        validator.validateLastName(req.body.name);
        validator.validateEmailId(req.body.emailId);
        validator.validatePassword(req.body.password);
        validator.validateRole(req.body.role);

        let salt = await bcrypt.genSalt(15);
        let hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;

        const user = new User(req.body);

        userService.createUser(user).then(result => {
            if (result != null)
                res.json("User created Successfully");
        }).catch(err => next(err));
    }
    catch (err) {
        next(err);
    }

});

//To login 
router.post('/login', function (req, res, next) {
    let emailId = req.body.emailId;
    let password = req.body.password;

    userService.checkUser(emailId, password).then(result => {
        res.json({ result, status: 200 })
    }).catch(err => next(err));

});

router.put('/edit', async (req, res, next) => {

    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let emailId = req.body.emailId;
        let password = req.body.password;
        let role = req.body.role;

        validator.validateFirstName(firstName);
        validator.validateLastName(lastName);
        validator.validateEmailId(emailId);
        validator.validatePassword(password);
        validator.validateRole(role);

        let salt = await bcrypt.genSalt(15);
        let hash = await bcrypt.hash(req.body.password, salt);

        password = hash;

        userService.updateUser(firstName, lastName, emailId, password, role).then((result) => {
            res.status(200);
            res.json(`User ${result} updated successfully`);
        }).catch((err) => {
            next(err);
        });
    }
    catch (err) {
        next(err);
    }
});

router.delete('/delete', (req, res, next) => {
    try {
        let emailId = req.body.emailId;
        validator.validateEmailId(emailId);

        userService.deleteUser(emailId).then(result => {
            res.status(200)
            res.json(`User ${result} deleted successfully`);
        }).catch(err => next(err));
    }
    catch (err) {
        next(err);
    }
});

router.get('/getAll', (req, res, next) => {
    userService.getAllUsers().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => next(err));
});

module.exports = router;