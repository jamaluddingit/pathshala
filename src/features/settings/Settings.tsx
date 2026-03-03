import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Key, Save, CheckCircle2, XCircle, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('dapathshala_gemini_key') || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [message, setMessage] = useState('');

  const validateKey = async (key: string) => {
    if (!key) {
      setValidationStatus('idle');
      setMessage('');
      return;
    }

    setIsValidating(true);
    try {
      const genAI = new GoogleGenAI({ apiKey: key });
      // A simple prompt to check if the key works
      await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: "Hi",
      });
      setValidationStatus('valid');
      setMessage('আপনার এপিআই কী সঠিকভাবে কাজ করছে।');
    } catch (error) {
      console.error("API Key validation failed:", error);
      setValidationStatus('invalid');
      setMessage('এপিআই কী অবৈধ বা কাজ করছে না। দয়া করে সঠিক কী প্রদান করুন।');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = () => {
    localStorage.setItem('dapathshala_gemini_key', apiKey);
    validateKey(apiKey);
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
        <p className="mt-1 text-slate-500">আপনার অ্যাপ্লিকেশনের কনফিগারেশন পরিচালনা করুন।</p>
      </header>

      <div className="max-w-2xl">
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
                    আপনার কী-টি শুধুমাত্র আপনার ব্রাউজারে (LocalStorage) সংরক্ষিত থাকবে।
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
                onClick={handleSave} 
                disabled={isValidating}
                className="gap-2"
              >
                <Save size={18} />
                সেভ করুন
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <Card className="p-6 bg-emerald-50/50 border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-2">কীভাবে এপিআই কী পাবেন?</h3>
            <ol className="list-decimal list-inside text-sm text-emerald-800 space-y-2 opacity-90">
              <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-bold">Google AI Studio</a>-এ যান।</li>
              <li>আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করুন।</li>
              <li>"Create API key" বাটনে ক্লিক করুন।</li>
              <li>তৈরিকৃত কী-টি কপি করে উপরের বক্সে পেস্ট করুন।</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};
