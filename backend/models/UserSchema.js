const mongoose = require("mongoose");

//Creating a User Schema
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    score:{
        english:{
            type:Number,
            default:0
        },
        french:{
            type:Number,
            default:0
        },
        hindi:{
            type:Number,
            default:0
        },
        italian:{
            type:Number,
            default:0
        },
        spanish:{
            type:Number,
            default:0
        },
        portugese:{
            type:Number,
            default:0
        },

    },
    solvedQuestions:[{
        type:String
    }]
})



const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;