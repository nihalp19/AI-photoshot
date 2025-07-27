import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Sparkles, Send, Copy, Download } from 'lucide-react';

interface MainSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
  selectedHistoryItem?: any;
  onClearSelection?: () => void;
}

const MainSection: React.FC<MainSectionProps> = ({ 
  images, 
  setImages,
  selectedHistoryItem, 
  onClearSelection 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState('');

  useEffect(() => {
    if (selectedHistoryItem) {
      setPrompt(selectedHistoryItem.prompt);
      setGeneratedAd(selectedHistoryItem.preview);
    }
  }, [selectedHistoryItem]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = [...images, ...acceptedFiles].slice(0, 6);
    setImages(newImages);
  }, [images, setImages]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onDrop(files);
    }
  };

  const handleGenerate = async () => {
    if (images.length < 3) {
      alert('Please upload at least 3 images first');
      return;
    }

    setIsGenerating(true);
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

  const clearHistory = () => {
    setPrompt('');
    setGeneratedAd('');
    if (onClearSelection) {
      onClearSelection();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Create Advertisement</h2>
            <p className="text-gray-400">
              Upload product images and describe your target audience
            </p>
          </div>
          {selectedHistoryItem && (
            <button
              onClick={clearHistory}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Clear and start new"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors mb-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-base font-medium mb-1">Upload product images</p>
            <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB each (3-6 images)</p>
          </label>
        </div>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              Uploaded Images ({images.length}/6)
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
                <span>{selectedHistoryItem ? 'Regenerate Advertisement' : 'Generate Advertisement'}</span>
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
            <h3 className="text-xl font-bold">
              {selectedHistoryItem ? 'Previous Generation' : 'Generated Advertisement'}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button 
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                title="Download"
              >
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

export default MainSection;