import React from 'react';
import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search heare.."
        className="w-full rounded-full bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray600"
      />
      <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
    </div>
  );
}
