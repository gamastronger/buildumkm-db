# Quick Reference - ChatBot BumiBot

## Environment Setup

```bash
# .env file
VITE_ENABLE_CHATBOT=true
VITE_OPENROUTER_API_KEY=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
VITE_OPENROUTER_MODEL=deepseek/deepseek-chat
VITE_CHATBOT_NAME=BumiBot
```

## Files Created

1. `src/components/ChatBot.jsx` - Main chatbot component
2. `CHATBOT_GUIDE.md` - Comprehensive documentation
3. Updated `.env` - Added OpenRouter configuration
4. Updated `.env.example` - Added chatbot variables template

## Features

- AI-powered chat using DeepSeek via OpenRouter
- Floating chat button with notification badge
- Minimizable chat window
- Auto-scroll to latest messages
- Loading indicators
- Timestamp for each message
- Error handling
- Mobile responsive

## Usage

The chatbot will appear on the landing page when `VITE_ENABLE_CHATBOT=true`.

Users can:

1. Click the floating chat button (bottom right)
2. Ask questions about website packages, features, pricing
3. Get AI-powered recommendations for their UMKM business
4. Learn about the development process

## AI Prompt Context

BumiBot knows about:

- BuildUMKM platform and services
- Package pricing (Basic, Pro, Premium)
- Development timeline (3-7 days)
- Available features (landing page, catalog, forms, etc.)
- Hosting and domain information

## Testing

1. Start dev server: `npm run dev`
2. Open landing page
3. Click chat button (bottom right)
4. Try these questions:
   - "Berapa harga website toko online?"
   - "Saya butuh website katalog produk, paket apa yang cocok?"
   - "Fitur apa saja yang tersedia?"

## API Details

- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `deepseek/deepseek-chat`
- **Cost**: ~$0.14 per 1M tokens (very cheap!)
- **Rate Limits**: Generous for small-medium apps

## Quick Customization

### Change Colors

Find and replace in `ChatBot.jsx`:

- `purple-600` → your color
- `purple-500` → your lighter shade

### Change Position

In `ChatBot.jsx`, change:

- `bottom-6 right-6` → `bottom-6 left-6` (move to left)
- `bottom-6` → `top-20` (move to top)

### Change AI Model

In `.env`:

```bash
VITE_OPENROUTER_MODEL=openai/gpt-4o        # More powerful, more expensive
VITE_OPENROUTER_MODEL=anthropic/claude-3   # Alternative AI
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Chatbot not showing | Check `VITE_ENABLE_CHATBOT=true` in `.env` and restart server |
| API errors | Verify API key is correct, check console for details |
| Slow responses | Normal for AI processing, wait 2-5 seconds |

## Next Steps

1. Test chatbot functionality
2. Customize system prompt for your needs
3. Add conversation history persistence
4. Consider adding quick reply buttons
5. Monitor API usage on OpenRouter dashboard

---

Ready to use! Just start your dev server and test the chatbot.
