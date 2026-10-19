import React from "react";
import {
  CircleCheck
} from 'lucide-react';

export default function OurVision() {
  return (
    <div className="bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen flex flex-col selection:bg-[#d97706] selection:text-white">
      
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: Our Vision Hero Section */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-14 text-center w-full">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-sm text-green-600"><CircleCheck className="w-4"/></span>
          100% Direct & Transparent • Zero-Commission Policy
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-3">
          Our Vision <span className="text-[#d97706] text-4xl">/ हमारा विजन</span>
        </h1>

        {/* Subtitle Quote */}
        <p className="text-lg md:text-xl font-bold text-[#1e293b] max-w-3xl mx-auto mb-3">
          "Connecting local workers and customers directly — no middleman, no commission, just pure connections."
        </p>

        {/* Description Paragraph */}
        <p className="text-xs md:text-sm text-[#64748b] max-w-2xl mx-auto mb-10 leading-relaxed">
          Empowering Bharat's skilled mistris and karigars with dignity, direct homeowner access, and full financial independence. We're dismantling exploitation platform cuts to restore pride in everyday craftsmanship.
        </p>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl"></span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0f172a]">28+ Categories</h3>
              <p className="text-[11px] text-[#64748b] font-medium">Plumbers, Electricians, Carpenters & more</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl"></span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0f172a]">100% Direct Contact</h3>
              <p className="text-[11px] text-[#64748b] font-medium">Unmasked phone numbers & WhatsApp</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl"></span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0f172a]">₹0 Platform Fees</h3>
              <p className="text-[11px] text-[#64748b] font-medium">No hidden deductions. 100% wage retained</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: Our Mission / हमारा मिशन */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-widest block mb-1">
            THE GUIDING PURPOSE
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
            Our Mission <span className="text-[#d97706]">/ हमारा मिशन</span>
          </h2>
          <p className="text-xs md:text-sm text-[#64748b] max-w-2xl mx-auto mt-2 leading-relaxed">
            WorkSe makes local trade connections effortless: workers can present their skills and live availability directly online, while homeowners can search categories, localities, and verified profiles before calling or messaging them immediately.
          </p>
        </div>

        {/* 3 Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1b4b] text-white flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-xl"></span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-1">100% Free To Use Today</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-3">मुफ़्त उपयोग</p>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Zero registration fees, zero hidden charges, and zero commission cuts for any platform user. We believe access to work should never be behind paywalls for everyday working class.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-medium text-[#64748b]">
              <span>Lifetime Zero Brokerage</span>
              <span className="material-symbols-outlined text-sm text-[#d97706]"><CircleCheck className="w-4"/></span>
            </div>
          </div>

          {/* Mission Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1b4b] text-white flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-xl"></span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-1">Direct Contact & Unmasked</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-3">सीधा संपर्क - सीधा बातचीत</p>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Reach Karigars directly over verified phone call or WhatsApp. Discuss job specifics, share photos of sites or repairs, and settle honest estimates without strict interference.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-medium text-[#64748b]">
              <span>Instant Call & WhatsApp</span>
              <span className="material-symbols-outlined text-sm text-[#d97706]"><CircleCheck className="w-4"/></span>
            </div>
          </div>

          {/* Mission Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1e1b4b] text-white flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-xl"></span>
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-1">No Middleman & Direct Payments</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-3">सीधा भुगतान (बिना दलाली)</p>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Customers and workers agree on rates, arrival timeline, and settlement directly touch in person or UPI. Every single hard-earned rupee goes straight into the craftsman's pocket.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-medium text-[#64748b]">
              <span>Direct Cash / UPI Settlement</span>
              <span className="material-symbols-outlined text-[#d97706]"><CircleCheck className="w-4"/></span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: Our Vision in Action */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full my-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
            Our Vision in Action
          </h2>
          <p className="text-xs md:text-sm text-[#64748b] mt-1">
            Two powerful ways we're transforming local trade connections across Bharat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Box 1 */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl"></span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">Find Workers (कारीगर खोजें)</h3>
                  <p className="text-xs text-[#64748b]">For Homeowners, Renters & Property Managers</p>
                </div>
              </div>

              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                Finding a dependable tradesperson is now as transparent and fast as booking standard services. No more frantic inquiries with security guards or unreliable agency call centers.
              </p>

              <ul className="space-y-3 text-xs text-[#334155] mb-8">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>28+ verified trades:</strong> Rapid access to Plumbers, Electricians, Carpenters, Painters, Tilemasons, and Fabricators in your ward.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>Direct 1-tap call & WhatsApp:</strong> Immediate contact line with the actual artisan — no middleman IVR response wait times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>Authentic worker profiles:</strong> Inspect verified badges, genuine community star ratings, and snapshot of past done work.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>Hyperlocal coverage:</strong> Filter artisans within a 2-to-5 kilometer radius to ensure arrival under 30 minutes.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#1e293b]">Over 45,000+ Active Karigars in Bangalore</span>
              <button className="px-3.5 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-bold text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                Browse Directory →
              </button>
            </div>
          </div>

          {/* Action Box 2 */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl"></span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">Post Work & Get Jobs (काम पाएं)</h3>
                  <p className="text-xs text-[#64748b]">For Independent Craftsmen, Helpers & Technicians</p>
                </div>
              </div>

              <p className="text-xs text-[#64748b] leading-relaxed mb-6">
                Fair opportunities for skilled workers without exploitative agency commissions. Gain daily access to neighborhood jobs and talk directly to clients who respect your labor.
              </p>

              <ul className="space-y-3 text-xs text-[#334155] mb-8">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>Regional voice notes & pictures:</strong> Homeowners post job needs with 10-second audio notes in Hindi, Kannada, etc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>Empower relevant alert:</strong> Mistris review job description, distance, and scope before deciding to respond to job dispatches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>No commission penalties:</strong> Zero booking cut charged to worker/earning; total fee directly stays inside worker's pocket.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600 shrink-0 mt-0.5"><CircleCheck className="w-4"/></span>
                  <span><strong>100% Retained earnings:</strong> Customers pay you directly in cash or on-spot Transfer (UPI/GPay/PhonePe) instantly.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#1e293b]">Average job response under 15 minutes</span>
              <button className="px-3.5 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-bold text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                Register Free as Worker →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: Our Journey to Empower Local Communities */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-[#d97706] uppercase tracking-widest block mb-1">
            CORE PILLARS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
            Our Journey to Empower Local Communities
          </h2>
          <p className="text-xs font-semibold text-[#d97706] mt-1">स्थानीय समुदायों और कारीगरों का सशक्तीकरण</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 01 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm relative">
            <div className="text-4xl font-extrabold text-[#e2e8f0] mb-2 font-mono">01</div>
            {/* <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] text-white flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-sm">location_city</span>
            </div> */}
            <h3 className="text-base font-bold text-[#0f172a] mb-1">Reach Every Local Area</h3>
            <p className="text-xs font-semibold text-[#d97706] mb-3">हर गली, हर मोहल्ले तक पहुँच</p>
            <p className="text-xs text-[#64748b] leading-relaxed mb-4">
              From bustling tier 1 metro clusters to tier 2 and tier 3 municipal towns — our goal is to put a wide spectrum of daily householders touch with superior workers within 2 to 5 kilometers, reducing travel costs for workers.
            </p>
          </div>

          {/* Pillar 02 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm relative">
            <div className="text-4xl font-extrabold text-[#e2e8f0] mb-2 font-mono">02</div>
            {/* <div className="w-8 h-8 rounded-lg bg-[#d97706] text-white flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-sm">groups</span>
            </div> */}
            <h3 className="text-base font-bold text-[#0f172a] mb-1">Empower Local Workers</h3>
            <p className="text-xs font-semibold text-[#d97706] mb-3">कारीगरों का आर्थिक सशक्तीकरण</p>
            <p className="text-xs text-[#64748b] leading-relaxed mb-4">
              Direct homeowner contact means 100% of hard-earned wages stay with the craftsman. No platform deductions, no platform commission surcharges, and no delayed weekly-monthly payouts.
            </p>
          </div>

          {/* Pillar 03 */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm relative">
            <div className="text-4xl font-extrabold text-[#e2e8f0] mb-2 font-mono">03</div>
              {/* <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] text-white flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-sm">home_work</span>
              </div> */}
            <h3 className="text-base font-bold text-[#0f172a] mb-1">Build a Trusted Community</h3>
            <p className="text-xs font-semibold text-[#d97706] mb-3">विश्वास और भरोसे का रिश्ता</p>
            <p className="text-xs text-[#64748b] leading-relaxed mb-4">
              Fostering respectful neighborhood relationships. We encourage honest artisan work ethic, community peer recommendations, and transparent direct pricing that treats manual workers/trades with the prestige they merit.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: What Makes bulaoMistri Different? */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-10">

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">
            What Makes WorkSe Different?
          </h2>
          <p className="text-xs font-semibold text-[#d97706] mt-1">वोरकसे अन्य प्लेटफ़ॉर्म्स से अलग क्यों है?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feature 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 mt-1 shrink-0"></span>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Zero Registration or Commission Fees</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-1">मुफ़्त और बिना कमीशन</p>
              <p className="text-xs text-[#64748b]">
                Aggregator networks shave 20% to 30% from a plumber or carpenter daily wage, while charging high convenience fees to homeowners. bulaoMistri charges 0% commission: completely free.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-500 mt-1 shrink-0"></span>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Unmasked Direct Connections</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-1">सीधा और सीधा माध्यम</p>
              <p className="text-xs text-[#64748b]">
                No virtual masked telephone wires/bot disconnects. We provide real SIM phone numbers and direct single-click WhatsApp links so you access required specialists immediately.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Smart Work Broadcast & Voice Notes</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-1">आसान वॉइस नोट और फोटो शेयरिंग</p>
              <p className="text-xs text-[#64748b]">
                Homeowners record quick 10-second voice notes explaining repair issues in their native regional language. Workers preview the task and apply, eliminating endless call-back questions.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-blue-500 mt-1 shrink-0"></span>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Community-Driven Fair Pricing</h3>
              <p className="text-xs font-semibold text-[#d97706] mb-1">उचित और न्यायसंगत दरें</p>
              <p className="text-xs text-[#64748b]">
                No inflated computer rate cards format ₹450 for a five-minute tap washer change. You and the worker mutually agree on realistic work estimates before a hammer touches nail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: Key Platform Statistics Counter Banner */}
      {/* ---------------------------------------------------- */}
      <section className="text-black py-12 my-6">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-800">
            {/* Stat 1 */}
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-extrabold mb-1">45,000+</div>
              <div className="text-xs font-semibold text-[#d97706] uppercase tracking-wider mb-0.5">Aadhaar Verified Tradespeople</div>
              <div className="text-[10px] text-slate-400">ACROSS BHARAT</div>
            </div>

            {/* Stat 2 */}
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-extrabold mb-1">₹0</div>
              <div className="text-xs font-semibold text-[#d97706] uppercase tracking-wider mb-0.5">Commission Collected</div>
              <div className="text-[10px] text-slate-400">PAID DIRECTLY TO WORKERS 100%</div>
            </div>

            {/* Stat 3 */}
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-extrabold mb-1">28+</div>
              <div className="text-xs font-semibold text-[#d97706] uppercase tracking-wider mb-0.5">Indian Cities</div>
              <div className="text-[10px] text-slate-400">METRO & TIER 2/3 HUB COVERAGE</div>
            </div>

            {/* Stat 4 */}
            <div className="p-2">
              <div className="text-3xl md:text-4xl font-extrabold mb-1">4.9 ★</div>
              <div className="text-xs font-semibold text-[#d97706] uppercase tracking-wider mb-0.5">Satisfaction Score</div>
              <div className="text-[10px] text-slate-400">BASED ON 12,500+ REVIEWS</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: Bottom Call To Action Banner */}
      {/* ---------------------------------------------------- */}
      {/* <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 w-full">
        <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-[#f59e0b] text-xs font-bold mb-4 border border-amber-500/20">
            <span className="material-symbols-outlined text-sm">verified</span>
            JOIN BHARAT'S LOCAL TRADE REVOLUTION
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
            कारीगर और ग्राहक का सीधा सेतु — <br className="hidden sm:inline" />
            <span className="text-[#f59e0b]">No Brokerage, Pure Work.</span>
          </h2>

          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Whether you need urgent home electrical repairs or you are a master craftsman seeking steady commission-free daily work, bulaoMistri is built for you. No credit cards required, ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">search</span>
              Post a Worker (कारीगर खोजें)
            </button>
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white font-bold text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">badge</span>
              Register as Karigar (कारीगर जुड़ें)
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f59e0b] text-sm">call</span>
              Helpline: <span className="text-white font-bold">1800-419-MISTRI (Toll Free)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
              100% Free Lifetime Access for Zero Cost
            </div>
          </div>

        </div>
      </section> */}

    </div>
  );
}