const UserModel = require("../models/user.model");

const getCurrentUserData=async(req,res)=> {
    try {
        const user= req.user;
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(200).send(userWithoutPassword);
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}
const updateCurrentUserData=async(req,res)=>{
    try {
        const user_id=req.user._id;
        const updatedUser= await UserModel.findByIdAndUpdate(
            user_id,
            {
                fullname:req.body.fullname,
                email:req.body.email,
                address:req.body.address,
            },{
                new: true,
                runValidators:true,
            }
        );
        console.log(req.body);

        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({
            message:'User updated successfully',
            user:updatedUser
        })
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}
module.exports={
    getCurrentUserData,
    updateCurrentUserData
}