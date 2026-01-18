import User from "./models/user.js"
import bcrypt from "bcrypt"
import connectToDatabase from "./db/db.js"

const userRegister = async () =>{
    connectToDatabase()
    try {

        const hashpassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name : "admin",
            email : "admin@gmail.com",
            password : hashpassword,
            role : "admin"
        })
        await newUser.save();
        
    } catch (error) {
        console.log(error)
        
    }

}

userRegister();