import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Menu, X, LogOut } from 'lucide-react';
import { useAuth, useClerk } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AdGen
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-300 transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="hover:text-gray-300 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300 transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50"
        >
          <div className="px-4 py-4 space-y-4">
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="block hover:text-gray-300 transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="block hover:text-gray-300 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-gray-300 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="block hover:text-gray-300 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
