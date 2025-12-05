"use client";
import { useAppContext } from "@/context/AppContext";
import { Search, Plus, Trash2, Sun, User, LogOut, X } from "lucide-react";
import React, { useState } from "react";
import LogoutPopup from "./LogoutPopup";

function Sidebar({ isMenuOpen, setIsMenuOpen }) {
  const [search, setSearch] = useState("");
  const [logoutPopup, setLogoutPopup] = useState(false)

  const {user} = useAppContext()

  return (
    <div
      className={`h-screen w-72 p-5 flex flex-col 
        bg-white dark:bg-gradient-to-b dark:from-[#242124] dark:to-black 
        text-gray-900 dark:text-white border-r border-gray-200/60 
        dark:border-[#80609F]/40 backdrop-blur-2xl transition-transform 
        duration-300 ease-in-out fixed md:static z-40 top-0 left-0
        ${!isMenuOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 group">
        <div className="relative">
          <img
            src='/logo.svg'
            alt="Chatify Logo"
            className="w-10 h-10 rounded-2xl shadow-lg border border-purple-400/40 
              dark:border-purple-500/40 transition-transform duration-300 
              group-hover:scale-105 group-hover:rotate-3"
          />
          <div
            className="absolute inset-0 rounded-2xl blur-md bg-gradient-to-tr 
              from-purple-500/20 to-blue-500/20 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>

        <h1
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r 
            from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent 
            drop-shadow-sm select-none group-hover:scale-105 transition-transform duration-300"
        >
          CHATIFY
        </h1>
      </div>

      {/* New Chat Button */}
      <button
        className="mt-6 flex items-center justify-center gap-2 py-3 rounded-lg 
          bg-gradient-to-r from-[#A456F7] to-[#3D61F6] 
          text-white font-medium shadow-md hover:scale-[1.02] 
          transition-transform duration-200"
      >
        <Plus size={18} /> New Chat
      </button>

      {/* Search Bar */}
      <div className="relative mt-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={16}
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversation"
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border 
            border-gray-300 dark:border-white/20 
            bg-gray-50 dark:bg-transparent 
            focus:outline-none focus:ring-1 focus:ring-[#A456F7] 
            placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>


      {/* Bottom Section */}
      <div className="absolute bottom-5 left-0 right-0 px-5">
  

        {/* User Card */}
        <div
          className="flex items-center justify-between gap-3 p-4 mt-4 rounded-lg border 
            border-gray-300/50 dark:border-white/20 
            bg-gray-50 dark:bg-transparent cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 dark:bg-purple-600 rounded-full p-1.5">
              <User size={18} className="text-gray-700 dark:text-gray-100" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
               {user ? user.name : 'Unknown User'}
              </p>
            </div>
          </div>

          <LogOut
            onClick={() => setLogoutPopup(true)}
            size={18}
            className="hidden group-hover:block text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          />

        
        </div>
          <LogoutPopup isOpen={logoutPopup} onClose={() => setLogoutPopup(false)}/>
      </div>


      {/* Close Button (Mobile) */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-6 right-4 md:hidden block text-gray-700 dark:text-gray-200"
      >
        <X size={22} />
      </button>
    </div>
  );
}

export default Sidebar;
