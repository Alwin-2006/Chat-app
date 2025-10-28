import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    sentBy:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    sentDate: {type:Date, default:Date.now},
    text: {type:String, required:true},
    sentTo:[{type:mongoose.Schema.Types.ObjectId, ref:'Chat', required:true}]
}
);
const Message  = mongoose.model('Message',messageSchema);
export default Message;