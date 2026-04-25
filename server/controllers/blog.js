// controllers/blogController.js
import Blog from '../models/Blog.js';

export const postBlogs = async (req, res) => {
  const { title, content, author, category } = req.body;

  if (!title || !content || !author || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      category,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      blog: savedBlog,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};