import React, { useEffect, useState } from 'react';
import {
  Search,
  Mic,
  ShieldCheck,
  Phone,
  Eye,
  SlidersHorizontal,
  Star,
  MapPin,
  CheckCircle,
  IndianRupee,
  MessageSquareText,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Tv,
  Sparkles,
  Share2,
  Globe,
  Headphones
} from 'lucide-react';
import { findWorker } from '../api/findWorker';

const POPULAR_TRADES = [
  { id: 'plumber', name: 'Plumber', hindi: 'प्लंबर', icon: Wrench, active: true },
  { id: 'electrician', name: 'Electrician', hindi: 'इलेक्ट्रिशियन', icon: Zap, active: false },
  { id: 'carpenter', name: 'Carpenter', hindi: 'बढ़ई', icon: Hammer, active: false },
  { id: 'painter', name: 'Painter', hindi: 'पेंटर', icon: Paintbrush, active: false },
  { id: 'ac', name: 'AC Repair', hindi: 'एसी सर्विस', icon: Tv, active: false },
  { id: 'cleaning', name: 'Deep Cleaning', hindi: '', icon: Sparkles, active: false },
];

// const WORKERS_LIST = [
//   {
//     id: 1,
//     name: 'Suresh Kumar',
//     title: 'Master Plumber',
//     rating: '4.9',
//     jobsCompleted: '140+',
//     experience: '10+ Yrs Exp',
//     location: 'HSR Sector 2',
//     distance: '1.2 km away',
//     skills: ['Pipe Leakage', 'Tap Fitting', 'Geyser'],
//     verified: true,
//     avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200',
//   },
//   {
//     id: 2,
//     name: 'Ramesh Verma',
//     title: 'Licensed Electrician',
//     rating: '4.8',
//     jobsCompleted: '98',
//     experience: '7 Yrs Exp',
//     location: 'Bellandur',
//     distance: '2.0 km away',
//     skills: ['Pipe Leakage', 'Tap Fitting', 'Geyser'],
//     isCertificationTag: true,
//     verified: true,
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
//   },
//   {
//     id: 3,
//     name: 'Mohd. Iqbal',
//     title: 'Furniture Carpenter',
//     rating: '4.9',
//     jobsCompleted: '210',
//     experience: '12 Yrs Exp',
//     location: 'Koramangala 4th Block',
//     distance: '2.8 km away',
//     skills: ['Bed Assembly', 'Wardrobes', 'Lock Repair'],
//     verified: true,
//     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
//   },
//   {
//     id: 4,
//     name: 'Rajesh Sharma',
//     title: 'Wall Painter & Waterproofing',
//     rating: '4.7',
//     jobsCompleted: '85',
//     experience: '8 Yrs Exp',
//     location: 'HSR Sector 1',
//     distance: '1.8 km away',
//     skills: ['Pipe Leakage', 'Tap Fitting', 'Geyser'],
//     verified: true,
//     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
//   },
// ];

// const HeaderBadge = () => {
//   return (
//     <div className="pt-6 pb-2 text-center">
//       <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/60 shadow-xs text-slate-700 text-xs font-semibold">
//         <ShieldCheck className="w-4 h-4 text-amber-600 fill-amber-100" />
//         <span><b>10,000+</b> Verified Independent Karigars • <b>0% Brokerage</b></span>
//       </div>
//     </div>
//   );
// };

const HeroSearch = () => {
  const [searchValue, setSearchValue] = useState('Plumber');
  const [selectedTrade, setSelectedTrade] = useState('plumber');

  return (
    <section className="max-w-4xl mx-auto px-4 text-center mt-3 mb-10 py-14 ">
      {/* Hero Title */}
      <h1 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-bold text-[#0B132B] tracking-tight leading-tight">
        Call Direct. Pay Direct. <span className="text-[#C98A1E]">Zero Brokerage.</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-2.5 text-slate-600 text-xs sm:text-sm font-medium max-w-2xl mx-auto leading-relaxed">
        Connect directly with verified local tradespeople around <span className="font-bold text-[#0B132B]">HSR Layout, Bengaluru</span>. No call center delays, no commission markup.
      </p>

      {/* Main Search Input Container */}
      <div className="mt-6 max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2">
        <div className="pl-3 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          //   value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search tradespeople e.g. Plumber, Electrician..."
          className="w-full bg-transparent py-1.5 text-sm sm:text-base font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
        />
        <button
          aria-label="Voice search"
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block"
        >
          <Mic className="w-5 h-5" />
        </button>
        <button className="bg-[#C98A1E] hover:bg-[#B37817] active:scale-95 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md text-sm flex items-center justify-center hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
          Search
        </button>
      </div>

      {/* Popular Trades Tags */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs">
        <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Popular Trades:</span>
        {POPULAR_TRADES.map((trade) => {
          const Icon = trade.icon;
          const isSelected = selectedTrade === trade.id;
          return (
            <button
              key={trade.id}
              onClick={() => setSelectedTrade(trade.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${isSelected
                ? 'bg-[#1C2541] text-white font-semibold shadow-sm'
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>
                {trade.name} {trade.hindi && <span className="opacity-80 text-[11px]">({trade.hindi})</span>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const WorkerDirectory = () => {

  const [workers, setWorker] = useState([])
  const [totalWorker, setTotalWorker] = useState(0)
  const [loading, setLoading] = useState(true);
  const [filterToday, setFilterToday] = useState(true);
  const [filterVerified, setFilterVerified] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const data = await findWorker.getAllWorker({ limit: 10 })
        setWorker(data.workers)
        setTotalWorker(data.workers.length)
      } catch (error) {
        console.error("failed to load worker:", error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorker()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
      {/* Section Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
            All Worker
          </h2>
          <span className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-md">
            {totalWorker} Available
          </span>
        </div>

        {/* Action Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setFilterToday(!filterToday)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold border transition-all ${filterToday
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Available Today
          </button>

          <button
            onClick={() => setFilterVerified(!filterVerified)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            Verified Only
          </button>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Top Rated (4.8++)
          </button>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            More Filters
          </button>
        </div>
      </div>

      {/* 2x2 Grid of Tradespeople */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {workers?.map((worker) => {
          const skills = Array.isArray(worker.skill)
            ? worker.skill
            : typeof worker.skill === 'string'
              ? worker.skill.split(',').map((skill) => skill.trim()).filter(Boolean)
              : [];

          return (
            <div
              key={worker._id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Card Header Info */}
                <div className="flex items-start gap-3.5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={worker.imageUrl}
                      alt={worker.fullname}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    />
                    {worker.isVerfify && (
                      <span className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div className="flex gap-3">
                        <h3 className="text-base font-bold text-[#0B132B] truncate capitalize">{worker.fullname}</h3>
                        <span className="bg-[#1C2541] text-white text-[9px] font-bold px-2 py-0.5 flex items-center rounded-md leading-0">
                          {worker.jobTitle} 
                        </span>
                      </div>
                      <span className='cursor-pointer'><Share2 /></span>
                    </div>

                    {/* Rating & Exp */}
                    <div className="mt-1 flex items-center text-xs text-slate-500 gap-3 flex-wrap">
                      <span className="flex items-center font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                        {worker.rating || "4.9"}
                      </span>
                      <span>({worker.jobsCompleted || 120} jobs completed)</span>
                      {/* <span>•</span> */}
                      <span className="font-medium text-slate-700">• {worker.experience}+ Yrs Exp</span>
                    </div>

                    {/* Location */}
                    <div className="mt-1 flex items-center text-xs text-slate-500 gap-3">
                      <div className="flex ">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 mr-1 capitalize">{worker.state},</span>
                        <span className="font-semibold text-slate-700 mr-1 capitalize">{worker.city}</span>
                      </div>
                      <div className="text-slate-400"><span>• ServiceRadius: </span>{worker.serviceRadius}</div>
                    </div>
                  </div>
                </div>

                {/* Skills / Specializations Row */}
                <div className="mt-3.5 min-h-[32px] flex items-center">
                  {skills.length > 0 && (
                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 w-full flex flex-wrap gap-1.5 items-center"><span className="text-[11px] font-medium text-slate-600 px-2 py-0.5 rounded-md">Skills: </span>
                      {skills.map((skill, idx) => (
                        <span
                          key={`${skill}-${idx}`}
                          className="text-[11px] font-medium text-slate-600 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
                <button className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-[0.98]">
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button className="bg-[#C98A1E] hover:bg-[#B37817] text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-[0.98]">
                  <Phone className="w-4 h-4" />
                  Call Directly
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-black">
            Why Homeowners Trust WorkSe
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Direct communication with certified tradesmen without middlemen charging huge commissions.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 flex flex-col items-start">
            <div className="bg-[#0B132B] text-amber-400 p-3 rounded-xl mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B132B] mb-2">Aadhaar & Police Verified</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every technician undergoes digital government ID verification and background check before listing on the directory.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 flex flex-col items-start">
            <div className="bg-[#0B132B] text-amber-400 p-3 rounded-xl mb-4 shadow-sm">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B132B] mb-2">100% Direct Payment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pay directly to the worker via your preferred UPI app (GPay, PhonePe, Paytm) or cash. Zero hidden platform cuts.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-6 flex flex-col items-start">
            <div className="bg-[#0B132B] text-amber-400 p-3 rounded-xl mb-4 shadow-sm">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0B132B] mb-2">Real-Time Phone & Chat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No endless booking bots. Speak directly to the tradesperson, discuss the problem, and agree on timing instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function FindWorker() {
  return (
    <div className="min-h-screen antialiased font-sans">
      {/* Top Banner Badge */}
      {/* <HeaderBadge /> */}

      {/* Hero & Search Header */}
      <HeroSearch />

      {/* Workers Cards Directory */}
      <WorkerDirectory />

      {/* Why Trust Section */}
      <TrustSection />

    </div>
  );
}
