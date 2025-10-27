# Contributing to Access.ai

## Project Structure

```
access-ai/
├── components/          # React UI components
├── hooks/              # Custom React hooks
├── services/           # API services and Gemini integration
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── types.ts            # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js 18+
- Gemini API key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/lxmwaniky/access-ai
cd access-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.local.example .env.local
# Add your GEMINI_API_KEY to .env.local
```

4. **Run development server**
```bash
npm run dev
```

## Team Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

### Making Changes

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
- Write clean, documented code
- Follow existing code style
- Test your changes

3. **Commit your changes**
```bash
git add .
git commit -m "Add: description of your changes"
```

4. **Push and create PR**
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub

### Commit Message Format

```
Add: new feature
Fix: bug fix
Update: changes to existing feature
Refactor: code improvements
Docs: documentation updates
Style: formatting changes
```

## Code Areas & Responsibilities

### Frontend/UI
**Files:** `components/`, `App.tsx`
- React components
- UI/UX implementation
- Styling with Tailwind

### AI/Backend Logic
**Files:** `services/`, `hooks/useLiveConversation.ts`
- Gemini AI integration
- Tool implementations
- Conversation management

### Utilities
**Files:** `utils/`, `types.ts`
- Helper functions
- Type definitions
- Shared logic

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused

### Testing
- Test your changes locally
- Verify voice interaction works
- Check responsive design
- Test error handling

### Before Submitting PR
- [ ] Code runs without errors
- [ ] No console warnings
- [ ] Tested on Chrome/Edge
- [ ] Responsive on mobile
- [ ] Updated documentation if needed

## Need Help?

- Check existing code for examples
- Ask in team chat
- Review the README.md
- Look at closed PRs for reference

## Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
