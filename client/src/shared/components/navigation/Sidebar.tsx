"use client";
import React from "react";
import Link from "next/link";
import { Home, Compass, Briefcase, Upload, X, Headphones, LogOut, Brain } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <aside
        className={`fixed left-0 top-0 lg:top-16 h-screen w-64 border-r bg-white dark:border-gray-700 dark:bg-[#0A0F1C] shadow-lg flex flex-col justify-between p-4 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
        style={{ pointerEvents: 'auto' }}
      >
        <div>
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h1 className="text-xl font-bold text-blue-700">InternAI</h1>
            <button onClick={onClose} className="text-gray-700 dark:text-white">
              <X size={28} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link href="/student/lost&found" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Home size={20} /> Lost & Found
            </Link>
            <Link href="/student/projects" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Compass size={20} /> Project Collaboration
            </Link>
            <Link href="/student/messages" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Home size={20} /> Messages
            </Link>
            <Link href="/student/carental" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Briefcase size={20} /> Car Rental
            </Link>
            <Link href="/student/carpool" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Upload size={20} /> Carpool
            </Link>
            <Link href="/student/publichat" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-600 hover:text-white dark:text-white transition">
              <Brain size={20} /> Public Chat
            </Link>
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link href="/helpcenter">
              <button type="button" className="w-full flex items-center gap-3 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                <Headphones size={20} /> Help Center
              </button>
            </Link>
            <Link href="/">
              <button type="button" className="w-full flex items-center gap-3 p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                <LogOut size={20} /> Logout
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay - Only show on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;