import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Chrome, ArrowRight, Eye, EyeOff, ShieldCheck, GraduationCap, Users, Layout, BookOpen, Globe } from 'lucide-react';
import { FloatingInput } from './FloatingInput';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';
import { supabase } from '../../supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
  initialMode?: 'signin' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'register' | 'otp' | 'magic'> (initialMode);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('general_student');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'general_student', label: 'শিক্ষার্থী', icon: <GraduationCap size={18} />, desc: 'স্কুল/কলেজ' },
    { id: 'parent', label: 'অভিভাবক', icon: <Users size={18} />, desc: 'সন্তান মনিটর' },
    { id: 'coaching_manager', label: 'কোচিং', icon: <Layout size={18} />, desc: 'ম্যানেজমেন্ট' },
    { id: 'university_candidate', label: 'বিশ্ববিদ্যালয়', icon: <Globe size={18} />, desc: 'এডমিশন' },
  ];

  const handleMagicLink = async () => {
    if (!supabase) return alert('সুপাবেজ কনফিগার করা নেই।');
    if (!email) return alert('দয়া করে ইমেইল দিন');
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      alert('আপনার ইমেইলে একটি ম্যাজিক লিঙ্ক পাঠানো হয়েছে!');
      onClose();
    } catch (error: any) {
      alert('ত্রুটি: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!supabase) return alert('সুপাবেজ কনফিগার করা নেই।');
    if (!email) return alert('দয়া করে ইমেইল দিন');
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMode('otp');
    } catch (error: any) {
      alert('ত্রুটি: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return alert('সুপাবেজ কনফিগার করা নেই।');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup',
      });
      if (error) throw error;
      onAuthSuccess(data.user);
      onClose();
    } catch (error: any) {
      alert('ভুল ওটিপি: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return alert('সুপাবেজ কনফিগার করা নেই।');
    if (mode === 'otp') return handleVerifyOTP(e);
    
    setIsLoading(true);
    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: (e.target as any).password.value,
        });
        if (error) throw error;
        onAuthSuccess(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: (e.target as any).password.value,
          options: {
            data: { name: (e.target as any).name.value, role }
          }
        });
        if (error) throw error;
        if (data.session) onAuthSuccess(data.user);
        else alert('রেজিস্ট্রেশন সফল! ইমেইল ভেরিফাই করুন।');
      }
      onClose();
    } catch (error: any) {
      alert('ত্রুটি: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-white/30 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 rounded-full transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg shadow-emerald-200"
                >
                  <ShieldCheck size={32} />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900">
                  {mode === 'signin' ? 'স্বাগতম!' : 'নতুন যাত্রা শুরু'}
                </h2>
                <p className="text-slate-500 mt-2">
                  {mode === 'signin' ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'আজই জয়েন করুন DaPathshala-তে'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'register' && (
                  <FloatingInput 
                    label="আপনার নাম" 
                    name="name"
                    icon={<User size={20} />} 
                    required 
                  />
                )}
                
                {(mode !== 'otp') && (
                  <FloatingInput 
                    label="ইমেইল ঠিকানা" 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={20} />} 
                    required 
                  />
                )}

                {(mode === 'signin' || mode === 'register') && (
                  <div className="relative">
                    <FloatingInput 
                      label="পাসওয়ার্ড" 
                      name="password"
                      type={showPassword ? "text" : "password"} 
                      icon={<Lock size={20} />} 
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}

                {mode === 'otp' && (
                  <div className="space-y-4">
                    <p className="text-sm text-center text-slate-600">
                      আমরা <b>{email}</b> ঠিকানায় একটি ওটিপি পাঠিয়েছি।
                    </p>
                    <FloatingInput 
                      label="৬ ডিজিট ওটিপি" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      icon={<ShieldCheck size={20} />} 
                      maxLength={6}
                      required 
                    />
                  </div>
                )}

                {mode === 'register' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">রোল নির্বাচন করুন</label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setRole(r.id)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-2xl border-2 transition-all text-left",
                            role === r.id 
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" 
                              : "border-slate-100 bg-white/50 text-slate-600 hover:border-slate-200"
                          )}
                        >
                          <div className={cn(
                            "p-2 rounded-lg",
                            role === r.id ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                          )}>
                            {r.icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{r.label}</p>
                            <p className="text-[10px] opacity-70">{r.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  variant="primary" 
                  type="submit"
                  className="w-full py-4 text-lg rounded-2xl shadow-xl shadow-emerald-200 mt-4"
                  isLoading={isLoading}
                >
                  {mode === 'signin' ? 'লগইন করুন' : 
                   mode === 'register' ? 'রেজিস্ট্রেশন করুন' : 
                   mode === 'otp' ? 'ভেরিফাই করুন' : 'ম্যাজিক লিঙ্ক পাঠান'}
                  <ArrowRight className="ml-2" size={20} />
                </Button>

                {mode === 'signin' && (
                  <div className="flex flex-col gap-2">
                    <button 
                      type="button"
                      onClick={() => setMode('magic')}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      পাসওয়ার্ড ভুলে গেছেন? ম্যাজিক লিঙ্ক পাঠান
                    </button>
                    <button 
                      type="button"
                      onClick={handleSendOTP}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      ওটিপি (OTP) দিয়ে লগইন করুন
                    </button>
                  </div>
                )}
              </form>

              <div className="mt-8">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/80 backdrop-blur-md px-4 text-slate-400 font-bold">অথবা</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                    <Chrome size={18} className="text-red-500" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                    <Github size={18} className="text-slate-900" />
                    Github
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
                  className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  {mode === 'signin' ? 'নতুন অ্যাকাউন্ট প্রয়োজন?' : 'ইতিমধ্যেই অ্যাকাউন্ট আছে?'} 
                  <span className="text-emerald-600 font-bold ml-1">
                    {mode === 'signin' ? 'রেজিস্ট্রেশন করুন' : 'লগইন করুন'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
