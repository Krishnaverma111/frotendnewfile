import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { APIURL } from '../../GlobalURL';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import UserLogInSchema from './LogInValidation';
import { useAuth } from '../context/AuthConetxt';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLoggedIn, setUserImage, setUserData, setIsAdminLoggedIn } = useAuth();

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: UserLogInSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        isAdminLogin ? await handleAdminLogin(values) : await handleUserLogin(values);
      } catch (e) {
        showErrorToast(e.response?.data?.msg || 'Invalid Cgrayentials');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleUserLogin = async (cgrayentials) => {
    const response = await axios.post(`${APIURL}UserLogIn`, cgrayentials);
    localStorage.setItem("UserId", response.data?.userid);
    localStorage.setItem("usertoken", response.data?.token);
    if (response.status === 200) {
      showSuccessToast('Welcome Racer!');
      setIsLoggedIn(true);
      setUserImage(response.data.data.img[0].url);
      setUserData(response.data.data);
      navigate('/');
    }
  };

  const handleAdminLogin = async (cgrayentials) => {
    const response = await axios.post(`${APIURL}AdminLogIn`, cgrayentials);
    localStorage.setItem("AdminId", response.data?.adminid);
    localStorage.setItem("admintoken", response.data?.token);
    localStorage.setItem("email", response.data.data.email);
    if (response.status === 200) {
      showSuccessToast('Admin Pit Stop Ready!');
      setIsLoggedIn(true);
      setIsAdminLoggedIn(true);
      navigate(`/OtpVerification/AdminVerify/${response.data.adminid}`);
    }
  };

  const toggleLoginMode = () => setIsAdminLogin(!isAdminLogin);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-900"
    >
      <motion.div
        className="bg-white rounded-2xl p-10 w-96 shadow-[0_0_20px_rgba(255,0,0,0.4)] border border-gray-600"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-center text-3xl font-extrabold text-gray-600 pb-6 tracking-widest">
          {isAdminLogin ? 'ADMIN LOGIN' : 'Login'}
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex items-center bg-gray-100 rounded-md py-2 px-3 border border-gray-300">
              <AiOutlineMail className="text-gray-500" />
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-transparent flex-1 ml-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-gray-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center bg-gray-100 rounded-md py-2 px-3 border border-gray-300 relative">
              <AiOutlineLock className="text-gray-500" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-transparent flex-1 ml-2 focus:outline-none placeholder-gray-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-600">
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-gray-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {!isAdminLogin && (
          <div className="text-right mt-2">
            <Link to="/forgot-password" className="text-gray-500 hover:underline text-sm">Forgot Password?</Link>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full transition-all duration-300 flex justify-center items-center gap-2 ${
            isLoading && 'cursor-not-allowed opacity-70'
          }`}
        >
          {isLoading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          {isLoading ? 'Engaging Gears...' : isAdminLogin ? 'Admin Launch' : 'Submit'}
        </button>

        <button
          type="button"
          onClick={toggleLoginMode}
          className="w-full mt-3 py-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 font-medium"
        >
          Switch to {isAdminLogin ? 'User Login' : 'Admin Login'}
        </button>

        {!isAdminLogin && (
          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have a garage? <Link to="/signup" className="text-gray-500 hover:underline">Sign Up</Link>
          </p>
        )}
      </motion.div>
    </motion.form>
  );
}
