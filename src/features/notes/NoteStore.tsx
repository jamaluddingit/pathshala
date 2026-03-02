import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShoppingCart, Star, Download, Search, Filter } from 'lucide-react';
import { NOTES } from '../../constants';

export const NoteStore: React.FC = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">নোট বিক্রি</h1>
          <p className="mt-1 text-slate-500">সেরা শিক্ষকদের কাছ থেকে প্রিমিয়াম অধ্যয়ন সামগ্রী।</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md" className="gap-2">
            <Filter size={18} />
            ফিল্টার
          </Button>
          <Button variant="primary" size="md" className="gap-2">
            <ShoppingCart size={18} />
            আমার কার্ট (০)
          </Button>
        </div>
      </header>

      <div className="relative">
        <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="বিষয়, টপিক বা লেখকের নাম দিয়ে খুঁজুন..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-slate-900 shadow-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {NOTES.map((note) => (
          <Card key={note.id} className="group overflow-hidden p-0">
            <div className="relative h-48 overflow-hidden">
              <img
                src={note.previewUrl}
                alt={note.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 rounded-lg bg-white/90 px-2 py-1 text-sm font-bold text-emerald-700 backdrop-blur-sm">
                ৳{note.price.toFixed(2)}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  {note.subject}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold text-slate-700">{note.rating}</span>
                </div>
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">{note.title}</h3>
              <p className="mb-6 text-sm text-slate-500">লেখক: {note.author}</p>
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1 gap-2">
                  <ShoppingCart size={16} />
                  এখনই কিনুন
                </Button>
                <Button variant="outline" className="px-3">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
