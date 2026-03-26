import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Video,
  Phone,
  Paperclip,
  Smile,
  Heart,
  Sparkles,
  User,
  CheckCheck,
  PhoneCall,
  Image as ImageIcon,
  X
} from 'lucide-react';

export default function ChatRoom({
  currentUser,
  remoteUser,
  onStartCall,
  activeRoomId
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: remoteUser.id,
      senderName: remoteUser.name,
      senderAvatar: remoteUser.avatar,
      text: `Hey ${currentUser.name}! Welcome to the ZEGO Cloud room #${activeRoomId}. Ready for an HD video call?`,
      timestamp: '9:40 PM',
      reactions: ['❤️', '🔥']
    },
    {
      id: 2,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: `Hi ${remoteUser.name}! Yes, testing real-time WebRTC stream & ZIM instant chat!`,
      timestamp: '9:41 PM',
      reactions: ['👏']
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedImage) return;

    const newMsg = {
      id: Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text: inputMessage.trim(),
      image: selectedImage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setSelectedImage(null);

    // Auto-reply simulation from remote user
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          senderId: remoteUser.id,
          senderName: remoteUser.name,
          senderAvatar: remoteUser.avatar,
          text: `Got your message! Let's jump on a video call whenever you're ready 🚀`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reactions: ['👍']
        }
      ]);
    }, 1500);
  };

  const handleAddReaction = (msgId, emoji) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const reactions = msg.reactions.includes(emoji)
            ? msg.reactions.filter((r) => r !== emoji)
            : [...msg.reactions, emoji];
          return { ...msg, reactions };
        }
        return msg;
      })
    );
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[750px]">
        
        {/* Left Sidebar - Peer Profile & Room Details */}
        <aside className="w-full md:w-80 bg-black/40 border-r border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Connected Peer
              </span>
            </div>

            {/* Peer Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center mb-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                <Sparkles className="w-4 h-4 text-pink-400" />
              </div>
              <img
                src={remoteUser.avatar}
                alt={remoteUser.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-violet-400 shadow-xl group-hover:scale-105 transition-transform"
              />
              <h3 className="text-xl font-extrabold text-white mb-1">{remoteUser.name}</h3>
              <p className="text-xs text-violet-300 font-medium mb-4">Online • ZEGO ZIM Connected</p>
              
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onStartCall('video')}
                  className="btn btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Call Video</span>
                </button>
                <button
                  onClick={() => onStartCall('voice')}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>Voice</span>
                </button>
              </div>
            </div>

            {/* Room Information */}
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span>Room ID</span>
                <span className="font-mono font-bold text-violet-300">{activeRoomId}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span>SDK Mode</span>
                <span className="font-semibold text-emerald-400">WebRTC + ZIM</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span>Current User</span>
                <span className="font-semibold text-white">{currentUser.name}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-zinc-500 text-center">
            ZEGO Cloud Real-Time Instant Messaging Engine
          </div>
        </aside>

        {/* Right Main Chat Area */}
        <main className="flex-1 flex flex-col bg-gradient-to-b from-[#121216]/80 via-[#0c0c0e]/80 to-black/80">
          
          {/* Chat Header */}
          <header className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={remoteUser.avatar}
                  alt={remoteUser.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-black rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{remoteUser.name}</h4>
                <p className="text-xs text-zinc-400">Active now in room #{activeRoomId}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onStartCall('video')}
                className="p-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 transition-all"
                title="Start Video Call"
              >
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => onStartCall('voice')}
                className="p-2.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/40 text-pink-200 transition-all"
                title="Start Voice Call"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Messages Scroll Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover border border-white/15"
                  />
                  <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-br-none shadow-lg'
                          : 'bg-white/10 border border-white/15 text-zinc-100 rounded-bl-none backdrop-blur-md'
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Attachment"
                          className="w-full max-h-60 object-cover rounded-xl mb-2 border border-white/20"
                        />
                      )}
                      <p>{msg.text}</p>

                      {/* Emoji Reactions Bar */}
                      {msg.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {msg.reactions.map((emoji, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-full bg-black/40 text-xs border border-white/10"
                            >
                              {emoji}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[10px] text-zinc-400">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}

                      {/* Quick Reaction Emojis trigger */}
                      <button
                        onClick={() => handleAddReaction(msg.id, '❤️')}
                        className="hover:scale-125 transition-transform opacity-60 hover:opacity-100"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '🔥')}
                        className="hover:scale-125 transition-transform opacity-60 hover:opacity-100"
                      >
                        🔥
                      </button>
                      <button
                        onClick={() => handleAddReaction(msg.id, '👏')}
                        className="hover:scale-125 transition-transform opacity-60 hover:opacity-100"
                      >
                        👏
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Upload Preview */}
          {selectedImage && (
            <div className="px-6 py-2 bg-black/60 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-zinc-300">Image attached</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-xs text-rose-400 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/40 flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Type message as ${currentUser.name}...`}
                className="w-full px-5 py-3.5 bg-white/5 border border-white/15 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!inputMessage.trim() && !selectedImage}
              className="btn btn-primary px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 text-sm shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </main>

      </div>
    </div>
  );
}
