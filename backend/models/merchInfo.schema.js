import mongoose from "mongoose";

const merchSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        
    }
})
export const Store = mongoose.model("Store" , merchSchema)