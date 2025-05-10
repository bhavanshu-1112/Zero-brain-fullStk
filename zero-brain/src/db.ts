import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/zeroBrain");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

})

export const User = mongoose.model("User", userSchema);

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type:{
        type:String
    },

    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})



export const Content = mongoose.model("Content", contentSchema)

const LinkSchema = new mongoose.Schema({
    hash : {
        type:String,
        required:true
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required :true,
        unique:true
    }

})
export const Link = mongoose.model("Link", LinkSchema);
