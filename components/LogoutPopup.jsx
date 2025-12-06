"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

export default function LogoutPopup({ isOpen, onClose }) {
  const { setToken, setUser, router } = useAppContext();

  if (!isOpen) return null; // hide popup if not open

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    onClose();
    router.push("/login");
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Logout
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
