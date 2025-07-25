import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, Trash2, Eye } from 'lucide-react';

const HistorySection = () => {
  const historyItems = [
    {
      id: 1,
      prompt: "Wireless earbuds for fitness enthusiasts",
      date: "2025-01-08",
      status: "completed",
      preview: "🌟 Premium Wireless Earbuds 🌟\n\nPerfect for your active lifestyle..."
    },
    {
      id: 2,
      prompt: "Luxury skincare cream for mature women",
      date: "2025-01-07",
      status: "completed",
      preview: "✨ Anti-Aging Skincare Revolution ✨\n\nTransform your skin with our..."
    },
    {
      id: 3,
      prompt: "Gaming chair for professional streamers",
      date: "2025-01-06",
      status: "completed",
      preview: "🎮 Ultimate Gaming Chair 🎮\n\nLevel up your streaming setup..."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Generation History</h2>
        <p className="text-gray-400 mb-6">
          View and manage your previous advertisement generations
        </p>

        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-black/30 border border-gray-700 rounded-lg p-6 hover:bg-black/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.prompt}</h3>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                      {item.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded p-4 border-l-4 border-gray-600">
                <p className="text-sm text-gray-300 line-clamp-3">
                  {item.preview}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {historyItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-400">No generation history yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Your generated advertisements will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;