// Data dummy untuk testing login
// Gunakan ini sementara sebelum integrasi dengan backend

export const dummyUsers = [
  {
    id: 1,
    email: 'umkm@test.com',
    password: 'umkm123',
    role: 'umkm',
    name: 'Ibu Siti',
    businessName: 'Batik Siti',
    phone: '081234567890',
    address: 'Surabaya, Jawa Timur'
  },
  {
    id: 2,
    email: 'developer@test.com',
    password: 'dev123',
    role: 'developer',
    name: 'Budi Santoso',
    skills: ['React', 'Node.js', 'Tailwind CSS'],
    portfolio: 'https://portfolio.example.com',
    phone: '081234567891'
  },
  {
    id: 3,
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin BuildUMKM',
    phone: '081234567892'
  }
];

// Helper function untuk mendapatkan user berdasarkan email dan password
export const authenticateUser = (email, password) => {
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    // Return user tanpa password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

// Helper function untuk mendapatkan redirect path berdasarkan role
export const getRedirectPath = (role) => {
  const paths = {
    'umkm': '/dashboard-umkm',
    'developer': '/dashboard-developer',
    'admin': '/dashboard-admin'
  };
  
  return paths[role] || '/';
};
