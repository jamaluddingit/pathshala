import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Terminal, 
  Database, 
  ShieldAlert, 
  RefreshCw, 
  Trash2, 
  Code,
  Cpu,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../../supabase';

export const DeveloperConsole: React.FC = () => {
  const [logs, setLogs] = useState<{ time: string; msg: string; type: 'info' | 'error' | 'warn' }[]>([
    { time: new Date().toLocaleTimeString(), msg: 'Developer Console Initialized', type: 'info' }
  ]);

  const addLog = (msg: string, type: 'info' | 'error' | 'warn' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 50));
  };

  const clearCache = () => {
    localStorage.clear();
    addLog('Local Storage Cleared', 'warn');
    alert('Local Storage cleared. Please refresh the page.');
  };

  const testSupabase = async () => {
    if (!supabase) {
      addLog('Supabase is not configured (VITE_SUPABASE_URL is missing)', 'error');
      return;
    }
    addLog('Testing Supabase connection...', 'info');
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      addLog(`Supabase Error: ${error.message}`, 'error');
    } else {
      addLog(`Supabase Connected. Session: ${data.session ? 'Active' : 'None'}`, 'info');
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
            <Terminal size={24} />
          </div>
          Developer <span className="text-slate-500">Console</span>
        </h1>
        <p className="mt-1 text-slate-500">সিস্টেম ডিবাগিং এবং অ্যাডভান্সড কনফিগারেশন টুলস।</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* System Stats */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              সিস্টেম স্ট্যাটাস
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">এনভায়রনমেন্ট</span>
                <span className="text-sm font-bold text-slate-900 uppercase">Development</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">এপিআই স্ট্যাটাস</span>
                <span className="text-sm font-bold text-emerald-600">Online</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">ভার্সন</span>
                <span className="text-sm font-bold text-slate-900">v1.0.4-beta</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl"
                onClick={testSupabase}
              >
                <Database size={18} />
                টেস্ট সুপাবেস কানেকশন
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                onClick={() => addLog('System Check triggered', 'info')}
              >
                <Cpu size={18} />
                সিস্টেম হেলথ চেক
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={clearCache}
              >
                <Trash2 size={18} />
                ক্লিয়ার লোকাল স্টোরেজ
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 text-slate-400 border-none shadow-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-500" />
              সিকিউরিটি ওয়ার্নিং
            </h3>
            <p className="text-xs leading-relaxed">
              এই কনসোলটি শুধুমাত্র ডেভেলপারদের জন্য। এখানে ভুল পরিবর্তন অ্যাপ্লিকেশনের ডাটা নষ্ট করতে পারে। সতর্কতার সাথে ব্যবহার করুন।
            </p>
          </Card>
        </div>

        {/* Console Logs */}
        <div className="lg:col-span-8">
          <Card className="h-full flex flex-col overflow-hidden border-none shadow-xl bg-slate-900">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="ml-4 text-xs font-mono text-slate-500">system_logs.log</span>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="p-1.5 text-slate-500 hover:text-white transition-colors"
                title="Clear Logs"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 min-h-[400px]">
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="flex gap-4"
                >
                  <span className="text-slate-600 shrink-0">[{log.time}]</span>
                  <span className={`
                    ${log.type === 'error' ? 'text-red-400' : 
                      log.type === 'warn' ? 'text-amber-400' : 
                      'text-emerald-400'}
                  `}>
                    {log.type.toUpperCase()}: {log.msg}
                  </span>
                </motion.div>
              ))}
              {logs.length === 0 && (
                <div className="text-slate-700 italic">No logs to display...</div>
              )}
            </div>
            
            <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex items-center gap-3">
              <Code size={14} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="কমান্ড টাইপ করুন..."
                className="bg-transparent border-none text-slate-300 text-xs w-full focus:ring-0 placeholder:text-slate-700"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addLog(`Command executed: ${(e.target as HTMLInputElement).value}`, 'info');
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
