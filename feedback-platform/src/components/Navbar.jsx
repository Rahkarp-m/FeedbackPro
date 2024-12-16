import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/auth/check', {
          withCredentials: true
        });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.get('http://localhost:8800/auth/logout', {
        withCredentials: true
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8 items-center">
            {/* Logo or Brand Name */}
            <Link 
              to="/" 
              className="text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              FeedbackPro
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/feedback" 
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Give Feedback
              </Link>
              <Link 
                to="/display" 
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                View Feedback
              </Link>
            </div>
          </div>

          {/* Authentication Button */}
          <div>
            {isAuthenticated ? (
              <button 
                onClick={handleSignOut}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        
        <div className="md:hidden">
      
        </div>
      </div>
    </nav>
  );
}

export default Navbar;