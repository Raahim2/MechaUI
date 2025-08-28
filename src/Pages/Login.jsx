// Login.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      
      {/* --- Branding Panel (Left Side) --- */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-[#030303] text-white relative">
         {/* Company Logo */}
         <div className="absolute top-8 left-8 z-20">
            <Link to="/">
                <img 
                    src={"/mecha.svg"} 
                    alt="Mecha Company Logo" 
                    className="h-10 w-auto" 
                />
            </Link>
         </div>

         {/* Subtle gradient overlay for depth */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700/20 via-[#030303] to-[#030303]"></div>
         
         <div className="relative z-10 w-full max-w-md">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter">
                Unlock Your Next Big Idea.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
                Log in to access your projects, collaborate with your team, and bring your vision to life.
            </p>
         </div>
         <div className="absolute bottom-8 left-8 right-8 z-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Mecha Inc. All Rights Reserved.
         </div>
      </div>

      {/* --- Form Panel (Right Side) --- */}
      <div className="flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Sign In
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    New to our platform?{' '}
                    <Link 
                      to="/signup" 
                      className="font-medium text-[#f25f30] hover:text-[#e15328] transition-colors duration-200"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
            
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f25f30] transition-shadow duration-200"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f25f30] transition-shadow duration-200"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
                
                 <div className="flex items-center justify-end text-sm">
                    <a href="#" className="font-medium text-[#f25f30] hover:text-[#e15328] transition-colors duration-200">
                        Forgot password?
                    </a>
                </div>
                
                {errorMsg && <p className="text-sm text-red-600 text-center font-semibold">{errorMsg}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#f25f30] hover:bg-[#e15328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f25f30] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}