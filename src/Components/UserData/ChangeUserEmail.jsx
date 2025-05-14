import React, { useState } from 'react';
import { useAuth } from '../context/AuthConetxt';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { getEMailChangeSchema } from './AllValidation';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import { APIURL } from '../../GlobalURL';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function ChangeUserEmail() {
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate()

  const formik = useFormik({
    initialValues: { newEmail: '', currentPassword: '' },
    validationSchema: getEMailChangeSchema(userData.email),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data = { email: values.newEmail, password: values.currentPassword };
        const token = localStorage.getItem('Usertoken');
        const userId = localStorage.getItem('userId');

        const response = await axios.put(`${LocalHost}updateUserEmail/${userId}`, 
          data, { headers: { 'x-api-key': token } });

        if(response.status === 200){
          showSuccessToast(response?.data?.msg);
          resetForm();
          Navigate(`/otpverification/NewEmail/${userId}`)
        }

      } catch (err) {
        showErrorToast(err.response?.data?.msg || err.message || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const InputData = [
    { label: 'New Email Address', name: 'newEmail', type: 'email', icon: <FaEnvelope /> },
    { label: 'Current Password', name: 'currentPassword', type: showPassword ? 'text' : 'password', icon: <FaLock /> },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Update Your Email</h2>
      <p className="mt-2 text-center text-sm text-gray-600">Enter your new email address and current password</p>

      <form className="space-y-6 mt-6" onSubmit={formik.handleSubmit}>
        {InputData.map((data, index) => (
          <div key={index}>
            <label htmlFor={data.name} className="block text-lg font-medium text-gray-700">
              {data.label}
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                {data.icon}
              </div>
              <input
                name={data.name}
                type={data.type}
                autoComplete={data.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[data.name]}
                className={`py-2 pl-12 pr-4 w-full border ${formik.touched[data.name] && formik.errors[data.name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg`}
                placeholder={data.label}
              />
              {data.name === 'currentPassword' && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="h-6 w-6" /> : <FaEye className="h-6 w-6" />}
                </button>
              )}
            </div>
            {formik.touched[data.name] && formik.errors[data.name] && (
              <p className="mt-1 text-sm text-red-600">{formik.errors[data.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {formik.isSubmitting ? 'Updating...' : 'Update Email'}
        </button>
      </form>
    </div>
  );
}
