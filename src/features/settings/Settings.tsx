import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Key, Save, CheckCircle2, XCircle, Loader2, ShieldCheck, AlertTriangle, User, Camera, Mail, Code } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { User as UserType } from '../../types';

interface SettingsProps {
  user: UserType | null;
  onUpdateUser: (updatedUser: Partial<UserType>) => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('dapathshala_gemini_key') || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [message, setMessage] = useState('');
  const [isDevMode, setIsDevMode] = useState(() => localStorage.getItem('dapathshala_dev_mode') === 'true');

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateKey = async (key: string) => {
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      setValidationStatus('idle');
      setMessage('');
      return;
    }

    setIsValidating(true);
    try {
      const genAI = new GoogleGenAI({ apiKey: trimmedKey });
      // Use gemini-flash-latest for broader compatibility during validation
      await genAI.models.generateContent({
        model: "gemini-flash-latest",
        contents: "Hi",
      });
      setValidationStatus('valid');
      setMessage('আপনার এপিআই কী সঠিকভাবে কাজ করছে।');
      localStorage.setItem('dapathshala_gemini_key', trimmedKey);
    } catch (error: any) {
      console.error("API Key validation failed:", error);
      setValidationStatus('invalid');
      
      // Try to provide a more specific error message
      const errorMsg = error?.message || '';
      if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('invalid') || errorMsg.includes('not found')) {
        setMessage('এপিআই কী অবৈধ। দয়া করে গুগল এআই স্টুডিও থেকে সঠিক কী কপি করে আনুন।');
      } else if (errorMsg.includes('quota') || errorMsg.includes('limit')) {
        setMessage('আপনার এপিআই কী-এর কোটা শেষ হয়ে গেছে বা লিমিট অতিক্রম করেছে।');
      } else {
        setMessage('এপিআই কী যাচাই করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveAI = () => {
    validateKey(apiKey);
  };

  const handleSaveProfile = () => {
    onUpdateUser({ name, email, avatar });
    alert('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে।');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (apiKey) {
      validateKey(apiKey);
    }
  }, []);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          সেটিংস
        </h1>
        <p className="mt-1 text-slate-500">আপনার প্রোফাইল এবং অ্যাপ্লিকেশনের কনফিগারেশন পরিচালনা করুন।</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="space-y-8">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="flex items-center gap-2 font-bold text-slate-900">
                <User size={18} className="text-emerald-600" />
                প্রোফাইল তথ্য সংশোধন
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-emerald-500 overflow-hidden flex items-center justify-center text-slate-400">
                    {avatar ? (
                      <img src={avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all"
                  >
                    <Camera size={16} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                  />
                </div>
                <p className="text-xs text-slate-500">আপনার প্রোফাইল ছবি পরিবর্তন করতে ক্যামেরায় ক্লিক করুন</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">আপনার নাম</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">ইমেইল ঠিকানা</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button onClick={handleSaveProfile} className="w-full gap-2 rounded-xl py-6 shadow-lg shadow-emerald-100">
                  <Save size={18} />
                  প্রোফাইল আপডেট করুন
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Configuration */}
        <div className="space-y-8">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h2 className="flex items-center gap-2 font-bold text-slate-900">
                <Key size={18} className="text-emerald-600" />
                এআই কনফিগারেশন
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl bg-amber-50 p-4 text-amber-800 border border-amber-100">
                  <AlertTriangle className="mt-0.5 shrink-0" size={20} />
                  <div className="text-sm">
                    <p className="font-bold mb-1">গুরুত্বপূর্ণ তথ্য</p>
                    <p className="opacity-90">
                      এআই প্রশ্ন জেনারেটর ব্যবহার করার জন্য আপনার একটি Google Gemini API Key প্রয়োজন। 
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Gemini API Key
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="আপনার এপিআই কী এখানে পেস্ট করুন..."
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 transition-all focus:outline-none focus:ring-2 ${
                        validationStatus === 'valid' 
                          ? 'border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/10' 
                          : validationStatus === 'invalid'
                          ? 'border-red-200 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValidating ? (
                        <Loader2 size={20} className="animate-spin text-slate-400" />
                      ) : validationStatus === 'valid' ? (
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      ) : validationStatus === 'invalid' ? (
                        <XCircle size={20} className="text-red-500" />
                      ) : null}
                    </div>
                  </div>
                  
                  {message && (
                    <p className={`mt-2 text-xs font-medium ${
                      validationStatus === 'valid' ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck size={14} />
                  আপনার ডাটা সুরক্ষিত
                </div>
                <Button 
                  onClick={handleSaveAI} 
                  disabled={isValidating}
                  className="gap-2"
                >
                  <Save size={18} />
                  সেভ করুন
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-emerald-50/50 border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-2">কীভাবে এপিআই কী পাবেন?</h3>
            <ol className="list-decimal list-inside text-sm text-emerald-800 space-y-2 opacity-90">
              <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-bold">Google AI Studio</a>-এ যান।</li>
              <li>আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।</li>
              <li>"Create API key" বাটনে ক্লিক করুন।</li>
              <li>তৈরিকৃত কী-টি কপি করে উপরের বক্সে পেস্ট করুন।</li>
            </ol>
          </Card>

          <Card className="overflow-hidden border-none shadow-xl bg-slate-900 text-white">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <Code size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">ডেভেলপার মোড</h3>
                    <p className="text-[10px] text-slate-400">অ্যাডভান্সড ডিবাগিং টুলস সক্রিয় করুন</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const next = !isDevMode;
                    setIsDevMode(next);
                    localStorage.setItem('dapathshala_dev_mode', String(next));
                    window.location.reload();
                  }}
                  className={`w-12 h-6 rounded-full transition-all relative ${isDevMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDevMode ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
