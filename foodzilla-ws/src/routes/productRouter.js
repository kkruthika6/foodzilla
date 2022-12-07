const express = require('express');
const productRouter = express.Router();
const expressAsyncHandler = require('express-async-handler');

const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');

const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization
   
    if(authorization){
      const token = authorization.slice(7,authorization.length) //bearer token value
      jwt.verify(token,'FoodZilla',(err,decode)=>{
          if(err){
              res.status(401).send({message:err.message})
          }
          else{
              req.user=decode
              next()
          }
      })
    }
    else{
        res.status(401).send({message:'No token'})

    }
}

//Get all products
productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  const products = await Product.find({category:req.query.category}) //return all products
  res.send(products)
}));

//Search product
productRouter.get('/search',expressAsyncHandler(async(req,res)=>{
    let regEx = new RegExp(req.query.name,'i');
    const serachedProducts = await Product.find({name:regEx})
    if(serachedProducts){
        res.send(serachedProducts)

    }else{
      res.status(402).send({message:'Opps No product found!!'})
    }
   }))

//Add to Wishlist
productRouter.post('/wishlist',isAuth,expressAsyncHandler(async(req,res)=>{
 const item = await Wishlist.findOne({product:req.body._id});
 if(item){
  res.status(409).send({message:'Item Already exits'});
 }
 else{
    const newItem = new Wishlist({
        name:req.body.name,
        image:req.body.image,
        price:req.body.price,
        rating:req.body.rating,
        description:req.body.description,
        userId:req.user._id,
        product:req.body._id
    })
    const wishlistItem = await newItem.save();
    res.send(wishlistItem)
 }
}))

//Add product
productRouter.post('/add-product',expressAsyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        category:req.body.category,
        price:req.body.price
    })
    const products = await newProduct.save();
    res.send(products)
}))

//Get products in wishlist
productRouter.get('/wishlist',isAuth,expressAsyncHandler(async(req,res)=>{

    const items = await Wishlist.find({userId:req.user._id});
    res.send(items)

}))

//Delete product from wishlist
productRouter.delete('/wishlist/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const items = await Wishlist.deleteOne({productId:req.params.id});
    res.send(req.params.id)

}))


// productRouter.get('/seed',
// expressAsyncHandler(async (req,res)=>{
//     const createProducts = await Product.insertMany(data.products)
//     res.send({products:createProducts})
// })
// )

//Find the product by id
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message:'Product not found!'})
    }
}))

module.exports =  productRouter;