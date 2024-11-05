import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ searchTerm, setSearchTerm, toggleAuthForm, isLoggedIn, setLoggedIn }) {
  const handleLogout = () => {
    // Handle logout logic here
    setLoggedIn(false);
    alert('Logged out successfully');
    // Optionally, redirect to a specific page or clear user session
    // window.location.href = '/login'; // Uncomment if you want to redirect
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left - Company Name */}
      <Link to="/" className="text-2xl font-bold text-gray-800">BookMyCaterer</Link>

      {/* Right - Search and Navigation */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 outline-none"
          />
        </div>

        {/* Conditional Rendering */}
        {!isLoggedIn ? (
          <>
            <Link to="/contactus" className="text-gray-700 hover:text-black transition">
              Contact
            </Link> 
            

              <Link to="/login">
              <button 
                className="flex items-center bg-gray-800 text-white px-4 py-1 hover:bg-gray-900 transition"
                aria-label="Login"
              >
                <i className="fas fa-user mr-2"></i> Login
              </button>
            </Link> 
          </>
        ) : (
          <>
            <Link to="https://bookmycater.freewebhostmost.com/admin.html" className="text-gray-700 hover:text-black transition">
              New Vendor
            </Link> 

            <button 
              onClick={handleLogout} 
              className="flex items-center text-gray-700 hover:text-black transition"
              aria-label="Logout"
            >
              <i className="fas fa-sign-out-alt mr-1"></i> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
