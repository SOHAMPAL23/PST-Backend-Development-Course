const mongoose = require("mongoose");
const User = require("../models/user.model");

const connectToDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://sohamlog1:%3CulZzsajOYffayoVc%3E@cluster0.r3htc04.mongodb.net/user");
        console.log("Connected to DB");

        // Basic CRUD : not part of Project
        // const users = await User.find();
        // console.log(users);

        // const newUser = {
        //     name:"a",
        //     email:"a@gmail.com",
        //     interest:"backend",
        //     marks:80,
        //     address:[{
        //         houseNumber: 7,
        //         landMark: "White Field",
        //         pinCode: "560066"
        //     }],
        //     isActive: true
        // }
        // // create vs insertOne
        // const user = await User.create(newUser);


    } catch(error){
        console.error("Error Connecting DB...", error);
    }
    
}

module.exports = connectToDB;

