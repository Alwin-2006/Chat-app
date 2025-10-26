import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../database/userschema.js';
import Chats from '../database/chatschema.js';
import FriendReq from '../database/friendReqschema.js';

export const FetchLeaderboard = async (req,res,next) =>{
    try{
        const arr = await User.find().sort({level:-1}).limit(10);
        if(!arr){
            const err = new Error("Error finding users");
            throw err;
        }
        res.status(201).json({success:true, message:"succesfully fetched leaderboard", users:arr});
    }catch(err){
        console.error("Error fetching leaderboard", err);
        res.status(500).json({error:err.message})
    }
}

export const FetchChats = async (req,res,next) => {
    console.log("fetching chats!");
    const {id} = req.params;
    try{
        const arr = await Chats.find({'participants._id':id});
        if(arr){
            res.status(201).json({success:true, message:"successfully fetched chats",chats:arr});
        }else {
            const err = new Error("Error fetching chat");
            throw err;
        }
    }catch(err){
        console.error("Error fetching chats",err);
        res.status(500).json({error:err.message});
    }
}
///users?send={user}&receive={friend}
export const friendRequest = async (req,res,next) => {
    const {send, rec} = req.query;
    console.log("Friend request from", send, "to", rec);
    try{
        const user = await User.findOne({username:send});
        const friend = await User.findOne({username:rec});
        if(!user || !friend){
            const err = new Error("User or Friend not found");
            throw err;
        }
        const friendReq = new FriendReq({
            sender:user._id,
            receiver:friend._id,
            status:'pending'
        });
        await friendReq.save();

        res.status(201).json({success:true, message:"Friend request sent"});
    }catch(err){
        console.error("Error sending friend request", err);
        res.status(500).json({error:err.message});
    }     
}
//http://localhost:3000/users/${userId}/friends
export const incomingRequests = async (req,res,next) => {
    const userId = req.params.id;
    console.log(userId);
    try{
        const pending = await FriendReq.find({receiver:userId, status:'pending'}).populate('sender', 'username');
        const confirmed = await FriendReq.find({$or:[{receiver:userId},{sender:userId}], status:'accepted'}).populate('sender', 'username').populate('receiver', 'username');
        console.log("Pending requests:", pending);
        console.log("Confirmed requests:", confirmed);
        res.status(201).json({success:true, message:"Fetched incoming requests", requests:pending, confirmed:confirmed});
    }catch(err){
        console.error("Error fetching incoming requests", err);
        res.status(500).json({error:err.message});
    }
}   

export const acceptFriendRequest = async (req,res,next) => {
    const {send, rec} = req.query;
    try{
        const sender = await User.findOne({username:send});
        const receiver= await User.findOne({username:rec});
        if(!sender || !receiver){
            const err = new Error("Sender or Receiver not found");
            throw err;
        }
        const friendReq = await FriendReq.updateOne({sender:sender._id, receiver:receiver._id, status:'pending'},{$set: {status:'accepted'}});
        if(!friendReq){
            const err = new Error("Friend request not found");
            throw err;
        }
        friendReq.status = 'accepted';  
        await friendReq.save();
        res.status(201).json({success:true, message:"Friend request accepted"});
    }catch(err){
        console.error("Error accepting friend request", err);
        res.status(500).json({error:err.message});
    }
}