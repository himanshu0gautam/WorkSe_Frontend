import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdCard, Wrench, MapPinPlus } from 'lucide-react'
import { workerService } from '../api/workerService';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../../../../redux/authSlice';
import { MapPin } from 'lucide-react'

export default function RegisterWorker({ onLocationUpdate }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Multi-step navigation state
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1: Personal Details State
    const [fullname, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [sameWhatsapp, setSameWhatsapp] = useState(true);
    const [experience, setExperience] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");

    // Step 2: Trade & Work Profile State
    const [tradeCategory, setTradeCategory] = useState("Plumber");
    const [headlineTitle, setHeadlineTitle] = useState("Master Plumber & Sanitary Specialist (10+ Yrs Exp)");
    const [workDescription, setWorkDescription] = useState("Specialized in multi-storey residential concealed piping, CPVC/UPVC fitting, geyser installation, pressure booster pump setup, and urgent water leak diagnostics.");

    // Step 3: Location State
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [serviceRadius, setServiceRadius] = useState("");

    // Step 4: Skills & Media State
    const [skills, setSkills] = useState([
        "Tap Repair & Replacement",
        "Concealed Wall Piping",
        "Geyser & Heater Fitting",
        "Submersible Pump Service"
    ]);
    const [newSkillInput, setNewSkillInput] = useState("");
    const [karigarBio, setKarigarBio] = useState("10 years of reliable local service. Polite behavior, own professional tooling set, and genuine spare part guidance guaranteed.");
    const [image, setImage] = useState(null);

    // Error state for validation feedback
    const [errors, setErrors] = useState({});

    // Validation Logic per Step
    const validateStep = (step) => {
        let newErrors = {};
        if (step === 1) {
            if (!fullname.trim()) newErrors.fullName = "Full Name is required";
            if (!phoneNumber || phoneNumber.length !== 10) newErrors.phoneNumber = "Valid 10-digit phone number is required";
            if (!experience) newErrors.experience = "Experience is required";
        } else if (step === 2) {
            if (!tradeCategory) newErrors.tradeCategory = "Trade category is required";
            if (!headlineTitle.trim()) newErrors.headlineTitle = "Job title/headline is required";
        } else if (step === 3) {
            if (!address.trim()) newErrors.address = "Address is required";
            if (!state) newErrors.state = "State is required";
            if (!city) newErrors.city = "City is required";
            if (!pincode || pincode.length !== 6) newErrors.pincode = "Valid 6-digit pincode is required";
            if (!workerLocation) newErrors.location = "Detect your current location to continue";
        } else if (step === 4 && !image) {
            newErrors.image = "Profile photo is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 4) setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const goToStep = (stepNumber) => {
        if (stepNumber < currentStep || validateStep(currentStep)) {
            setCurrentStep(stepNumber);
        }
    };

    // Add/Remove Skill Tags
    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && newSkillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(newSkillInput.trim())) {
                setSkills([...skills, newSkillInput.trim()]);
            }
            setNewSkillInput("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [displayAddress, setDisplayAddress] = useState('');
    const [workerLocation, setWorkerLocation] = useState(null);

    // find current location
    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const { latitude, longitude } = coords;
                let formattedAddress = `Location detected (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    if (!response.ok) {
                        throw new Error(`Reverse geocoding failed with status ${response.status}`);
                    }

                    const data = await response.json();
                    if (data.display_name) {
                        formattedAddress = data.display_name;
                    }
                } catch (geocodingError) {
                    console.error('Could not fetch readable address:', geocodingError);
                }

                setWorkerLocation({ latitude, longitude });
                setDisplayAddress(formattedAddress);
                setErrors((currentErrors) => {
                    const remainingErrors = { ...currentErrors };
                    delete remainingErrors.location;
                    return remainingErrors;
                });
                setLoading(false);
            },
            (geolocationError) => {
                setLoading(false);
                setError(geolocationError.message || 'Unable to detect your location');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    };

    // api submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        if (!workerLocation) {
            setError('Detect your current location in Step 3 before completing registration.');
            setCurrentStep(3);
            return;
        }

        setLoading(true);
        setError(null);

        const form = new FormData();
        form.append("fullname", fullname);
        form.append("phone", phoneNumber);
        form.append("whattappNo", sameWhatsapp ? phoneNumber : whatsappNumber);
        form.append("experience", experience);
        form.append("age", age);
        form.append("dob", dob);
        form.append("tradeCategory", tradeCategory);
        form.append("jobTitle", headlineTitle);
        form.append("jobDetails", workDescription);
        form.append("address", address);
        form.append("state", state);
        form.append("city", city);
        form.append("pincode", pincode);
        form.append("serviceRadius", serviceRadius);
        form.append("bio", karigarBio);
        form.append("skill", skills.join(", "));
        form.append("lat", workerLocation.latitude);
        form.append("lng", workerLocation.longitude);
        form.append("ExactAddress", displayAddress);
        form.append("image", image);

        try {
            const res = await workerService.createWorker(form);
            if (!res?.success || res.statusCode !== 201) {
                throw new Error(res?.message || 'Worker registration failed');
            }

            dispatch(
                setLoginData({
                    user: {
                        id: res.data.id,
                        username: res.data.user,
                        phone: res.data.phoneNo,
                        role: res.data.role,
                    },
                    accessToken: res.data.token
                })
            );
            alert("Karigar Registration Successful!");
            navigate("/");
        } catch (registrationError) {
            console.error("Registration error:", registrationError.response?.data || registrationError.message);
            setError(registrationError.response?.data?.message || registrationError.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col ">
            {/* Utility Grid Background Container */}
            <div className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-10 ">

                {/* Title Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 py-6 gap-4">
                    <div className=''>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Register as Karigar <span className="text-amber-600 font-normal text-2xl md:text-3xl">/ कारीगर पंजीकरण</span>
                        </h1>
                        <p className="text-sm md:text-base text-slate-600 mt-1.5 max-w-2xl">
                            Create your verified master profile in 4 steps. Get direct telephone calls from flat owners, site engineers, and commercial clients with zero platform cuts.
                        </p>
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="flex max-w-7xl gap-8 ">

                    {/* Primary Multi-Step Form Card */}
                    <section className="lg:col-span-8 w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

                        {/* Step Progress Indicator */}
                        <div className="bg-slate-50 p-4 md:p-6 border-b border-slate-200">
                            <div className="grid grid-cols-4 gap-2 md:gap-4 relative">

                                {/* Step 1 Indicator */}
                                <button type="button" onClick={() => goToStep(1)} className="group text-left focus:outline-none">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <span className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-bold text-sm flex items-center justify-center shadow transition-all duration-200 ${currentStep === 1 ? 'bg-blue-900 text-white' : currentStep > 1 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                            {currentStep > 1 ? '✓' : '1'}
                                        </span>
                                        <div className="hidden sm:block">
                                            <p className="text-xs font-bold text-blue-900 uppercase tracking-wider">Step 1</p>
                                            <p className="text-xs font-semibold text-slate-800 truncate">Personal Details</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div className={`bg-blue-900 h-full rounded-full transition-all duration-300 ${currentStep >= 1 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </button>

                                {/* Step 2 Indicator */}
                                <button type="button" onClick={() => goToStep(2)} className="group text-left focus:outline-none">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <span className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 ${currentStep === 2 ? 'bg-blue-900 text-white' : currentStep > 2 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                            {currentStep > 2 ? '✓' : '2'}
                                        </span>
                                        <div className="hidden sm:block">
                                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Step 2</p>
                                            <p className="text-xs font-medium text-slate-800 truncate">Trade & Work</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div className={`bg-blue-900 h-full rounded-full transition-all duration-300 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </button>

                                {/* Step 3 Indicator */}
                                <button type="button" onClick={() => goToStep(3)} className="group text-left focus:outline-none">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <span className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 ${currentStep === 3 ? 'bg-blue-900 text-white' : currentStep > 3 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                            {currentStep > 3 ? '✓' : '3'}
                                        </span>
                                        <div className="hidden sm:block">
                                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Step 3</p>
                                            <p className="text-xs font-medium text-slate-800 truncate">Location / Area</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div className={`bg-blue-900 h-full rounded-full transition-all duration-300 ${currentStep >= 3 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </button>

                                {/* Step 4 Indicator */}
                                <button type="button" onClick={() => goToStep(4)} className="group text-left focus:outline-none">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <span className={`w-8 h-8 md:w-9 md:h-9 rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 ${currentStep === 4 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                            4
                                        </span>
                                        <div className="hidden sm:block">
                                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Step 4</p>
                                            <p className="text-xs font-medium text-slate-800 truncate">Skills & Photo</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                        <div className={`bg-blue-900 h-full rounded-full transition-all duration-300 ${currentStep === 4 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </button>

                            </div>
                        </div>

                        {/* Main Form Area */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-6">
                            {error && (
                                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            {/* STEP 1: Personal Details */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 pb-3">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-600"><IdCard /></span>
                                            Step 1: Personal Details (व्यक्तिगत जानकारी)
                                        </h2>
                                        <p className="text-xs text-slate-600 mt-1">Please provide accurate contact details so clients can directly dial or WhatsApp your workshop.</p>
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="fullName">
                                            Full Name (पूरा नाम) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="fullName"
                                                value={fullname}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. Rameshwar Mistri"
                                                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors"
                                            />
                                            <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none">person</span>
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                        <p className="text-[11px] text-slate-500 mt-1">As stated on your Aadhaar or government identity card.</p>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                        <div className="md:col-span-8">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="phoneNumber">
                                                Mobile Number (फ़ोन नंबर) <span className="text-red-500">*</span>
                                            </label>
                                            <div className=" flex rounded-lg overflow-hidden border border-slate-300 focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600">
                                                <span className="inline-flex items-center px-4 bg-slate-100 text-slate-800 text-sm font-semibold border-r border-slate-300 select-none">
                                                    +91
                                                </span>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    maxLength="10"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                    placeholder="9876543210"
                                                    className="w-full h-11 px-3 bg-slate-50 text-slate-900 text-sm border-none outline-none"
                                                />
                                            </div>
                                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                                        </div>
                                        <div className="md:col-span-4">
                                            <button
                                                type="button"
                                                onClick={() => alert("OTP verification sent successfully!")}
                                                className="w-full h-11 bg-blue-900 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                            >
                                                <span className="material-symbols-outlined text-sm">SMS Verify via OTP</span>

                                            </button>
                                        </div>
                                    </div>

                                    {/* WhatsApp Number */}
                                    <div className="py-3">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                                {/* <span className="material-symbols-outlined text-green-600 text-sm">chat</span> */}
                                                WhatsApp Number (व्हाट्सएप नंबर)
                                            </label>
                                            <label className="flex items-center space-x-2 text-xs font-medium text-slate-800 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={sameWhatsapp}
                                                    onChange={(e) => {
                                                        setSameWhatsapp(e.target.checked);
                                                        if (e.target.checked) setWhatsappNumber(phoneNumber);
                                                    }}
                                                    className="rounded border-slate-300 text-blue-900 focus:ring-amber-600 h-4 w-4"
                                                />
                                                <span>Same as phone number</span>
                                            </label>
                                        </div>
                                        <div className="">
                                            <input
                                                type="tel"
                                                value={sameWhatsapp ? phoneNumber : whatsappNumber}
                                                onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                readOnly={sameWhatsapp}
                                                placeholder="WhatsApp mobile number"
                                                className="w-full h-10 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Experience, Age, DOB Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="experience">
                                                Experience (कुल अनुभव) <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="experience"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            >
                                                <option value="1-3">1 - 3 Years</option>
                                                <option value="4-7">4 - 7 Years</option>
                                                <option value="8-12">8 - 12 Years (Senior)</option>
                                                <option value="12+">12+ Years (Ustad / Master)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="age">
                                                Age (उम्र)
                                            </label>
                                            <input
                                                type="number"
                                                id="age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="e.g. 34"
                                                className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="dob">
                                                Date of Birth (जन्म तिथि)
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Trade & Work Profile */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 pb-3">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-600"><Wrench /></span>
                                            Step 2: Trade & Work Profile (काम का विवरण)
                                        </h2>
                                        <p className="text-xs text-slate-600 mt-1">Select your primary work trade so clients looking for specific work find your direct phone listing.</p>
                                    </div>

                                    {/* Worker Category Grid */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                            Primary Trade Category (मुख्य कारीगरी) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason', 'Appliance', 'Cleaning', 'Welder'].map((cat) => {
                                                const isSelected = tradeCategory === cat;
                                                return (
                                                    <div
                                                        key={cat}
                                                        onClick={() => setTradeCategory(cat)}
                                                        className={`p-3 rounded-lg cursor-pointer transition-all flex flex-col items-center text-center group ${isSelected ? 'border-2 border-blue-900 bg-slate-100 shadow-sm' : 'border border-slate-200 bg-slate-50 hover:border-amber-600'}`}
                                                    >
                                                        {/* <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${isSelected ? 'bg-slate-200 text-white' : 'bg-slate-200 text-white group-hover:bg-gray-400 group-hover:text-white'}`}>
                                                            <span className="material-symbols-outlined text-xl">
                                                                {cat === 'Electrician' ? <Zap /> : cat === 'Plumber' ?  <Faucet />: cat === 'Carpenter' ? <Hammer /> : cat === 'Painter' ? <PaintRoller /> : cat === 'Mason' ? <Building />  : cat === 'Appliance' ?<Tv />  : cat === 'Cleaning' ? <Star />  : 'hardware'}
                                                            </span>
                                                        </div> */}
                                                        <span className={`text-xs font-bold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{cat}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {errors.tradeCategory && <p className="text-red-500 text-xs mt-1">{errors.tradeCategory}</p>}
                                    </div>

                                    {/* Job Title / Headline */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="headlineTitle">
                                            Job Title / Headline (कारीगर पदवी) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="headlineTitle"
                                            value={headlineTitle}
                                            onChange={(e) => setHeadlineTitle(e.target.value)}
                                            placeholder="e.g. Master Plumber & Sanitary Specialist"
                                            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                        />
                                        {errors.headlineTitle && <p className="text-red-500 text-xs mt-1">{errors.headlineTitle}</p>}
                                    </div>

                                    {/* Detailed Description */}
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                                Detailed Work Overview (कार्य अनुभव विवरण)
                                            </label>
                                            <span className="text-[11px] text-slate-500 font-mono">{workDescription.length} / 500</span>
                                        </div>
                                        <textarea
                                            rows="4"
                                            maxLength="500"
                                            value={workDescription}
                                            onChange={(e) => setWorkDescription(e.target.value)}
                                            placeholder="Mention past project experience, major skills, toolkit readiness..."
                                            className="w-full p-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Location & Service Area */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 pb-3">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-600"><MapPinPlus /></span>
                                            Step 3: Location & Service Area (पता और कार्य क्षेत्र)
                                        </h2>
                                        <p className="text-xs text-slate-600 mt-1">Specify your home or shop location so clients within your quick travel radius can contact you.</p>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="address">
                                            Street / Workshop / Shop Address (दुकान या घर का पता) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Street / Colony / Landmark name"
                                            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>

                                    {/* State, City, Pincode */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        <div>
                                            <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                State (राज्य) <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="state"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            >
                                                <option value="">Select state</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Delhi NCR">Delhi NCR</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Telangana">Telangana</option>
                                            </select>
                                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                City / District (शहर) <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            >
                                                <option value="">Select city</option>
                                                <option value="Bengaluru">Bengaluru</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Delhi NCR">Delhi NCR</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Hyderabad">Hyderabad</option>
                                            </select>
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                Pincode <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="pincode"
                                                inputMode="numeric"
                                                maxLength={6}
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                                placeholder="6-digit pincode"
                                                className="w-full h-11 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                            />
                                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                        </div>

                                        {/* current location */}
                                        <div className="min-w-0">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                                Current Location
                                                    <span className="text-red-500"> *</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleDetectLocation}
                                                disabled={loading}
                                                className="flex w-full min-w-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-left transition disabled:cursor-wait disabled:opacity-60"
                                            >
                                                <div className="flex w-full items-center gap-1">
                                                    {loading ? (
                                                        "Finding your location..."
                                                    ) : (
                                                        <>
                                                            <MapPin className="h-7 w-5 shrink-0 text-[#D99416]" />
                                                            {displayAddress ? (
                                                                <p className="truncate max-w-[250px]" title={displayAddress}>
                                                                    {displayAddress}
                                                                </p>
                                                            ) : (
                                                                <span className="text-sm font-medium text-slate-500">
                                                                    Detect Current Location
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                        </div>
                                    </div>

                                    {/* Service Radius */}
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                            Service Radius Coverage (सेवा क्षेत्र दायरा)
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {['5', '10', '15', '25'].map((rad) => (
                                                <label key={rad} onClick={() => setServiceRadius(rad)} className={`flex items-center space-x-2 p-2.5 rounded-lg bg-white border cursor-pointer ${serviceRadius === rad ? 'border-2 border-blue-900 font-bold text-blue-900' : 'border-slate-300 text-slate-700'}`}>
                                                    <input type="radio" name="radius" checked={serviceRadius === rad} onChange={() => setServiceRadius(rad)} className="text-blue-900 focus:ring-amber-600" />
                                                    <span className="text-xs">{rad === '25' ? 'All City Area' : `Within ${rad} km`}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: Skills & Media Verification */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 pb-3">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-600">verified_user</span>
                                            Step 4: Skills & Media Verification (कौशल और प्रोफ़ाइल फ़ोटो)
                                        </h2>
                                        <p className="text-xs text-slate-600 mt-1">Add specific micro-skills and an authentic craftsman photo to increase hiring confidence.</p>
                                    </div>

                                    {/* Skills Tag Cloud */}
                                    <div>
                                        {/* <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Key Skills & Specializations (विशेष कौशल टैग्स)
                                        </label>
                                        <div className="p-2.5 rounded-lg border border-slate-300 bg-slate-50 min-h-[50px] flex flex-wrap gap-2 items-center">
                                            {skills.map((skill) => (
                                                <span key={skill} className="inline-flex items-center gap-1 bg-white text-blue-900 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-300">
                                                    {skill}
                                                    <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-xs cursor-pointer hover:text-red-500">close</span>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                value={newSkillInput}
                                                onChange={(e) => setNewSkillInput(e.target.value)}
                                                onKeyDown={handleAddSkill}
                                                placeholder="+ Add skill & press enter"
                                                className="bg-transparent text-xs text-slate-900 border-none outline-none flex-grow min-w-[120px] p-0"
                                            />
                                        </div> */}
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="karigarBio">
                                            Short Karigar Intro / Bio (ग्राहक विश्वास परिचय)
                                        </label>
                                        <textarea
                                            rows="2"
                                            id="karigarBio"
                                            value={karigarBio}
                                            onChange={(e) => setKarigarBio(e.target.value)}
                                            placeholder="Brief introduction building customer trust..."
                                            className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-sm focus:border-amber-600 outline-none"
                                        ></textarea>
                                    </div>

                                    {/* Profile Picture Upload Dropzone */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Profile Photo (प्रोफ़ाइल फ़ोटो) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">cloud_upload</span>
                                            <p className="text-xs font-semibold text-slate-700">{image ? image.name : "Click to upload or drag & drop profile image (.png, .jpg)"}</p>
                                        </div>
                                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Action Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all"
                                    >
                                        Back
                                    </button>
                                ) : <div></div>}

                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-2.5 rounded-lg bg-blue-900 text-white font-semibold text-xs hover:bg-blue-800 transition-all shadow-sm"
                                    >
                                        Continue to Next Step →
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all shadow-md"
                                    >
                                        Complete Registration (पंजीकरण पूरा करें)
                                    </button>
                                )}
                            </div>

                        </form>
                    </section>


                </div>
            </div>
        </div>
    );
}