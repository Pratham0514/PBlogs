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
      slug: `temp-slug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Temporary slug, will be updated after saving to get the ID
    });
    
    const savedBlog = await newBlog.save();
    savedBlog.slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${savedBlog._id}`;
    await savedBlog.save();

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

export const getBlogs = async (req, res) => {
const { author } = req.query;

const condition = [{ status: "published"  }];
if (author) {
  condition.push({ author: author });
}

try {
  const blogs = await Blog.find({
    $or: condition
  })
    .populate("author", "_id name email")
    .sort({
      status: 1,
      createdAt: -1
     });

  res.status(200).json({
    success: true,
    data: blogs
  });

} catch (error) {
  res.status(500).json({ message: "Error fetching blogs" });
}
};