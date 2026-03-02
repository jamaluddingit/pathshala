import React from 'react';
import { BookOpen, Bell, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isSidebarOpen }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-bottom border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2 text-emerald-600">
            <BookOpen size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight text-slate-900">দ্য পাঠশালা</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
            <User size={18} className="text-slate-500" />
            <span className="hidden text-sm font-medium text-slate-700 sm:block">জামাল উদ্দিন</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
