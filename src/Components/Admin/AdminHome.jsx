import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound } from "react-icons/lu";
import { FiImage, FiLogOut } from "react-icons/fi";
import { MdLiveTv } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { SiMaxplanckgesellschaft } from "react-icons/si";
import { useAuth } from '../context/AuthConetxt';
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import User from './User';
import ProductDetails from './ProductDetails';
import AddProduct from './AddProduct';
import Downloads from './Downloads';
import Revenue from './Revenue';

const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [activeMobileComponent, setActiveMobileComponent] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const AdminhandleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuItems = [
    { icon: <RxDashboard />, label: 'Dashboard', component: 'Dashboard' },
    { icon: <LuUsersRound />, label: 'Users', component: 'User' },
    { icon: <FiImage />, label: 'ProductDetails', component: 'ProductDetails' },
    { icon: <MdLiveTv />, label: 'Add Product', component: 'AddProduct' },
    { icon: <IoBagCheckOutline />, label: 'Downloads', component: 'Downloads' },
    { icon: <SiMaxplanckgesellschaft />, label: 'Revenue', component: 'Revenue' },
  ];

  const renderComponent = (component) => {
    switch (component) {
      case 'Dashboard': return <Dashboard />;
      case 'User': return <User />;
      case 'ProductDetails': return <ProductDetails />;
      case 'AddProduct': return <AddProduct />;
      case 'Downloads': return <Downloads />;
      case 'Revenue': return <Revenue />;
      default: return <Dashboard />;
    }
  };

  const sidebarVariants = {
    open: { width: '18%', opacity: 1 },
    closed: { width: '0%', opacity: 0 }
  };

  const contentVariants = {
    open: { marginLeft: '18%' },
    closed: { marginLeft: '0%' }
  };

  const navItemVariants = {
    hover: { scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)' },
    tap: { scale: 0.98 }
  };

  const mobileNavItemVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop View */}
      <div className='hidden md:block'>
        <div className='flex pt-18'>
          {/* Sidebar */}
          <motion.div
            className='bg-gradient-to-b from-black via-gray-900 to-red-800 min-h-screen px-4 py-2 shadow-2xl flex flex-col border-r-4 border-red-500'
            initial="open"
            animate={isSidebarOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Racing stripe */}
            <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-full mb-4 animate-pulse" />

            <div className="flex justify-between items-center mb-6">
              <motion.h1 
                className='text-2xl font-extrabold text-red-500 tracking-widest'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isSidebarOpen ? '🏁 RACER HUB' : ''}
              </motion.h1>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-red-400 p-2 rounded-full hover:bg-red-700"
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>
            
            <ul className='mt-4 flex-grow'>
              {menuItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className='mb-2'
                  whileHover="hover"
                  whileTap="tap"
                  variants={navItemVariants}
                >
                  <button
                    className={`w-full flex items-center gap-3 text-sm capitalize justify-start py-3 px-4 rounded-lg transition-all font-semibold
                    ${activeComponent === item.component ? 
                      'bg-red-600 text-white shadow-md border-l-4 border-yellow-400' : 
                      'text-gray-200 hover:text-white hover:bg-gray-800'}`}
                    onClick={() => setActiveComponent(item.component)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isSidebarOpen && <span>{item.label}</span>}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Logout Button */}
            <motion.div 
              className="mb-4"
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
            >
              <button
                className="w-full flex items-center gap-3 text-sm capitalize justify-start py-3 px-4 rounded-lg text-gray-200 hover:text-white hover:bg-red-700"
                onClick={AdminhandleLogout}
              >
                <span className="text-xl"><FiLogOut /></span>
                {isSidebarOpen && <span>Log Out</span>}
              </button>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className='flex-1 p-8'
            initial="open"
            animate={isSidebarOpen ? "open" : "closed"}
            variants={contentVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeComponent}
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                {renderComponent(activeComponent)}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className='md:hidden'>
        <div className='p-4 bg-gray-100 min-h-screen pb-24'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeMobileComponent}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              {renderComponent(activeMobileComponent)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Nav */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 w-full flex justify-between bg-black pt-3 pb-3 border-t-2 border-red-600 shadow-xl z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {menuItems.map(({ icon, label, component }, key) => (
            <motion.button
              key={key}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all
              ${activeMobileComponent === component ? 
                'text-red-500' : 
                'text-gray-400 hover:text-red-400'}`}
              onClick={() => setActiveMobileComponent(component)}
              whileHover="hover"
              whileTap="tap"
              variants={mobileNavItemVariants}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium">{label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;
