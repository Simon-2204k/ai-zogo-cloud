import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatRoom from './components/ChatRoom';
import VideoCall from './components/VideoCall';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';

const users = {
  A: {
    id: 'user_emma_101',
    name: 'Emma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    role: 'User A'
  },
  B: {
    id: 'user_james_102',
    name: 'James',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    role: 'User B'
  }
};

export default function App() {
  const [currentUserId, setCurrentUserId] = useState('A');
  const [activeRoomId, setActiveRoomId] = useState('zego-room-101');
  const [roomIdInput, setRoomIdInput] = useState('zego-room-101');

  // Video/Voice Call state
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callType, setCallType] = useState('video'); // 'video' | 'voice'

  // SDK Settings Modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sdkConfig, setSdkConfig] = useState({
    appId: '123456789',
    serverSecret: 'a1b2c3d4e5f67890',
    useTestSandbox: true
  });

  const currentUser = users[currentUserId];
  const remoteUser = users[currentUserId === 'A' ? 'B' : 'A'];

  const handleSwitchUser = (userKey) => {
    setCurrentUserId(userKey);
  };

  const handleJoinRoom = (newRoomId) => {
    if (newRoomId) {
      setActiveRoomId(newRoomId);
    }
  };

  const handleStartCall = (type = 'video') => {
    setCallType(type);
    setIsCallOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white selection:bg-pink-500 selection:text-white flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onStartCall={handleStartCall}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeRoomId={activeRoomId}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Landing Hero Banner */}
        <Hero
          onJoinRoom={handleJoinRoom}
          onSelectDemoUser={handleSwitchUser}
          activeRoomId={activeRoomId}
          setRoomIdInput={setRoomIdInput}
          roomIdInput={roomIdInput}
        />

        {/* Real-time ZIM Chat Room */}
        <section id="chat-section">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ZIM Real-Time Instant Messaging Room
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Switch profiles using the toggle in top bar or sidebar to simulate live peer-to-peer messaging.
            </p>
          </div>
          <ChatRoom
            currentUser={currentUser}
            remoteUser={remoteUser}
            onStartCall={handleStartCall}
            activeRoomId={activeRoomId}
          />
        </section>
      </main>

      {/* Real-time Video Call Studio Modal */}
      <VideoCall
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        callType={callType}
        localUser={currentUser}
        remoteUser={remoteUser}
        roomId={activeRoomId}
      />

      {/* Settings / SDK Credentials Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        sdkConfig={sdkConfig}
        onSaveConfig={setSdkConfig}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
