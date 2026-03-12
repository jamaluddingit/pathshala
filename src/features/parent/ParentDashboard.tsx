import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Target, 
  Shield, 
  Calendar,
  ChevronRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

export const ParentDashboard: React.FC = () => {
  const [activeChild, setActiveChild] = useState('child_1');

  // Mock Data
  const children = [
    { id: 'child_1', name: 'আরাফাত রহমান', grade: '৮ম শ্রেণী', avatar: 'https://picsum.photos/seed/child1/100' },
    { id: 'child_2', name: 'সুমাইয়া বিনতে', grade: '৫ম শ্রেণী', avatar: 'https://picsum.photos/seed/child2/100' }
  ];

  const stats = [
    { label: 'আজকের পড়ার সময়', value: '৩.৫ ঘণ্টা', icon: <Clock className="text-blue-600" />, trend: '+১২%' },
    { label: 'কুইজ স্কোর (গড়)', value: '৮৫%', icon: <Target className="text-emerald-600" />, trend: '+৫%' },
    { label: 'অর্জিত পয়েন্ট', value: '১২৫০ XP', icon: <TrendingUp className="text-amber-600" />, trend: '+১৫০' },
  ];

  const recentActivities = [
    { id: 1, task: 'সালোকসংশ্লেষণ কুইজ সম্পন্ন করেছে', time: '১০ মিনিট আগে', status: 'success' },
    { id: 2, task: 'গণিত অধ্যায় ৫ পিডিএফ পড়েছে', time: '১ ঘণ্টা আগে', status: 'success' },
    { id: 3, task: 'ইংরেজি গ্রামার স্টাডি প্ল্যান শুরু করেছে', time: '২ ঘণ্টা আগে', status: 'pending' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Shield size={24} />
            </div>
            অভিভাবক <span className="text-indigo-600">ড্যাশবোর্ড</span>
          </h1>
          <p className="mt-1 text-slate-500">আপনার সন্তানদের পড়াশোনার অগ্রগতি এবং কার্যক্রম মনিটর করুন।</p>
        </div>

        {/* Child Selector */}
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setActiveChild(child.id)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                activeChild === child.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full border border-slate-200" />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold">{child.name}</div>
                <div className="text-[10px] opacity-60">{child.grade}</div>
              </div>
            </button>
          ))}
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Users size={20} />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 border-none shadow-xl bg-white hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Activity Log */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Activity size={18} className="text-indigo-600" />
                সাম্প্রতিক কার্যক্রম
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-600 text-xs font-bold">সব দেখুন</Button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{activity.task}</h4>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              ))}
            </div>
          </Card>

          {/* Progress Chart Placeholder */}
          <Card className="p-8 border-none shadow-xl bg-white flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <BarChart3 size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">সাপ্তাহিক প্রগ্রেস রিপোর্ট</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">
                গত এক সপ্তাহে আপনার সন্তানের পড়ার সময় এবং সাফল্যের হার ২০% বৃদ্ধি পেয়েছে।
              </p>
            </div>
            <Button variant="outline" className="rounded-xl">বিস্তারিত রিপোর্ট ডাউনলোড করুন</Button>
          </Card>
        </div>

        {/* Goals & Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-none shadow-xl bg-indigo-600 text-white">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Target size={20} />
              আজকের লক্ষ্য (Goals)
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20">
                <div className="w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm" />
                </div>
                <span className="text-sm font-medium">২টি কুইজ সম্পন্ন করা</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20">
                <div className="w-5 h-5 rounded border-2 border-white/40" />
                <span className="text-sm font-medium">১ ঘণ্টা গণিত প্র্যাকটিস</span>
              </div>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 rounded-xl mt-4">
                নতুন লক্ষ্য যোগ করুন
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-none shadow-xl bg-white space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar size={20} className="text-indigo-600" />
              প্যারেন্টাল কন্ট্রোল
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">স্টাডি মোড লক</span>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm font-medium text-slate-700">ডেইলি লিমিট (৪ ঘণ্টা)</span>
                <div className="w-10 h-5 bg-slate-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  আপনার সন্তান আজ নির্ধারিত সময়ের চেয়ে বেশি পড়াশোনা করেছে। তাকে একটু বিরতি নিতে উৎসাহিত করুন।
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
