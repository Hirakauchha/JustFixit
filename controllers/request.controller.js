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

const getRequestHistoryofConsumer= async(req, res)=>{
    try {
        const userID= req.user._id;
        const requestHistory= await Request.aggregate([
            {
                $match:{user_id:userID}
            },
            {
                $lookup:{
                    from:'services',
                    localField:'service_id',
                    foreignField:'_id',
                    as:'serviceDetails'
                }
            },
            {
                $unwind:'$serviceDetails'
            },
            {
                $lookup:{
                    from:'usermodels',
                    localField:'serviceDetails.provider',
                    foreignField:'_id',
                    as:'providerDetails'
                }
            },
            {
                $unwind:'$providerDetails'
            },
            {
                $project: {
                    name:'$serviceDetails.name',
                    category:'$serviceDetails.category',
                    fullname:'$providerDetails.fullname',
                    status:1,
                    request_date:1


                }
            }
            
           
        ]);
    
        res.status(200).json({requestHistory});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={
    createRequest,
    getRequestHistoryofConsumer
}