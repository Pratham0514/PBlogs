// controllers/blogController.js
import Blog from '../models/Blog.js';
import jwt from 'jsonwebtoken';

export const postBlogs = async (req, res) => {
  const { title, content,  category } = req.body;
  const { user} = req;

  if (!title || !content  || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author: user._id, // Use the user ID from the decoded JWT
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

export const getBlogFromSlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blog.findOne({ slug })
      .populate("author", "_id name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      data: blog,
      message: "Blog fetched successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

export const patchPublishBlog = async (req, res) => {
    const { slug } = req.params;
  const { user } = req;

  try {
    // Step 1: Find blog
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    // Step 2: Check ownership
    if (blog.author.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only publish your own blogs"
      });
    }

    // Step 3: Update status
    blog.status = "published";
    await blog.save();

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog published successfully"
    });

  } catch (error) {
    console.error("Publish Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const putBlogs = async (req, res) => {
  const { slug } = req.params;
  const { title, content, category } = req.body;
  const { user } = req;

  const existingBlog = await Blog.findOne({ slug: slug });
  if (!existingBlog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  if (existingBlog.author.toString() !== user._id) {
    return res.status(403).json({ success: false, message: "you can only update your own blog" });
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { title, content, category },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog updated successfully"
    });

  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };  
};