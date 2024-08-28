const mongoose= require("mongoose");

const ServiceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter service name"]
        },
        description: {
            type: String,
            required:[true,"Please enter description"]
            
        },
        price: {
            type: Number,
            required:true,
            default:0
        },
        image:{
            type:String,
            required: false
        },  
    },
    {
        timestamps: true,
    }
);
const Service =mongoose.model("Service",ServiceSchema);
module.exports=Service;