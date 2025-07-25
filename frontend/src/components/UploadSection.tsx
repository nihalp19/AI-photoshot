import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Wand2, Download } from 'lucide-react';

const UploadSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0 || !prompt.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setProcessedImages(uploadedFiles.map(() => 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400'));
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen bg-white py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Create Your AI Photoshoot
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your photos and describe your vision. Our AI will transform them into stunning professional images.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-black transition-colors">
              <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {isDragActive ? 'Drop your photos here' : 'Upload Your Photos'}
                  </h3>
                  <p className="text-gray-600">
                    Drag & drop images or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports JPG, PNG, WebP (Max 10MB each)
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-black">Uploaded Photos ({uploadedFiles.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Prompt Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wand2 className="h-5 w-5 text-black" />
                <h3 className="text-lg font-semibold text-black">AI Prompt</h3>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision... (e.g., 'Professional headshot with studio lighting and neutral background')"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-black transition-colors"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{prompt.length}/500 characters</span>
                <div className="flex space-x-2">
                  <button className="text-sm text-gray-600 hover:text-black transition-colors">
                    Portrait
                  </button>
                  <button className="text-sm text-gray-600 hover:text-black transition-colors">
                    Professional
                  </button>
                  <button className="text-sm text-gray-600 hover:text-black transition-colors">
                    Artistic
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProcess}
              disabled={uploadedFiles.length === 0 || !prompt.trim() || isProcessing}
              className="w-full bg-black text-white py-4 rounded-full font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="h-5 w-5" />
                  <span>Generate AI Photos</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Results Section */}
        {processedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-black mb-2">Your AI Generated Photos</h3>
              <p className="text-gray-600">Professional quality results in seconds</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square">
                    <img
                      src={image}
                      alt={`AI Generated ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transition-opacity"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;