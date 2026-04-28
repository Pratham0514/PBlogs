import React from 'react'
import { Link } from 'react-router-dom';
function BlogCard({ _id, title, content, author, category, slug ,createdAt ,status}) {
  return (
   <div className="p-10 md:my-5 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-[#E8DFCA] relative border border-gray-200">

  <div className="absolute -top-4 left-4 md:w-15 md:h-15 w-12 h-12 flex items-center justify-center rounded-full bg-[#6D94C5] text-white font-bold shadow-md">
    {author.name.substring(0, 1)}
  </div>

  <span className="absolute top-4 right-5 px-3 py-1 md:text-[17px] text-[15 px] font-semibold rounded-full bg-yellow-300 text-yellow-900">
    {category}
  </span>

<span className="absolute top-1 left-18 px-3 py-1 md:text-[15px] text-[15px] font-semibold rounded-full" > 
    {status === "published" ? (
      <span className="absolute  px-3 py-1 text-[15px] font-semibold rounded-full bg-green-300 text-green-900">
        Published
      </span>
    ) : (
      <span className="absolute  px-3 py-1 text-[15px] font-semibold rounded-full bg-red-300 text-red-900">
        Draft
      </span>
    )}
</span>

  <h2 className="text-2xl font-bold mt-4 mb-2 text-[#3A5F8A] leading-snug">
    {title}
  </h2>


  <p className="text-gray-700 mb-4 text-1sm leading-relaxed">
    {content.substring(0, 120)}...
  </p>

  <div className="border-t border-gray-300 my-3"></div>


  <div className="flex space-x-4 text-3sm text-gray-600">
    <span>✍️ {author.name}</span>
    <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
  </div>

{status === "published" ? (  
  <Link
  to={`/read/${slug}`}
  className="absolute bottom-4 right-4 inline-flex items-center gap-1 cursor-pointer bg-[#6D94C5] text-white px-4 py-2 rounded-full  md:text-2sm text-sm     font-medium shadow-md hover:bg-[#5A7CB0] hover:shadow-lg active:scale-95 transition-all duration-200"
>
  Read More <span>→</span>
</Link>):(
  <span>
 <Link
  to={`/edit/${slug}`}
  className="absolute bottom-4 right-4 inline-flex items-center gap-1 cursor-pointer bg-[#6D94C5] text-white px-4 py-2 rounded-full md:text-2sm text-sm font-medium shadow-md hover:bg-[#5A7CB0] hover:shadow-lg active:scale-95 transition-all duration-200"
>
  Edit <span>→</span>
</Link>
</span>
)}
</div>
  )
}

export default BlogCard