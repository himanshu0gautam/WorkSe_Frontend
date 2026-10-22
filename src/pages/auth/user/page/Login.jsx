import React, { useState, useEffect, useRef } from 'react';
import {
    X,
    User,
    Clock,
    ScanFace,
    ArrowRight,
    Wrench
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../api/loginService';

export default function Login() {

    const navigate = useNavigate()

    // form state
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    // timer and ui
    const [phoneError, setPhoneError] = useState("")
    const [activeIdx, setActiveIdx] = useState(null)
    const [timer, setTimer] = useState(0);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [apiError, setApiError] = useState("");

    const inputRefs = useRef([])
    const timerIntervalRef = useRef(null)

    //phone validation
    const handlePhoneChange = (e) => {
        const rawValue = e.target.value;

        // 1. Check karein ki user ne letters ya non-number type kiya hai kya
        if (/[^0-9]/.test(rawValue)) {
            setPhoneError("Only numbers are allowed (no letters/symbols)");
        } else {
            setPhoneError("something went wrong");
        }

        // 2. Sirf numbers ko extract karke state mein save karein (Max 10 digits)
        const numericValue = rawValue.replace(/\D/g, "").slice(0, 10);
        setPhone(numericValue);
    };

    //otp validation
    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ""); // Sirf number
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Agar digit enter ho gayi hai, toh automatically next input par focus karein
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // OnBlur par empty check karne ke liye:
    const handlePhoneBlur = () => {
        if (!phone) {
            setPhoneError("Phone number cannot be empty");
        }
    };

    // api
    const loginSubmit = async (e) => {
        e.preventDefault()
        setApiError("")

        if (!username.trim()) {
            setApiError("Please enter your name")
            return
        }
        if (!phone || phone.length !== 10) {
            setPhoneError("Please enter a valid 10-digit mobile number")
            return
        }
        try {
            setIsSendingOtp(true)

            const payload = {
                username: username.trim(),
                phone: phone
            }

            const data = await loginService.SendOtp(payload)
             if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
            let remainingTime = 45
            setTimer(remainingTime)
            timerIntervalRef.current = setInterval(() => {
                remainingTime -= 1
                setTimer(remainingTime)
                if (remainingTime === 0) {
                    clearInterval(timerIntervalRef.current)
                    timerIntervalRef.current = null
                }
            }, 1000)
            console.log("otp send", data);

        } catch (error) {
            console.error("Error sending OTP:", error);
            setApiError(
                err.response?.data?.message || "Failed to send OTP. Please try again."
            );
        } finally {
            setIsSendingOtp(false)
        }
    }

    const verfiyAndLogin = async () => {
        setApiError("")

        const fullOtp = otp.join("")

        if (fullOtp.length !== 4) {
            setApiError("Please enter complete 4-digit OTP..")
            return
        }

        try {
            setIsVerifying(true)

            const payload = {
                phone: phone,
                otp: fullOtp,
                username: username
            }

            const res = await loginService.verifyOtp(payload)

            navigate("/")

            console.log("login success data", res);

        } catch (error) {
            setApiError(
                error.response?.data?.message || "Invalid OTP. Please try again."
            );
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 font-sans antialiased">
            {/* Modal Container */}
            <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-[#e2e8f0] p-6 md:p-8">

                {/* Close Button */}
                <Link to="/">
                    <button
                        onClick={() => { }}
                        className="absolute top-9 right-6 w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2e8f0] text-slate-500 hover:bg-slate-50 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </Link>

                {/* Header Section */}
                <div className="flex items-center ">
                    {/* <div className="w-12 h-12 bg-[#1e293b] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"> */}
                    <div className="w-12 h-12 flex items-center">
                        <ScanFace className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-[22px] font-bold text-[#1e293b] tracking-tight leading-tight">
                            Login / Sign In
                            {/* <span className="text-slate-600 font-medium text-lg">(लॉगइन करें)</span> */}
                        </h1>
                    </div>
                </div>
                {apiError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                        {apiError}
                    </div>
                )}
                {/* Divider */}
                <div className="w-full h-[1px] bg-[#f1f5f9] my-4"></div>

                {/* Form Container */}
                <div className="space-y-5">

                    {/* Full Name / Username Field */}
                    <div>
                        <label className="block text-xs font-semibold text-[#1e293b] uppercase tracking-wider mb-2">
                            Full Name / Username <span className="font-normal text-slate-600 normal-case">(नाम / यूज़रनेम)</span>
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-slate-400">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g. Rahul Sharma"
                                className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm text-[#1e293b] placeholder-slate-400 focus:outline-none focus:border-[#d97706] focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Mobile Phone Number Field */}
                    <div>
                        <label className="block text-xs font-semibold text-[#1e293b] uppercase tracking-wider mb-2">
                            Mobile Phone Number <span className="font-normal text-slate-600 normal-case">(मोबाइल नंबर)</span>
                        </label>
                        {phoneError && (<p className="text-red-500 pb-2 pl-20 text-xs mt-1 font-medium">{phoneError}</p>)}
                        <div className="flex gap-2">
                            {/* Country Code Box */}
                            <div className="flex items-center justify-center px-3.5 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs font-semibold text-[#1e293b] shrink-0">
                                IN +91
                            </div>
                            {/* Number Input & Get OTP Button */}
                            <div className="relative flex-1 flex items-center bg-[#f8fafc] border border-[#e2e8f0] rounded-xl overflow-hidden focus-within:border-[#d97706] focus-within:bg-white transition-all">
                                <input
                                    type="text"
                                    value={phone}
                                    inputMode='numeric'
                                    maxLength={10}
                                    placeholder="e.g. 9891000000"
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                    className="w-full px-4 py-3 bg-transparent text-sm text-[#1e293b] font-medium focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={loginSubmit}
                                    disabled={isSendingOtp || timer > 0}
                                    className="mr-1.5 px-6 py-1.5 border border-[#fbbf24] bg-[#fffbeb] text-[#d97706] hover:bg-[#fef3c7] font-semibold text-xs rounded-lg transition-colors flex flex-col items-center justify-center leading-tight shrink-0"
                                >
                                    <span>{isSendingOtp ? "..." : "Get"}</span>
                                    {/* <span>Get</span> */}
                                    <span className="text-[10px] font-medium">OTP</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Enter 4-Digit OTP Field */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold text-[#1e293b] uppercase tracking-wider">
                                Enter 4-Digit OTP <span className="font-normal text-slate-600 normal-case">(ओटीपी दर्ज करें)</span>
                            </label>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {/* <span>Resend in 0:{timer < 10 ? `0${timer}` : timer}s</span> */}
                                <span>
                                    {timer > 0
                                        ? `Resend in 0:${timer < 10 ? `0${timer}` : timer}s`
                                        : "Ready to Send"}
                                </span>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-3">
                            OTP sent via SMS to your 10-digit mobile number
                        </p>

                        {/* OTP Input Boxes */}
                        <div className="flex gap-3">
                            {otp.map((digit, idx) => (
                                <div key={idx} className="relative flex-1 h-12">
                                    <input
                                        ref={(el) => (inputRefs.current[idx] = el)}
                                        type='text'
                                        inputMode='numeric'
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, idx)}
                                        onKeyDown={(e) => handleKeyDown(e, idx)}
                                        onFocus={() => setActiveIdx(idx)}
                                        onBlur={() => setActiveIdx(null)}
                                        className={`w-full h-full rounded-xl text-center text-base font-bold bg-[#f8fafc] border outline-none transition-all ${activeIdx === idx || digit
                                            ? 'border-[#d97706] bg-white ring-2 ring-[#d97706]/10 text-[#1e293b]'
                                            : 'border-[#e2e8f0] text-slate-700'
                                            }`}
                                    />
                                    {!digit && (
                                        <span className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Main Action Button */}
                <button
                type='button'
                    onClick={verfiyAndLogin}
                    disabled={isVerifying}
                    className="w-full mt-6 py-3.5 px-6 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-xl font-medium text-sm flex items-center justify-between shadow-md transition-all group"
                >
                    <span></span>
                    <span className="flex items-center gap-2">
                        {isVerifying ? "verifying..." : "verify & Login"}{""}
                        <span className="font-normal text-slate-300 text-xs">(सत्यापित करें और आगे बढ़ें)</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#1e293b] group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                </button>

                {/* Footer Link Text */}
                <div className="mt-5 text-center text-xs text-slate-500">
                    Looking to register as a Karigar{' '}
                    <a
                        href="#register"
                        onClick={(e) => e.preventDefault()}
                        className="font-semibold text-[#d97706] hover:underline"
                    >
                        [Register as Worker / कारीगर पंजीकरण]
                    </a>
                </div>

            </div>
        </div>
    );
}