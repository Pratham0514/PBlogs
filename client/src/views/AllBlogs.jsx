import { useEffect, useState } from "react";
import { getCurrentUser } from "./../util";

function AllBlogs() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

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

    </div>
  );
}

export default AllBlogs;