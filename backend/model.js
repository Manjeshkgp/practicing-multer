import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    img:{
        data:Buffer,
        contentType:String,
    }
})

export default new mongoose.model("Image",imgSchema);