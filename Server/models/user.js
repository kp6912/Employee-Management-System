import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{type:String , require:true},
    email :{type:String , require:true},
    password :{type:String , require:true},
    role : {type:String, enum:["admin","employee"],require:true},
    profileImage : {type:String,},
    creatAt : {type:Date,default:Date.now},
    updateAt : {type:Date,default:Date.now}
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;