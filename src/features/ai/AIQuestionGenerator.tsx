import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sparkles, Loader2, Copy, Check, FileText, Settings2 } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const AIQuestionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('সহজ');
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [copied, setCopied] = useState(false);

  const generateQuestions = async () => {
    if (!topic) return;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      alert("এপিআই কী (API Key) পাওয়া যায়নি। দয়া করে সেটিংস চেক করুন।");
      return;
    }

    setIsLoading(true);
    setQuestions([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate exactly ${count} multiple choice questions about "${topic}" in Bengali. 
        Difficulty level: ${difficulty}. 
        The output MUST be a valid JSON array of objects.
        Each object MUST have: "question", "options" (array of exactly 4 strings), "correctAnswer" (the exact string from options), and "explanation".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ["question", "options", "correctAnswer", "explanation"],
            },
          },
        },
      });

      if (!response.text) {
        throw new Error("No response text received from AI");
      }

      const result = JSON.parse(response.text);
      if (Array.isArray(result)) {
        setQuestions(result);
      } else {
        throw new Error("Response is not an array");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("প্রশ্ন তৈরি করতে সমস্যা হয়েছে। আপনার এপিআই কী এবং ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = questions.map((q, i) => 
      `${i + 1}. ${q.question}\nOptions: ${q.options.join(', ')}\nCorrect: ${q.correctAnswer}\nExplanation: ${q.explanation}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <Sparkles className="text-emerald-600" />
          এআই প্রশ্ন জেনারেটর
        </h1>
        <p className="mt-1 text-slate-500">যেকোনো বিষয়ের ওপর মুহূর্তেই মানসম্মত প্রশ্ন তৈরি করুন।</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-900 flex items-center gap-2">
              <Settings2 size={18} />
              কনফিগারেশন
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">বিষয় বা টপিক</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="উদা: সালোকসংশ্লেষণ, নিউটনের গতিসূত্র..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">কঠিনতা</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-700 focus:border-emerald-500 focus:outline-none"
                >
                  <option>সহজ</option>
                  <option>মাঝারি</option>
                  <option>কঠিন</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">প্রশ্নের সংখ্যা</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <Button
                variant="primary"
                className="w-full gap-2"
                onClick={generateQuestions}
                isLoading={isLoading}
                disabled={!topic}
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                প্রশ্ন তৈরি করুন
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {questions.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={20} />
                  তৈরিকৃত প্রশ্নসমূহ
                </h2>
                <Button variant="outline" size="sm" className="gap-2" onClick={copyToClipboard}>
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  {copied ? 'কপি হয়েছে' : 'সব কপি করুন'}
                </Button>
              </div>
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <Card key={i} className="border-l-4 border-l-emerald-500">
                    <p className="font-bold text-slate-900 mb-4">{i + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {q.options.map((opt, j) => (
                        <div 
                          key={j} 
                          className={`p-3 rounded-xl border text-sm ${
                            opt === q.correctAnswer 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                              : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + j)}. {opt}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">ব্যাখ্যা</p>
                      <p className="text-sm text-slate-600 italic">{q.explanation}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-slate-50 p-6 mb-4">
                <Sparkles size={48} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">কোনো প্রশ্ন নেই</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                বাম পাশের প্যানেলে বিষয় লিখে 'প্রশ্ন তৈরি করুন' বাটনে ক্লিক করুন।
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
