import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { showSuccessToast, showErrorToast } from '../ToastifyNotification';
import axios from 'axios';

export default function DeleteAccount() {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
     

      showSuccessToast('Your account has been deleted successfully.');
    
    } catch (err) {
      showErrorToast(err.response?.data?.message || 'Failed to delete account.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-center text-xl font-bold text-gray-900">Delete Account</h2>
      <p className="text-center text-gray-600 mt-2">
        Deleting your account is irreversible. All your data will be lost.
      </p>

      <button
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="w-full mt-4 py-2 px-4 border border-red-600 text-red-600 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-red-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        {isDeleting ? 'Deleting...' : (
          <>
            <FaTrash className="inline-block mr-2" /> Delete My Account
          </>
        )}
      </button>
    </div>
  
  );
}
