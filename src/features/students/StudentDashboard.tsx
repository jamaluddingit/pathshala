import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Book, Clock, Trophy, TrendingUp } from 'lucide-react';
import { EXAMS } from '../../constants';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">শিক্ষার্থী ড্যাশবোর্ড</h1>
          <p className="mt-1 text-slate-500">স্বাগতম, জামাল! আজকের জন্য আপনার অগ্রগতি এখানে দেখুন।</p>
        </div>
        <Button variant="primary" size="lg">
          শেখা শুরু করুন
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'কোর্সসমূহ', value: '১২', icon: Book, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'অধ্যয়নের সময়', value: '৪৫.৫', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'গড় স্কোর', value: '৮৮%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'সার্টিফিকেট', value: '৪', icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50' },
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
          <Card className="h-full">
            <h2 className="mb-6 text-xl font-bold text-slate-900">আসন্ন পরীক্ষাসমূহ</h2>
            <div className="space-y-4">
              {EXAMS.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <span className="text-xs font-bold uppercase">{new Date(exam.date).toLocaleString('bn-BD', { month: 'short' })}</span>
                      <span className="text-lg font-bold leading-none">{new Date(exam.date).getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{exam.title}</h3>
                      <p className="text-sm text-slate-500">{exam.subject} • {exam.duration} মিনিট</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">বিস্তারিত</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <h2 className="mb-6 text-xl font-bold text-slate-900">সাম্প্রতিক কার্যক্রম</h2>
            <div className="space-y-6">
              {[
                { activity: 'গণিত কুইজ সম্পন্ন হয়েছে', time: '২ ঘণ্টা আগে', type: 'quiz' },
                { activity: 'পদার্থবিজ্ঞান নোট কেনা হয়েছে', time: '৫ ঘণ্টা আগে', type: 'purchase' },
                { activity: 'রসায়ন লাইভ ক্লাসে যোগদান', time: 'গতকাল', type: 'class' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    {i !== 2 && <div className="absolute top-2 left-1 h-10 w-px bg-slate-200" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.activity}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
