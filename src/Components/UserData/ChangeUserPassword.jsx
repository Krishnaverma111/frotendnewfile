import React, { useState } from 'react';
import { useAuth } from '../context/AuthConetxt';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { PasswordChangeSchema } from './AllValidation';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import axios from 'axios';

export default function ChangeUserPassword() {
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const formik = useFormik({
    initialValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: PasswordChangeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        
      } catch (err) {

      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputFields = [
    { label: 'Current Password', name: 'currentPassword', autoComplete: 'current-password', placeholder: 'Enter current password' },
    { label: 'New Password', name: 'newPassword', autoComplete: 'new-password', placeholder: 'Enter new password' },
    { label: 'Confirm Password', name: 'confirmPassword', autoComplete: 'new-password', placeholder: 'Re-enter new password' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-center text-xl font-bold text-gray-900">Change Password</h2>
      <p className="text-center text-gray-600 mt-2">Ensure your new password is strong and secure.</p>

      <form className="space-y-4 mt-4" onSubmit={formik.handleSubmit}>
        {inputFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaLock className="h-5 w-5" />
              </div>

              <input
                id={field.name}
                name={field.name}
                type={showPassword[field.name] ? 'text' : 'password'}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`py-2 pl-10 pr-10 w-full border ${
                  formik.touched[field.name] && formik.errors[field.name] ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => togglePasswordVisibility(field.name)}
              >
                {showPassword[field.name] ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>

            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{formik.errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            formik.isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {formik.isSubmitting ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
