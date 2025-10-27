# Team Collaboration Guide

## Team Roles

### 👨‍💻 Frontend Developer
**Focus Areas:**
- `components/` - UI components
- `App.tsx` - Main app logic
- Styling and responsive design
- User experience improvements

**Tasks:**
- Improve UI/UX
- Add new components
- Handle loading states
- Error handling UI
- Mobile responsiveness

### 🤖 AI/Backend Developer
**Focus Areas:**
- `services/geminiService.ts` - AI tools
- `hooks/useLiveConversation.ts` - Gemini integration
- Function calling logic
- Tool implementations

**Tasks:**
- Add new AI tools
- Improve prompts
- Optimize AI responses
- Add new capabilities
- Error handling for AI

### 🎨 Designer/Product
**Focus Areas:**
- Visual design
- User flows
- Documentation
- Demo preparation

**Tasks:**
- Design improvements
- Create mockups
- Write documentation
- Prepare pitch deck
- User testing

## Communication

### Daily Standup (5 min)
- What did you do yesterday?
- What will you do today?
- Any blockers?

### Code Reviews
- Review PRs within 24 hours
- Be constructive and kind
- Test changes locally
- Approve or request changes

### Asking for Help
- Check documentation first
- Search existing issues
- Ask in team chat
- Tag relevant person

## Working on Features

### Before Starting
1. Check if someone else is working on it
2. Create an issue or claim existing one
3. Create a branch: `feature/feature-name`
4. Communicate in team chat

### While Working
1. Commit frequently with clear messages
2. Push to your branch regularly
3. Update team on progress
4. Ask for help if stuck

### When Done
1. Test thoroughly
2. Update documentation
3. Create Pull Request
4. Request review from teammate
5. Address feedback
6. Merge when approved

## Avoiding Conflicts

### File Ownership
Try to work on different files when possible:

**Frontend Dev:**
- `components/NewComponent.tsx`
- `App.tsx` (coordinate if needed)

**AI Dev:**
- `services/geminiService.ts`
- `hooks/useLiveConversation.ts`

**Shared Files:**
- `types.ts` - Coordinate changes
- `App.tsx` - Communicate before editing

### Merge Conflicts
If you get a merge conflict:

```bash
# Pull latest changes
git pull origin main

# Fix conflicts in your editor
# Look for <<<<<<< and >>>>>>>

# After fixing
git add .
git commit -m "Fix: merge conflicts"
git push
```

## Code Standards

### TypeScript
```typescript
// ✅ Good - typed
interface Props {
  name: string;
  age: number;
}

// ❌ Bad - any
function doSomething(data: any) { }
```

### Components
```typescript
// ✅ Good - clear, typed
interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Bad - unclear
const Button = (props: any) => <button {...props} />;
```

### Naming
```typescript
// ✅ Good
const getUserProfile = () => { };
const isLoading = true;
const handleClick = () => { };

// ❌ Bad
const get = () => { };
const flag = true;
const click = () => { };
```

## Testing Your Changes

### Checklist
- [ ] Code runs without errors
- [ ] No console warnings
- [ ] Voice interaction works
- [ ] UI looks good on mobile
- [ ] Tested in Chrome/Edge
- [ ] Error states handled
- [ ] Loading states shown

### Manual Testing
1. Start dev server: `npm run dev`
2. Open in browser
3. Test your feature
4. Test edge cases
5. Test on mobile (responsive mode)

## Git Best Practices

### Commit Messages
```bash
# ✅ Good
git commit -m "Add: breathing exercise timer"
git commit -m "Fix: microphone permission handling"
git commit -m "Update: improve route planning prompt"

# ❌ Bad
git commit -m "changes"
git commit -m "fix"
git commit -m "wip"
```

### Branch Names
```bash
# ✅ Good
feature/breathing-timer
fix/microphone-permissions
update/route-planning

# ❌ Bad
my-branch
test
branch1
```

### Pull Requests
**Good PR Description:**
```
## What
Added breathing exercise timer feature

## Why
Users requested ability to see time remaining

## How
- Added countdown timer component
- Integrated with breathing exercise
- Added pause/resume functionality

## Testing
- Tested on Chrome, Edge
- Verified on mobile
- Checked accessibility
```

## Emergency Procedures

### Build is Broken
1. Don't panic
2. Check recent commits
3. Revert if needed: `git revert <commit-hash>`
4. Fix and push
5. Notify team

### Lost Work
1. Check git stash: `git stash list`
2. Check reflog: `git reflog`
3. Recover if possible
4. Learn to commit more often 😊

### Merge Conflicts
1. Don't force push
2. Communicate with team
3. Resolve carefully
4. Test after resolving
5. Ask for help if unsure

## Useful Commands

```bash
# See what changed
git status
git diff

# Undo changes (before commit)
git checkout -- filename

# See commit history
git log --oneline

# Switch branches
git checkout branch-name

# Update from main
git pull origin main

# Stash changes temporarily
git stash
git stash pop

# See who changed what
git blame filename
```

## Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://typescriptlang.org)
- [Gemini AI Docs](https://ai.google.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Questions?

Ask in team chat or create an issue!
