const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const userRouter = require('../src/routes/userRouter');
const restaurantRouter = require('../src/routes/restaurantRouter');

const requestLogger = require('./utilities/RequestLogger')
const errorLogger = require('./utilities/ErrorLogger')

const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);

app.use(function (req, res) {
    return res.status(404).send({message: "Route not found"});
});

app.use(errorLogger);

app.listen(3000); 
console.log("Server Started at port 3000!");

module.exports = app;