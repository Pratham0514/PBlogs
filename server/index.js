import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { postSignup, postLogin } from './controllers/user.js';
import { postBlogs } from './controllers/blog.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if(conn){
            console.log("MongoDB connected successfully 📦✅");
        }
    }catch(error){
        console.error("Error connecting to MongoDB: 📦 ❌", error);
    }
};
connectDB();
{/* Health check */}
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' ,
        message: 'Welcome to the PBlogs API!' });
});

app.post("/signup" , postSignup);

app.post("/login" , postLogin);

app.post("/blogs" , postBlogs);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
