import React from 'react';
import { Video, Phone, MessageCircle, Sparkles, Shield, Zap, Users, ArrowRight } from 'lucide-react';

export default function Hero({ onJoinRoom, onSelectDemoUser, activeRoomId, setRoomIdInput, roomIdInput }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (roomIdInput.trim()) {
      onJoinRoom(roomIdInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/20 via-pink-500/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Floating vertical accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-40 bg-gradient-to-b from-transparent via-violet-400/40 to-transparent animate-float"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 15}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-violet-200 mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Powered by ZEGO Cloud WebRTC & ZIM Real-Time SDK</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Next-Gen Real-Time <br />
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Video Calls & Instant Messaging
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Connect seamlessly with HD crystal-clear video calls, low-latency voice chat, and real-time interactive messaging in custom rooms.
        </p>

        {/* Quick Join Room Card */}
        <div className="glass p-4 sm:p-6 rounded-3xl max-w-xl mx-auto shadow-2xl border border-white/15 mb-12 transform hover:scale-[1.01] transition-transform duration-300">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                placeholder="Enter Room ID (e.g. zego-room-101)"
                className="w-full px-5 py-3.5 bg-black/40 border border-white/15 rounded-2xl text-white placeholder-zinc-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 text-sm font-medium transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary px-7 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm shadow-xl hover:shadow-violet-500/25 transition-all"
            >
              <span>Join Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <span className="font-medium text-zinc-300">Quick Test Profiles:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onSelectDemoUser('A')}
                className="px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/30 text-violet-200 transition-colors font-medium flex items-center gap-1.5"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Emma (User A)
              </button>
              <button
                type="button"
                onClick={() => onSelectDemoUser('B')}
                className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 transition-colors font-medium flex items-center gap-1.5"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                James (User B)
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14">
          {[
            {
              icon: <Video className="w-6 h-6 text-violet-400" />,
              title: "1080p HD Video",
              desc: "Ultra-low latency streaming",
              bg: "from-violet-500/10 to-purple-500/5",
              border: "border-violet-500/20"
            },
            {
              icon: <Phone className="w-6 h-6 text-pink-400" />,
              title: "Crystal Voice",
              desc: "AI noise cancellation",
              bg: "from-pink-500/10 to-rose-500/5",
              border: "border-pink-500/20"
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-indigo-400" />,
              title: "ZIM Instant Chat",
              desc: "Reactions & media sharing",
              bg: "from-indigo-500/10 to-blue-500/5",
              border: "border-indigo-500/20"
            },
            {
              icon: <Shield className="w-6 h-6 text-emerald-400" />,
              title: "E2E Encrypted",
              desc: "Secure room tokens",
              bg: "from-emerald-500/10 to-teal-500/5",
              border: "border-emerald-500/20"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-gradient-to-b ${item.bg} border ${item.border} backdrop-blur-sm text-left hover:border-white/20 transition-all duration-300`}
            >
              <div className="mb-3 p-2.5 rounded-xl bg-white/5 w-fit border border-white/10">
                {item.icon}
              </div>
              <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          {[
            { value: "< 200ms", label: "Global Latency" },
            { value: "99.99%", label: "SDK Uptime" },
            { value: "4K 60FPS", label: "Max Stream Quality" },
            { value: "10,000+", label: "Concurrent Room Capacity" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-300 via-pink-300 to-white bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}