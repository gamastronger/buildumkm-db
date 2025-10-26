# Setup Environment Variables di Vercel

## Masalah

ChatBot tidak tampil di production (Vercel) karena environment variables belum di-set.

## Solusi

### Step 1: Login ke Vercel Dashboard

1. Buka <https://vercel.com>
2. Login dengan akun Anda
3. Pilih project `buildumkm`

### Step 2: Set Environment Variables

1. Klik tab **Settings**
2. Klik **Environment Variables** di sidebar
3. Tambahkan variable berikut satu per satu:

#### Required Variables untuk ChatBot

**VITE_ENABLE_CHATBOT**

- Name: `VITE_ENABLE_CHATBOT`
- Value: `true`
- Environment: Production, Preview, Development (pilih semua)

**VITE_OPENROUTER_API_KEY**

- Name: `VITE_OPENROUTER_API_KEY`
- Value: `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`
- Environment: Production, Preview, Development (pilih semua)

**VITE_OPENROUTER_MODEL**

- Name: `VITE_OPENROUTER_MODEL`
- Value: `deepseek/deepseek-chat`
- Environment: Production, Preview, Development (pilih semua)

**VITE_CHATBOT_NAME**

- Name: `VITE_CHATBOT_NAME`
- Value: `BumiBot`
- Environment: Production, Preview, Development (pilih semua)

#### Optional - Other Variables

**VITE_APP_NAME**

- Name: `VITE_APP_NAME`
- Value: `BuildUMKM`

**VITE_APP_VERSION**

- Name: `VITE_APP_VERSION`
- Value: `1.0.0`

**VITE_API_URL**

- Name: `VITE_API_URL`
- Value: `https://buildumkm.vercel.app/api`

### Step 3: Redeploy

Setelah menambahkan semua environment variables:

1. Klik tab **Deployments**
2. Klik tombol **...** (three dots) pada deployment terbaru
3. Klik **Redeploy**
4. Atau bisa langsung push code baru ke Git

### Step 4: Verify

1. Tunggu deployment selesai (2-3 menit)
2. Buka <https://buildumkm.vercel.app>
3. ChatBot seharusnya sudah muncul di pojok kanan bawah

## Alternative: Gunakan Vercel CLI

```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add VITE_ENABLE_CHATBOT
# Ketik: true

vercel env add VITE_OPENROUTER_API_KEY
# Ketik: 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

vercel env add VITE_OPENROUTER_MODEL
# Ketik: deepseek/deepseek-chat

vercel env add VITE_CHATBOT_NAME
# Ketik: BumiBot

# Redeploy
vercel --prod
```

## Troubleshooting

### ChatBot masih tidak muncul setelah redeploy?

1. **Clear Browser Cache**
   - Tekan Ctrl+Shift+R (hard refresh)
   - Atau buka Incognito/Private window

2. **Check Console Browser**
   - Tekan F12
   - Lihat tab Console
   - Cek ada error atau tidak

3. **Verify Environment Variables**
   - Di Vercel Dashboard > Settings > Environment Variables
   - Pastikan semua variable sudah ada
   - Pastikan tidak ada typo di nama variable

4. **Check Build Logs**
   - Di Vercel Dashboard > Deployments
   - Klik deployment terbaru
   - Lihat build logs untuk error

### Environment Variable tidak terbaca?

Pastikan:

- Nama variable HARUS diawali dengan `VITE_`
- Tidak ada spasi di value
- Sudah pilih environment (Production/Preview/Development)
- Sudah redeploy setelah menambah variable

## Security Note

**PENTING:** API Key OpenRouter sudah terexpose di dokumentasi ini. Untuk production:

1. **Regenerate API Key** di <https://openrouter.ai>
2. Update di Vercel Environment Variables
3. JANGAN share API key di public documentation
4. Gunakan environment variable yang aman

## Final Checklist

- [ ] Semua environment variables sudah di-set di Vercel
- [ ] ChatBot component sudah tidak ada conditional rendering
- [ ] Sudah redeploy di Vercel
- [ ] ChatBot muncul di <https://buildumkm.vercel.app>
- [ ] API key berfungsi dengan baik
- [ ] Regenerate API key untuk keamanan

---

**Last Updated**: October 27, 2025
**Status**: Ready for deployment
