import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import axois from 'axios'
function Signup() {

 const [user ,setUser] = useState({
  name:"",
  email:"",
  password:""
 })

 const signupUser = async()=>{
  try{
    const response = await axois.post(`${import.meta.env.VITE_API_URL}/signup`,user);
    console.log(response.data);
  }
  catch(error){
    console.log(error)
  }
 }
  return (
   <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6] px-4">
  
  <div className="bg-[#CBDCEB] w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-lg">
    
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-700">
      Signup
    </h1>

    <div className="flex flex-col gap-4">
      
      <input
        type="text"
        placeholder="Name"
        className="p-3 sm:p-4 rounded-lg bg-[#E8DFCA] outline-none focus:ring-2 focus:ring-[#6D94C5] text-sm sm:text-base"
        value={user.name}
        onChange={(e)=> setUser({...user ,name:e.target.value})}
      />

      <input
        type="email"
        placeholder="Email"
        className="p-3 sm:p-4 rounded-lg bg-[#E8DFCA] outline-none focus:ring-2 focus:ring-[#6D94C5] text-sm sm:text-base"
        value={user.email}
        onChange={(e)=> setUser({...user , email: e.target.value})}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-3 sm:p-4 rounded-lg bg-[#E8DFCA] outline-none focus:ring-2 focus:ring-[#6D94C5] text-sm sm:text-base"
        value={user.password}
         onChange={(e)=> setUser({...user , password: e.target.value})}
      />

      <button className="bg-[#6D94C5] text-white p-3 sm:p-4 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base" onClick={signupUser}>
        Signup
      </button>
      <p className="text-xl text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-[#6D94C5] font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>

  </div>
</div>
  )
}

export default Signup