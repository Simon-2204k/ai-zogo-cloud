# 🚀 AI ZEGO CLOUD — Real-Time Video Calling & ZIM Instant Messaging Suite

![ZEGO CLOUD](https://img.shields.io/badge/ZEGO_CLOUD-WebRTC_%26_ZIM-violet?style=for-the-badge&logo=react)
![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![Vite 7](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss)

**AI ZEGO CLOUD** is a next-generation, high-performance web application for **real-time 1080p HD video calling, voice chat, and instant messaging (ZIM)** built with React 19, Vite, Tailwind CSS v4, and WebRTC streaming architecture.

---

## ✨ Features & Highlights

### 📹 Real-Time WebRTC Video & Voice Studio
- **1080p HD Video Calling**: Live camera preview (`getUserMedia`) with ultra-low latency.
- **Audio Controls**: One-click microphone mute/unmute with visual voice level indicators.
- **Camera Flip & Toggle**: Instant camera turn ON/OFF with animated avatar fallback.
- **Screen Sharing**: Built-in display media streaming (`getDisplayMedia`).
- **Call Studio Bar**: Fullscreen mode, live call duration timer, and in-call chat side drawer.

### 💬 ZIM Instant Messaging Suite
- **Interactive Chat Feed**: Real-time peer-to-peer message history with timestamping and read status.
- **Multi-Profile Switcher**: Seamlessly toggle between test user profiles (Emma / James).
- **Emoji Reactions**: Express feelings with one-tap reactions (❤️, 🔥, 👏, 😂, 👍).
- **Media Attachments**: Share image previews and file attachments directly in the chat feed.
- **Direct Call Triggers**: Launch video or voice calls instantly from the chat header.

### 🛡️ ZEGO Cloud SDK Configuration
- **Instant Test Sandbox Mode**: Zero-config mode for immediate WebRTC testing out-of-the-box.
- **Custom Credentials**: Built-in settings modal to enter your custom ZEGO App ID & Server Secret.

### 🎨 Modern Glassmorphism Design System
- Built with custom **Tailwind CSS v4** design tokens (`--color-primary-*`, `--color-accent-*`).
- Dark futuristic glassmorphic UI, ambient glowing particles, and smooth animations.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS v4 & `@tailwindcss/vite`
- **Iconography**: Lucide React
- **Web APIs**: WebSockets, WebRTC (`navigator.mediaDevices`), Display Media

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Simon-2204k/ai-zogo-cloud.git
cd ai-zogo-cloud
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

---

## 📂 Project Structure

```text
zego-cloud/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header navigation & user switcher
│   │   ├── Hero.jsx            # Interactive landing banner & room join
│   │   ├── ChatRoom.jsx        # ZIM real-time messaging workspace
│   │   ├── VideoCall.jsx       # WebRTC video/voice calling studio
│   │   ├── SettingsModal.jsx   # ZEGO Cloud SDK credentials config
│   │   └── Footer.jsx          # Footer with SDK documentation links
│   ├── App.jsx                 # Main application state & layout
│   ├── index.css               # Tailwind CSS v4 design system
│   └── main.jsx                # React root entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 📜 License

Created with ❤️ for real-time video & chat experiences. Powered by WebRTC & ZEGO Cloud specifications.
