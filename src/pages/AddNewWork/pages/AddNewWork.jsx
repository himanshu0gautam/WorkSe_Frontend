import React, { useState, useRef, useEffect } from 'react';
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Fan,
  Layers,
  Sparkles,
  Flame,
  Check,
  CheckCircle2,
  Pencil,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Camera,
  Video,
  MapPin,
  Crosshair,
  Calendar,
  ShieldCheck,
  Lightbulb,
  MessageCircle,
  X,
  Volume2,
  Clock,
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const TRADES = [
  {
    id: 'plumber',
    name: 'Plumber',
    hindi: 'नलसाज / प्लंबर',
    gridName: 'Plumber (नलसाज)',
    subtitle: 'Taps, pipes, leakages, fittings & drainage',
    gridSubtitle: 'Tap, leakage, sanitary',
    icon: Wrench,
    tasks: [
      'Tap Leakage / पाइप लीकेज',
      'Bathroom Fitting / फिटिंग',
      'Water Tank Cleaning / टंकी सफाई',
      'Geyser Connection / गीजर',
      'Full Pipe Line Setup',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'electrician',
    name: 'Electrician',
    hindi: 'बिजली मिस्त्री',
    gridName: 'Electrician (बिजली मिस्त्री)',
    subtitle: 'Wiring, switch, MCB, fan, inverter & lighting',
    gridSubtitle: 'Wiring, switch, MCB',
    icon: Zap,
    tasks: [
      'Switch / Socket Replacement',
      'MCB Tripping / Short Circuit',
      'Ceiling Fan Fitting / Repair',
      'Full House Rewiring',
      'Inverter Connection',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    hindi: 'बढ़ई',
    gridName: 'Carpenter (बढ़ई)',
    subtitle: 'Furniture, door, hinges, lock & woodwork',
    gridSubtitle: 'Furniture, door, hinges',
    icon: Hammer,
    tasks: [
      'Door Lock / Handle Repair',
      'Cupboard & Hinge Fix',
      'Bed & Table Assembly',
      'Custom Wood Shelf / Rack',
      'Wood Polishing & Touchup',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'painter',
    name: 'Painter',
    hindi: 'पेंटर',
    gridName: 'Painter (पेंटर)',
    subtitle: 'Wallpaper, waterproofing, interior & exterior paint',
    gridSubtitle: 'Wallpaper, waterproofing',
    icon: Paintbrush,
    tasks: [
      'Full Home Painting',
      'Single Wall / Room Touchup',
      'Wall Dampness & Waterproofing',
      'Wallpaper Installation',
      'Texture & Stencil Design',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'ac_repair',
    name: 'AC Repair',
    hindi: 'एसी रिपेयर',
    gridName: 'AC Repair (एसी रिपेयर)',
    subtitle: 'Gas fill, cooling, service, uninstallation & PCB',
    gridSubtitle: 'Gas fill, cooling, service',
    icon: Fan,
    tasks: [
      'Deep Jet Service',
      'Low Cooling / Gas Leak Check',
      'Water Dripping / Leakage',
      'AC Install / Unmount',
      'Compressor / PCB Repair',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'mason',
    name: 'Mason / Tiles',
    hindi: 'राजमिस्त्री',
    gridName: 'Mason / Tiles (राजमिस्त्री)',
    subtitle: 'Tile fit, flooring, plaster & civil repair',
    gridSubtitle: 'Tile fit, flooring, plaster',
    icon: Layers,
    tasks: [
      'Tile Broken Replacement',
      'Bathroom & Kitchen Tiling',
      'Wall Plaster & Crack Fix',
      'Granite Slab Cutting',
      'Small Civil Work',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    hindi: 'सफाई',
    gridName: 'Cleaning (सफाई)',
    subtitle: 'Deep cleaning, tank wash, bathroom & kitchen scrub',
    gridSubtitle: 'Deep cleaning, tank wash',
    icon: Sparkles,
    tasks: [
      'Full Apartment Deep Clean',
      'Bathroom Acid Scrubbing',
      'Kitchen Chimney & Slab Clean',
      'Overhead Water Tank Wash',
      'Sofa & Carpet Wash',
      'Other / अन्य काम',
    ],
  },
  {
    id: 'welder',
    name: 'Welder',
    hindi: 'वेल्डर',
    gridName: 'Welder (वेल्डर)',
    subtitle: 'Grill, gate, metal works, balcony safety & hinges',
    gridSubtitle: 'Grill, gate, metal works',
    icon: Flame,
    tasks: [
      'Main Gate Hinge / Latch Welding',
      'Balcony Safety Grill',
      'Window Net / Frame Fix',
      'Metal Staircase Repair',
      'Custom Steel / Iron Frame',
      'Other / अन्य काम',
    ],
  },
];

const WAVEFORM_HEIGHTS = [
  8, 14, 20, 12, 16, 26, 18, 10, 24, 30, 16, 22, 28, 14, 18, 24, 10, 16, 20, 14, 26, 32, 20, 14, 22, 16, 12, 8
];

export default function AddNewWork() {
  // --- FORM STATES ---
  const [selectedTradeId, setSelectedTradeId] = useState('plumber');
  const [selectedTasks, setSelectedTasks] = useState(['Tap Leakage / पाइप लीकेज']);
  const [otherTask, setOtherTask] = useState('');

  // Problem description states
  const [workTitle, setWorkTitle] = useState('Kitchen Sink Tap Leaking continuously under slab');
  const [description, setDescription] = useState(
    'The hot-water flexible hose pipe beneath the granite counter is spurting water. Have turned off main valve for now. Need quick replacement and washer change today.'
  );
  const [isSpeechListening, setIsSpeechListening] = useState(false);

  // Audio voice note states
  const [hasVoiceNote, setHasVoiceNote] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24);
  const [isReRecording, setIsReRecording] = useState(false);

  // Photos & Video uploads (Empty select image button by default)
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Location & Timing states
  const [locality, setLocality] = useState('Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103');
  const [isGpsLocating, setIsGpsLocating] = useState(false);
  const [urgency, setUrgency] = useState('today');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('afternoon');

  // Budget & Pricing states
  const [pricingType, setPricingType] = useState('quote');
  const [fixedBudget, setFixedBudget] = useState('');

  // Contact Details states
  const [fullName, setFullName] = useState('Vikram Malhotra');
  const [mobileNumber, setMobileNumber] = useState('+91 98450 12891');
  const [contactMode, setContactMode] = useState('direct');

  // Submit / Success Modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulate audio playback ticker
  useEffect(() => {
    let interval = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 60) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Current active trade object
  const currentTrade = TRADES.find((t) => t.id === selectedTradeId) || TRADES[0];

  // --- HANDLERS ---
  const handleTaskToggle = (taskName) => {
    if (selectedTasks.includes(taskName)) {
      if (selectedTasks.length > 1) {
        setSelectedTasks(selectedTasks.filter((t) => t !== taskName));
      }
    } else {
      setSelectedTasks([...selectedTasks, taskName]);
    }
  };

  const handleSelectTrade = (tradeId) => {
    setSelectedTradeId(tradeId);
    const newTrade = TRADES.find((t) => t.id === tradeId);
    if (newTrade && newTrade.tasks.length > 0) {
      setSelectedTasks([newTrade.tasks[0]]);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 5 - uploadedPhotos.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newPhotos = filesToAdd.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    if (e.target) e.target.value = '';
  };

  const handleRemovePhoto = (photoId) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedVideo({
      name: file.name,
      url: URL.createObjectURL(file),
    });
    if (e.target) e.target.value = '';
  };

  const handleRemoveVideo = () => {
    setUploadedVideo(null);
  };

  const handleGpsClick = () => {
    setIsGpsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            setLocality('Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103');
            setIsGpsLocating(false);
          }, 600);
        },
        () => {
          setTimeout(() => {
            setLocality('Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103');
            setIsGpsLocating(false);
          }, 600);
        }
      );
    } else {
      setTimeout(() => setIsGpsLocating(false), 500);
    }
  };

  const toggleAudioPlay = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleReRecord = () => {
    setIsReRecording(true);
    setTimeout(() => {
      setIsReRecording(false);
      setAudioProgress(24);
      setHasVoiceNote(true);
    }, 1200);
  };

  const handleSpeechToText = () => {
    setIsSpeechListening(true);
    setTimeout(() => {
      setIsSpeechListening(false);
      setDescription((prev) =>
        prev
          ? prev + ' Need technician to arrive with essential washer and 1/2 inch connectors.'
          : 'Kitchen sink pipe is leaking heavily under the counter.'
      );
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1240px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ========================================================= */}
            {/* LEFT / MAIN COLUMN (8 COLS) */}
            {/* ========================================================= */}
            <div className="lg:col-span-8 space-y-5 sm:space-y-6">

              {/* --------------------------------------------------------- */}
              {/* TOP HEADER CARD */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs relative overflow-hidden">
                {/* Green badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#BFF0D2] text-[#0E8A4A] text-xs font-semibold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A4A]"></span>
                  <span>Direct to Karigar • 0% Commission</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-[30px] font-extrabold text-slate-900 tracking-tight leading-tight">
                  Post Your Work &amp; Get Direct Calls with karigar
                </h1>

                {/* Hindi Subtitle */}
                <h2 className="text-base sm:text-lg font-bold text-[#D4A373] mt-1.5">
                  अपना काम पोस्ट करें — सीधे कारीगर से बात करें
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-500 mt-2.5 leading-relaxed max-w-2xl">
                  Zero brokerage guarantee. Verified local technicians call or WhatsApp you directly. Agree on rates face-to-face without platform markup or hidden deductions.
                </p>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SECTION 1: CHOOSE TRADE CATEGORY */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs">
                {/* Step header */}
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#382116] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900">
                      Choose Trade Category / ट्रेड चुनें
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('trades-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-medium text-[#C8481A] hover:underline cursor-pointer"
                  >
                    Tap to switch
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3 ml-8.5">
                  Select Trade / कारीगर की श्रेणी चुनें
                </p>

                {/* Selected Trade Featured Card */}
                <div className="border-2 border-[#C8481A] bg-[#FFF8F5] rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#C8481A] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <currentTrade.icon className="w-6 h-6" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {currentTrade.hindi ? `${currentTrade.name} (${currentTrade.hindi})` : currentTrade.name}
                        </span>
                        <span className="bg-[#9A3412] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          SELECTED / चुना गया
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {currentTrade.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('trades-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-[#C8481A] flex items-center gap-1 shrink-0 px-2 py-1 rounded transition cursor-pointer"
                  >
                    <span>Change / बदलें</span>
                    <Pencil className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>

                {/* Select or Change Trade Grid */}
                <div id="trades-grid" className="mt-5 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2.5">
                    SELECT OR CHANGE TRADE / अन्य श्रेणी चुनें:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TRADES.map((trade) => {
                      const isSelected = trade.id === selectedTradeId;
                      const IconComp = trade.icon;
                      return (
                        <div
                          key={trade.id}
                          onClick={() => handleSelectTrade(trade.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-2 border-[#C8481A] bg-[#FFF8F5]'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-[#C8481A] text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                {trade.gridName}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {trade.gridSubtitle}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-5 h-5 rounded-full border-2 border-[#C8481A] flex items-center justify-center shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#C8481A]"></span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specific Plumber Task Chips */}
                <div className="mt-5">
                  <p className="text-xs font-bold text-slate-800 mb-2.5">
                    Specific {currentTrade.name} Task (चुने क्या काम है):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentTrade.tasks.map((task) => {
                      const isChecked = selectedTasks.includes(task);
                      return (
                        <button
                          key={task}
                          type="button"
                          onClick={() => handleTaskToggle(task)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border cursor-pointer ${
                            isChecked
                              ? 'bg-[#7C2D12] text-white border-[#7C2D12] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          <span>{task}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specify Other Task Input */}
                <div className="mt-4">
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                    Specify Other Task / अन्य काम का विवरण लिखें
                  </label>
                  <input
                    type="text"
                    value={otherTask}
                    onChange={(e) => setOtherTask(e.target.value)}
                    placeholder="e.g., Balcony drain pipe choking, kitchen sink mixer install, etc. (विस्तार से लिखें)"
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] transition bg-white"
                  />
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SECTION 2: DESCRIBE THE PROBLEM */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs">
                {/* Step header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#382116] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Describe the Problem / समस्या बताएं
                  </h3>
                </div>

                {/* Work Title */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                    Work Title / शीर्षक में लिखें <span className="text-[#C8481A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={workTitle}
                    onChange={(e) => setWorkTitle(e.target.value)}
                    placeholder="e.g. Kitchen Sink Tap Leaking continuously under slab"
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] transition"
                  />
                </div>

                {/* Detailed Description */}
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Detailed Description / विस्तार से बताएं
                    </label>
                    <button
                      type="button"
                      onClick={handleSpeechToText}
                      className={`text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSpeechListening
                          ? 'text-red-600 animate-pulse'
                          : 'text-[#C8481A] hover:underline'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>
                        {isSpeechListening ? 'Listening / सुन रहे हैं...' : 'बोलकर बताएं (Tap to Speak)'}
                      </span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain the problem in detail so the karigar understands exact requirements..."
                    className="w-full border border-slate-200 rounded-lg p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] resize-none leading-relaxed transition"
                  />
                </div>

                {/* Voice Note Recorder Box */}
                <div className="border border-slate-200 bg-[#FCFBF9] rounded-xl p-3.5 sm:p-4 mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-[#C8481A]" />
                      <span className="font-bold text-xs sm:text-sm text-slate-800">
                        Record Voice Note / बोलकर रिकॉर्ड करें
                      </span>
                      <span className="bg-[#059669] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        RECOMMENDED
                      </span>
                    </div>

                    {hasVoiceNote && (
                      <span className="bg-[#E8F8F0] text-[#0E8A4A] border border-[#BFF0D2] text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Voice Note Attached (0:{audioProgress < 10 ? `0${audioProgress}` : audioProgress})</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1 mb-3">
                    Workers understand voice notes 2x faster in Hindi, Kannada or English.
                  </p>

                  {/* Audio Player Card */}
                  {hasVoiceNote ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-2xs">
                      {/* Play Button */}
                      <button
                        type="button"
                        onClick={toggleAudioPlay}
                        className="w-9 h-9 rounded-full bg-[#9A3412] hover:bg-[#7C2D12] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition"
                        title={isPlayingAudio ? 'Pause' : 'Play'}
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        )}
                      </button>

                      {/* File Details & Waveform */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>Audio_Note_Problem.m4a</span>
                          <span className="text-slate-500 font-normal">
                            0:{audioProgress < 10 ? `0${audioProgress}` : audioProgress} / 1:00
                          </span>
                        </div>

                        {/* Waveform Visualization */}
                        <div className="flex items-center gap-[3px] h-6 overflow-hidden">
                          {WAVEFORM_HEIGHTS.map((h, idx) => {
                            const isPast = idx < Math.floor((audioProgress / 60) * WAVEFORM_HEIGHTS.length);
                            return (
                              <div
                                key={idx}
                                style={{ height: `${h}px` }}
                                className={`w-1 rounded-full transition-all duration-300 ${
                                  isPast
                                    ? 'bg-[#C8481A]'
                                    : 'bg-slate-200 hover:bg-[#C8481A]/40'
                                } ${isPlayingAudio ? 'animate-pulse' : ''}`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleReRecord}
                          disabled={isReRecording}
                          className="text-xs font-medium text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 hover:bg-slate-50 flex items-center gap-1 transition cursor-pointer"
                        >
                          <RotateCcw className={`w-3.5 h-3.5 ${isReRecording ? 'animate-spin' : ''}`} />
                          <span>{isReRecording ? 'Recording...' : 'Re-record'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasVoiceNote(false)}
                          className="text-slate-400 hover:text-red-500 p-1.5 transition rounded cursor-pointer"
                          title="Delete voice note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-dashed border-slate-300 rounded-xl p-3 text-center">
                      <button
                        type="button"
                        onClick={handleReRecord}
                        className="text-xs font-bold text-[#C8481A] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Click to record audio voice note</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5">
                    <span className="flex items-center gap-1">
                      <Mic className="w-3 h-3 text-slate-400" />
                      <span>Tap &amp; hold or click to speak in any language (हिंदी, ಕನ್ನಡ, etc.)</span>
                    </span>
                    <span className="text-slate-400 font-medium">Max limit: 60 sec</span>
                  </div>
                </div>

                {/* Upload Photos & Videos Section */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Upload Photos / Videos of Work (काम की फोटो)
                    </label>
                    <span className="text-xs font-medium text-[#059669] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Clear photos get 3x faster quotes</span>
                    </span>
                  </div>

                  {/* Upload Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Render Uploaded Photos */}
                    {uploadedPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative rounded-xl overflow-hidden aspect-square border border-slate-200 bg-slate-900 group shadow-2xs"
                      >
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition shadow cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {/* Filename overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 pt-4">
                          <p className="text-[10px] text-white font-mono truncate text-center">
                            {photo.name}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Render Uploaded Video */}
                    {uploadedVideo && (
                      <div className="relative rounded-xl overflow-hidden aspect-square border border-slate-200 bg-slate-900 group shadow-2xs">
                        <video
                          src={uploadedVideo.url}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveVideo}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition shadow cursor-pointer"
                          title="Remove video"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 pt-4">
                          <p className="text-[10px] text-white font-mono truncate text-center">
                            {uploadedVideo.name}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* EMPTY SELECT IMAGE BUTTON */}
                    {uploadedPhotos.length < 5 && (
                      <div
                        onClick={() => photoInputRef.current?.click()}
                        className="border-2 border-dashed border-[#FCA5A5]/80 bg-[#FFF5F5] hover:bg-[#FFEBEB] rounded-xl flex flex-col items-center justify-center p-3 aspect-square text-center cursor-pointer transition group shadow-2xs"
                      >
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-lg bg-[#FFECEC] text-[#C8481A] flex items-center justify-center mb-1 group-hover:scale-110 transition">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 mt-1">
                          + Add Photo
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          Up to 5 Photos
                        </span>
                      </div>
                    )}

                    {/* EMPTY SELECT VIDEO BUTTON */}
                    {!uploadedVideo && (
                      <div
                        onClick={() => videoInputRef.current?.click()}
                        className="border-2 border-dashed border-sky-200 bg-[#F4F9FF] hover:bg-sky-50 rounded-xl flex flex-col items-center justify-center p-3 aspect-square text-center cursor-pointer transition group shadow-2xs"
                      >
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-lg bg-[#EBF3FF] text-sky-600 flex items-center justify-center mb-1 group-hover:scale-110 transition">
                          <Video className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 mt-1">
                          Short Video
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 leading-tight px-1">
                          Helps Karigar bring right part
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SECTION 3: JOB LOCATION & TIMING */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs">
                {/* Step header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#382116] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Job Location &amp; Timing / स्थान और समय
                  </h3>
                </div>

                {/* Locality Input */}
                <div className="mb-4 ">
                  <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                    Locality, Building &amp; Landmark / पता
                  </label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Enter locality, flat/house no., landmark"
                      className="w-full border border-slate-200 rounded-lg px-10 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] transition bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleGpsClick}
                      disabled={isGpsLocating}
                      className="absolute right-2 px-2.5 py-1.5 rounded-md bg-[#EEF2F6] hover:bg-slate-200 text-[#1E3A8A] text-xs font-semibold flex items-center gap-1 border border-slate-200 transition cursor-pointer"
                    >
                      <Crosshair className={`w-3.5 h-3.5 ${isGpsLocating ? 'animate-spin' : ''}`} />
                      <span>{isGpsLocating ? 'Locating...' : 'Use GPS'}</span>
                    </button>
                  </div>
                </div>

                {/* When do you need the worker? */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">
                    When do you need the worker? / कारीगर कब चाहिए
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Urgent */}
                    <div
                      onClick={() => setUrgency('urgent')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                        urgency === 'urgent'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="bg-[#DC2626] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide inline-block mb-1.5">
                          URGENT
                        </span>
                        <p className="font-bold text-xs sm:text-sm text-slate-800">
                          Next 30 Mins
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        आपातकालीन
                      </p>
                    </div>

                    {/* Today (Selected) */}
                    <div
                      onClick={() => setUrgency('today')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                        urgency === 'today'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="bg-[#9A3412] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                            RECOMMENDED
                          </span>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#C8481A] flex items-center justify-center shrink-0">
                            <span className="w-2 h-2 rounded-full bg-[#C8481A]"></span>
                          </span>
                        </div>
                        <p className="font-bold text-xs sm:text-sm text-[#9A3412]">
                          Today / आज ही
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Same-day fix
                      </p>
                    </div>

                    {/* Tomorrow */}
                    <div
                      onClick={() => setUrgency('tomorrow')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                        urgency === 'tomorrow'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="pt-4 sm:pt-4.5">
                        <p className="font-bold text-xs sm:text-sm text-slate-800">
                          Tomorrow / कल
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Planned visit
                      </p>
                    </div>

                    {/* Choose Date */}
                    <div
                      onClick={() => {
                        setUrgency('custom');
                        const dateInput = document.getElementById('custom-date-picker');
                        if (dateInput) dateInput.focus();
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                        urgency === 'custom'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <Calendar className="w-4 h-4 text-slate-400 mb-1" />
                        <p className="font-bold text-xs sm:text-sm text-slate-800">
                          {customDate || 'Choose Date'}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        तारीख चुनें
                      </p>
                    </div>
                  </div>

                  {/* Hidden / popup date input if custom date selected */}
                  {urgency === 'custom' && (
                    <div className="mt-2.5">
                      <input
                        id="custom-date-picker"
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#C8481A]"
                      />
                    </div>
                  )}
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">
                    Preferred Time Slot / सुविधाजनक समय:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Morning */}
                    <button
                      type="button"
                      onClick={() => setTimeSlot('morning')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                        timeSlot === 'morning'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5] text-[#9A3412]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                      <span>Morning (8 AM - 12 PM)</span>
                    </button>

                    {/* Afternoon (Selected) */}
                    <button
                      type="button"
                      onClick={() => setTimeSlot('afternoon')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                        timeSlot === 'afternoon'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5] text-[#9A3412]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                      <span>Afternoon (12 PM - 4 PM)</span>
                    </button>

                    {/* Evening */}
                    <button
                      type="button"
                      onClick={() => setTimeSlot('evening')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                        timeSlot === 'evening'
                          ? 'border-2 border-[#C8481A] bg-[#FFF8F5] text-[#9A3412]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                      <span>Evening (4 PM - 8 PM)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SECTION 4: BUDGET & PRICING PREFERENCE */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs">
                {/* Step header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#382116] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Budget &amp; Pricing Preference / भुगतान की पसंद
                  </h3>
                </div>

                {/* 2 Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3.5">
                  {/* Option 1: Standard Visit & Quote */}
                  <div
                    onClick={() => setPricingType('quote')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                      pricingType === 'quote'
                        ? 'border-2 border-[#C8481A] bg-[#FFF9F6]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          Standard Visit &amp; Quote
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            pricingType === 'quote'
                              ? 'border-[#C8481A]'
                              : 'border-slate-300'
                          }`}
                        >
                          {pricingType === 'quote' && (
                            <span className="w-2 h-2 rounded-full bg-[#C8481A]"></span>
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Karigar inspects physical damage and quotes directly.
                      </p>
                      <div className="mt-2.5 inline-block bg-[#EEF2F6] text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded">
                        Typical visit inspection fee: ₹100 - ₹200
                      </div>
                    </div>

                    <div className="text-xs text-[#059669] font-medium mt-3.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Recommended for pipe leakages</span>
                    </div>
                  </div>

                  {/* Option 2: Fixed Budget */}
                  <div
                    onClick={() => setPricingType('fixed')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                      pricingType === 'fixed'
                        ? 'border-2 border-[#C8481A] bg-[#FFF9F6]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          I have a Fixed Budget
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            pricingType === 'fixed'
                              ? 'border-[#C8481A]'
                              : 'border-slate-300'
                          }`}
                        >
                          {pricingType === 'fixed' && (
                            <span className="w-2 h-2 rounded-full bg-[#C8481A]"></span>
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Specify total labor cost you are willing to pay.
                      </p>

                      <div className="mt-2.5 flex items-center border border-slate-200 rounded-lg px-3 py-1.5 bg-white max-w-[180px] focus-within:border-[#C8481A]">
                        <span className="text-xs font-bold text-slate-500 mr-2">₹</span>
                        <input
                          type="number"
                          placeholder="e.g. 350"
                          value={fixedBudget}
                          onChange={(e) => {
                            setFixedBudget(e.target.value);
                            setPricingType('fixed');
                          }}
                          className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-3.5">
                      Subject to worker agreement on site.
                    </p>
                  </div>
                </div>

                {/* 100% Payment Guarantee Banner */}
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3 sm:p-3.5 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#166534] leading-relaxed">
                    <b>100% of the payment goes directly to your Karigar</b> via Cash or personal UPI upon job completion. WorkSe charges zero platform fees or commission cuts.
                  </p>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SECTION 5: YOUR CONTACT DETAILS */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#F0E6DE] shadow-xs">
                {/* Step header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#382116] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    5
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Your Contact Details / संपर्क विवरण
                  </h3>
                </div>

                {/* 2 Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                      Full Name / आपका नाम <span className="text-[#C8481A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] transition bg-white"
                    />
                  </div>

                  {/* WhatsApp & Mobile Number */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                      WhatsApp &amp; Mobile Number <span className="text-[#C8481A]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="+91 98450 12891"
                        className="w-full border border-slate-200 rounded-lg pl-3.5 pr-28 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C8481A] focus:ring-1 focus:ring-[#C8481A] transition bg-white"
                      />
                      <span className="absolute right-2.5 bg-[#E8F8F0] text-[#0E8A4A] border border-[#BFF0D2] text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>OTP Verified</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Preference Radios */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-2 block">
                    How would you like Karigars to contact you?
                  </label>

                  <div className="space-y-2">
                    {/* Direct Phone & WhatsApp */}
                    <div
                      onClick={() => setContactMode('direct')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 ${
                        contactMode === 'direct'
                          ? 'border border-[#C8481A]/50 bg-[#FFF9F6]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          contactMode === 'direct'
                            ? 'border-[#C8481A]'
                            : 'border-slate-300'
                        }`}
                      >
                        {contactMode === 'direct' && (
                          <span className="w-2 h-2 rounded-full bg-[#C8481A]"></span>
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900">
                          Allow Direct Phone Calls &amp; WhatsApp (Fastest response)
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Nearby verified karigars will call immediately with their availability.
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp Only */}
                    <div
                      onClick={() => setContactMode('whatsapp_only')}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 ${
                        contactMode === 'whatsapp_only'
                          ? 'border border-[#C8481A]/50 bg-[#FFF9F6]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          contactMode === 'whatsapp_only'
                            ? 'border-[#C8481A]'
                            : 'border-slate-300'
                        }`}
                      >
                        {contactMode === 'whatsapp_only' && (
                          <span className="w-2 h-2 rounded-full bg-[#C8481A]"></span>
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-700">
                          WhatsApp Messages Only (केवल व्हाट्सएप)
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Workers will message their visiting fee and portfolio before calling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* PRIMARY SUBMIT CTA BUTTON */}
              {/* --------------------------------------------------------- */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#9A3412] hover:bg-[#7C2D12] active:bg-[#6C250E] text-white font-bold py-3.5 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-base shadow-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Posting Your Work...</span>
                  </>
                ) : (
                  <>
                    <span className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white inline-block"></span>
                    <span>Post Your Work</span>
                  </>
                )}
              </button>

            </div>

            {/* ========================================================= */}
            {/* RIGHT / SIDEBAR COLUMN (4 COLS) */}
            {/* ========================================================= */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">

              {/* --------------------------------------------------------- */}
              {/* SIDEBAR CARD 1: THE WorkSe GUARANTEE */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-5 border border-[#F0E6DE] shadow-xs">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-[#C8481A]" />
                  <h4 className="font-bold text-sm sm:text-[15px] text-slate-900">
                    The WorkSe Guarantee
                  </h4>
                </div>

                {/* 3 Guarantee items */}
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0E8A4A] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Aadhaar &amp; Police Verified</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 pl-6 leading-relaxed">
                      Every Karigar's identity and locality are verified via government databases.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0E8A4A] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Zero Hidden Deductions</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 pl-6 leading-relaxed">
                      No 35% agency cuts. 100% value transfers directly between you and the technician.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-800">
                      <span className="w-4 h-4 rounded-full bg-[#E8F8F0] text-[#0E8A4A] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Dispute &amp; Helpline Support</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 pl-6 leading-relaxed">
                      Dedicated toll-free desk for community resolution and assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SIDEBAR CARD 2: HOMEOWNER INSIGHT */}
              {/* --------------------------------------------------------- */}
              <div className="bg-[#FAF7F9] rounded-2xl p-5 border border-purple-100 shadow-xs relative">
                {/* Header */}
                <div className="flex items-center gap-1.5 text-[#C8481A] mb-2.5">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Homeowner Insight
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "Adding 2 clear photos of the leaking pipe got me 3 instant calls within 10 minutes. Got it fixed for just ₹250 directly! No commission hassle."
                </p>

                {/* Author */}
                <div className="flex items-center gap-2 mt-3.5 pt-2.5 border-t border-purple-100/60">
                  <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-[10px] font-bold">
                    P
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    Priya R. • Bellandur, Bengaluru
                  </span>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* SIDEBAR CARD 3: NEED HELP POSTING? */}
              {/* --------------------------------------------------------- */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E6DE] shadow-xs flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                    Need help posting?
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Our local support team assists in Hindi &amp; Kannada.
                  </p>
                </div>

                <a
                  href="https://wa.me/919845012891?text=Hello%20KaamSathi,%20I%20need%20help%20posting%20work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* SUCCESS CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#0E8A4A] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Work Posted Successfully!
            </h3>
            <p className="text-sm font-semibold text-[#C8481A] mt-1">
              कारीगरों को आपका काम भेज दिया गया है
            </p>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Verified local <span className="font-bold text-slate-700">{currentTrade.name}s</span> in <span className="font-bold text-slate-700">{locality.split(',')[1] || 'your area'}</span> have received your work request. Expect direct calls or WhatsApp messages within 15 minutes.
            </p>

            <div className="bg-[#FAF8F5] rounded-xl p-3.5 border border-[#F0E6DE] text-left text-xs space-y-1.5 mt-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Trade:</span>
                <span className="font-bold text-slate-800">{currentTrade.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Timing:</span>
                <span className="font-bold text-slate-800 capitalize">{urgency} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="font-bold text-slate-800">{fullName} ({mobileNumber})</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="flex-1 bg-[#9A3412] hover:bg-[#7C2D12] text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                Done / ठीक है
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
