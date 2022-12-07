const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const expressAsyncHandler = require('express-async-handler');

const User = require('../models/User');
const Address = require('../models/Address');

const genrateToken =(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    },'FoodZilla',{
        expiresIn:'30d',
    })
}
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

// post request for signining users
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) { // if password mateches
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                mobNo: user?.mobNo,
                token: genrateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid Email or Password' })
})
);

//post route for signup
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        res.status(401).send({ message: 'User already exits' })

    } else {
        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genrateToken(user),

        })
    }

})

);

userRouter.get('/shipping/:id', expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const address = await Address.find({ userId: id })
    res.send(address)
}))

//delete address
userRouter.delete('/address/:id', expressAsyncHandler(async (req, res) => {
    await Address.deleteOne({ _id: req.params.id })
    res.send({ id: req.params.id })
}))

//update address
userRouter.put('/address/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id)

    if (address) {
        address.name = req.body.name;
        address.mobNo = req.body.mobNo
        address.pinCode = req.body.pinCode
        address.address = req.body.address
        address.town = req.body.town
        address.state = req.body.state
        address.city = req.body.city
        const newAddress = await address.save()
        res.send(newAddress)
    }
    else {
        res.status(404).send({ message: 'Address not found !' })
    }
}))

//Add address
userRouter.post('/address', expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const newAdress = Address({
        name: req.body.name,
        mobNo: req.body.mobNo,
        pinCode: req.body.pinCode,
        address: req.body.address,
        town: req.body.town,
        state: req.body.state,
        city: req.body.city,
        userId: req.body.userId
    })
    const address = await newAdress.save()
    res.send(address)

}))

//Update User
userRouter.put('/updateProfile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name;
        user.mobNo = req.body.mobNo
        const updatedUser = await user.save()
        res.send({
            _id: user._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            mobNo: updatedUser.mobNo,
            token: genrateToken(updatedUser),
        })
    }
    else {
        res.status(404).send({ message: 'User not found' })
    }


}))

module.exports = userRouter;