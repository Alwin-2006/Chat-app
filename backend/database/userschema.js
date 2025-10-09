import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String , required:[true,'please enter username'],trim:true,minLength:[3,'user should be at least 3 characters']}, //trim all empty spaces
    email:{type:String, required:[true,"please enter email"], unique:true,trim:true,lowercase:true,match:[/.+\@.+\..+/, 'Please enter a valid email address']},
    password:{type:String, required:[true, "please enter password"],minLength:[6,'minimum password should be of 6 characters']},
    createdAt:{type:Date, default:Date.now}
}
)
const User  = mongoose.model('User',userSchema);
export default User;