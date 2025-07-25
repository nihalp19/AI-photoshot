import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Camera className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">AI PhotoShoot</span>
          </motion.div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => openSignIn()}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
              onClick={() => openSignUp()}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  openSignIn();
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-black transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  openSignUp();
                  setIsMenuOpen(false);
                }}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-center"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
