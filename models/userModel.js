import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

//Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'password length should be greater than 6 character']
    },
    location:{
        type:String,
        default:'India'
    },
    },{timestamps:true}

);
//middleware
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
//compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}
//josn webtoken
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
}
//compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

export default mongoose.model("User",userSchema);