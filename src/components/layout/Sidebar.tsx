import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  ShoppingBag, 
  Vote, 
  Settings,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

const navItems = [
  { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { id: 'students', label: 'শিক্ষার্থী', icon: GraduationCap },
  { id: 'coaching', label: 'কোচিং', icon: Users },
  { id: 'exams', label: 'পরীক্ষা', icon: FileText },
  { id: 'ai-gen', label: 'এআই প্রশ্ন তৈরি', icon: Sparkles },
  { id: 'notes', label: 'নোট বিক্রি', icon: ShoppingBag },
  { id: 'candidates', label: 'প্রার্থী', icon: Vote },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-100 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-auto space-y-1 pt-6 border-t border-slate-100">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Settings size={20} />
            সেটিংস
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <HelpCircle size={20} />
            সহায়তা কেন্দ্র
          </button>
        </div>
      </div>
    </aside>
  );
};
