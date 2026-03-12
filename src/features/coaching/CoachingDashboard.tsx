import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, GraduationCap, Calendar, MessageSquare, Plus, MoreVertical } from 'lucide-react';

export const CoachingDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">কোচিং ব্যবস্থাপনা</h1>
          <p className="mt-1 text-slate-500">আপনার শিক্ষার্থী, ক্লাস এবং শিডিউল এক জায়গায় পরিচালনা করুন।</p>
        </div>
        <Button variant="primary" size="lg" className="gap-2">
          <Plus size={20} />
          নতুন ক্লাস যোগ করুন
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'মোট শিক্ষার্থী', value: '৪৫০', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'সক্রিয় ক্লাস', value: '১৮', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'আজকের সেশন', value: '৬', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'অপঠিত বার্তা', value: '২৪', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${stat.bg}`}>
                <Icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">সক্রিয় ক্লাসসমূহ</h2>
              <Button variant="ghost" size="sm">সব দেখুন</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-sm font-medium text-slate-500">
                    <th className="pb-4 pl-4">ক্লাসের নাম</th>
                    <th className="pb-4">শিক্ষক</th>
                    <th className="pb-4">শিক্ষার্থী</th>
                    <th className="pb-4">শিডিউল</th>
                    <th className="pb-4 pr-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'উচ্চতর পদার্থবিজ্ঞান', teacher: 'ডাঃ স্মিথ', students: 45, time: 'সোম, বুধ সকাল ১০:০০' },
                    { name: 'জৈব রসায়ন', teacher: 'অধ্যাপক জেন', students: 32, time: 'মঙ্গল, বৃহস্পতি দুপুর ০২:০০' },
                    { name: 'ক্যালকুলাস ২', teacher: 'জনাব আহমেদ', students: 58, time: 'সোম, শুক্র সকাল ০৯:০০' },
                    { name: 'ইংরেজি সাহিত্য', teacher: 'মিস বেগম', students: 28, time: 'বুধ, শনি সকাল ১১:৩০' },
                  ].map((cls, i) => (
                    <tr key={i} className="group hover:bg-slate-50">
                      <td className="py-4 pl-4 font-medium text-slate-900">{cls.name}</td>
                      <td className="py-4 text-slate-600">{cls.teacher}</td>
                      <td className="py-4 text-slate-600">{cls.students}</td>
                      <td className="py-4 text-slate-600">{cls.time}</td>
                      <td className="py-4 pr-4 text-right">
                        <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-xl font-bold text-slate-900">শিক্ষার্থীর পারফরম্যান্স</h2>
            <div className="space-y-4">
              {[
                { name: 'সেরা পারফর্মার', count: 12, color: 'bg-emerald-500' },
                { name: 'গড়', count: 320, color: 'bg-blue-500' },
                { name: 'মনোযোগ প্রয়োজন', count: 18, color: 'bg-amber-500' },
              ].map((group) => (
                <div key={group.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-600">{group.name}</span>
                    <span className="font-bold text-slate-900">{group.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div 
                      className={`h-full rounded-full ${group.color}`} 
                      style={{ width: `${(group.count / 350) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900 text-white">
            <h2 className="mb-2 text-xl font-bold">কোচিং ইনসাইটস</h2>
            <p className="mb-6 text-sm text-slate-400">আপনার কোচিং সেন্টারের প্রবৃদ্ধি এই মাসে ১৫% বৃদ্ধি পেয়েছে। চমৎকার কাজ চালিয়ে যান!</p>
            <Button variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-700">
              রিপোর্ট দেখুন
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
