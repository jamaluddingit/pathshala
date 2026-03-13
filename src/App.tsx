/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/auth/AuthModal';
import { Navigation } from './components/layout/Navigation';
import { AIQuestionGenerator } from './features/ai/AIQuestionGenerator';
import { AIOCR } from './features/ai/AIOCR';
import { VideoToQuiz } from './features/ai/VideoToQuiz';
import { PDFReader } from './features/ai/PDFReader';
import { FlashcardFactory } from './features/ai/FlashcardFactory';
import { StudyPlanner } from './features/ai/StudyPlanner';
import { Leaderboard } from './features/gamification/Leaderboard';
import { Achievements } from './features/gamification/Achievements';
import { ParentDashboard } from './features/parent/ParentDashboard';
import { DeveloperConsole } from './features/developer/DeveloperConsole';
import { Settings } from './features/settings/Settings';
import { LandingPage } from './features/landing/LandingPage';
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Clock, 
  ChevronRight, 
  Zap, 
  Star
} from 'lucide-react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { ResumeToast } from './components/auth/ResumeToast';
import { SecurityShield } from './components/auth/SecurityShield';
import { useResumeSession } from './hooks/useResumeSession';
import { AnimatePresence, motion } from 'motion/react';
import { User } from './types';
import { supabase } from './supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [redirectTab, setRedirectTab] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'otp' | 'magic'>('signin');
  const [isLoading, setIsLoading] = useState(true);
  const [showResumeToast, setShowResumeToast] = useState(false);

  const { savedSession, clearSession } = useResumeSession();

  useEffect(() => {
    // Check for saved session to show toast
    if (savedSession && !user) {
      setShowResumeToast(true);
    }

    // Check active session
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata.name || 'ব্যবহারকারী',
            email: session.user.email || '',
            role: session.user.user_metadata.role || 'general_student',
            avatar: session.user.user_metadata.avatar,
            points: session.user.user_metadata.points || 0
          };
          setUser(userData);
          setShowLanding(false);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Device Binding Check
        const currentDevice = navigator.userAgent;
        const savedDevice = localStorage.getItem('last_auth_device');

        if (savedDevice && savedDevice !== currentDevice) {
          const confirmSwitch = confirm('আপনি একটি নতুন ডিভাইস থেকে লগইন করেছেন। আগের ডিভাইসটি কি লগআউট করতে চান?');
          if (!confirmSwitch) {
            handleLogout();
            return;
          }
        }
        localStorage.setItem('last_auth_device', currentDevice);

        const userData: User = {
          id: session.user.id,
          name: session.user.user_metadata.name || 'ব্যবহারকারী',
          email: session.user.email || '',
          role: session.user.user_metadata.role || 'general_student',
          avatar: session.user.user_metadata.avatar,
          points: session.user.user_metadata.points || 0
        };
        setUser(userData);
        setShowLanding(false);
      } else {
        setUser(null);
        setShowLanding(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [savedSession, user]);

  const handleAuthSuccess = (userData: any) => {
    setUser({
      id: userData.id || 'temp-id',
      name: userData.user_metadata?.name || userData.name || 'ব্যবহারকারী',
      email: userData.email || 'test@test.com',
      role: userData.user_metadata?.role || userData.role || 'general_student',
      points: userData.user_metadata?.points || 100
    });
    setShowLanding(false);
    clearSession();
    if (redirectTab) {
      setActiveTab(redirectTab);
      setRedirectTab(null);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setShowLanding(true);
    setIsAuthModalOpen(false);
    setActiveTab('dashboard');
  };

  const openAuth = (mode: 'signin' | 'register' | 'otp' | 'magic', tab?: string) => {
    setAuthMode(mode);
    if (tab) setRedirectTab(tab);
    setIsAuthModalOpen(true);
    setShowResumeToast(false);
  };

  const handleResume = () => {
    if (savedSession) {
      setAuthMode(savedSession.mode);
      setIsAuthModalOpen(true);
      setShowResumeToast(false);
    }
  };

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedUser });
    }
  };

  if (showLanding) {
    return (
      <>
        <LandingPage 
          onGetStarted={() => openAuth('register')} 
          onFeatureClick={(tab) => openAuth('signin', tab)}
          onSignInClick={() => openAuth('signin')}
          onRegisterClick={() => openAuth('register')}
        />
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
        />
        <ResumeToast 
          isVisible={showResumeToast}
          onClose={() => setShowResumeToast(false)}
          onResume={handleResume}
          email={savedSession?.email || ''}
        />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900">
                  স্বাগতম, <span className="text-emerald-600">{user?.name || user?.email?.split('@')[0]}</span>!
                </h1>
                <p className="mt-2 text-slate-500 text-lg">আপনার শেখার যাত্রা আজ কোথা থেকে শুরু করবেন?</p>
              </div>
              <div className="flex gap-4">
                <Card className="p-4 bg-emerald-600 text-white border-none shadow-lg shadow-emerald-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black">{user?.points || 0}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">মোট XP</div>
                  </div>
                </Card>
                <Card className="p-4 bg-amber-500 text-white border-none shadow-lg shadow-amber-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black">০৫</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">স্ট্রিক</div>
                  </div>
                </Card>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveTab('ai-gen')}
                    className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:border-emerald-200 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">স্মার্ট কোয়েস্ট</h3>
                    <p className="text-sm text-slate-500 mt-1">এআই দিয়ে কুইজ তৈরি করুন</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('pdf-reader')}
                    className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:border-blue-200 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">পিডিএফ রিডার</h3>
                    <p className="text-sm text-slate-500 mt-1">পিডিএফ থেকে তথ্য জানুন</p>
                  </button>
                </div>

                <Card className="p-8 border-none shadow-xl bg-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Clock size={120} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Clock className="text-indigo-600" size={20} />
                        পড়া চালিয়ে যান
                      </h3>
                      <Button variant="ghost" className="text-indigo-600 font-bold">সব দেখুন</Button>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: 'সালোকসংশ্লেষণ প্রক্রিয়া', subject: 'জীববিজ্ঞান', progress: 75, color: 'bg-emerald-500' },
                        { title: 'ত্রিকোণমিতি বেসিকস', subject: 'গণিত', progress: 40, color: 'bg-blue-500' }
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all">
                          <div className="flex-1 mr-8">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-slate-900">{item.title}</span>
                              <span className="text-xs font-bold text-slate-400 uppercase">{item.subject}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: `${item.progress}%` }} />
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <Card className="p-6 border-none shadow-xl bg-white space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Trophy className="text-amber-500" size={20} />
                      লিডারবোর্ড
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActiveTab('leaderboard')}
                      className="text-indigo-600 font-bold text-xs"
                    >
                      সব দেখুন
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'আরাফাত', xp: 2450, rank: 1, avatar: 'https://picsum.photos/seed/1/40' },
                      { name: 'সুমাইয়া', xp: 2100, rank: 2, avatar: 'https://picsum.photos/seed/2/40' },
                      { name: 'আপনি', xp: user?.points || 0, rank: 15, avatar: `https://picsum.photos/seed/${user?.id}/40` }
                    ].map((player, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${player.name === 'আপনি' ? 'bg-indigo-50 border border-indigo-100' : ''}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-slate-400 w-4">#{player.rank}</span>
                          <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-lg" />
                          <span className="text-sm font-bold text-slate-700">{player.name}</span>
                        </div>
                        <span className="text-xs font-black text-indigo-600">{player.xp} XP</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border-none shadow-xl bg-indigo-600 text-white space-y-4">
                  <h3 className="text-lg font-bold">আজকের লক্ষ্য</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">৩টি কুইজ সম্পন্ন করা</span>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">২/৩</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-[66%]" />
                  </div>
                  <p className="text-xs opacity-70 italic">আর মাত্র ১টি কুইজ বাকি! আপনি পারবেন!</p>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'ai-gen': return <AIQuestionGenerator />;
      case 'ai-ocr': return <AIOCR />;
      case 'video-quiz': return <VideoToQuiz />;
      case 'pdf-reader': return <PDFReader />;
      case 'flashcards': return <FlashcardFactory />;
      case 'study-planner': return <StudyPlanner />;
      case 'leaderboard': return <Leaderboard />;
      case 'achievements': return <Achievements />;
      case 'parent-dashboard': return <ParentDashboard />;
      case 'developer': return <DeveloperConsole />;
      case 'settings': return <Settings user={user} onUpdateUser={handleUpdateUser} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <SecurityShield user={user} isEnabled={!!user}>
        {user ? (
          <div className="flex flex-col min-h-screen">
            <Navigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              user={user} 
              onLogout={handleLogout} 
            />
            <main className="flex-1 lg:pl-64 pt-16 transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50 via-white to-indigo-50">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full" />
            </div>
            
            <div className="max-w-md w-full space-y-8 relative z-10">
              <div className="text-center space-y-4">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-3xl shadow-2xl shadow-emerald-200 text-white text-4xl font-black italic mb-4"
                >
                  DP
                </motion.div>
                <h1 className="text-5xl font-black tracking-tighter text-slate-900">
                  Da<span className="text-emerald-600">Pathshala</span>
                </h1>
                <p className="text-slate-500 text-lg font-medium">এআই চালিত আগামীর শিক্ষা প্ল্যাটফর্ম</p>
              </div>

              <Card className="p-8 border-none shadow-2xl bg-white/80 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">শুরু করা যাক</h2>
                    <p className="text-slate-500 text-sm">আপনার একাউন্টে লগইন করুন অথবা নতুন একাউন্ট খুলুন</p>
                  </div>
                  <Button 
                    onClick={() => openAuth('signin')}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    লগইন / সাইনআপ
                  </Button>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold uppercase tracking-widest">অথবা</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-2xl py-3 border-slate-200 hover:bg-slate-50">Google</Button>
                    <Button variant="outline" className="rounded-2xl py-3 border-slate-200 hover:bg-slate-50">Facebook</Button>
                  </div>
                </div>
              </Card>

              <p className="text-center text-slate-400 text-xs font-medium">
                চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের <span className="text-slate-600 underline cursor-pointer">শর্তাবলী</span> এবং <span className="text-slate-600 underline cursor-pointer">প্রাইভেসি পলিসি</span> মেনে নিচ্ছেন।
              </p>
            </div>
          </div>
        )}
      </SecurityShield>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      <ResumeToast 
        isVisible={showResumeToast}
        onClose={() => setShowResumeToast(false)}
        onResume={handleResume}
        email={savedSession?.email || ''}
      />
    </div>
  );
}

