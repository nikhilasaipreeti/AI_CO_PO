import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import vignanLogo from '../assets/images/vignan.jpeg';
import api from '../services/api';

// ── Animated Teacher Illustration (pure SVG + CSS) ──────────────
const TeacherIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center select-none">

    {/* Floating feature badges */}
    {[
      { icon: '🎓', label: 'CO Generation', top: '8%', left: '5%', delay: 0 },
      { icon: '📊', label: 'Attainment', top: '8%', right: '5%', delay: 0.4 },
      { icon: '🤖', label: 'AI Powered', bottom: '18%', left: '3%', delay: 0.8 },
      { icon: '📋', label: 'NBA Ready', bottom: '18%', right: '3%', delay: 1.2 },
    ].map((badge, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ delay: badge.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg border"
        style={{
          top: badge.top, left: badge.left,
          right: badge.right, bottom: badge.bottom,
          borderColor: '#e8c9a0', fontSize: 12, fontWeight: 600,
          color: '#7c3a1e', whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: 16 }}>{badge.icon}</span>
        {badge.label}
      </motion.div>
    ))}

    {/* Main SVG illustration */}
    <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">

      {/* Desk */}
      <rect x="60" y="270" width="300" height="18" rx="6" fill="#c8762a" opacity="0.9"/>
      <rect x="90" y="288" width="12" height="60" rx="4" fill="#a0522d"/>
      <rect x="318" y="288" width="12" height="60" rx="4" fill="#a0522d"/>

      {/* Laptop base */}
      <rect x="110" y="220" width="200" height="52" rx="8" fill="#3d1a0a"/>
      <rect x="118" y="226" width="184" height="40" rx="5" fill="#1a0a04"/>
      {/* Laptop screen glow */}
      <rect x="120" y="228" width="180" height="36" rx="4" fill="#fdf6ee" opacity="0.95"/>

      {/* Screen content — code lines */}
      {[0,1,2,3,4].map(i => (
        <motion.rect
          key={i}
          x={130} y={234 + i * 6}
          width={0}
          height={3}
          rx={1.5}
          fill={i % 2 === 0 ? '#a0522d' : '#c8762a'}
          animate={{ width: [0, 60 + (i * 15) % 80, 0] }}
          transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Laptop hinge */}
      <rect x="110" y="268" width="200" height="6" rx="3" fill="#5c2a0e"/>

      {/* Teacher body */}
      {/* Chair */}
      <rect x="155" y="230" width="110" height="8" rx="4" fill="#7c3a1e" opacity="0.5"/>
      <rect x="155" y="238" width="8" height="40" rx="3" fill="#7c3a1e" opacity="0.4"/>
      <rect x="257" y="238" width="8" height="40" rx="3" fill="#7c3a1e" opacity="0.4"/>

      {/* Torso */}
      <rect x="175" y="175" width="70" height="65" rx="12" fill="#c8762a"/>
      {/* Collar / shirt detail */}
      <path d="M210 175 L200 190 L210 195 L220 190 Z" fill="#fdf6ee" opacity="0.6"/>

      {/* Left arm — typing */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '185px 185px' }}
      >
        <rect x="148" y="185" width="40" height="14" rx="7" fill="#e8a87c"/>
        {/* Hand */}
        <ellipse cx="148" cy="192" rx="10" ry="8" fill="#e8a87c"/>
        <rect x="140" y="188" width="6" height="10" rx="3" fill="#d4956a"/>
        <rect x="147" y="186" width="6" height="12" rx="3" fill="#d4956a"/>
        <rect x="154" y="187" width="6" height="11" rx="3" fill="#d4956a"/>
      </motion.g>

      {/* Right arm — typing */}
      <motion.g
        animate={{ rotate: [5, -5, 5] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '235px 185px' }}
      >
        <rect x="232" y="185" width="40" height="14" rx="7" fill="#e8a87c"/>
        {/* Hand */}
        <ellipse cx="272" cy="192" rx="10" ry="8" fill="#e8a87c"/>
        <rect x="266" y="188" width="6" height="10" rx="3" fill="#d4956a"/>
        <rect x="273" y="186" width="6" height="12" rx="3" fill="#d4956a"/>
        <rect x="280" y="187" width="6" height="11" rx="3" fill="#d4956a"/>
      </motion.g>

      {/* Neck */}
      <rect x="202" y="155" width="16" height="22" rx="6" fill="#e8a87c"/>

      {/* Head */}
      <ellipse cx="210" cy="138" rx="32" ry="36" fill="#e8a87c"/>

      {/* Hair */}
      <path d="M178 128 Q180 100 210 98 Q240 100 242 128 Q235 110 210 108 Q185 110 178 128Z" fill="#3d1a0a"/>

      {/* Eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1] }}
        style={{ transformOrigin: '200px 135px' }}
      >
        <ellipse cx="200" cy="135" rx="5" ry="5.5" fill="#3d1a0a"/>
        <ellipse cx="220" cy="135" rx="5" ry="5.5" fill="#3d1a0a"/>
      </motion.g>
      {/* Eye shine */}
      <circle cx="202" cy="133" r="1.5" fill="white"/>
      <circle cx="222" cy="133" r="1.5" fill="white"/>

      {/* Eyebrows */}
      <path d="M194 126 Q200 122 206 126" stroke="#3d1a0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M214 126 Q220 122 226 126" stroke="#3d1a0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Smile */}
      <path d="M202 148 Q210 155 218 148" stroke="#c8762a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Glasses */}
      <rect x="192" y="130" width="14" height="11" rx="5" stroke="#5c2a0e" strokeWidth="2" fill="none"/>
      <rect x="214" y="130" width="14" height="11" rx="5" stroke="#5c2a0e" strokeWidth="2" fill="none"/>
      <line x1="206" y1="135" x2="214" y2="135" stroke="#5c2a0e" strokeWidth="2"/>
      <line x1="192" y1="135" x2="186" y2="133" stroke="#5c2a0e" strokeWidth="2"/>
      <line x1="228" y1="135" x2="234" y2="133" stroke="#5c2a0e" strokeWidth="2"/>

      {/* Floating AI sparkles */}
      {[
        { cx: 310, cy: 120, r: 4, delay: 0 },
        { cx: 330, cy: 90, r: 3, delay: 0.5 },
        { cx: 350, cy: 115, r: 5, delay: 1 },
        { cx: 90, cy: 110, r: 4, delay: 0.3 },
        { cx: 70, cy: 85, r: 3, delay: 0.8 },
      ].map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="#fcd34d"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
        />
      ))}

      {/* Typing indicator dots above laptop */}
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={200 + i * 12} cy={215}
          r={3}
          fill="#c8762a"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  </div>
);

// ── Login Page ───────────────────────────────────────────────────
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      if (response && response.success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(response?.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#fdf6ee' }}>

      {/* ── LEFT — Illustration Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden p-10"
        style={{ background: 'linear-gradient(160deg, #7c3a1e 0%, #a0522d 50%, #c8762a 100%)' }}>

        {/* Top logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2 border-yellow-300" />
          <div>
            <p className="text-yellow-300 font-bold text-sm leading-tight">VIGNAN'S</p>
            <p className="text-white text-xs opacity-80">OBE AI System</p>
          </div>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-md mt-8">
          <TeacherIllustration />
        </div>

        {/* Text below illustration */}
        <div className="text-center mt-4 px-6">
          <h2 className="text-2xl font-bold text-white mb-2">AI-Powered OBE Management</h2>
          <p className="text-sm opacity-80" style={{ color: '#fde8c8' }}>
            Automate Course Outcomes, CO-PO mapping, and attainment calculation with Gemini AI
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-8 mt-6">
          {[['500+', 'Faculty Users'], ['1200+', 'Courses'], ['NBA', 'Ready']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-yellow-300">{val}</p>
              <p className="text-xs text-white opacity-70">{label}</p>
            </div>
          ))}
        </div>

        {/* Decorative circles */}
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
      </div>

      {/* ── RIGHT — Login Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2" style={{ borderColor: '#a0522d' }} />
            <div>
              <p className="font-bold" style={{ color: '#7c3a1e' }}>VIGNAN'S OBE AI</p>
              <p className="text-xs text-gray-500">Outcome Based Education System</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#7c3a1e' }}>Welcome Back!</h1>
            <p className="text-gray-500 text-sm">Sign in to your faculty account</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border p-8" style={{ borderColor: '#e8c9a0' }}>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="faculty@vignan.ac.in"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#e8c9a0', '--tw-ring-color': '#c8762a' }}
                    onFocus={e => e.target.style.borderColor = '#c8762a'}
                    onBlur={e => e.target.style.borderColor = '#e8c9a0'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#e8c9a0' }}
                    onFocus={e => e.target.style.borderColor = '#c8762a'}
                    onBlur={e => e.target.style.borderColor = '#e8c9a0'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange}
                    className="h-4 w-4 rounded" style={{ accentColor: '#a0522d' }} />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-medium hover:underline" style={{ color: '#a0522d' }}>
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                style={{ background: 'linear-gradient(135deg, #7c3a1e, #c8762a)' }}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: '#a0522d' }}>
                Sign up free
              </Link>
            </p>
          </div>

          <div className="text-center mt-5">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
