import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUpload from '../components/ImageUpload';
import PromptSection from '../components/PromptSection';
import HistorySection from '../components/HistorySection';
import { Upload, MessageSquare, History, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [images, setImages] = useState<File[]>([]);

  const tabs = [
    { id: 'upload', label: 'Upload Images', icon: <Upload className="h-5 w-5" /> },
    { id: 'prompt', label: 'Generate Ads', icon: <Sparkles className="h-5 w-5" /> },
    { id: 'history', label: 'History', icon: <History className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Create stunning product advertisements with AI
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'upload' && (
            <ImageUpload images={images} setImages={setImages} />
          )}
          {activeTab === 'prompt' && (
            <PromptSection images={images} />
          )}
          {activeTab === 'history' && <HistorySection />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;