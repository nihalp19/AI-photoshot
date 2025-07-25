import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {

  const [currentSection, setCurrentSection] = useState<'hero' | 'upload'>('hero');

  

  const handleGetStarted = () => {
    setCurrentSection('upload');
  };

  

 
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentSection === 'hero' ? (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
          </>
        ) : (
          <UploadSection />
        )}
      </motion.main>

      {currentSection === 'hero' && <Footer />}

    

      {/* Back to Hero Button when in Upload Section */}
      {currentSection === 'upload' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentSection('hero')}
          className="fixed bottom-8 left-8 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

export default App;