import e from 'express';
import User from '../models/User.js';
const postSignup = async(req, res) => {
    const {name, email, password} = req.body;

    const nameRegex = /^[a-zA-Z\s]+$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if(!name || !email || !password){
        return res.status(400).json({success: false, message: 'Please provide name, email and password'});
    }
    if(nameRegex.test(name)===false){
        return res.status(400).json({success: false, message: 'Please provide a valid name (letters and spaces only)'});
    }
    if(emailRegex.test(email)===false){
        return res.status(400).json({success: false, message: 'Please provide a valid email address'});
    }
    if(passwordRegex.test(password)===false){
        return res.status(400).json({success: false, message: 'Please provide a valid password (minimum 5 characters, at least one letter and one number)'});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({success: false, message: 'User already exists'});
    }

    const newUser = new User({name, email, password});
    const savedUser = await newUser.save();
    res.status(201).json(
        {
          success: true,
          message: 'User registered successfully', 
          user: savedUser, });
};

const postLogin = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: 'Please provide email and password'});
    }
    const existingUser = await User.findOne({email ,password});
    if(existingUser){
        return  res.status(200).json({success: true, message: 'User logged in successfully', user: existingUser}); 
    }else{
        return res.status(400).json({success: false, message: 'Invalid email or password'});
    }
};

export { postSignup, postLogin };