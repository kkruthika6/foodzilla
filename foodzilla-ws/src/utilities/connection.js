const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const URL = 'mongodb+srv://MongoDb:mongodb123@foodzilla.bvmacmd.mongodb.net/FoodZilla?retryWrites=true&w=majority';

let connection = {};

const userSchema = Schema({
    "firstName": {
        type: String,
        required: true,
    },
    "lastName": {
        type: String,
        required: true,
    },
    "emailId": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "role": {
        type: String,
        enum: ['user', 'owner'],
        default: 'user',
        required: true
    }
}, { collection: "User" });

const restaurantSchema = Schema({
    restaurantId: { type: Number, unique: true },
    restaurantName: { type: String },
    restaurantDesc: { type: String },
    restaurantAddress: { type: String },
    restaurantRating: { 
        type: Number,
        enum: [1,2,3,4,5],
        default: 1,
        required: true
     },
    restaurantImages: [{
        type: String
    }],
    menu: [{
        itemId: { type: Number },
        itemName: { type: String },
        itemDesc: { type: String },
        itemPrice: { type: String },
    }]


}, { collection: "Restaurant" });


connection.getUserCollection = async () => {
    return mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        console.log("Connected to FoodZilla database");
        return database.model('User', userSchema)
    }).catch((error) => {
        console.log(error.message);
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    });
}

connection.getRestaurantCollection = async () => {
    return mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        console.log("Connected to FoodZilla database");
        return database.model('Restaurant', restaurantSchema)
    }).catch((error) => {
        console.log(error.message);
        let err = new Error("Could not connect to database");
        err.status = 500;
        throw err;
    });
}

module.exports = connection;