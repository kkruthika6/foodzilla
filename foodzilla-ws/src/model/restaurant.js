class Restaurant {
    constructor( obj ) {
        this.restaurantId = obj.restaurantId;
        this.restaurantName = obj.restaurantName;
        this.restaurantDesc = obj.restaurantDesc;
        this.restaurantAddress = obj.restaurantAddress;
        this.restaurantRating = obj.restaurantRating;
        this.restaurantImages = obj.restaurantImages;
        this.menu = [{
            itemId: obj.itemId,
            itemName: obj.itemName,
            itemDesc: obj.itemDesc,
            itemPrice: obj.itemPrice
        }]
    }
}
module.exports = Restaurant;