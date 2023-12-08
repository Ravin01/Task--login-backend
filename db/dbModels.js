import mongoose from "mongoose";

export const UserSchema = mongoose.Schema({
    id : {
        type : 'string',
        require : true
    },
    name : {
        type : 'string',
        require : true
    },
    email : {
        type : 'string',
        require : true
    },
    number : {
        type : 'string',
        require : true
    },
    password : {
        type : 'string',
        require : true
    },

})

export const UserModel = mongoose.model("users",UserSchema)