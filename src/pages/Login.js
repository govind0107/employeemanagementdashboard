import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Try: admin@example.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
            <span className="text-white text-3xl font-bold">EM</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Log in to manage your team</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Work Email</label>
            <input 
              type="email" 
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="name@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98]">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;