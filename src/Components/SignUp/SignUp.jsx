  import React, { useState } from 'react';
  import { useFormik } from 'formik';
  import { Link, useNavigate } from 'react-router-dom';
  import {
    AiOutlineUserAdd, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible
  } from 'react-icons/ai';
  import { FaUser } from 'react-icons/fa';
  import { motion } from 'framer-motion';
  import UserSignUPSchema from './SignupValidation';
  import axios from 'axios';
  import { APIURL } from '../../GlobalURL';
  import { showSuccessToast, showErrorToast } from '../ToastifyNotification';

  export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, SetLoading] = useState(false);

    const { values, handleChange, handleSubmit, errors, touched, handleBlur, setFieldValue } = useFormik({
      initialValues: { profileImg: '', name: '', email: '', password: '', confirmPassword: '' },
      validationSchema: UserSignUPSchema,
      onSubmit: async (values) => {
        try {
          SetLoading(true);
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if (key !== "profileImg") formData.append(key, values[key]);
          });
          if (values.profileImg) {
            formData.append('profileImg', values.profileImg);
          }
          const response = await axios.post(`${APIURL}CreateUser`, formData);
          localStorage.setItem("email", response.data.email);
          if (response.status === 200 || response.status === 201) {
            showSuccessToast('Successfully Signed Up');
            navigate(`/OtpVerification/UserOtp/${response.data.id}`);
          }
        } catch (e) {
          showErrorToast(e.response?.data?.msg || 'Server Error');
        } finally {
          SetLoading(false);
        }
      }
    });

    const INPUTDATA = [
      { name: 'name', placeholder: 'Enter Your Name', type: 'text', icon: <FaUser className="text-gray-400" /> },
      { name: 'email', placeholder: 'Enter Your Email', type: 'email', icon: <AiOutlineMail className="text-gray-400" /> },
      {
        name: 'password', placeholder: 'Enter Your Password',
        type: showPassword ? 'text' : 'password',
        icon: <AiOutlineLock className="text-gray-400" />,
        toggle: () => setShowPassword(!showPassword), show: showPassword
      },
      {
        name: 'confirmPassword', placeholder: 'Confirm Your Password',
        type: showConfirmPassword ? 'text' : 'password',
        icon: <AiOutlineLock className="text-gray-400" />,
        toggle: () => setShowConfirmPassword(!showConfirmPassword), show: showConfirmPassword
      },
    ];

    function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        setFieldValue("profileImg", file);
      }
    }

    return (
      <motion.form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="min-h-screen flex justify-center items-center px-4 py-10 bg-gradient-to-br from-black via-gray-900 to-gray-900"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-500 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 md:p-10"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-center text-3xl font-extrabold text-gray-600 pb-5 flex items-center justify-center gap-2">
            <AiOutlineUserAdd size={30} /> Sign Up
          </h1>

          <div className="flex flex-col gap-4">
            {INPUTDATA.map(({ name, placeholder, type, icon, toggle, show }, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center bg-gray-100 rounded-md py-2 px-3 relative border border-gray-300">
                  {icon}
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-transparent flex-1 ml-2 focus:outline-none placeholder-gray-500"
                  />
                  {toggle && (
                    <button type="button" onClick={toggle} className="absolute right-3 text-gray-500">
                      {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  )}
                </div>
                {touched[name] && errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* Upload Image */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Profile Image</label>
              <input
                name='profileImg'
                type='file'
                onChange={handleImageChange}
                className="bg-white border border-gray-300 rounded-md p-2 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-gray-600 file:text-white hover:file:bg-gray-700 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-full transition duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing Up...
              </>
            ) : 'Submit'}
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-gray-600 hover:underline">Log in</Link>
          </p>
        </motion.div>
      </motion.form>
    );
  }
