# Panduan ChatBot BuildUMKM (BumiBot)

## Deskripsi

BumiBot adalah chatbot AI yang diintegrasikan di landing page BuildUMKM untuk membantu calon klien UMKM mendapatkan konsultasi tentang:

- Kebutuhan website bisnis mereka
- Rekomendasi fitur yang sesuai
- Informasi paket dan harga
- Estimasi waktu pengerjaan
- Proses pembuatan website

## Teknologi

- **AI Provider**: OpenRouter (<https://openrouter.ai>)
- **AI Model**: DeepSeek Chat (deepseek/deepseek-chat)
- **Framework**: React dengan framer-motion untuk animasi
- **API**: REST API dengan fetch

## Setup

### 1. Environment Variables

Tambahkan ke file `.env`:

```bash
# Enable chatbot
VITE_ENABLE_CHATBOT=true

# OpenRouter Configuration
VITE_OPENROUTER_API_KEY=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
VITE_OPENROUTER_MODEL=deepseek/deepseek-chat
VITE_CHATBOT_NAME=BumiBot
```

### 2. File Structure

```
src/
  components/
    ChatBot.jsx         # Komponen chatbot utama
  pages/
    LandingPage.jsx     # Landing page dengan chatbot
```

## Fitur ChatBot

### 1. UI Features

- Floating chat button dengan notifikasi
- Chat window yang bisa diminimize
- Smooth scrolling untuk messages
- Loading indicator saat AI memproses
- Timestamp untuk setiap pesan
- Animasi yang smooth

### 2. AI Capabilities

BumiBot dilatih untuk membantu dengan:

- Konsultasi kebutuhan website UMKM
- Saran fitur berdasarkan jenis bisnis
- Informasi paket dan harga:
  - Paket Basic: Rp 500.000 (5 halaman, hosting 1 tahun, domain gratis)
  - Paket Pro: Rp 1.500.000 (10 halaman, hosting 1 tahun, domain gratis, SEO basic)
  - Paket Premium: Rp 3.000.000 (Unlimited halaman, hosting 1 tahun, domain gratis, SEO advanced, maintenance)
- Waktu pengerjaan: 3-7 hari kerja
- Fitur: Landing page, katalog produk, kontak form, WhatsApp integration, Google Maps, admin panel

### 3. User Experience

- Auto-focus input saat chat dibuka
- Enter untuk kirim pesan
- Scroll otomatis ke pesan terbaru
- Responsive design
- Mobile friendly

## Cara Menggunakan

### Untuk User (UMKM)

1. Buka landing page BuildUMKM
2. Klik tombol chat floating di kanan bawah
3. Ketik pertanyaan atau kebutuhan Anda
4. BumiBot akan memberikan saran dan informasi
5. Lanjutkan percakapan sesuai kebutuhan

### Contoh Pertanyaan

- "Saya punya bisnis kopi, website apa yang cocok?"
- "Berapa harga untuk website toko online?"
- "Fitur apa yang ada di paket basic?"
- "Berapa lama website jadi?"
- "Saya butuh website katalog produk, paket mana yang cocok?"

## Kustomisasi

### Mengubah AI Model

Edit di `.env`:

```bash
# Ganti dengan model lain dari OpenRouter
VITE_OPENROUTER_MODEL=openai/gpt-4o
# atau
VITE_OPENROUTER_MODEL=anthropic/claude-3-opus
```

### Mengubah System Prompt

Edit file `src/components/ChatBot.jsx` di bagian system message:

```javascript
{
  role: 'system',
  content: `Kamu adalah BumiBot... [edit sesuai kebutuhan]`
}
```

### Mengubah Styling

Edit di `src/components/ChatBot.jsx`:

- Warna: Ganti `purple-600` dengan warna lain
- Ukuran: Ubah `w-96` (width) dan `h-600px` (height)
- Posisi: Ubah `bottom-6 right-6`

## API Integration

### Request Format

```javascript
fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'HTTP-Referer': window.location.origin,
    'X-Title': 'BuildUMKM',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
      { role: 'system', content: '...' },
      { role: 'user', content: '...' }
    ]
  })
})
```

### Response Format

```javascript
{
  choices: [
    {
      message: {
        role: 'assistant',
        content: 'Respons dari AI...'
      }
    }
  ]
}
```

## Keamanan

1. **API Key**: Disimpan di `.env` (tidak di-commit ke git)
2. **Rate Limiting**: OpenRouter menerapkan rate limit otomatis
3. **Referer Check**: Header `HTTP-Referer` untuk tracking
4. **Error Handling**: Fallback message jika API error

## Troubleshooting

### ChatBot tidak muncul

- Pastikan `VITE_ENABLE_CHATBOT=true` di `.env`
- Restart development server setelah edit `.env`

### API Error

- Cek API key valid
- Cek koneksi internet
- Cek console browser untuk error detail

### Respons lambat

- Normal untuk model AI, tunggu beberapa detik
- Cek status OpenRouter: <https://status.openrouter.ai>

### Styling tidak sesuai

- Pastikan Tailwind CSS sudah ter-compile
- Cek browser console untuk CSS errors

## Cost & Limits

### OpenRouter Pricing

- DeepSeek Chat: Sangat murah (~$0.14 per 1M tokens input, ~$0.28 per 1M tokens output)
- Free tier tersedia untuk testing
- Pay-as-you-go untuk production

### Rate Limits

- Tergantung model yang digunakan
- DeepSeek: Cukup generous untuk aplikasi kecil-menengah
- Monitor usage di dashboard OpenRouter

## Best Practices

1. **System Prompt**
   - Jelas dan spesifik tentang role chatbot
   - Include informasi penting (harga, fitur)
   - Gunakan bahasa yang konsisten

2. **Error Handling**
   - Selalu tampilkan pesan error yang user-friendly
   - Log error untuk debugging
   - Berikan alternatif jika API gagal

3. **User Experience**
   - Auto-scroll ke pesan baru
   - Loading indicator yang jelas
   - Responsive di semua device

4. **Performance**
   - Debounce input jika perlu
   - Limit panjang history chat
   - Optimize re-renders

## Future Improvements

### Planned Features

- [ ] Export chat history
- [ ] Suggested questions/quick replies
- [ ] Multi-language support
- [ ] Voice input
- [ ] File/image upload
- [ ] Chat history persistence (localStorage)
- [ ] Typing indicator
- [ ] Read receipts
- [ ] Integration dengan backend (save conversations)

### Advanced Features

- [ ] RAG (Retrieval Augmented Generation) untuk data spesifik
- [ ] Function calling untuk booking/payment
- [ ] Multi-agent conversation
- [ ] Sentiment analysis
- [ ] Auto-translation

## Resources

- OpenRouter Documentation: <https://openrouter.ai/docs>
- DeepSeek Model: <https://openrouter.ai/models/deepseek/deepseek-chat>
- Request Builder: <https://openrouter.ai/request-builder>
- API Status: <https://status.openrouter.ai>

## Support

Jika ada pertanyaan atau masalah:

1. Cek dokumentasi ini
2. Cek OpenRouter docs
3. Contact developer team

---

**Last Updated**: October 27, 2025
**Version**: 1.0.0
**Author**: BuildUMKM Team
