import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../database/userschema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
console.log("n");
export const signup = async (req,res,next) => {
	let session;
	try{
		
		 session = await mongoose.startSession();
		if(!session){
			const error = new Error("couldnt start session");
			throw error;
		}
		session.startTransaction();
		const {username,email,password} = req.body;
		//no need password validation, that can be done at the frontend because thats faster
		const existingEmail = await User.collection.findOne({email:email});
		if(existingEmail){
			const error = new Error("Email already exists!");
			error.statusCode = 401;
			throw error;
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password,salt);
		const newUser = await User.create([{username,email,password:hashedPassword}],{session});

		const token  = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET || "Secret", {expiresIn: process.env.JWT_EXPIRES_IN || "1d"});
		await session.commitTransaction();
		session.endSession();

		
		res.status(201).json({
			success:true,
			message:"User created successfully!",
			data:{
				token,
				user:newUser,
			}
		})
		
	}catch(err){
		console.log(err);
		await session.abortTransaction(); //this rolls back all the changes being made during the transaction
		session.endSession(); //always do session.endSession(), regardless of whether errors occur or not
		console.log(err.message);
		next(err);	
	}
} 

export const signin = async (req,res,next) =>{
	const {username,email,password} = req.body;
		try{
        const user = await User.findOne({$or: [{username:username},{email:email}]}); // QUERY OPERATORS(LEARN!!!)
        if(!user){
            return res.status(401).json({message:"wrong credentials"});
        }
        const passwordmatch = await bcrypt.compare(password,user.password); // bcrypt compare function
		if(!passwordmatch){
			return res.status(401).json({message:"wrong credentials"});
		}else {
			const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET || "Secret", {expiresIn: process.env.JWT_EXPIRES_IN || "1d"});
            res.status(201).json({message:"Successfully Logged in!", user: { username: user.username, email: user.email, _id: user._id }, token});
		}
	}catch(err){
        console.error("Login error", err);
        res.status(500).json({error:err.message})
	}
		 
	
	
}



























