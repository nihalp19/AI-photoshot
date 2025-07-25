import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Copy, Download } from 'lucide-react';

interface PromptSectionProps {
  images: File[];
}

const PromptSection: React.FC<PromptSectionProps> = ({ images }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState('');

  const handleGenerate = async () => {
    if (images.length < 3) {
      alert('Please upload at least 3 images first');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedAd(`🌟 Stunning ${prompt} Advertisement 🌟

Transform your space with our premium product! 

✨ Key Features:
• Professional quality design
• Eco-friendly materials
• 30-day money-back guarantee
• Free shipping nationwide

Don't miss out on this limited-time offer! 

#ProductAdvertisement #QualityFirst #LimitedOffer`);
      setIsGenerating(false);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedAd);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Generate Advertisement</h2>
        <p className="text-gray-400 mb-6">
          Describe your product and target audience to generate compelling ad copy
        </p>

        {/* Prompt Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Description & Target Audience</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent resize-none"
              placeholder="e.g., Modern wireless earbuds for fitness enthusiasts who value high-quality audio and comfort during workouts..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || images.length < 3 || isGenerating}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400 flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Generate Advertisement</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Content */}
      {generatedAd && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Generated Advertisement</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-black/50 rounded-lg p-6 border border-gray-700">
            <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {generatedAd}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PromptSection;