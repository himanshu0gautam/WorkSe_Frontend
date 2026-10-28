import React, { useEffect, useState, lazy, Suspense } from 'react';
import {
  ChevronsRight,
  Search,
  BriefcaseBusiness,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Sparkles,
  Tv,
  CheckCircle2,
  XCircle,
  ArrowRight,
  UserCheck,
  BadgeCheck,
  Building,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { heroService } from '../api/heroService';
import Poster from '../../../assets/hero-poster.jpg'

// --- CATEGORIES DATA ---
const TRADE_CATEGORIES = [
  {
    id: 'electrician',
    title: 'Electrician',
    hindiTitle: 'बिजली मिस्त्री',
    icon: Zap,
    worker: '42+ Worker',
    jobs: '21',
    popular: true,
    badge: 'Fast Service'
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    hindiTitle: 'प्लंबर / नल मिस्त्री',
    icon: Wrench,
    worker: '38+ Worker',
    jobs: '5',
    popular: true,
    badge: '24x7 Ready'
  },
  {
    id: 'carpenter',
    title: 'Carpenter',
    hindiTitle: 'बढ़ई / लकड़ी काम',
    icon: Hammer,
    worker: '29+ Worker',
    jobs: '13',
    popular: false,
    badge: 'Expert Skilled'
  },
  {
    id: 'painter',
    title: 'Painter & Wall Decor',
    hindiTitle: 'पेंटर / पुट्टी',
    icon: Paintbrush,
    worker: '31+ Worker',
    jobs: '9',
    popular: true,
    badge: 'Top Rated'
  },
  {
    id: 'cleaning',
    title: 'Home Cleaning',
    hindiTitle: 'सफाई सेवा',
    icon: Sparkles,
    worker: '19+ Worker',
    jobs: '25',
    popular: false,
    badge: 'Deep Clean'
  },
  {
    id: 'appliances',
    title: 'AC & Appliance Repair',
    hindiTitle: 'एसी व उपकरण रिपेयर',
    icon: Tv,
    worker: '25+ Worker',
    jobs: '12',
    popular: true,
    badge: 'Instant Call'
  },
  {
    id: 'mason',
    title: 'Mason & Tiles',
    hindiTitle: 'राजमिस्त्री / टाइल्स',
    icon: Building,
    worker: '18+ Worker',
    jobs: '34',
    popular: false,
    badge: 'Verified'
  },
  {
    id: 'labour',
    title: 'Daily Helpers / Groups',
    hindiTitle: 'मजदूर व लेबर ग्रुप',
    icon: Users,
    worker: '5+ Worker',
    jobs: '44',
    popular: true,
    badge: 'Direct Deal'
  }
];

// --- TESTIMONIALS DATA ---
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Homeowner, Gurgaon',
    rating: 5,
    comment: 'bulaoMistri saved me from paying commission to middle agency apps. I directly called Rajesh ji for electrical repair and he arrived within 30 minutes. Direct rate negotiation was super transparent!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Ramesh Sahu',
    role: 'Master Carpenter (Karigar)',
    rating: 5,
    comment: 'Pehle customer lene ke liye 20% commission dena padta tha. Ab bulaoMistri se direct call aati hai. Meri daily kitni savings ho rahi hai. Ye sabse badhiya platform hai hum sab workers ke liye.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'Vikram Grover',
    role: 'Property Owner, Delhi',
    rating: 5,
    comment: 'Great initiative! Direct WhatsApp communication makes it super simple to share photos of plumbing leaks before they arrive. Honest workers and zero markup pricing.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  }
];

const HeroSection = () => {

  const navigate = useNavigate()

  const [selectedCity, setSelectedCity] = useState('Noida / NCR');
  const [tradeSearch, setTradeSearch] = useState('');
  const [searchMode, setSearchMode] = useState('worker');

  return (
    <section
      className="bg-[#0B132B] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Poster})` }}
    >
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#1C2541]/80 to-transparent pointer-events-none rounded-b-full blur-3xl opacity-60">hum</div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Top Tag Pill */}
        {/* <div className="inline-flex items-center gap-2 bg-[#1C2541] border border-[#D4A373]/40 px-4 py-1.5 rounded-full mb-6">
          <span className="bg-[#20BF55] text-xs font-bold text-[#0B132B] px-2 py-0.5 rounded-full">NEW</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            Direct Talk . Zero Brokerage . Real Karigars Near You.
          </span>
        </div> */}

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 py-4">
          Direct Talk. <span className="text-[#D4A373]">Zero Brokerage.</span>
          <br className="hidden sm:inline" />
          Real Karigars Near You.
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Connect directly with verified local Electricians, Plumbers, Carpenters, Painters & Daily Helpers in your city. No middleman app commission, no inflated prices.
        </p>

        {/* Search Box Container */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl max-w-3xl mx-auto text-slate-800 border border-slate-200">
          <div className="mb-3 flex justify-center">
            <div className="inline-flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Search type">
              <button
                type="button"
                aria-pressed={searchMode === 'worker'}
                onClick={() => setSearchMode('worker')}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition-colors ${searchMode === 'worker' ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B132B]'}`}
              >
                Find Worker
              </button>
              <button
                type="button"
                aria-pressed={searchMode === 'work'}
                onClick={() => setSearchMode('work')}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition-colors ${searchMode === 'work' ? 'bg-[#0B132B] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B132B]'}`}
              >
                Find Work
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Location Selector */}
            <div className="sm:col-span-5 flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-left">
              <MapPin className="w-5 h-5 text-[#D4A373] flex-shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Your Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent font-semibold text-xs sm:text-sm text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option>Noida / Greater Noida</option>
                  <option>Delhi / NCR</option>
                  <option>Gurugram / Gurgaon</option>
                  <option>Ghaziabad</option>
                  <option>Faridabad</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                </select>
              </div>
            </div>

            {/* Trade Search Input */}
            <div className="sm:col-span-5 flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-left">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] uppercase font-bold text-slate-400">Search Trade / Service</label>
                <input
                  type="text"
                  placeholder="e.g. Electrician, Plumber, Mason..."
                  value={tradeSearch}
                  onChange={(e) => setTradeSearch(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Search Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={() => navigate(searchMode === 'worker' ? ROUTES.FINDWORKER : ROUTES.FINDJOB)}
                className="w-full h-full py-3 sm:py-3.5 bg-[#D4A373] hover:bg-[#C68B59] text-[#0B132B] font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
                <span>{searchMode === 'worker' ? 'Find Worker' : 'Find Work'}</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Tag Badges */}
          {/* <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Popular:</span>
            <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md cursor-pointer transition-colors">AC Service</span>
            <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md cursor-pointer transition-colors">Switch Fitting</span>
            <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md cursor-pointer transition-colors">Tap Repair</span>
            <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md cursor-pointer transition-colors">Wall Paint</span>
          </div> */}
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="bg-[#1C2541]/80 backdrop-blur border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 text-left">
            <div className="bg-[#D4A373]/20 p-2.5 rounded-lg text-[#D4A373]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black text-white">25,000+</div>
              <div className="text-xs text-slate-400">Verified Karigars Listed</div>
            </div>
          </div>

          <div className="bg-[#1C2541]/80 backdrop-blur border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 text-left">
            <div className="bg-[#20BF55]/20 p-2.5 rounded-lg text-[#20BF55]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black text-[#20BF55]">0% Commission</div>
              <div className="text-xs text-slate-400">Pay Directly to Worker</div>
            </div>
          </div>

          <div className="bg-[#1C2541]/80 backdrop-blur border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 text-left">
            <div className="bg-amber-400/20 p-2.5 rounded-lg text-amber-400">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-lg font-black text-white">4.8 / 5.0</div>
              <div className="text-xs text-slate-400">Over 1,20,000+ Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const TradeCategories = () => {
  return (
    <section id="trades" className="py-14 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">Explore Trades & Services</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
              Popular Trade Categories / मुख्य सेवाएं
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select category to view direct contact numbers of local workers in your area.
            </p>
          </div>
          <a
            href="#all-trades"
            className="mt-3 sm:mt-0 inline-flex items-center text-xs font-bold text-[#0B132B] hover:text-[#D4A373] transition-colors"
          >
            View All Categories ({TRADE_CATEGORIES.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRADE_CATEGORIES.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-xl hover:border-[#D4A373] transition-all duration-300 hover:-translate-y-1 relative group cursor-pointer"
              >
                {/* Top Badge */}
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-[#0B132B] text-[#D4A373] p-3 rounded-xl group-hover:bg-[#D4A373] group-hover:text-[#0B132B] transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="bg-[#E8F8F5] text-[#20BF55] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#20BF55]/20">
                    {item.badge}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-lg font-bold group-hover:text-[#C68B59] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3">{item.hindiTitle}</p>

                {/* Footer Details */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link to="/findWorker">
                    <span className="text-slate-500 font-medium bg-[#E8F8F5] px-3 py-0.5 rounded-lg flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
                      <span><Users className='w-4' /></span>{item.worker}</span>
                  </Link>
                  <Link to='/findWork'>
                    <span className="font-extrabold text-[#D4A373] bg-amber-50 px-5 py-1 rounded-lg flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
                      <span><BriefcaseBusiness className='w-4' /></span>{item.jobs} Jobs
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


const ZeroBrokerDifference = () => {
  return (
    <section id="difference" className="py-14 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
            The Zero-Broker Difference
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See how direct connection saves up to 40% on labor costs compared to middleman apps.
          </p>
        </div>

        {/* Two Card Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Card 1: Traditional Apps */}
          <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 sm:p-8 relative">
            <div className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Traditional Marketplaces & Apps
            </div>
            <h3 className="text-xl font-black text-slate-400 mb-4">High Commissions & Middlemen</h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><b>20% - 35% Commission</b> added to every bill that you pay extra.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><b>Hidden service charges</b> & inflated material markup pricing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><b>No direct talk with Karigar</b> before booking payment is made.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span><b>Workers earn less</b> while customer pays significantly higher rates.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: bulaoMistri Direct (Dark Card) */}
          <div className="bg-[#0B132B] text-white border-2 border-[#D4A373] rounded-2xl p-6 sm:p-8 relative shadow-xl">
            <div className="inline-block bg-[#D4A373] text-[#0B132B] text-xs font-black px-3 py-1 rounded-full mb-4">
              WorkSe Direct Marketplace
            </div>
            <h3 className="text-xl font-black text-white mb-4">100% Direct Talk • 0% Brokerage</h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#20BF55] flex-shrink-0 mt-0.5" />
                <span><b>Zero Commission:</b> Customer and Worker deal 100% directly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#20BF55] flex-shrink-0 mt-0.5" />
                <span><b>Direct Call & WhatsApp:</b> Discuss problem & price before work starts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#20BF55] flex-shrink-0 mt-0.5" />
                <span><b>Fair Price Guarantee:</b> Pay fair rate directly to your local Karigar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#20BF55] flex-shrink-0 mt-0.5" />
                <span><b>Aadhaar & Work Verified:</b> Safe, local and trusted workers near you.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const VerifiedWorkers = () => {

  const [workers, setWorkers] = useState([]);
  
  const fetchWorker = async (query = "") => {
    try {
      const result = await heroService.getNearbyWorker(query)
      if(result.success){
        setWorkers(result.data)
      }
    } catch (error) {
      console.error("failed to load nearby worker", error)
    }
  }

  useEffect(()=>{
    fetchWorker()
  },[])

  return (
    <section id="workers" className="py-14 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">Top Recommended</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
              Verified Workers Near You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Background checked, skilled Karigars available for immediate phone or WhatsApp call.
            </p>
          </div>
          <a
            href="/findWorker"
            className="mt-3 sm:mt-0 inline-flex items-center text-xs font-bold text-[#0B132B] hover:text-[#D4A373] transition-colors"
          >
             All Worker 
             {/* ({TRADE_CATEGORIES.length})  */}
             <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workers?.map((worker) => (
            <div
              key={worker._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#D4A373] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Profile Image & Header */}
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={worker.imageUrl}
                  alt={worker.fullname}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4A373]"
                />
                <div>
                  <h4 className="font-extrabold text-[#0B132B] text-base leading-snug flex items-center gap-1 capitalize">
                    {worker.fullname}
                    {worker.isVerfify || true && <BadgeCheck className="w-4 h-4 text-[#20BF55]" />}
                  </h4>
                  <p className="text-xs font-semibold text-[#D4A373]">{worker.tradeCategory}</p>
                  <span className="text-[10px] text-slate-400">{worker.experience}+ Yrs Exp.</span>
                </div>
              </div>

              {/* Rating and Location */}
              <div className="bg-slate-50 rounded-xl p-2.5 mb-4 text-xs space-y-1.5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span>{worker.rating || "4.1"}</span>
                    <span className="text-slate-400 text-[10px] ml-1">({worker.reviewsCount || 520} reviews)</span>
                  </div>
                  <span className="bg-[#E8F8F5] text-[#20BF55] text-[10px] font-bold px-2 py-0.5 rounded">
                    {worker.badge || "Top Choice"}
                  </span>
                </div>
                <div className="flex items-center text-slate-500 text-[11px]">
                  <MapPin className="w-3 h-3 text-slate-400 mr-1 flex-shrink-0" />
                  <span className="truncate max-w-[120px]">{worker.ExactAddress}</span>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${worker.phone}`}
                  className="bg-[#D4A373] hover:bg-[#C68B59] text-[#0B132B] font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${worker.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#20BF55] hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const HowItWorks = () => {
//   return (
//     <section id="how-it-works" className="py-14 bg-white border-t border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-2xl mx-auto mb-12">
//           <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">Simple & Direct Process</span>
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
//             How bulaoMistri Works / काम कैसे करता है
//           </h2>
//           <p className="text-xs sm:text-sm text-slate-500 mt-1">
//             Book local artisans directly in 3 easy steps without any registration fee or middleman charges.
//           </p>
//         </div>

//         {/* Step Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
//           {/* Step 1 */}
//           <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 text-center hover:border-[#D4A373] transition-all">
//             <div className="w-12 h-12 bg-[#0B132B] text-[#D4A373] font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
//               1
//             </div>
//             <h3 className="text-lg font-bold text-[#0B132B] mb-2">Search Category & Service</h3>
//             <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//               Select your required trade like Electrician, Plumber or Painter and choose your specific city location.
//             </p>
//           </div>

//           {/* Step 2 */}
//           <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 text-center hover:border-[#D4A373] transition-all">
//             <div className="w-12 h-12 bg-[#20BF55] text-white font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
//               2
//             </div>
//             <h3 className="text-lg font-bold text-[#0B132B] mb-2">Call or WhatsApp Directly</h3>
//             <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//               Click to view verified phone numbers. Talk directly with Karigar, explain work, share photos on WhatsApp.
//             </p>
//           </div>

//           {/* Step 3 */}
//           <div className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-6 text-center hover:border-[#D4A373] transition-all">
//             <div className="w-12 h-12 bg-[#D4A373] text-[#0B132B] font-black text-xl rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
//               3
//             </div>
//             <h3 className="text-lg font-bold text-[#0B132B] mb-2">Get Job Done & Pay Directly</h3>
//             <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//               Karigar arrives at your home, fixes the issue, and you pay agreed cash/UPI directly with ZERO commission!
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


const Testimonials = () => {
  return (
    <section id="realStories" className="scroll-mt-32 py-14 bg-[#F8F9FA] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">Real Stories</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
            Trusted by Homeowners & Workers Alike
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hear why thousands of customers and skilled artisans love the direct bulaoMistri model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#D4A373]" />
                <div>
                  <h5 className="font-bold text-xs sm:text-sm">{t.name}</h5>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const BottomFeatures = () => {
//   return (
//     <div className="bg-[#1C2541] border-t border-b border-slate-800 text-slate-200 py-6">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div className="p-2 flex flex-col items-center">
//             <Phone className="w-6 h-6 text-[#D4A373] mb-2" />
//             <span className="text-xs font-bold text-white">Direct Phone Call</span>
//             <span className="text-[10px] text-slate-400">No IVR or Waiting</span>
//           </div>

//           <div className="p-2 flex flex-col items-center">
//             <ShieldCheck className="w-6 h-6 text-[#20BF55] mb-2" />
//             <span className="text-xs font-bold text-white">100% Free Platform</span>
//             <span className="text-[10px] text-slate-400">Zero Middleman Markup</span>
//           </div>

//           <div className="p-2 flex flex-col items-center">
//             <UserCheck className="w-6 h-6 text-[#D4A373] mb-2" />
//             <span className="text-xs font-bold text-white">Verified Karigars</span>
//             <span className="text-[10px] text-slate-400">Local & Experienced</span>
//           </div>

//           <div className="p-2 flex flex-col items-center">
//             <HelpCircle className="w-6 h-6 text-amber-400 mb-2" />
//             <span className="text-xs font-bold text-white">Helpline Assistance</span>
//             <span className="text-[10px] text-slate-400">Ready to Guide You</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const Footer = () => {
//   return (
//     <footer className="bg-[#0B132B] text-slate-300 pt-12 pb-8 border-t border-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
//           {/* Brand Col */}
//           <div className="md:col-span-1">
//             <div className="flex items-center space-x-2 mb-3">
//               <div className="bg-[#D4A373] text-[#0B132B] p-1.5 rounded-lg font-black text-lg">bM</div>
//               <span className="text-xl font-black text-white">bulao<span className="text-[#D4A373]">Mistri</span></span>
//             </div>
//             <p className="text-xs text-slate-400 leading-relaxed mb-4">
//               Connecting households & businesses directly with local artisans with zero brokerage fees.
//             </p>
//             <div className="flex space-x-3 text-slate-400">
//               <a href="#" className="p-2 bg-[#1C2541] rounded-lg hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
//               <a href="#" className="p-2 bg-[#1C2541] rounded-lg hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></a>
//               <a href="#" className="p-2 bg-[#1C2541] rounded-lg hover:text-white transition-colors"><Phone className="w-4 h-4" /></a>
//             </div>
//           </div>

//           {/* Trade Categories Col */}
//           <div>
//             <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Trade Categories</h4>
//             <ul className="space-y-2 text-xs">
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Electricians Near Me</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Plumbers Near Me</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Carpenters Near Me</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Painters & Decorators</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">AC & Fridge Repair</a></li>
//             </ul>
//           </div>

//           {/* Active Cities Col */}
//           <div>
//             <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Active Cities</h4>
//             <ul className="space-y-2 text-xs">
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Noida & Greater Noida</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Delhi NCR</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Gurugram / Gurgaon</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Ghaziabad & Indirapuram</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Bengaluru & Mumbai</a></li>
//             </ul>
//           </div>

//           {/* Safety & Legal */}
//           <div>
//             <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Karigar Safety</h4>
//             <ul className="space-y-2 text-xs">
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Aadhaar Verification</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Zero Commission Policy</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Terms of Service</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-[#D4A373] transition-colors">Support & Helpline</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Copyright */}
//         <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
//           <div>© {new Date().getFullYear()} bulaoMistri. All rights reserved. Direct Karigar Network.</div>
//           <div className="flex items-center space-x-1">
//             <span>Made with</span>
//             <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
//             <span>for Local Skilled Workers of India</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

export default function Hero() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#realStories') {
      document.getElementById('realStories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#D4A373] selection:text-[#0B132B]">

      <HeroSection />

      <TradeCategories />

      <ZeroBrokerDifference />

      <VerifiedWorkers />

      {/* <HowItWorks /> */}

      <Testimonials />

      {/* <BottomFeatures /> */}

    </div>
  );
}