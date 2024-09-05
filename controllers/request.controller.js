const Request= require("../models/request.model.js")
const createRequest= async (req, res)=>{
    try {
        const user_id=req.user._id;
        const {service_id,status}=req.body;
        if(!service_id){
            return res.status(400).json({message:"Service ID is required"});
        }
        const newRequest= await Request.create({
            user_id,
            service_id,
            status,
            request_date:new Date(),
        });
        res.status(200).json(newRequest);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}
module.exports={
    createRequest
}