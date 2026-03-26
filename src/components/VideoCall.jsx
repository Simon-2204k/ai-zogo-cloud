import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  Maximize2,
  Minimize2,
  Volume2,
  Shield,
  Sparkles,
  Zap,
  Users,
  MessageSquare
} from 'lucide-react';

export default function VideoCall({
  isOpen,
  onClose,
  callType = 'video',
  localUser,
  remoteUser,
  roomId
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'voice');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callState, setCallState] = useState('connecting'); // 'connecting' | 'connected' | 'ended'
  const [showInCallChat, setShowInCallChat] = useState(false);
  const [quickMessages, setQuickMessages] = useState([
    { from: remoteUser?.name || 'Remote', text: 'Hey there! Can you hear me loud and clear?' }
  ]);
  const [inCallText, setInCallText] = useState('');

  const containerRef = useRef(null);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize WebRTC media stream
  useEffect(() => {
    if (!isOpen) return;

    setCallState('connecting');
    setCallDuration(0);

    const startMedia = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: callType === 'video',
            audio: true
          });
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera/Microphone access fallback:', err);
      } finally {
        setTimeout(() => {
          setCallState('connected');
        }, 1200);
      }
    };

    startMedia();

    // Call timer interval
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, callType]);

  // Toggle Mute Audio
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = isMuted));
    }
    setIsMuted(!isMuted);
  };

  // Toggle Video Camera
  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = isVideoOff));
    }
    setIsVideoOff(!isVideoOff);
  };

  // Toggle Screen Share
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      // Revert to camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch (e) {
        console.error(e);
      }
      setIsScreenSharing(false);
    } else {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
          const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          if (localVideoRef.current) localVideoRef.current.srcObject = displayStream;
          setIsScreenSharing(true);
        }
      } catch (err) {
        console.warn('Screen share canceled or unallowed', err);
      }
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  // Format Timer
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendQuickMessage = (e) => {
    e.preventDefault();
    if (!inCallText.trim()) return;
    setQuickMessages((prev) => [
      ...prev,
      { from: localUser?.name || 'You', text: inCallText.trim() }
    ]);
    setInCallText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-2 sm:p-6 animate-fade-in">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[92vh] bg-gradient-to-b from-[#121216] via-[#0c0c0e] to-black rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
      >
        {/* Header Bar */}
        <div className="absolute top-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{callState === 'connecting' ? 'Connecting...' : 'Live Call'}</span>
              <span className="text-zinc-400">|</span>
              <span className="font-mono text-violet-300 font-bold">{formatTime(callDuration)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-xs text-violet-200">
              <Shield className="w-3.5 h-3.5 text-violet-400" />
              <span>ZEGO Express WebRTC</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInCallChat(!showInCallChat)}
              className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                showInCallChat
                  ? 'bg-violet-600 border-violet-400 text-white shadow-lg'
                  : 'bg-white/10 border-white/15 text-zinc-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">In-Call Chat</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-zinc-300 hover:text-white transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Video Grid Area */}
        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-20 pb-24 overflow-hidden">
          
          {/* Main Remote User Feed */}
          <div className="relative w-full h-full rounded-2xl bg-zinc-900 overflow-hidden border border-white/10 flex items-center justify-center group shadow-xl">
            {callType === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-950/40 via-purple-900/20 to-black">
                {/* Simulated Remote Stream placeholder with video gradient avatar */}
                <img
                  src={remoteUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"}
                  alt={remoteUser?.name}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              </div>
            ) : (
              /* Voice Call Mode Screen */
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                  <img
                    src={remoteUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"}
                    alt={remoteUser?.name}
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-violet-400 shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">{remoteUser?.name}</h3>
                <p className="text-sm text-violet-300 font-medium">ZEGO HD Voice Active</p>
                <div className="flex items-center gap-1.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-violet-400 rounded-full animate-bounce"
                      style={{
                        height: `${12 + (i % 3) * 12}px`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Remote Name Overlay Tag */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{remoteUser?.name} (Remote)</span>
              <Volume2 className="w-3.5 h-3.5 text-violet-300" />
            </div>
          </div>

          {/* Local User Preview Video (Small / PIP on mobile) */}
          <div className="relative w-full h-full rounded-2xl bg-black overflow-hidden border border-white/15 flex items-center justify-center shadow-xl">
            {!isVideoOff ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-lg border-2 border-white/20">
                  {localUser?.name?.charAt(0) || 'Y'}
                </div>
                <p className="text-sm font-semibold text-zinc-300">{localUser?.name} (You)</p>
                <span className="text-xs text-zinc-500 mt-1">Camera Off</span>
              </div>
            )}

            {/* Local Name Tag */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <span className={`w-2 h-2 rounded-full ${isMuted ? 'bg-rose-500' : 'bg-emerald-400'}`} />
              <span>{localUser?.name} (You)</span>
              {isMuted && <MicOff className="w-3.5 h-3.5 text-rose-400" />}
            </div>
          </div>

        </div>

        {/* In-Call Chat Side Drawer */}
        {showInCallChat && (
          <div className="absolute top-20 right-4 bottom-24 w-80 z-30 bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex flex-col shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">In-Call Messages</span>
              <button
                onClick={() => setShowInCallChat(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
              {quickMessages.map((m, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-violet-300">{m.from}: </span>
                  <span className="text-zinc-200">{m.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendQuickMessage} className="pt-2 flex gap-2">
              <input
                type="text"
                value={inCallText}
                onChange={(e) => setInCallText(e.target.value)}
                placeholder="Send message..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/15 rounded-xl text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-violet-600 font-bold text-xs text-white hover:bg-violet-500"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Bottom Floating Call Action Bar */}
        <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-3 p-3 bg-black/70 backdrop-blur-xl max-w-fit mx-auto rounded-3xl border border-white/15 shadow-2xl">
          
          {/* Mute Audio */}
          <button
            onClick={toggleMute}
            className={`p-4 rounded-2xl transition-all ${
              isMuted
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Toggle Camera */}
          {callType === 'video' && (
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-2xl transition-all ${
                isVideoOff
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isVideoOff ? 'Turn On Camera' : 'Turn Off Camera'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-2xl transition-all ${
              isScreenSharing
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isScreenSharing ? 'Stop Screen Sharing' : 'Share Screen'}
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-600/40 transition-all hover:scale-105 active:scale-95"
            title="End Call"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Call</span>
          </button>

        </div>

      </div>
    </div>
  );
}
