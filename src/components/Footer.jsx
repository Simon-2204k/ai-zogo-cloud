import React from 'react';
import { Video, ExternalLink, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/80 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 shadow-md">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              ZEGO CLOUD
            </span>
            <p className="text-xs text-zinc-400">
              High-Definition Video Calling & Real-Time ZIM Messaging Suite
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-medium">
          <a
            href="https://www.zegocloud.com/docs/express-video-sdk"
            target="_blank"
            rel="noreferrer"
            className="hover:text-violet-300 transition-colors flex items-center gap-1"
          >
            <span>ZEGO Express Web SDK</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.zegocloud.com/docs/zim-sdk"
            target="_blank"
            rel="noreferrer"
            className="hover:text-violet-300 transition-colors flex items-center gap-1"
          >
            <span>ZIM Real-Time SDK</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/HexagonDigitalServices/ZEGO-CLOUD"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Code className="w-4 h-4 text-violet-400" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Right copyright */}
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} ZEGO Cloud Demo Suite. Powered by WebRTC.
        </p>

      </div>
    </footer>
  );
}