import React, { useState } from 'react'

function Login() {

    const [username,setUsername] = useState()

    function login(e){
        // e.preventDefault()
        localStorage.setItem('user',username)
        // console.log(username)
    }
    return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        {/*App Name */}
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Ticketing App
        </h1>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={login}>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

      
      </div>
    </div>
  )
}

export default Login