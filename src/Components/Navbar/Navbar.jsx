  import React, { useState } from 'react';
  import { FaBars } from "react-icons/fa";
  import { IoCloseSharp } from "react-icons/io5";
  import { Link } from 'react-router-dom';
  import Search from './Search';
  import DropDownMenu from './DropDownMenu';
  import { useAuth } from '../context/AuthConetxt';

  export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, isAdminLoggedIn } = useAuth();

    const MENUDATA = [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/service' },
      { name: 'Featured', href: '/featured' },
      { name: 'Contact Me', href: '/contact' },
    ];

    return (
      <nav className="flex fixed w-full justify-between items-center h-16 bg-black text-white px-6 md:px-20 z-50 shadow-lg shadow-gray-800">
        <h1 className="text-3xl font-bold text-gray-500 tracking-wide racing-font">
          <Link to='/'>Bmw</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 font-medium text-white">
            {MENUDATA.map((item, index) => (
              <li key={index}>
                <Link to={item.href} className="hover:text-gray-500 transition duration-200">{item.name}</Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 items-center">
            <Search />
            {isLoggedIn && isAdminLoggedIn ? (
              <DropDownMenu />
            ) : (
              <Link to='/signUp'>
                <button className="bg-green-600 hover:bg-red-800 transition px-4 py-1.5 rounded-lg text-white font-semibold">SignUp/LogIn</button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoCloseSharp className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
          {isLoggedIn && isAdminLoggedIn && <DropDownMenu />}
        </div>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black text-white z-40">
            <ul className="flex flex-col text-center py-4 space-y-4">
              {MENUDATA.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} onClick={() => setMenuOpen(false)} className="hover:text-red-500 text-lg transition">
                    {item.name}
                  </Link>
                </li>
              ))}
              <Link to='/signUp' onClick={() => setMenuOpen(false)}>
                <button className="bg-Green-600 hover:bg-red-800 transition px-4 py-1.5 rounded-lg text-white">SignUp/LogIn</button>
              </Link>
            </ul>
          </div>
        )}
      </nav>
    );
  }
