import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../database/userschema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) => {
	try{
		const session = await mongoose.startSession();
		mongoose.startTransation();
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
		const newUser = await User.create({username,email,hashedPassword},{session});

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
		await session.abortTransaction(); //this rolls back all the changes being made during the transaction
		session.endSession(); //always do session.endSession(), regardless of whether errors occur or not
		console.log(err.message);
		next(err);	
	}
} 

export const signin = async (req,res,next) =>{
	const {username,email,password} = req.body;
	
		const user = await User.findOne({$or: [{username:username},{email:email}]}); // QUERY OPERATORS(LEARN!!!)
		const passwordmatch = await bcrypt.compare(password,user.password); // bcrypt compare function
		if(!passwordmatch){
			return res.status(401).json({message:"wrong credentials"});
		}else {
			const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET || "Secret", {expiresIn: process.env.JWT_EXPIRES_IN || "1d"});
			res.status(201).json({message:"Successfully Logged in!", token});
		}
		 
	
	
}
















































/*export const signup = async (req, res , next )=>{
	const session = await mongoose.startSession();

	try{
		session.startTransaction();
		const {name, email, password} = req.body;

		// Check if email already exists
		const existingUser = await User.findOne({ email }).session(session);
		if(existingUser){
			// If user exists and password matches, treat as idempotent signup: issue token and return 200
			const isPasswordValid = await bcrypt.compare(password, existingUser.password);
			if(isPasswordValid){
				const token = jwt.sign({ userId: existingUser._id }, "secret", { expiresIn: "1d" });
				await session.commitTransaction();
				session.endSession();
				return res.status(200).json({
					success: true,
					message: 'User already existed; returning token',
					data: {
						token,
						user: existingUser
					}
				});
			}
			const error = new Error('User already exists!');
			error.statusCode = 409;
			throw error;
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user
		const newUser = await User.create([{ username: name, email, password: hashedPassword }], { session });

		// Sign JWT
		const token = jwt.sign({ userId: newUser[0]._id }, "secret", { expiresIn: "1d" });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({
			success: true,
			message: 'User created successfully',
			data: {
				token,
				user: newUser[0]
			}
		});

	}catch(error){
		try { await session.abortTransaction(); } catch(_) {}
		session.endSession();
		next(error);
	}
}
 */
