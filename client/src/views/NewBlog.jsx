import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { BLOG_CATEGORIES } from '../constant';
import axios from 'axios';
import { getCurrentUser } from '../util';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function NewBlog() {
  const [content, setContent] = useState("**Type your Blog**");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log("User from localStorage:", currentUser); // DEBUG
    setUser(currentUser);
  }, []);

  const handleSubmit = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        toast.error("Title and Content are required!");
        return;
      }

      if (!user) {
        toast.error("User not logged in!");
        return;
      }

      const authorId = user?._id || user?.id;

      if (!authorId) {
        toast.error("Invalid user ID!");
        return;
      }

      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
        title,
        content,
        category,
        author: authorId,
      });

      toast.success("Blog created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] px-3 sm:px-6 lg:px-10 py-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#6D94C5] mb-4 sm:mb-6">
        New Blog
      </h1>

      <div className="max-w-4xl mx-auto">

        <input
          type="text"
          placeholder="Blog Title"
          className="w-full mb-4 p-3 rounded-lg border border-[#CBDCEB]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full sm:w-1/2 mb-4 p-3 rounded-lg border border-[#CBDCEB]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="w-full bg-[#E8DFCA] shadow-lg rounded-xl p-3 border border-[#CBDCEB]">
          <MDEditor
            value={content}
            onChange={setContent}
            height={window.innerWidth < 640 ? 300 : 500}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto mt-4 px-6 py-3 rounded-lg bg-[#6D94C5] text-white hover:bg-[#4A6E8E] disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Submit"}
        </button>

        <Toaster />
      </div>
    </div>
  );
}

export default NewBlog;