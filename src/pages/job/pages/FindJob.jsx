import React, { useEffect, useState } from 'react';
import {
  Search,
  CalendarDays,
  MapPin,
  Navigation,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Sparkles,
  Bookmark,
  Play,
  Pause,
  Image,
  MessageCircle,
  Phone,
  Volume2,
  Check,
  Clock,
  ChevronRight
} from 'lucide-react';
import { jobService } from '../api/jobService'

const TRADE_CATEGORIES = [
  { id: 'plumber', label: 'Plumber (प्लंबर)', icon: Wrench, active: true },
  { id: 'electrician', label: 'Electrician (इलेक्ट्रीशियन)', icon: Zap, active: false },
  { id: 'carpenter', label: 'Carpenter (बढ़ई)', icon: Hammer, active: false },
  { id: 'painter', label: 'Painter (पेंटर)', icon: Paintbrush, active: false },
  { id: 'cleaner', label: 'Cleaner (सफाई)', icon: Sparkles, active: false },
];

// const CATEGORY_ICONS = {
//   plumber: Wrench,
//   electrician: Zap,
//   carpenter: Hammer,
//   painter: Paintbrush,
//   cleaner: Sparkles,
//   mechanic: Wrench,
//   mason: Hammer,
// };

const JOB_LISTINGS = [
  {
    id: 1,
    category: 'PLUMBING WORK • प्लंबर',
    // categoryIcon: Wrench,
    // categoryColor: 'text-pink-600 bg-amber-50 border-amber-200',
    postedTime: 'Posted 10 mins ago',
    title: 'Kitchen Tap Leakage & Basin Pipe Change',
    location: 'Bellandur, Green Glen Layout',
    distance: '1.5 km away',
    payoutType: 'CUSTOMER PAYOUT',
    payoutAmount: '₹300 Direct Cash/UPI',
    voiceNoteDuration: '0:18s',
    voiceNoteTranscript: '"Bhaiya, kitchen sink pipe is cracked..."',
    photosCount: 2,
  },
  {
    id: 2,
    category: 'ELECTRICAL WORK • इलेक्ट्रीशियन',
    categoryIcon: Zap,
    categoryColor: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    postedTime: 'Posted 25 mins ago',
    title: 'Ceiling Fan Installation & Switch Wiring',
    location: 'HSR Sector 2, 14th Main',
    distance: '2.1 km away',
    description: '2 new Havells fans to be mounted. Ladder provided by owner.',
    payoutType: 'FIXED RATE PAYOUT',
    payoutAmount: '₹450 Fixed',
    voiceNoteDuration: '0:24s',
    voiceNoteTranscript: '"Havells fans install karne hain ceiling me..."',
    photosCount: 2,
  },
  {
    id: 3,
    category: 'PLUMBING WORK • प्लंबर',
    categoryIcon: Wrench,
    categoryColor: 'text-amber-600 bg-amber-50 border-amber-200',
    postedTime: 'Posted 1 hour ago',
    title: 'Bathroom Shower Mixer & Diverter Repair',
    location: 'Koramangala 4th Block',
    distance: '3.2 km away',
    description: 'Water pressure drops when turned to hot. Kohler fitting.',
    payoutType: 'INSPECTION FEE',
    payoutAmount: '₹400 Visit & Quote',
    voiceNoteDuration: '0:15s',
    voiceNoteTranscript: '"Bathroom mixer tap leak ho raha hai..."',
    photosCount: 2,
  },
  {
    id: 4,
    category: 'TANK CLEANING • सफाई',
    categoryIcon: Sparkles,
    categoryColor: 'text-blue-600 bg-blue-50 border-blue-200',
    postedTime: 'Posted 2 hours ago',
    title: 'Overhead Sintex Water Tank Deep Cleaning (1000L)',
    location: 'BTM Layout 2nd Stage',
    distance: '3.8 km away',
    description: 'Single 1000L rooftop plastic tank. Pressure washing preferred.',
    payoutType: 'FIXED RATE PAYOUT',
    payoutAmount: '₹800 Direct Pay',
    voiceNoteDuration: '0:30s',
    voiceNoteTranscript: '"Chhat pe Sintex tank safai karni hai..."',
    photosCount: 2,
  },
];

const TopHeader = () => {
  return (
    <header className="pt-6 pb-2 px-4 text-center max-w-5xl mx-auto">
      {/* Green Live Jobs Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>LIVE NEARBY JOBS • सीधे ग्राहक से बात करें</span>
      </div>

      {/* Main Page Title */}
      <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B132B] tracking-tight">
        काम खोजें <span className="text-slate-400 font-light mx-1">/</span> Find Work in Bengaluru
      </h1>
    </header>
  );
};

const SearchAndFilters = () => {
  const [selectedTrade, setSelectedTrade] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('All Nearby');
  const [isUrgent, setIsUrgent] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  return (
    <section className="max-w-5xl mx-auto px-4 mt-4 mb-6">
      {/* Search Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row items-stretch gap-2.5">
          {/* Trade Search Input */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-200/60 focus-within:bg-white focus-within:border-slate-400 transition-colors">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search trade or work (e.g. Tap leakage, Wiring, Painting...)"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              defaultValue=""
            />
          </div>

          {/* Locality Input */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-200/60 focus-within:bg-white focus-within:border-slate-400 transition-colors">
            <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter locality or area (e.g. HSR Layout, Bellandur)"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200/80 active:scale-95">
              <Navigation className="w-3.5 h-3.5 text-slate-600" />
              <span>GPS</span>
            </button>

            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B132B] hover:bg-[#1E2A4A] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search Work (काम खोजें)</span>
            </button>
          </div>
        </div>

        {/* Trade Category Pills */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          {TRADE_CATEGORIES.map((trade) => {
            const Icon = trade.icon;
            const isSelected = selectedTrade === trade.id;
            return (
              <button
                key={trade.id}
                onClick={() => setSelectedTrade(trade.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${isSelected
                  ? 'bg-[#0B132B] text-white border-[#0B132B] shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{trade.label}</span>
              </button>
            );
          })}
        </div>

        {/* Distance & Urgent Status Filter Sub-Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Distance Chips */}
          <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            {['< 3 km', '< 5 km', 'All Nearby'].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistance(dist)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${selectedDistance === dist
                  ? 'bg-[#0B132B] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {dist}
              </button>
            ))}
          </div>

          {/* Urgent Toggle Button */}
          {/* <button
            onClick={() => setIsUrgent(!isUrgent)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold border transition-all ${
              isUrgent
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Urgent (तुरंत काम)</span>
            <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${isUrgent ? 'bg-amber-500 text-white' : 'border border-slate-300'}`}>
              {isUrgent && <Check className="w-3 h-3 stroke-[3]" />}
            </span>
          </button> */}
        </div>
      </div>
    </section>
  );
};

const VoiceNotePlayer = ({ duration, transcript }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 my-3.5 flex items-center gap-3">
      {/* Play/Pause Circle Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-[#C98A1E] hover:bg-[#B37817] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-transform active:scale-90"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-white" />
        ) : (
          <Play className="w-4 h-4 fill-white ml-0.5" />
        )}
      </button>

      {/* Transcript Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
          <span>Customer Voice Note (ग्राहक की आवाज सुनें)</span>
        </div>
        <p className="text-[11px] sm:text-xs text-amber-800/90 font-medium truncate mt-0.5">
          <span className="font-bold mr-1">{duration}</span> • "{transcript}..."
        </p>
      </div>

      {/* Audio Waveform Graphic */}
      <div className="hidden sm:flex items-center gap-1 h-5 px-1">
        {[40, 75, 30, 90, 60, 100, 45, 80, 35, 65, 90, 40].map((height, i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-amber-600 animate-pulse' : 'bg-amber-300'
              }`}
            style={{ height: `${isPlaying ? Math.max(20, (height + (i % 3) * 20) % 100) : height}%` }}
          />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const CategoryIcon = CATEGORY_ICONS[job.category?.toLowerCase()] || Wrench;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200">
      {/* Top Meta Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
            {/* <CategoryIcon className="w-3.5 h-3.5 text-amber-600" /> */}
            <span>{job.category}</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-300" />
            {job.postedTime}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-1.5 rounded-lg border transition-all ${isBookmarked
            ? 'bg-amber-50 border-amber-300 text-amber-600'
            : 'bg-slate-50 border-slate-200/80 text-slate-400 hover:text-slate-600'
            }`}
          aria-label="Bookmark job"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
        </button>
      </div>


      {/* Main Content Area */}
      <div className="mt-3 flex flex-col md:flex-row md:items-start justify-between gap-3">
        {/* Title and Location */}
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-[#0B132B] leading-snug capitalize">
              {job.worktitle}
            </h3>
            <div className="mt-1.5 flex items-center gap-4 flex-wrap text-xs text-slate-600">
              <span className="flex items-center font-medium text-slate-700 capitalize">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
                {job.address}
              </span>
              {/* <span className="bg-slate-100 border border-slate-200/70 text-slate-700 font-semibold text-[11px] px-2 py-0.5 rounded-md">
                {job.distance}
              </span> */}
            </div>
           <div className="flex flex-col">
             <div className='text-[12px] pt-2 text-slate-700'> <span className='font-bold'>• </span>{job.workDescription}</div>
             {/* <span className='text-[12px] text-slate-700'><span className='font-bold'>• </span> {job.otherSpecficTask}</span> */}
           </div>
          </div>

          {job.description && (
            <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {job.description}
            </p>
          )}


        </div>

        {/* Payout Box */}
        {/* <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 sm:px-4 sm:py-2.5 text-right flex-shrink-0 self-start">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            {job.preferredDay}
          </span>
          <span className="text-base sm:text-lg font-black text-[#0B132B] block mt-0.5">
            {job.preferredTimeSlot}
          </span>
        </div> */}

        {(job.preferredDay || job.preferredTimeSlot) && (
            <div className="flex min-w-[170px] items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                <CalendarDays className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Preferred time
                </span>
                <span className="mt-0.5 block text-sm font-extrabold capitalize text-[#0B132B]">
                  {[job.preferredDay, job.preferredTimeSlot].filter(Boolean).join(' · ')}
                </span>
              </span>
            </div>
            )}

      </div>

      {/* Audio Voice Note Bar */}
      <VoiceNotePlayer
        duration={job.voiceNoteDuration}
        transcript={job.otherSpecficTask}
      />

      {/* Bottom Action Buttons (3 Column Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        {/* View Photos Button */}
        <button className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 hover:border-slate-400 transition-all active:scale-[0.98]">
          <Image className="w-4 h-4 text-amber-600" />
          <span>फोटो देखें ({job.images.length}) / View Photos</span>
        </button>

        {/* WhatsApp Chat Button */}
        <button className="w-full py-2.5 px-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] hover:-translate-y-0.5">
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp / सीधे चैट करें</span>
        </button>

        {/* Direct Call Button */}
        <button className="w-full py-2.5 px-3 rounded-xl bg-[#C98A1E] hover:bg-[#B37817] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] hover:-translate-y-0.5">
          <Phone className="w-4 h-4" />
          <span>Call Direct (सीधा कॉल करें)</span>
        </button>
      </div>
    </div>
  );
};

export default function FindJob() {

  const [jobs, setJobs] = useState([]);
  const [totalJob, settotalJob] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs({ limit: 10 })
        setJobs(data.jobs)
        settotalJob(data.jobs.length)
      } catch (error) {
        console.error("Failed to load jobs:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) return <p className="p-4">Loading verified jobs...</p>;


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans pb-16">
      {/* Top Title Section */}
      <TopHeader />

      {/* Search and Filters */}
      <SearchAndFilters />

      {/* Jobs Count Subheader */}
      <div className="max-w-5xl mx-auto px-4 mb-4 flex items-center justify-between">
        <p className="text-xs sm:text-sm font-bold text-slate-700">
          Showing <span className="text-[#0B132B] font-extrabold">{totalJob} Direct Customer Jobs</span> near you
        </p>

        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
          Updated 1 min ago
        </span>
      </div>

      {/* Job Cards Stack */}
      <main className="max-w-5xl mx-auto px-4 space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id || job.id} job={job} />
        ))}
      </main>
    </div>
  );
}