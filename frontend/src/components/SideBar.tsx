import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Copy, Trash2, Eye, MessageSquare, Plus, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SidebarProps {
  onHistorySelect: (item: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onHistorySelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const historyItems = [
    {
      id: 1,
      title: "Wireless earbuds for fitness",
      prompt: "Wireless earbuds for fitness enthusiasts",
      date: "2025-01-08",
      status: "completed",
      preview: "🌟 Premium Wireless Earbuds 🌟\n\nPerfect for your active lifestyle..."
    },
    {
      id: 2,
      title: "Luxury skincare cream",
      prompt: "Luxury skincare cream for mature women",
      date: "2025-01-07",
      status: "completed",
      preview: "✨ Anti-Aging Skincare Revolution ✨\n\nTransform your skin with our..."
    },
    {
      id: 3,
      title: "Gaming chair for streamers",
      prompt: "Gaming chair for professional streamers",
      date: "2025-01-06",
      status: "completed",
      preview: "🎮 Ultimate Gaming Chair 🎮\n\nLevel up your streaming setup..."
    },
    {
      id: 4,
      title: "Organic coffee beans",
      prompt: "Premium organic coffee beans",
      date: "2025-01-05",
      status: "completed",
      preview: "☕ Premium Organic Coffee ☕\n\nStart your day with excellence..."
    },
    {
      id: 5,
      title: "Smart fitness watch",
      prompt: "Smart fitness watch for athletes",
      date: "2025-01-04",
      status: "completed",
      preview: "⌚ Smart Fitness Tracker ⌚\n\nTrack your progress like a pro..."
    }
  ];

  const handleItemClick = (item: any) => {
    onHistorySelect(item);
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? 60 : 320 }}
      animate={{ width: isCollapsed ? 60 : 320 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-700/50 flex flex-col h-screen shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              <Sparkles className="h-4 w-4" />
              <span>New Generation</span>
            </button>
          </motion.div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-5 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-2"
          >
            <h3 className="text-sm font-semibold text-gray-300 px-3 py-2 mb-3 bg-gray-800/30 rounded-lg">Recent Generations</h3>
            
            <div className="space-y-1">
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleItemClick(item)}
                  className="group p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/30 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-600/50 hover:shadow-lg"
                >
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view action
                      }}
                      className="p-1.5 bg-gray-700/50 hover:bg-blue-600 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <Eye className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(item.preview);
                      }}
                      className="p-1.5 bg-gray-700/50 hover:bg-green-600 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete action
                      }}
                      className="p-1.5 bg-red-900/30 hover:bg-red-600 rounded-lg text-red-400 hover:text-white transition-all duration-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {isCollapsed && (
          <div className="p-2 space-y-2">
            {historyItems.slice(0, 5).map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleItemClick(item)}
                className="w-full p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/30 transition-all duration-200 flex justify-center border border-transparent hover:border-gray-600/50"
                title={item.title}
              >
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-800/20">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-gray-400 text-center font-medium"
          >
            AI Ad Generator v1.0
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;