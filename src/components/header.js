import { Menu, X } from "lucide-react";
import React ,{useState} from 'react'

function Header() {
 const [isOpen, setIsOpen] = useState(false);
 const credentials = window.localStorage
 const user = credentials.getItem('user')

 function logOut(){
    credentials.removeItem('user')
    window.location.reload()
 }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side - App name */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">Ticket App</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="/create-ticket" className="text-gray-700 hover:text-blue-600 font-medium">
              Create Ticket
            </a>
            <a href="/view-all-tickets" className="text-gray-700 hover:text-blue-600 font-medium">
              View All Tickets
            </a>
          </nav>

          {/* Right side - User */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user}</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 cursor-pointer" onClick={logOut}>
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col p-4 space-y-3">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
            <a href="/create-ticket" className="text-gray-700 hover:text-blue-600 font-medium">
              Create Ticket
            </a>
            <a href="/view-all-tickets" className="text-gray-700 hover:text-blue-600 font-medium">
              View All Tickets
            </a>
            <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700" onClick={logOut}>
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header