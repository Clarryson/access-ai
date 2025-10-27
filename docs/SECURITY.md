# Security Checklist

## ✅ Before Pushing to GitHub

### API Keys Protection
- ✅ `.env.local` is gitignored (via `*.local` pattern)
- ✅ `.env.example` provided with placeholder values
- ✅ No hardcoded API keys in source code
- ✅ API keys loaded via Vite's `import.meta.env`

### Sensitive Data
- ✅ No user data stored on servers (localStorage only)
- ✅ Emergency contacts stored locally only
- ✅ No PII (Personally Identifiable Information) in code
- ✅ No credentials in git history

### Environment Variables
Required in `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key
GOOGLE_MAPS_API_KEY=your_actual_maps_api_key
```

### Deployment Security
- Use environment variables on hosting platform (Vercel, Netlify, etc.)
- Never commit `.env.local` or `.env.production`
- Rotate API keys if accidentally exposed
- Monitor API usage for anomalies

## 🔒 API Key Security

### Getting API Keys
1. **Gemini API**: https://aistudio.google.com/app/apikey
2. **Google Maps API**: https://console.cloud.google.com/

### Restricting API Keys
**Google Maps API:**
- Restrict by HTTP referrer (your domain)
- Enable only required APIs (Maps JavaScript API, Places API)
- Set usage quotas

**Gemini API:**
- Restrict by application (if supported)
- Monitor usage in Google AI Studio
- Set rate limits

## 📋 Pre-Deployment Checklist

- [ ] Verified `.env.local` is not committed
- [ ] Created `.env.example` with placeholders
- [ ] Tested with production API keys
- [ ] Configured environment variables on hosting platform
- [ ] Set up API key restrictions
- [ ] Reviewed git history for sensitive data
- [ ] Tested emergency contacts feature
- [ ] Verified map functionality
- [ ] Checked browser console for errors

## 🚨 If API Key Is Exposed

1. **Immediately revoke** the exposed key
2. **Generate new key** in respective console
3. **Update** `.env.local` with new key
4. **Redeploy** application with new key
5. **Monitor** API usage for unauthorized access
6. **Review** git history and remove exposed key if committed

## 🛡️ Production Security

### HTTPS Only
- Ensure hosting platform uses HTTPS
- Redirect HTTP to HTTPS

### Content Security Policy
Consider adding CSP headers for production

### Rate Limiting
- Implement rate limiting for API calls
- Use API gateway if needed

### Error Handling
- Don't expose sensitive error details to users
- Log errors securely server-side

## 📞 Emergency Contacts Privacy

- All contacts stored in browser localStorage
- No server-side storage
- No cloud backup
- No analytics on contact data
- User has full control to edit/delete
