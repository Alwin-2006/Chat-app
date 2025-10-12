import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../database/userschema.js';
import Chats from '../database/chatschema.js';

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