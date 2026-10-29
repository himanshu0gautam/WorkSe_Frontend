import React, { useState, useRef } from "react";
import {
    Mic,
    Volume2,
    RotateCcw,
    Trash2,
} from 'lucide-react';
// import { workerService } from "../services/workerService"; // your api service

export default function VoiceRecorder({ onVoiceRecorded, onVoiceDeleted }) {
    const [recording, setRecording] = useState(false);
    const [hasVoiceNote, setHasVoiceNote] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isReRecording, setIsReRecording] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // 1. Start Recording
    const startRecording = async () => {
        try {
            audioChunksRef.current = [];
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const audioUrlPreview = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrlPreview);
                setHasVoiceNote(true);

                const audioFile = new File(
                    [audioBlob],
                    `voice-note-${Date.now()}.webm`,
                    { type: "audio/webm" },
                );
                if (onVoiceRecorded) onVoiceRecorded(audioFile, audioUrlPreview);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (err) {
            console.error("Microphone access denied or error:", err);
            alert("Please allow microphone access to record voice.");
        }
    };

    // 2. Stop Recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            // Stop all microphone tracks to release the hardware
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleReRecord = () => {
        if (!recording) startRecording();
    };

    const handleDelete = () => {
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
        setHasVoiceNote(false);
        if (onVoiceDeleted) onVoiceDeleted();
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-[#FCFBF9]">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
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


            <div className="flex gap-3 bg-[#FFFFFF] p-4 w-full justify-between">
                {!recording ? (
                    <button
                        type="button"
                        onClick={startRecording}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
                    >
                        {loading ? "Uploading..." : "🎤 Speak / Record"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={stopRecording}
                        className="px-4 py-2 bg-slate-800 text-white rounded-full font-bold animate-pulse"
                    >
                        ⏹️ Stop Recording
                    </button>
                )}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={handleReRecord}
                        disabled={loading || recording}
                        className="text-xs font-medium text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 hover:bg-slate-50 flex items-center gap-1 transition cursor-pointer"
                    >
                        <RotateCcw className={`w-3.5 h-3.5 ${isReRecording ? 'animate-spin' : ''}`} />
                        <span>{isReRecording ? 'Recording...' : 'Re-record'}</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="text-slate-400 hover:text-red-500 p-1.5 transition rounded cursor-pointer"
                        title="Delete voice note"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

            </div>
            <div className="flex items-center w-full justify-between text-[11px] text-slate-500 mt-2.5">
                <span className="flex items-center gap-1">
                    <Mic className="w-3 h-3 text-slate-400" />
                    <span>Tap &amp; hold or click to speak in any language (हिंदी, ಕನ್ನಡ, etc.)</span>
                </span>
                <span className="text-slate-400 font-medium">Max limit: 60 sec</span>
            </div>


            {/* Local Preview Playback */}
            {audioUrl && !loading && (
                <div className="w-full flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-500">Preview Recorded Audio:</span>
                    <audio controls src={audioUrl} className="w-full max-w-xs" />
                </div>
            )}
        </div>
    );
}