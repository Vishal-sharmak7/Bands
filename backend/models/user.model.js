import mongoose from "mongoose"

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true,
        unique:true
    },
     password:{
        type: String,
        required: true
    },
}
)
export const usermodel = mongoose.model("usermodel" , userSchema)