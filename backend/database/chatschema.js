import mongoose from "mongoose";
import User from './userschema.js'

const chatSchema = new mongoose.Schema({
    roomId:{type:String, required:true, unique:true},
    isGroup:{type:Boolean, default:false},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    Dateofcreation:{type:Date, default:Date.now},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    title:{type:String  },
    lastmsg:{type:mongoose.Schema.Types.ObjectId, ref:'Message'}
}
);
const Chat  = mongoose.model('Chat',chatSchema);
export default Chat;