<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Access.ai - Personal Assistant for Pregnancy

# Access.ai - Personal Pregnancy Assistant

> 🤰 Your comprehensive AI companion throughout pregnancy - powered by Google Gemini Live API

A voice-enabled personal assistant providing real-time support for health, nutrition, wellness, commute safety, baby preparation, and emergency contacts.

## 🌟 Features

- 🎤 **Voice Interaction** - Natural conversation with AI
- 🚌 **Smart Commuting** - Route planning, real-time updates, amenities
- 💊 **Health Support** - Medical info, safety tips, wellness advice
- � **Nutrition & Diet** - Food safety checks, meal planning
- �🧘 **Stress Management** - Guided breathing exercises
- 🗺️ **3D Maps** - Interactive Google Maps with nearby hospitals, pharmacies
- 🪑 **Seat Request** - Display card to request priority seating
- 🚨 **Emergency Contacts** - Voice-activated calling to partner/doctor
- 👶 **Baby Preparation** - Hospital bag checklist, name suggestions, nursery advice
- 📚 **Week-by-Week Info** - Pregnancy development tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Gemini API key ([Get one here](https://aistudio.google.com/apikey))
- Google Maps API key ([Get one here](https://console.cloud.google.com/google/maps-apis))

### Setup

1. **Clone and install**
```bash
git clone https://github.com/lxmwaniky/access-ai
cd access-ai
npm install
```

2. **Configure environment**
```bash
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
access-ai/
├── components/          # React UI components
│   ├── BreathingExercise.tsx
│   ├── MicrophoneButton.tsx
│   ├── RequestSeatCard.tsx
│   └── RouteMap.tsx
├── hooks/              # Custom React hooks
│   └── useLiveConversation.ts
├── services/           # AI services and tools
│   └── geminiService.ts
├── utils/              # Utility functions
│   └── audioUtils.ts
├── App.tsx             # Main application
├── types.ts            # TypeScript definitions
└── docs/               # Documentation
```

## 👥 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### For Team Members
- Read [docs/TEAM_GUIDE.md](docs/TEAM_GUIDE.md) for collaboration workflow
- Check [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) for architecture details

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **AI:** Google Gemini 2.5 (Flash & Pro)
- **Styling:** Tailwind CSS
- **Audio:** Web Audio API

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎯 For Hackathon

View your app in AI Studio: https://ai.studio/apps/drive/1AAxlM9Y0OHvaylpthVtsTOt7YznCpQkv

## 📄 License

MIT

## 🤝 Team

Built with ❤️ for the Hackathon
