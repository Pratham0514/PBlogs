import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { BLOG_CATEGORIES } from '../constant';
import axios from 'axios';
import { getCurrentUser } from '../util';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
  const [content, setContent] = useState("**Type your Blog**");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  // 🔹 Load blog
  const loadBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`
      );

      const blog = response?.data?.data;

      setTitle(blog?.title || "");
      setContent(blog?.content || "");
      setCategory(blog?.category || BLOG_CATEGORIES[0]);

    } catch (error) {
      console.error("Error loading blog:", error);
      toast.error("Failed to load blog data");
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (slug) {
      loadBlog();
    }
  }, [slug]);

  // 🔹 Update Blog (FIXED)
  const UpdateBlog = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        toast.error("Title and Content are required!");
        return;
      }

      if (!user) {
        toast.error("User not logged in!");
        return;
      }

      setLoading(true);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        {
          title,
          content,
          category,
         
        }
      );

      toast.success("Blog updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Publish Blog
  const PublishBlog = async () => {
  try {
    setLoading(true);

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`
    );

    toast.success("Blog published successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    console.error("Publish Error:", error);
    toast.error(
      error?.response?.data?.message || "Failed to publish blog"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-3 sm:px-6 lg:px-10 py-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#6D94C5] mb-6">
        Edit Blog
      </h1>

      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full mb-4 p-3 rounded-lg border border-[#CBDCEB]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category */}
        <select
          className="w-full sm:w-1/2 mb-4 p-3 rounded-lg border border-[#CBDCEB]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Editor */}
        <div className="w-full bg-[#E8DFCA] shadow-lg rounded-xl p-3 border border-[#CBDCEB]">
          <MDEditor
            value={content}
            onChange={setContent}
            height={window.innerWidth < 640 ? 300 : 500}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={PublishBlog}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-700"
          >
            Publish
          </button>

          <button
            onClick={UpdateBlog}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[#6D94C5] text-white hover:bg-[#4A6E8E]"
          >
           Update
          </button>

        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default EditBlog;