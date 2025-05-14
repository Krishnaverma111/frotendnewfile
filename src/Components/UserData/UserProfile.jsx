import React from 'react';
import { useAuth } from '../context/AuthConetxt';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function UserProfile() {
  const { userData } = useAuth();
  const img = userData?.img?.[0]?.url;

  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, url: "#" },
    { icon: <FaLinkedin className="text-xl" />, url: "#" },
    { icon: <FaTwitter className="text-xl" />, url: "#" },
    { icon: <FaInstagram className="text-xl" />, url: "#" }
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-2xl flex flex-col md:flex-row"
      >
        {/* Left Side - Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/3 bg-indigo-100 flex items-center justify-center p-8"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-indigo-200 blur-md"></div>
            <img
              src={img}
              alt={userData.name}
              className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg z-10"
            />
          </div>
        </motion.div>

        {/* Right Side - Details */}
        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              {userData.name}
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="ml-2 inline-block"
              >
                👋
              </motion.span>
            </h1>
            
            <div className="flex items-center text-gray-600 space-x-2">
              <FaEnvelope className="text-indigo-500" />
              <span>{userData.email}</span>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Connect with me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-200 transition-colors"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}