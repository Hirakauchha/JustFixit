const mongoose=require('mongoose');

const RequestSchema=mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'UserModel',
            required:true
        },
        service_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Service',
            required:true
        },
        status:{
            type:String,
            enum:["pending","completed","in-progress","canceled"],
            default:'pending',
            required:true,

        },
        request_date:{
            type:Date,
            default:Date.now,
            required:true,

        }
    
    },
    {
        timestmaps:true,
    }
);
const Request=mongoose.model("Request",RequestSchema);
module.exports=Request;