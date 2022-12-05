const path = require('path');
require('dotenv').config({path:path.join(__dirname,'..','..','.env')});

const express = require('express');
const router = express.Router();

const restaurantService = require('../service/restaurantService');

const AWS = require("aws-sdk");
let multer = require("multer");

const bucketName = "foodzilla";

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
};

const S3 = new AWS.S3(awsConfig);

//Specify the multer config
let upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: function (req, file, done) {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            done(null, true);
        } else {
            //prevent the upload
            var newError = new Error("File type is incorrect");
            newError.name = "MulterError";
            done(newError, false);
        }
    },
});

//upload to s3
const uploadToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: `${Date.now().toString()}.jpg`,
            Body: fileData,
        };
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(data);
        });
    });
};

//All restaurants
router.get('/getRestaurants', (req, res, next) => {
    restaurantService.getAllRestaurants().then(result => {
        res.status(200).json(result)
    }).catch(err => next(err))
})

//Individual Restaurant
router.get('/:restaurantId', (req, res, next) => {
    restaurantService.getIndvRestaurant(req.params.productId).then(result => {
        res.status(200).json(result)
    }).catch(err => next(err))
})

//Add restaurant
router.post('/addRestaurant', upload.array('restaurantImages'), async (req, res, next) => {
    try {
        const restaurant = req.body;
        let imageData = [];

        if (req.files && req.files.length > 0) {
            for (var i = 0; i < req.files.length; i++) {
                imageData.push(await uploadToS3(req.files[i].buffer));
                imagePaths = imageData.map(data=>data.Location);
            }
        }
        restaurant.restaurantImages = imagePaths;
        restaurantService.addRestaurant(restaurant).then(result => {
            if (result != null)
                res.json("Restaurant created Successfully");
        }).catch(err => next(err));
    }
    catch (err) {
        next(err);
    }

});

module.exports = router;