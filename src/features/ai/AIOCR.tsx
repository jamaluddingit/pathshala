import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Camera, 
  Upload, 
  FileText, 
  Loader2, 
  Check, 
  Copy, 
  RefreshCw,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIOCR: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;

    setIsProcessing(true);
    setResult('');

    try {
      const apiKey = process.env.GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      
      // Convert base64 to parts for Gemini
      const base64Data = image.split(',')[1];
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            imagePart,
            { text: "Extract all text from this handwritten or printed image. If it's a question, format it clearly in Bengali. Correct any spelling mistakes and make it professional. Return ONLY the extracted text." }
          ]
        },
      });

      if (response.text) {
        setResult(response.text);
      }
    } catch (err: any) {
      console.error(err);
      setResult("দুঃখিত, টেক্সট এক্সট্র্যাক্ট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Camera size={24} />
          </div>
          এআই <span className="text-blue-600">ওসিআর (OCR)</span>
        </h1>
        <p className="mt-1 text-slate-500">হাতে লেখা বা প্রিন্ট করা প্রশ্নকে মুহূর্তেই ডিজিটাল টেক্সটে রূপান্তর করুন।</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors bg-slate-50/50">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {image ? (
              <div className="relative group">
                <img src={image} alt="Uploaded" className="w-full h-auto max-h-[400px] object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    <RefreshCw size={18} className="mr-2" />
                    পরিবর্তন করুন
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-24 flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">ছবি আপলোড করুন</p>
                  <p className="text-sm">অথবা এখানে ড্র্যাগ করে ছেড়ে দিন</p>
                </div>
              </button>
            )}
          </Card>

          <Button
            variant="primary"
            className="w-full py-6 text-lg rounded-2xl shadow-xl shadow-blue-200 gap-2"
            onClick={processImage}
            disabled={!image || isProcessing}
            isLoading={isProcessing}
          >
            {!isProcessing && <Sparkles size={20} />}
            টেক্সট এক্সট্র্যাক্ট করুন
          </Button>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <Card className="h-full min-h-[400px] flex flex-col bg-white shadow-xl shadow-slate-200/50 border-none">
            <div className="p-4 border-bottom flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <FileText size={18} className="text-blue-600" />
                ডিজিটাল টেক্সট
              </div>
              {result && (
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-blue-600"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                </button>
              )}
            </div>
            
            <div className="flex-1 p-6 relative">
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400"
                  >
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                    <p className="font-medium animate-pulse">এআই প্রসেস করছে...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none"
                  >
                    <textarea
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      className="w-full h-[300px] p-0 border-none focus:ring-0 text-slate-700 leading-relaxed resize-none bg-transparent"
                    />
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                    <ImageIcon size={64} strokeWidth={1} />
                    <p className="text-sm font-medium">কোন টেক্সট পাওয়া যায়নি</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
