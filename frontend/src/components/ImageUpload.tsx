import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages }) => {
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

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Upload Product Images</h2>
        <p className="text-gray-400 mb-6">Upload 3-6 high-quality images of your product</p>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Drop images here or click to upload</p>
            <p className="text-gray-400">PNG, JPG, GIF up to 10MB each</p>
          </label>
        </div>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Uploaded Images ({images.length}/6)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <h4 className="font-medium mb-2">Requirements:</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Minimum 3 images, maximum 6 images</li>
            <li>• High resolution recommended (1080p or higher)</li>
            <li>• Clear, well-lit product shots work best</li>
            <li>• Different angles and perspectives preferred</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;