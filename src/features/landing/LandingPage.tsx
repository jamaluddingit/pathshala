import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap,
  ShieldCheck,
  Layout
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

import { User } from '../../types';

interface LandingPageProps {
  user?: User | null;
  onDashboardClick?: () => void;
  onGetStarted: () => void;
  onFeatureClick: (tab: string) => void;
  onSignInClick: () => void;
  onRegisterClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  user,
  onDashboardClick,
  onGetStarted, 
  onFeatureClick,
  onSignInClick,
  onRegisterClick
}) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              দা<span className="text-emerald-600">পাঠশালা</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="relative py-1 hover:text-emerald-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">ফিচারসমূহ</a>
            <a href="#about" className="relative py-1 hover:text-emerald-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">আমাদের সম্পর্কে</a>
            <a href="#pricing" className="relative py-1 hover:text-emerald-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full">প্রাইসিং</a>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="primary" size="sm" onClick={onDashboardClick} className="rounded-full px-6 shadow-lg shadow-emerald-200">
                ড্যাশবোর্ড
              </Button>
            ) : (
              <>
                <button 
                  onClick={onSignInClick}
                  className="hidden sm:block text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors px-4 py-2 relative after:absolute after:bottom-2 after:left-4 after:right-4 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-[calc(100%-2rem)]"
                >
                  সাইন ইন
                </button>
                <Button variant="outline" size="sm" onClick={onRegisterClick} className="hidden sm:flex rounded-full px-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  রেজিস্ট্রেশন
                </Button>
                <Button variant="primary" size="sm" onClick={onGetStarted} className="rounded-full px-6 shadow-lg shadow-emerald-200">
                  শুরু করুন
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
              <Sparkles size={14} />
              ভবিষ্যতের শিক্ষা ব্যবস্থা এখন আপনার হাতে
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              শিক্ষার ডিজিটাল বিপ্লব <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">দা পাঠশালা</span>-র সাথে
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
              কোচিং ম্যানেজমেন্ট, এআই প্রশ্ন জেনারেটর এবং নোট শেয়ারিং - সবকিছু এক প্ল্যাটফর্মে। আপনার শিক্ষা প্রতিষ্ঠানকে নিয়ে যান এক অনন্য উচ্চতায়।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Button variant="primary" size="lg" onClick={onDashboardClick} className="w-full sm:w-auto px-10 py-6 text-lg rounded-2xl shadow-xl shadow-emerald-200">
                  ড্যাশবোর্ডে ফিরে যান
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              ) : (
                <>
                  <Button variant="primary" size="lg" onClick={onGetStarted} className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl shadow-xl shadow-emerald-200">
                    ফ্রি ট্রায়াল শুরু করুন
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl">
                    ডেমো দেখুন
                  </Button>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">সবকিছু যা আপনার প্রয়োজন</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">আধুনিক শিক্ষা ব্যবস্থার প্রতিটি ধাপকে সহজ করতে আমরা নিয়ে এসেছি শক্তিশালী সব ফিচার।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-emerald-600" />,
                title: "এআই প্রশ্ন জেনারেটর",
                desc: "মুহূর্তেই যেকোনো বিষয়ের ওপর মানসম্মত প্রশ্ন তৈরি করুন এআই প্রযুক্তির মাধ্যমে।",
                tab: "ai-gen"
              },
              {
                icon: <Layout className="text-blue-600" />,
                title: "কোচিং ম্যানেজমেন্ট",
                desc: "শিক্ষার্থী ভর্তি, উপস্থিতি এবং ফি ম্যানেজমেন্ট এখন হবে এক ক্লিকেই।",
                tab: "coaching"
              },
              {
                icon: <BookOpen className="text-purple-600" />,
                title: "নোট স্টোর",
                desc: "মানসম্মত হ্যান্ডনোট কেনা-বেচার জন্য দেশের সবচেয়ে বড় ডিজিটাল প্ল্যাটফর্ম।",
                tab: "notes"
              },
              {
                icon: <Globe className="text-orange-600" />,
                title: "অনলাইন এক্সাম পোর্টাল",
                desc: "সারা দেশের শিক্ষার্থীদের সাথে প্রতিযোগিতায় অংশ নেওয়ার সুযোগ।",
                tab: "exams"
              },
              {
                icon: <ShieldCheck className="text-red-600" />,
                title: "নিরাপদ ডাটা",
                desc: "আপনার প্রতিষ্ঠানের সকল তথ্য থাকবে আমাদের কাছে শতভাগ সুরক্ষিত।",
                tab: "dashboard"
              },
              {
                icon: <Users className="text-indigo-600" />,
                title: "অভিভাবক প্যানেল",
                desc: "সন্তানের অগ্রগতির আপডেট সরাসরি অভিভাবকদের কাছে পৌঁছে দেওয়ার সুবিধা।",
                tab: "students"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                onClick={() => onFeatureClick(feature.tab)}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "সক্রিয় ব্যবহারকারী", value: "৫০,০০০+" },
              { label: "তৈরিকৃত প্রশ্ন", value: "৫ লাখ+" },
              { label: "পার্টনার কোচিং", value: "২০০+" },
              { label: "সফল শিক্ষার্থী", value: "১০,০০০+" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-emerald-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/20 to-transparent pointer-events-none" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 relative">আপনি কি প্রস্তুত?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative">
              আজই যোগ দিন দা পাঠশালা পরিবারে এবং আপনার শিক্ষা প্রতিষ্ঠানকে দিন এক নতুন মাত্রা।
            </p>
            {user ? (
              <Button variant="primary" size="lg" onClick={onDashboardClick} className="px-10 py-6 text-lg rounded-2xl relative shadow-2xl shadow-emerald-500/20">
                ড্যাশবোর্ডে ফিরে যান
                <ArrowRight className="ml-2" size={20} />
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={onGetStarted} className="px-10 py-6 text-lg rounded-2xl relative shadow-2xl shadow-emerald-500/20">
                এখনি শুরু করুন
                <ArrowRight className="ml-2" size={20} />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">দা পাঠশালা</span>
          </div>
          <p className="text-slate-500 text-sm">© ২০২৬ দা পাঠশালা। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">ফেসবুক</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">ইউটিউব</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">লিঙ্কডইন</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
