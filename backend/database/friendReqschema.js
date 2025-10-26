
import mongoose from "mongoose";
import User from './userschema.js'
    
const FriendSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    status:{type:String, enum:['pending','accepted','rejected'], default:'pending'},
    timestamp:{type:Date, default:Date.now}
}
);
const FriendReq  = mongoose.model('FriendReq',FriendSchema);
export default FriendReq;