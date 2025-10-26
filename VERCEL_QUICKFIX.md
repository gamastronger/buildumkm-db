# 🚀 QUICK FIX - ChatBot Tidak Muncul di Vercel

## ⚠️ MASALAH
ChatBot tidak tampil di https://buildumkm.vercel.app padahal di localhost berfungsi.

## ✅ SOLUSI CEPAT (5 Menit)

### Langkah 1: Buka Vercel Dashboard
```
https://vercel.com/dashboard
```
Login → Pilih project "buildumkm"

### Langkah 2: Tambah Environment Variables

Klik: **Settings** → **Environment Variables**

Tambahkan 4 variables ini:

```
Name: VITE_ENABLE_CHATBOT
Value: true
Environment: ✓ Production ✓ Preview ✓ Development
```

```
Name: VITE_OPENROUTER_API_KEY  
Value: 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
Environment: ✓ Production ✓ Preview ✓ Development
```

```
Name: VITE_OPENROUTER_MODEL
Value: deepseek/deepseek-chat
Environment: ✓ Production ✓ Preview ✓ Development
```

```
Name: VITE_CHATBOT_NAME
Value: BumiBot
Environment: ✓ Production ✓ Preview ✓ Development
```

### Langkah 3: Redeploy

**Cara 1 - Via Dashboard:**
- Klik tab **Deployments**
- Klik menu ⋯ pada deployment teratas
- Klik **Redeploy**
- Tunggu 2-3 menit

**Cara 2 - Via Git Push:**
```bash
git add .
git commit -m "Fix: Enable chatbot for production"
git push
```

### Langkah 4: Verifikasi

1. Tunggu deployment selesai
2. Buka https://buildumkm.vercel.app
3. Tekan Ctrl+Shift+R (hard refresh)
4. ChatBot muncul di pojok kanan bawah ✓

## 📸 Screenshot Panduan

### Tampilan Settings di Vercel:
```
┌────────────────────────────────────────┐
│ Settings                               │
├────────────────────────────────────────┤
│ ▶ General                              │
│ ▶ Domains                              │
│ ▼ Environment Variables         [Add] │
│   ┌──────────────────────────────────┐ │
│   │ VITE_ENABLE_CHATBOT              │ │
│   │ Value: true                      │ │
│   │ Env: Production, Preview, Dev    │ │
│   └──────────────────────────────────┘ │
│   ┌──────────────────────────────────┐ │
│   │ VITE_OPENROUTER_API_KEY          │ │
│   │ Value: sk-or-v1-***              │ │
│   │ Env: Production, Preview, Dev    │ │
│   └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

## ⚡ Troubleshooting

**Masih tidak muncul setelah redeploy?**

1. **Clear cache browser**
   - Chrome: Ctrl + Shift + Delete
   - Atau buka Incognito: Ctrl + Shift + N

2. **Cek Console Browser**
   - Tekan F12
   - Lihat tab Console
   - Cek ada error merah?

3. **Verifikasi Environment Variables**
   - Kembali ke Vercel Dashboard
   - Settings → Environment Variables
   - Pastikan 4 variables ada semua
   - Pastikan tidak ada typo

4. **Check Build Logs**
   - Tab Deployments
   - Klik deployment terakhir
   - Scroll ke bawah lihat logs
   - Cari error (teks merah)

## 🔒 PENTING - Keamanan

**API Key sudah terexpose!** Untuk keamanan:

1. **Regenerate API Key baru:**
   - Login ke https://openrouter.ai
   - Account Settings → API Keys
   - Create New Key
   - Copy key baru

2. **Update di Vercel:**
   - Settings → Environment Variables
   - Edit VITE_OPENROUTER_API_KEY
   - Paste key baru
   - Save → Redeploy

3. **JANGAN share API key** di public docs/code

## ✓ Checklist

- [ ] Sudah login Vercel
- [ ] Sudah tambah 4 environment variables
- [ ] Sudah centang Production/Preview/Development
- [ ] Sudah klik Save untuk setiap variable
- [ ] Sudah Redeploy
- [ ] Sudah tunggu deployment selesai
- [ ] Sudah hard refresh browser (Ctrl+Shift+R)
- [ ] ChatBot muncul di website ✓
- [ ] ChatBot bisa dipakai dan merespon ✓
- [ ] (Optional) Sudah regenerate API key baru

## 💡 Tips

- Setiap kali tambah/edit env variable, HARUS redeploy
- Variable name HARUS persis (case-sensitive)
- Variable name HARUS diawali VITE_ untuk Vite
- Hard refresh (Ctrl+Shift+R) wajib setelah deploy
- Tunggu 2-3 menit untuk deployment selesai

## 📞 Still Need Help?

Jika masih error:
1. Screenshot error di console browser (F12)
2. Screenshot environment variables di Vercel
3. Screenshot build logs
4. Contact support

---

**Estimasi waktu**: 5 menit
**Difficulty**: Easy ⭐
**Success rate**: 99%

Good luck! 🚀
