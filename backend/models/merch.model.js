import mongoose from "mongoose"


const merchSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    size:{
        enum:[ "S" ,"M" , "L" , "XL" ],
        type:String,
        required: true
    },
    quantity:{
         type: Number,
         default:1
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

export const merch = mongoose.model("merch" , merchSchema)