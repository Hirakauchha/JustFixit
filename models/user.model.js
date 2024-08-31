const mongoose=require("mongoose");
const {isEmail}=require("validator");
const bcrypt=require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        fullname:{
            type: String,
            required:[true, "Please enter your full name"]
        },
        email:{
            type:String,
            unique:true,
            required:[true,"Please enter your email"],
            validate:[isEmail,"Please enter a valid email"]
        },
        password:{
            type:String,
            required:[true,"Please enter your password"],
            minlength:[6,"Password length must be minimum of 6 characters"]
        },
        address:{
            type:String,
            required:[true,"Please enter your address"]
        },
        user_type:{
            type:String,
            enum:['customer','provider'],
            required:true
        },
        registrationdate:{
            type:Date,
            default:Date.now
        }
    }
)
UserSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
})
UserSchema.post('save',(doc,next)=>{
    console.log("new user created and saved",doc);
    next();

});
const UserModel=mongoose.model("UserModel",UserSchema);
module.exports=UserModel;