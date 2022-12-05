const Restaurant = require('../model/Restaurant');
const restaurantdb = require('../model/restaurantModel');

let restaurantService = {}

//To get all Restaurants
restaurantService.getAllRestaurants = ()=>{
    return restaurantdb.getAllRestaurants().then(restaurants=>{
        if(restaurants.length == 0){
            let error = new Error("No Restaurants found in the database");
            error.status = 404;
            throw error;
        }
        else 
            return restaurants;
    })
}

//Individual Restaurant
restaurantService.getIndvRestaurant = (restaurantId)=>{
    return restaurantdb.getIndvRestaurant(restaurantId).then(restaurant=>{
        if(restaurant.length == 0){
            let error = new Error("No Restaurants found in the database");
            error.status = 404;
            throw error;
        }
        else 
            return restaurant;
    })
}

//Create Restaurant
restaurantService.addRestaurant = (RestaurantObj) => {
    return restaurantdb.findRestaurant(RestaurantObj.restaurantId).then(object => {
        {
            if (object != null) {
                let err = new Error("Restaurant already exists with this id");
                err.status = 404;
                throw err;
            } else {
                return restaurantdb.addRestaurant(RestaurantObj).then((data) => {
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

module.exports = restaurantService;