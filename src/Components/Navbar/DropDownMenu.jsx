// Updated DropDownMenu.jsx
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthConetxt';

export default function DropDownMenu() {
  const { setIsLoggedIn, setUserImage, UserImage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserImage(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const UserIMG = UserImage;

  const DROPDOWNMENUDATA = [
    { name: 'Your Profile', href: '/UserProfile', icon: <FaUser className="mr-2" /> },
    { name: 'Settings', href: '/setting', icon: <FaCog className="mr-2" /> },
    { name: 'Logout', onClick: handleLogout, icon: <FaSignOutAlt className="mr-2" /> },
  ];

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="flex rounded-full bg-gradient-to-r from-red-700 to-black p-1 ring-2 ring-yellow-400">
            <span className="sr-only">Open user menu</span>
            {UserIMG ? (
              <img className="h-10 w-10 rounded-full border-2 border-yellow-400" src={UserIMG} alt="User Profile" />
            ) : (
              <FaUser className="h-8 w-8 text-yellow-400 p-1 bg-black rounded-full" />
            )}
          </MenuButton>
        </div>
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-black text-white shadow-lg ring-1 ring-red-600 focus:outline-none">
          {DROPDOWNMENUDATA.map(({ name, href, onClick, icon }) => (
            <MenuItem key={name}>
              {({ active }) => (
                onClick ? (
                  <button
                    onClick={onClick}
                    className={`flex w-full items-center px-4 py-2 text-sm ${active ? 'bg-red-700' : ''}`}
                  >
                    {icon}
                    {name}
                  </button>
                ) : (
                  <Link to={href} className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-red-700' : ''}`}>
                    {icon}
                    {name}
                  </Link>
                )
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
