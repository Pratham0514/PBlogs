import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import axios from 'axios';
function ReadBlog() {
  const { slug } = useParams();
  const [blog , setBlog] = useState(null);

  const fetchBlog =async ()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
      setBlog(response.data.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }
  useEffect(()=>{
    fetchBlog();
  }, [slug])
  return (
<div className="max-w-7xl mx-auto mt-8 px-4">

  <div className="bg-[#F5EFE6] rounded-2xl shadow-lg border border-[#CBDCEB] p-6 sm:p-8">

    {/* Header (NO absolute) */}
    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">

      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6D94C5] text-white font-bold shadow-md text-lg">
          {blog?.author?.name?.charAt(0)}
        </div>

        <div className="flex flex-col">
          <span className="text-2sm font-semibold text-gray-800">
            {blog?.author?.name}
          </span>
          <span className="text-1xs font-medium text-gray-500">
           {blog?.author?.email}
          </span>
        </div>
      </div>

      {/* Right: Date */}
      <div className="text-xs font-medium text-gray-500">
        📅 {new Date(blog?.createdAt).toLocaleDateString()}
      </div>

    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold text-[#6D94C5] mb-4 text-center">
      {blog?.title}
    </h1>

    {/* Meta Info */}
    <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-700 mb-4">
      <span>📂 {blog?.category}</span>

      <span className={`px-3 py-1 rounded-full text-xs font-medium 
        ${blog?.status === "draft" 
          ? "bg-yellow-100 text-yellow-700" 
          : "bg-green-200 text-green-800"}`}>
        {blog?.status}
      </span>
    </div>

    <div className="border-t border-[#CBDCEB] mb-4"></div>

    {/* Content */}
    <div className="w-full bg-[#E8DFCA] rounded-xl p-5 shadow-inner border border-[#CBDCEB] mb-4">
      <MDEditor.Markdown
        source={blog?.content}
        style={{ backgroundColor: "transparent", color: "#333" }}
      />
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
      <span className="truncate">Slug: {slug}</span>
      
    </div>

  </div>

</div>
  )
}

export default ReadBlog