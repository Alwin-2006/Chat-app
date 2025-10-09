import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from '../database/userschema.js';

 const FetchLeaderboard = async (req,res,next) =>{
    console.log("fetching req");
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
export default FetchLeaderboard;