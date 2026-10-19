import React, { useState } from 'react';
import {
  Headset,
  CircleCheck
} from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('homeowner');

  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col selection:bg-amber-500 selection:text-white">
      
      {/* Top Banner / Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 text-center w-full">
        
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          100% Direct Deals • ₹0 Middleman Commission
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          How WorkSe Works
        </h1>
        {/* <h2 className="text-xl md:text-2xl font-bold text-amber-600 mb-4">
          काम कैसे करता है
        </h2> */}
        
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-8">
          Two simple ways to connect — Hire directly or Post your work with zero commission and direct phone/WhatsApp contact.
        </p>

        {/* Audience Toggle Tabs */}
        <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md w-full mx-auto grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('homeowner')}
            className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'homeowner'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base"></span>
            <div className="text-left truncate">
              <div>1. For Homeowners</div>
              <div className="text-[10px] font-normal opacity-80">ग्राहकों के लिए (कारीगर खोजें)</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('worker')}
            className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'worker'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined text-base"></span>
            <div className="text-left truncate">
              <div>2. For Karigars & Workers</div>
              <div className="text-[10px] font-normal opacity-80">कारीगरों के लिए (काम पाएं)</div>
            </div>
          </button>
        </div>
      </section>

      {/* METHOD 1: Instant Direct Hiring Section */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mb-20 w-full">
        
        <div className="text-center mb-10">
          {/* <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md mb-2 uppercase tracking-wide">
            Method 1: Simple steps to hire skilled workers directly
          </div> */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Find Local Workers Near You
          </h2>
          <p className="text-sm font-semibold text-amber-700 mt-1">अपने नजदीकी कारीगर खोजें</p>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            {/* Browse verified tradespeople in your pin code and get instant help in minutes. */}
            Simple steps to hire skilled workers directly
          </p>
        </div>

        {/* Vertical Timeline Steps */}
        <div className="space-y-6 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-300">
          
          {/* Step 01 */}
          <div className="relative flex items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ml-4 md:ml-12">
            <div className="absolute -left-10 md:-left-14 top-6 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 text-white font-bold text-xs md:text-sm flex items-center justify-center shadow">
              01
            </div>
            <div className="flex-grow pl-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900">Search & Filter Trade</h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium border border-slate-200">
                    <span className="material-symbols-outlined text-xs">location_on</span> Pin Code Search
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium border border-slate-200">
                    <span className="material-symbols-outlined text-xs">category</span> Trade Categories
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                Select category — Plumber, Electrician, Carpenter, Painter, or Mason. Enter your locality or 6-digit PIN code to find artisans active in your radius.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative flex items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ml-4 md:ml-12">
            <div className="absolute -left-10 md:-left-14 top-6 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 text-white font-bold text-xs md:text-sm flex items-center justify-center shadow">
              02
            </div>
            <div className="flex-grow pl-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900">View Verified Profiles</h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 px-2.5 py-1 rounded-md text-emerald-700 font-semibold border border-emerald-200">
                    <span className="material-symbols-outlined text-xs">verified</span> Verified
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 px-2.5 py-1 rounded-md text-emerald-700 font-semibold border border-emerald-200">
                    <span className="material-symbols-outlined text-xs">shield</span> Aadhaar Verified
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-blue-50 px-2.5 py-1 rounded-md text-blue-700 font-semibold border border-blue-200">
                    <span className="material-symbols-outlined text-xs">call</span> Direct Numbers
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                Inspect real profiles with unmasked contact numbers, government Aadhaar verification badges, genuine photos of completed local work, and peer reviews.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative flex items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm ml-4 md:ml-12">
            <div className="absolute -left-10 md:-left-14 top-6 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-amber-600 text-white font-bold text-xs md:text-sm flex items-center justify-center shadow">
              03
            </div>
            <div className="flex-grow pl-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900">Call or WhatsApp Directly</h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 px-2.5 py-1 rounded-md text-amber-800 font-semibold border border-amber-200">
                    <span className="material-symbols-outlined text-xs">bolt</span> Direct Deal
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 px-2.5 py-1 rounded-md text-emerald-800 font-semibold border border-emerald-200">
                    <span className="material-symbols-outlined text-xs">payments</span> Cash / UPI Direct
                  </span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                Tap to call straight to the artisan’s SIM or start a WhatsApp chat. Explain your repair, agree on timings and rates upfront, and pay 100% directly with cash or UPI.
              </p>
              <div className="mt-3 inline-block bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-lg font-medium">
                🛡️ 0% Platform Brokerage
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* METHOD 2: Broadcast a Job Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24 w-full">
        
        <div className="text-center mb-12 mt-14">
          {/* <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-md mb-2 uppercase tracking-wide">
            Method 2: Broadcast a Job
          </div> */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Post Your Work & Let Workers Connect
          </h2>
          <p className="text-sm font-semibold text-amber-700 mt-1">काम पोस्ट करें और कारीगरों से सीधे जुड़ें</p>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            Post your job in 60 seconds. Verified local Karigar near your location will reach out to you.
          </p>
        </div>

        {/* 3 Step Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">1.</span>
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">STEP 1 • 60 सेकंड में</p>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Post Requirement & Voice Note</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Quickly type your job description or simply tap the mic to speak a 20-second voice note in Hindi or your local language. Optionally attach an issue photo.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
              <span>🎙️ Hindi / Voice Note</span>
              <span>⏱️ &lt; 60 Seconds</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-amber-300 p-6 shadow-md flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white to-amber-50/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm">
                  <span className="material-symbols-outlined">2.</span>
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">STEP 2 • तुरंत अलर्ट</p>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Nearby Karigars Receive Alert</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Your request is instantly broadcasted to verified, rated workers residing within a 3 to 5 km radius of your location. No middleman dispatch delays.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-slate-700">
              <span>📍 3-5 km Radius</span>
              <span>⚡ Instant Ping</span>
            </div>
          </div>

          {/* Card 3 (Dark Slate Theme) */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Direct Deal
              </div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold border border-slate-700">
                  <span className="material-symbols-outlined">3.</span>
                </span>
              </div>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">STEP 3 • सीधी बातचीत</p>
              <h3 className="text-lg font-bold text-white mb-2">Workers Connect & You Decide</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Interested mistris call you directly with their realistic quote and arrival estimate. You pick the best artisan without any spam or booking fees.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-800 text-[11px] font-semibold text-emerald-400">
              <span>✅ Direct Agreement</span>
              <span>🛡️ 0% Spam Fee</span>
            </div>
          </div>

        </div>
      </section>

      {/* COMPARISON TABLE: Why workse is Different */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mb-24 w-full mt-16">
        
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-md mb-2 uppercase tracking-wide border border-blue-200">
            Zero-Brokerage Charter
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Why WorkSe is Different
          </h2>
          <p className="text-sm font-semibold text-amber-700 mt-1">वोरकसे अलग क्यों है?</p>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            See how our direct connection model compares with conventional aggregators and contractors.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full table-fixed text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 md:p-5 w-1/4">Key Feature</th>
                <th className="p-4 md:p-5 w-[37.5%] text-rose-700">Traditional Aggregators</th>
                <th className="p-4 md:p-5 w-[37.5%] text-emerald-700 bg-emerald-50/50">bulaoMistri Direct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
              
              {/* Row 1 */}
              <tr>
                <td className="p-4 md:p-5 font-bold text-slate-800 ">Platform Commission</td>
                <td className="p-4 md:p-5 text-rose-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-rose-500 font-bold">✕</span>
                    <span>20% - 30% cut on worker wages</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-emerald-700 bg-emerald-50/50 font-bold">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-emerald-600">✓</span>
                    <span>₹0 Commission (100% to Karigar)</span>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="p-4 md:p-5 font-bold text-slate-800">Phone Numbers</td>
                <td className="p-4 md:p-5 text-rose-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-rose-500 font-bold">✕</span>
                    <span>Masked numbers & automated bots</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-emerald-700 bg-emerald-50/50 font-bold">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-emerald-600">✓</span>
                    <span>Direct unmasked Call & WhatsApp</span>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="p-4 md:p-5 font-bold text-slate-800">Pricing & Rates</td>
                <td className="p-4 md:p-5 text-rose-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-rose-500 font-bold">✕</span>
                    <span>Artificially inflated rate cards</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-emerald-700 bg-emerald-50/50 font-bold">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-emerald-600">✓</span>
                    <span>Direct mutually agreed fair price</span>
                  </div>
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td className="p-4 md:p-5 font-bold text-slate-800">Payment Settlement</td>
                <td className="p-4 md:p-5 text-rose-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-rose-500 font-bold">✕</span>
                    <span>7-14 days delayed wallet payouts</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-emerald-700 bg-emerald-50/50 font-bold">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-emerald-600">✓</span>
                    <span>Instant direct Cash or UPI on finish</span>
                  </div>
                </td>
              </tr>

              {/* Row 5 */}
              <tr>
                <td className="p-4 md:p-5 font-bold text-slate-800">Worker Registration</td>
                <td className="p-4 md:p-5 text-rose-600 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-rose-500 font-bold">✕</span>
                    <span>Forced onboarding kits & penalties</span>
                  </div>
                </td>
                <td className="p-4 md:p-5 text-emerald-700 bg-emerald-50/50 font-bold">
                  <div className="flex items-start gap-1.5">
                    <span className="shrink-0 text-emerald-600">✓</span>
                    <span>100% Free Lifetime Karigar Account</span>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* BOTTOM CTA BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16 w-full mt-16">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden shadow-xl border border-slate-800">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-4 border border-amber-500/20">
            <span className="material-symbols-outlined text-sm"></span> READY TO GET STARTED
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
            Experience Honest, Direct Local Hiring
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-4">
            सीधी बात करें, सीधा काम करवाएं!
          </h3>

          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Whether you need an urgent repair at home or you are a skilled mistri seeking daily local work, bulaoMistri is 100% free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2 ">
              <span className="material-symbols-outlined text-sm"></span> Find a Worker
            </button>
            <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm"></span> Post Your Work Free
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-sm"><Headset className='w-4'/></span>
              Toll-Free Helpline: <span className="text-white font-bold">1800-419-MISTRI</span>
            </div>
            {/* <div className="hidden md:block ">•</div> */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-sm"><CircleCheck className='w-4'/></span>
              Zero Joining Fee + Lifetime Direct Connection
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}