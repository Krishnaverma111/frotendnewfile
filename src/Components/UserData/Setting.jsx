import React, { useState } from 'react';
import ChangeUserEmail from './ChangeUserEmail';
import DeleteAccount from './DeleteAccount';
import ChangeUserPassword from './ChangeUserPassword';
import { FaEnvelope, FaLock, FaTrash } from 'react-icons/fa';

export default function Setting() {
  const [selectedOption, setSelectedOption] = useState('CHANGE_EMAIL');

  const settingsOptions = [
    { key: 'CHANGE_EMAIL', label: 'Change Email', icon: <FaEnvelope /> },
    { key: 'CHANGE_PASSWORD', label: 'Change Password', icon: <FaLock /> },
    { key: 'DELETE_ACCOUNT', label: 'Delete Account', icon: <FaTrash />, danger: true },
  ];

  const renderComponent = () => {
    switch (selectedOption) {
      case 'CHANGE_EMAIL':
        return <ChangeUserEmail />;
      case 'CHANGE_PASSWORD':
        return <ChangeUserPassword />;
      case 'DELETE_ACCOUNT':
        return <DeleteAccount />;
      default:
        return <ChangeUserEmail />;
    }
  };

  return (
    <div>
      {/* Desktop Layout */}
      <div className="md:flex hidden min-h-screen bg-gray-100 pt-20">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Settings</h2>
          <ul className="space-y-2">
            {settingsOptions.map(({ key, label, icon, danger }) => (
              <li
                key={key}
                onClick={() => setSelectedOption(key)}
                className={`flex items-center p-2 cursor-pointer rounded-md ${
                  selectedOption === key
                    ? danger
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {icon} <span className="ml-2">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content Panel */}
        <div className="w-3/4 p-6 flex justify-center items-center">{renderComponent()}</div>
      </div>



      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top Content */}
        <div className="w-full p-6 flex justify-center items-center pt-32">{renderComponent()}</div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-around bg-gray-300 pt-4 pb-2 border-t border-gray-400 shadow-md z-50">
          {settingsOptions.map(({ key, icon, label, danger }) => (
            <button
              key={key}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:text-orange-700 transition-all ${
                selectedOption === key ? (danger ? 'bg-red-500 text-white' : 'bg-gray-400') : ''
              }`}
              onClick={() => setSelectedOption(key)}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
