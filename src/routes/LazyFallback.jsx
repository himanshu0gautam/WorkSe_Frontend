import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Polished loading fallback displayed while React.lazy() fetches chunks
 */
export function LazyFallback({ label = 'Loading page module...' }) {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center p-8 animate-fadeIn">
      {/* Top progress line animation */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse z-50" />

      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col items-center gap-3 shadow-xl">
        <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        <span className="text-xs font-medium text-slate-600 tracking-wide">{label}</span>
      </div>
    </div>
  );
}
