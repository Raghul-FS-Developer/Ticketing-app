import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {

    const navigate = useNavigate()
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="text-center space-y-4">
        {/* Fancy Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400">
            Ticketing App
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-base md:text-lg max-w-md mx-auto">
          Manage your tickets with ease. Create, track, and resolve issues quickly.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button className="px-6 py-2 rounded-2xl bg-white text-purple-600 font-semibold shadow-md hover:scale-105 transition-transform" onClick={()=>navigate('/create-ticket')}>
            Create Ticket
          </button>
          <button className="px-6 py-2 rounded-2xl bg-purple-800 text-white font-semibold shadow-md hover:scale-105 transition-transform" onClick={()=>navigate('/view-all-tickets')}>
            View Tickets
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home