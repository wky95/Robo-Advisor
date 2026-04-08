'use client';

import { useState } from 'react';
import { Loader2, Bot, AlertCircle } from 'lucide-react';

export default function AISummary() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);
    
    try {
      // 1. Fetch real-time data from our backend
      const dataRes = await fetch('/api/premium');
      const chartData = await dataRes.json();
      
      if (!dataRes.ok || !Array.isArray(chartData) || chartData.length === 0) {
         throw new Error('Could not retrieve premium data to pass to AI.');
      }

      // 2. Feed it to Gemini API
      const aiRes = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: chartData }),
      });
      
      const aiResult = await aiRes.json();
      
      if (!aiRes.ok) {
        throw new Error(aiResult.error || 'Failed to generate AI summary.');
      }
      
      setSummary(aiResult.summary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 text-indigo-900 p-6 rounded-lg text-[15px] leading-relaxed relative min-h-[150px]">
      {/* Ready State */}
      {!summary && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
          <Bot className="w-12 h-12 mb-3 text-indigo-400" />
          <p className="mb-6 font-medium text-indigo-800">
            Click below to scan the last 14 days of MSTR Data using the Gemini AI API.
          </p>
          <button 
            onClick={generateSummary}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-full transition-all shadow-md active:scale-95"
          >
            <Bot className="w-5 h-5"/>
            Generate AI Insights
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 animate-in fade-in duration-300">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
          <span className="font-medium animate-pulse text-indigo-800 tracking-wide text-lg">AI is analyzing market trends...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-6 text-red-600 animate-in fade-in duration-300">
          <AlertCircle className="w-10 h-10 mb-3" />
          <p className="font-bold text-lg mb-1">Generation Failed</p>
          <p className="text-sm font-mono mt-1 bg-red-100/50 p-3 rounded-md border border-red-200">
            {error}
          </p>
          <button 
            onClick={generateSummary} 
            className="mt-5 text-sm underline font-medium hover:text-red-800 flex items-center gap-1"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success State */}
      {summary && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 mb-5 font-bold text-xl border-b-[2px] border-indigo-200/60 pb-3">
            <Bot className="w-6 h-6 text-indigo-600" /> 
            AI Market Analysis (Gemini)
          </div>
          
          <div className="whitespace-pre-wrap font-medium space-y-4">
            {summary.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={generateSummary}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline font-semibold px-2 py-1 rounded bg-indigo-100/50 hover:bg-indigo-100"
            >
              🔄 Regenerate Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
