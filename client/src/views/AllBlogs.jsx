import { use, useEffect, useState } from "react";
import { getCurrentUser } from "./../util";
import axios from "axios";
import BlogCard from "../components/BlogCard";
function AllBlogs() {
  const [user, setUser] = useState(getCurrentUser());
   const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs? author=${user ? user._id : ""}`);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
    fetchBlogs();
  }, []);

   useEffect(() => {
      fetchBlogs();
  }, [user]);
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5EFE6" }}>
      
      <h1 
        className="text-2xl sm:text-3xl font-bold text-center mb-6"
        style={{ color: "#6D94C5" }}
      >
        All Blogs
      </h1>

      <div 
        className="p-6 rounded-xl shadow-md text-center"
        style={{ backgroundColor: "#E8DFCA" }}
      >
        {user ? (
          <p 
            className="text-lg"
            style={{ color: "#6D94C5" }}
          >
            Hello, {user.name}! 👋
          </p>
        ) : (
          <p 
            className="text-lg"
            style={{ color: "#6D94C5" }}
          >
            Please login to see the blogs.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog)=>{
          const { _id, title, content, author, category, status ,slug ,createdAt ,updatedAt} = blog;
          return <BlogCard key={_id} title={title} content={content} author={author} category={category} status={status} slug={slug} createdAt={createdAt} updatedAt={updatedAt} />
         
        })}
      </div>

    </div>
  );
}

export default AllBlogs;