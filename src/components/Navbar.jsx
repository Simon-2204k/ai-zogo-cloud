import React from 'react';
import { Video, Phone, ShieldCheck, Sparkles, User, Settings, Wifi } from 'lucide-react';

export default function Navbar({
  currentUser,
  onSwitchUser,
  onStartCall,
  onOpenSettings,
  activeRoomId
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-pink-500 to-purple-600 shadow-lg shadow-violet-500/25">
            <Video className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-black rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-violet-200 to-pink-300 bg-clip-text text-transparent">
                ZEGO CLOUD
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-violet-500/20 text-violet-300 border border-violet-500/30">
                v2.4 WebRTC
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Real-Time Video & Messaging Suite
            </p>
          </div>
        </div>

        {/* Center Room Badge */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Active Room:</span>
          <span className="font-mono font-bold text-violet-300">{activeRoomId}</span>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* User Profile Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => onSwitchUser('A')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentUser.id === 'A'
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop"
                alt="Emma"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>Emma</span>
            </button>
            <button
              onClick={() => onSwitchUser('B')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentUser.id === 'B'
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
                alt="James"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>James</span>
            </button>
          </div>

          {/* Quick Call Action Buttons */}
          <button
            onClick={() => onStartCall('video')}
            className="btn btn-primary px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg hover:shadow-violet-500/20"
            title="Start HD Video Call"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Video Call</span>
          </button>

          <button
            onClick={() => onStartCall('voice')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all flex items-center gap-1.5"
            title="Start Voice Call"
          >
            <Phone className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">Voice</span>
          </button>

          {/* SDK Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all"
            title="ZEGO Cloud SDK Configuration"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
