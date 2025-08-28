// Signup.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

// Checkmark SVG for the success message
const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Success! Please check your email for a confirmation link to complete your registration.');
      // Keep the success message on screen for a few seconds before redirecting
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Increased delay for better readability
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      
      {/* --- Branding Panel (Left Side) --- */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-[#030303] text-white relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700/20 via-[#030303] to-[#000000]"></div>

         <div className="absolute top-8 left-8 z-20">
            <Link to="/">
                <img 
                    src={"/mecha.svg"} 
                    alt="Mecha Company Logo" 
                    className="h-10 w-auto" 
                />
            </Link>
          </div>
         
         <div className="relative z-10 w-full max-w-md">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter">
                Create Something Amazing.
            </h1>
            <p className="mt-4 text-lg text-gray-300">
                Join a community of creators and innovators. Sign up to start building, sharing, and growing.
            </p>
         </div>
         <div className="absolute bottom-8 left-8 right-8 z-10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Mecha AI Inc. All Rights Reserved.
         </div>
      </div>

      {/* --- Form Panel (Right Side) --- */}
      <div className="flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">

          {/* This block will show the form, OR the success message */}
          {!successMsg ? (
            <div className="space-y-8">
              <div>
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                      Create Your Account
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="font-medium text-[#f25f30] hover:text-[#e15328] transition-colors duration-200"
                      >
                          Sign in
                      </Link>
                  </p>
              </div>
              
              <form onSubmit={handleSignup} className="mt-8 space-y-6">
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
                              minLength={6} // Important for Supabase default policy
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f25f30] transition-shadow duration-200"
                              placeholder="Create a strong password"
                          />
                      </div>
                  </div>
                  
                  {errorMsg && <p className="text-sm text-red-600 text-center font-semibold">{errorMsg}</p>}

                  <div>
                      <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#f25f30] hover:bg-[#e15328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f25f30] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                      >
                          {loading ? 'Creating Account...' : 'Create Account'}
                      </button>
                  </div>
              </form>
            </div>
          ) : (
            // Success Message UI
            <div className="text-center space-y-4">
                <SuccessIcon />
                <h3 className="text-2xl font-bold text-gray-900">Registration Successful!</h3>
                <p className="text-gray-600">{successMsg}</p>
                <p className="text-sm text-gray-500">Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}