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
module.exports={
    getCurrentUserData
}