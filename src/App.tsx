/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { StudentDashboard } from './features/students/StudentDashboard';
import { CoachingDashboard } from './features/coaching/CoachingDashboard';
import { ExamPortal } from './features/exams/ExamPortal';
import { NoteStore } from './features/notes/NoteStore';
import { CandidatePortal } from './features/candidates/CandidatePortal';
import { AIQuestionGenerator } from './features/ai/AIQuestionGenerator';
import { Settings } from './features/settings/Settings';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'students':
        return <StudentDashboard />;
      case 'coaching':
        return <CoachingDashboard />;
      case 'exams':
        return <ExamPortal />;
      case 'ai-gen':
        return <AIQuestionGenerator />;
      case 'notes':
        return <NoteStore />;
      case 'candidates':
        return <CandidatePortal />;
      case 'settings':
        return <Settings />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }} isOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

