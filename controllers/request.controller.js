const Request= require("../models/request.model.js")
const Service= require('../models/service.js')
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
                    servicename:'$serviceDetails.name',
                    category:'$serviceDetails.category',
                    serviceprovidername:'$providerDetails.fullname',
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

const getAllRequest=async(req,res)=>{
    try {
        const providerId=req.user._id;
        const services= await Service.find({provider:providerId});
        if(services.length===0){
            return res.status(404).json({message:"No services found for this provider."});
        }
        const serviceIds= services.map(service=>service._id);
        const requests = await Request.aggregate([
            {
                $match:{service_id:{$in:serviceIds}}
            },
            {
                $lookup:{
                    from:'usermodels',
                    localField:'user_id',
                    foreignField:'_id',
                    as:'customerDetails'
                }
            },
            {
                $unwind:'$customerDetails'
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
                $project:{
                    'customerDetails.fullname':1,
                    'customerDetails.email':1,
                    'serviceDetails.name':1,
                    'status':1,
                    'request_date':1
                }
            }
        ]);
        if(requests.length===0){
            return res.status(404).json({message:"No requests found for your services"});
        }
        res.status(200).json({requests});
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}
const cancelRequest=async(req,res)=>{
    try {
        const requestID=req.params.id;
        const providerID=req.user._id;
        

        const request =await Request.findById(requestID).populate('service_id');
        
        if(!request){
            return res.status(404).json({message: "Request not available or not authoized to cancel request"});

        }
        request.status='canceled';
        await request.save();
        res.status(200).json({message:"Request cancelled successfully",request});


    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
    


}
const approveRequest=async(req,res)=>{
    try {
        const requestID=req.params.id;
        const providerID=req.user._id;
        

        const request =await Request.findById(requestID).populate('service_id');
        
        if(!request){
            return res.status(404).json({message: "Request not available or not authoized to cancel request"});

        }
        request.status='approved';
        await request.save();
        res.status(200).json({message:"Request cancelled successfully",request});


    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
    


}
module.exports={
    createRequest,
    getRequestHistoryofConsumer,
    getAllRequest,
    cancelRequest,
    approveRequest
}