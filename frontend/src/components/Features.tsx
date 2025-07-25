import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Wand2, 
  Download, 
  Zap, 
  Shield, 
  Palette,
  Clock,
  Star,
  Users
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Smart Upload',
      description: 'Drag and drop multiple photos with instant preview and automatic optimization.'
    },
    {
      icon: Wand2,
      title: 'AI Magic',
      description: 'Advanced AI algorithms transform your photos with natural language prompts.'
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Get high-resolution results in seconds, ready for professional use.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process multiple images simultaneously with our optimized AI pipeline.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your photos are encrypted and automatically deleted after processing.'
    },
    {
      icon: Palette,
      title: 'Style Variety',
      description: 'Choose from hundreds of artistic styles and professional looks.'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Photos Enhanced' },
    { number: '50K+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9★', label: 'User Rating' }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
              Professional Results
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform ordinary photos into extraordinary professional images with the power of AI.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6"
              >
                <feature.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-black rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Creators Worldwide
            </h3>
            <p className="text-gray-300 text-lg">
              Join thousands of photographers, designers, and content creators
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
            Ready to Transform Your Photos?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Start creating professional-quality images with AI in just a few clicks.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center space-x-2"
          >
            <Star className="h-5 w-5" />
            <span>Start Free Trial</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;