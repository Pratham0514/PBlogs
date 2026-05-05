import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { get } from 'mongoose';
import { postSignup, postLogin } from './controllers/user.js';
import { postBlogs , getBlogs ,getBlogFromSlug , patchPublishBlog ,putBlogs } from './controllers/blog.js';
import jwt from 'jsonwebtoken';

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
// Middleware to check JWT token for protected routes
const jwtCheck = (req, res, next) => {
    req.user = null; // Initialize user to null
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ message: 'Unauthorized: No token provided' });
    }

    try{
        const token = authorization.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error("JWT verification error: ", error);
        return res.status(400).json({ message: 'Unauthorized: Invalid token' });
    }
};

app.post("/signup" , postSignup);

app.post("/login" , postLogin);

app.get("/blogs" , getBlogs);
app.post("/blogs" , jwtCheck, postBlogs);

app.get("/blogs/:slug" , getBlogFromSlug);
app.patch("/blogs/:slug/publish" , jwtCheck, patchPublishBlog);
app.put("/blogs/:slug" , jwtCheck, putBlogs);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
