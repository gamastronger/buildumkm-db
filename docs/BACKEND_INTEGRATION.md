# BuildUMKM - Quick Backend Integration Guide

## Status: SIAP UNTUK BACKEND

Proyek sudah 90% siap untuk integrasi backend!

---

## Yang Sudah Disiapkan

### 1. Environment Variables

- ✅ `.env` - Configuration file
- ✅ `.env.example` - Template

### 2. API Infrastructure

- ✅ `src/config/api.config.js` - API endpoints
- ✅ `src/utils/apiClient.js` - Axios client dengan interceptors
- ✅ `src/services/authService.js` - Auth API calls
- ✅ `src/services/projectService.js` - Project API calls
- ✅ `src/services/uploadService.js` - Upload API calls

### 3. Dependencies

- ✅ Axios sudah terinstall

---

## ⚡ Quick Start

### 1. Update Environment Variables

Edit file `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Ganti dengan URL backend Anda.

### 2. Update Login.jsx (3 menit)

**File:** `src/pages/Login.jsx`

**Ganti ini (line ~5):**

```javascript
import { authenticateUser, getRedirectPath } from '../data/dummyUsers';
```

**Dengan:**

```javascript
import authService from '../services/authService';
import { getRedirectPath } from '../data/dummyUsers';
```

**Ganti handleSubmit (line ~17):**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  setTimeout(() => {
    const user = authenticateUser(formData.email, formData.password);
    
    if (user) {
      login(user);
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath);
    } else {
      setError('Email atau password salah!');
    }
    
    setLoading(false);
  }, 500);
};
```

**Dengan:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const { user, token } = await authService.login(formData);
    login(user, token);
    const redirectPath = getRedirectPath(user.role);
    navigate(redirectPath);
  } catch (error) {
    setError(error.message || 'Email atau password salah!');
  } finally {
    setLoading(false);
  }
};
```

### 3. Update AuthContext.jsx (2 menit)

**File:** `src/context/AuthContext.jsx`

**Update login function (line ~24):**

```javascript
const login = (userData, token) => {
  setUser(userData);
  localStorage.setItem('buildumkm_user', JSON.stringify(userData));
  if (token) {
    localStorage.setItem('buildumkm_token', token);
  }
};
```

**Update logout function (line ~28):**

```javascript
const logout = () => {
  setUser(null);
  localStorage.removeItem('buildumkm_user');
  localStorage.removeItem('buildumkm_token');
  localStorage.removeItem('buildumkm_refresh_token');
};
```

### 4. Update Register.jsx (3 menit)

**File:** `src/pages/Register.jsx`

**Add import (line ~4):**

```javascript
import authService from '../services/authService';
```

**Update handleSubmit:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError('Password tidak cocok!');
    setLoading(false);
    return;
  }

  try {
    await authService.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      businessName: formData.businessName,
      phone: formData.phone,
      role: userType
    });
    
    // Success - redirect to login
    navigate('/login?registered=true');
  } catch (error) {
    setError(error.message || 'Registrasi gagal. Silakan coba lagi.');
  } finally {
    setLoading(false);
  }
};
```

---

## ✅ Testing

1. Start backend server
2. Update `.env` dengan backend URL
3. Test login dengan backend API
4. Test register
5. Test protected routes
6. Test logout

---

## 📚 Documentation

- **Lengkap:** `BACKEND_READY.md` - Analisis lengkap & checklist
- **API Config:** `src/config/api.config.js` - Semua endpoints
- **API Client:** `src/utils/apiClient.js` - Axios setup

---

## 🎯 Next Steps

1. Update Login.jsx (3 min)
2. Update AuthContext.jsx (2 min)
3. Update Register.jsx (3 min)
4. Test & deploy! 🚀

**Total Time: ~10 menit** untuk basic integration!

---

## 💡 Tips

- API client sudah handle token automatically
- Error handling sudah built-in
- Token refresh mechanism sudah ada
- File upload sudah siap pakai

Good luck! 🚀
