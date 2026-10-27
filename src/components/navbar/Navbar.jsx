import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Globe,
  // Menu,
  // X,
  // MapPin,
  // ChevronDown
  BadgeCheck,
  ChevronDown,
  Handshake,
  Headset,
  Languages,
  MapPin,
  Menu,
  Plus,
  Search,
  X,
  LogOut,
  UserIcon
} from 'lucide-react';
import logo from '../../../public/logo2.png'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { updateUserLocation } from '../../services/loactionService';

const Navbar = ({ onLocationUpdate }) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  // Bahar (outside) click karne par dropdown close ho jaye
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    dispatch(logout());
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayAddress, setDisplayAddress] = useState(
    JSON.parse(localStorage.getItem('user_location'))?.address || ''
  );

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let formattedAddress = "Unknown Location"
        // const locationData = { latitude, longitude, timestamp: Date.now() };

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json();

          if (data && data.display_name) {
            formattedAddress = data.display_name
          }

        } catch (error) {
          console.warn("Could not fetch readable address name:", geoError);
        }

        const locationData = {
          latitude,
          longitude,
          address: formattedAddress,
          timestamp: Date.now()
        }

        // 1. Save to Local Storage
        localStorage.setItem('user_location', JSON.stringify(locationData));
        setDisplayAddress(formattedAddress)

        try {
          if (isAuthenticated) {
            await updateUserLocation(latitude, longitude, formattedAddress);
          }
          if (onLocationUpdate) onLocationUpdate(locationData);
          alert(isAuthenticated ? 'Location saved successfully!' : 'Location saved on this device.');
        } catch {
          setError('Saved locally, but failed to sync with server.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#202B4C] shadow-sm">
        {/* Top micro bar */}
        {/* <div className="bg-[#1C2541] py-1.5 text-xs text-slate-300 flex justify-between items-center gap-4 border-b border-slate-800/60">
          <div className="w-full overflow-hidden">
            <div className="announcement-marquee flex items-center space-x-2 whitespace-nowrap">
              <span className="inline-block w-2 h-2 rounded-full bg-[#20BF55] animate-pulse"></span>
              <span>India's 1st Direct Karigar & Worker Marketplace - <b>Zero Commission Forever!</b></span>
            </div>
          </div>
        </div> */}

        <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="">
            <a href="/" className="flex h-16 w-48 items-center justify-start" aria-label="bulaoMistri home">
              <img className='w-full h-full object-cover' src={logo} alt="" />
            </a>
          </div>

            {/* location */}
          <div className="hidden items-center gap-3 lg:flex">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
              onClick={handleGetLocation}
              disabled={loading}
              className="hidden min-w-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-left transition hover:bg-[#2d3b63] xl:flex hover:text-white"
            >
              <div className="flex items-center gap-1">
                {loading ? "Finding Location..." : <MapPin className="h-7 w-5 shrink-0 text-[#D99416]" />}
                 {displayAddress && (
                  <p className='truncate max-w-[250px]'>
                    {displayAddress}
                  </p>
                )}
              </div>

              <span className="min-w-0">
                {/* <span className="block text-xs font-medium text-slate-500">Location</span> */}
                <span className="flex items-center gap-1 whitespace-nowrap text-sm font-bold text-slate-800">
                  {/* Bengaluru - HSR Layout <ChevronDown className="h-4 w-4 text-slate-500" /> */}
                </span>
              </span>
            </button>

            {/* login & register button with conditional rendreing */}

            <div className="flex items-center gap-4">

              {/* Condition 1 & 2: Karigar button tabhi dikhega jab user logged in na ho YA role 'user' ho */}
              {(!isAuthenticated || user?.role === 'user') && (
                <Link to="/register-worker">
                  <button className="flex min-h-12 items-center gap-2 rounded-xl border-2 border-[#202B4C] px-4 text-sm font-bold transition hover:bg-slate-50">
                    <span className="text-[#D99416]"><Handshake className="h-5 w-5" /></span>
                    Register as Karigar
                  </button>
                </Link>
              )}

              {/* Condition 3 & 4: Agar user ya worker logged-in hai toh Name/Dropdown dikhega */}
              {isAuthenticated && user ? (
                <div className="relative inline-block text-left" ref={dropdownRef}>

                  {/* Trigger Button */}
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex min-h-12 items-center gap-2 rounded-full border-2 border-[#202B4C] px-4 text-sm font-bold transition hover:bg-slate-50 cursor-pointer select-none"
                  >
                    <span className="text-[1rem] font-semibold capitalize text-slate-700 flex items-center gap-1.5">
                      <UserIcon className="w-4 h-4 text-[#202B4C]" />
                      <ChevronDown className={`w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </div>

                  {/* Dropdown Menu Box */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">

                      <div className="px-4 py-2 border-b border-slate-100 mb-1 flex justify-between items-center">
                        <p className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                          <UserIcon className='w-4' />
                          <span className="text-[14px] font-bold text-slate-800 truncate capitalize ml-0.5">
                            {user?.username || 'User'}
                          </span>
                        </p>
                        {/* Optional: Role dikhane ke liye */}
                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mt-0.5 border px-1.5 rounded-lg border-slate-300">
                          {user?.role || 'user'}
                        </p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left hover:rounded-xl"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout (लॉग आउट)</span>
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                // Jab koi bhi logged in nahi hai, tab Login button dikhega
                <Link to="/login">
                  <button className="flex min-h-12 items-center gap-2 rounded-xl bg-[#202B4C] px-5 text-sm font-bold text-white shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(11,19,43,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(11,19,43,0.6)]">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#202B4C] transition hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden border-y border-slate-200 bg-slate-50 lg:block">
          <div className="mx-auto flex min-h-[52px] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
            <nav className="flex h-full min-w-0 items-center gap-7 text-sm font-semibold pl-8">
              <Link to="/how-it-work">
                <div className="flex h-[52px] items-center gap-2 text-slate-600 transition hover:text-[#202B4C]">
                  How it Work
                </div>
              </Link>
              <Link to="/our-vision">
                <div className="whitespace-nowrap text-slate-600 transition hover:text-[#202B4C]">Our Vision</div>
              </Link>
              <Link to={`${ROUTES.HOME}#realStories`} className="flex whitespace-nowrap items-center gap-2 text-slate-600 transition hover:text-[#202B4C]">Real Stories</Link>
              <Link to="/add-work" className="whitespace-nowrap text-slate-600 transition hover:text-[#202B4C] border-b border-transparent hover:border-[#D99416]">Add New Work</Link>
            </nav>
            <div className="flex shrink-0 items-center gap-5 text-xs font-medium text-slate-600">
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold transition hover:border-[#D99416]">
                <Languages className="h-4 w-4 text-[#D99416]" /> EN <span className="text-slate-300">|</span> हिंदी
              </button>
              <span className="h-7 w-px bg-slate-200" />
              <p className="flex items-center gap-2 whitespace-nowrap transition hover:text-[#202B4C]">
                <Headset className="h-5 w-5 text-[#D99416]" />
                Helpline: <span className="text-xs text-slate-800">1800-BULAO-MISTRI</span>
              </p>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-2 shadow-lg lg:hidden">
            <button className="mb-2 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left">
              <MapPin className="h-5 w-5 text-[#D99416]" />
              <span className="flex-1">
                <span className="block text-xs text-slate-500">Location</span>
                <span className="font-semibold text-[#202B4C]">Bengaluru - HSR Layout</span>
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
            <nav className="divide-y divide-slate-100">
              <a href="#workers" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 font-semibold text-[#202B4C]">
                <Search className="h-5 w-5 text-[#D99416]" /> Find Workers
              </a>
              <a href="#deals" onClick={() => setMobileMenuOpen(false)} className="block py-3 font-medium text-slate-600">Direct Deals</a>
              <a href="#verified-karigars" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 font-medium text-slate-600">
                <BadgeCheck className="h-5 w-5 text-[#D99416]" /> Verified Karigars
              </a>
              <a href="#trades" onClick={() => setMobileMenuOpen(false)} className="block py-3 font-medium text-slate-600">Popular Trades</a>
              <Link
                to={`${ROUTES.HOME}#realStories`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 font-medium text-slate-600"
              >
                Real Stories
              </Link>
              <a href="" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 font-medium text-slate-600">
                <Headset className="h-5 w-5 text-[#D99416]" /> Helpline: 1800-BULAO-MISTRI
              </a>
            </nav>
            <div className="flex gap-3 pt-4">
              <button className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#202B4C] px-3 text-sm font-bold">
                <Handshake className="h-4 w-4 text-[#D99416]" /> Register
              </button>
              <Link
                to="/add-work"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#202B4C] px-3 text-sm font-bold text-white hover:bg-[#2d3b63] transition"
              >
                <Plus className="h-4 w-4 text-[#D99416]" /> Post a Work
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar

