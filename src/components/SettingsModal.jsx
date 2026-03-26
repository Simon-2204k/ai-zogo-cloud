import React, { useState } from 'react';
import { X, Shield, Key, Server, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, sdkConfig, onSaveConfig }) {
  const [appId, setAppId] = useState(sdkConfig?.appId || '123456789');
  const [serverSecret, setServerSecret] = useState(sdkConfig?.serverSecret || 'a1b2c3d4e5f67890');
  const [useTestSandbox, setUseTestSandbox] = useState(sdkConfig?.useTestSandbox !== false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig({ appId, serverSecret, useTestSandbox });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#121216] border border-white/15 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">ZEGO Cloud SDK Config</h3>
              <p className="text-xs text-zinc-400">Manage WebRTC & ZIM Credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              ZEGO App ID
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Enter App ID"
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Server Secret / Token
            </label>
            <div className="relative">
              <Server className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={serverSecret}
                onChange={(e) => setServerSecret(e.target.value)}
                placeholder="Enter Server Secret"
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={useTestSandbox}
                onChange={(e) => setUseTestSandbox(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
              />
              <div>
                <span className="text-xs font-semibold text-white">Use Instant Test Sandbox Mode</span>
                <p className="text-[11px] text-zinc-400">Allows zero-setup WebRTC testing out-of-the-box</p>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Credentials</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
