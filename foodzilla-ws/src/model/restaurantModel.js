const collection = require('../utilities/connection');

const restaurantModel = {}

//To get all restaurants
restaurantModel.getAllRestaurants = () => {
    return collection.getRestaurantCollection().then(model => {
        return model.find().then(restaurants => restaurants)
    })
}

//Individual restaurant
restaurantModel.getIndvRestaurant = (restaurantId) => {
    return collection.getRestaurantCollection().then(model => {
        return model.findOne({'restaurantId': restaurantId}).then(restaurant => restaurant)
    })
}

//To check whether the restaurant with id exist or not 
restaurantModel.findRestaurant = (restaurantId) => {
    return collection.getRestaurantCollection().then(model => {
        return model.findOne({ "restaurantId": restaurantId }).then((restaurantData) => {
            if (restaurantData === null) {
                return null;

            } else {
                return restaurantData;
            }
        })
    })
}

//to add a restaurant
restaurantModel.addRestaurant = (newRestaurant) => {
    return collection.getRestaurantCollection().then(restaurantModel => {
        return restaurantModel.create(newRestaurant).then(data => {
            if (data)
                return true;
            else
                return false;
        })
    })
}

module.exports = restaurantModel;