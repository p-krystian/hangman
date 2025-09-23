<p align="center">
  <img src="src/Assets/Langs/en/logo.webp" alt="Hangman Game" width="360">
</p>

<p align="center">
  <strong>🎮 Modern Hangman multiplayer game built with React and TypeScript</strong>
</p>

## 🎯 About

**Code Language:** `English`
**Interface Languages:** `English` and `Polish`

A modern implementation of the classic Hangman word-guessing game with multiplayer capabilities. Players can enjoy the game solo or challenge friends either locally on the same device or remotely through WebSocket connections.

## ✨ Features

- 🎮 **Single Player Mode** - Practice against the computer
- 👥 **Local Multiplayer** - Play with friends on the same device
- 🌐 **Online Multiplayer** - Challenge players remotely via WebSocket
- 🌍 **Multilingual Interface** - English and Polish language support
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast Performance** - Built with Vite and SWC for optimal speed
- 🔒 **Type Safety** - Full TypeScript implementation

## 🛠️ Technologies

- **React 19** - Modern UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Fast build tool and development server
- **Socket.IO** - Real-time WebSocket communication for multiplayer
- **Wouter** - Lightweight routing library for React
- **Zod** - TypeScript-first schema validation
- **SVGR** - SVG to React component transformation

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18+ recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hangman
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the environment variables

4. **Start development server**
   ```bash
   npm run dev
   ```

### 📦 Available Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start development server (includes pre-verification)   |
| `npm run build`   | Build production app (includes TypeScript compilation) |
| `npm run preview` | Preview production build locally                       |
| `npm run lint`    | Run ESLint code analysis                               |

## 🔧 Environment Variables

- **`VITE_SOCKET_URL`** - URL to the Socket.IO server for multiplayer functionality
- **`VITE_SOCKET_PATH`** - Specific path the Socket.IO server listens on
- **`VITE_EXIT_URL`** - Fallback redirect URL when `window.close()` is not available
- **`VITE_DATA_URL`** - CDN server URL or path to public directory for assets
- **`VITE_AUTHOR_URL`** - URL linking to the author's profile or homepage
- **`VITE_STORAGE_PREFIX`** - Prefix for LocalStorage keys to avoid conflicts

## 📋 TODOs

- Better sounds effects
- Better UI and UX
- Performance improvements
- Expanding the words base
- Security fixes
- Eliminate bugs
- Accessibility improvements

## 📚 Learn More

Official React website: [https://react.dev/](https://react.dev/)\
Official Vite website: [https://vitejs.dev/](https://vitejs.dev/)\
Official Socket.IO website: [https://socket.io/docs/v4/faq/](https://socket.io/docs/v4/faq/)\
Wikipedia article about Hangman: [https://en.wikipedia.org/wiki/Hangman\_(game)](<https://en.wikipedia.org/wiki/Hangman_(game)>)
