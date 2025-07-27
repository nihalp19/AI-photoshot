import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainSection from '../components/MainSection';
import Sidebar from '../components/SideBar';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);

  const handleHistorySelect = (item: any) => {
    setSelectedHistoryItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar onHistorySelect={handleHistorySelect} />
      
      {/* Main Content */}
      <div className="flex-1 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">AI Ad Generator</h1>
            <p className="text-gray-400 text-lg">
              Create stunning product advertisements with AI
            </p>
          </motion.div>


          {/* Main Content Section */}
          <MainSection 
            images={images} 
            setImages={setImages}
            selectedHistoryItem={selectedHistoryItem}
            onClearSelection={() => setSelectedHistoryItem(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;