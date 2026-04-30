import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import vignanLogo from '../assets/images/vignan.jpeg';

// ── Left panel illustration (same teacher, different text) ───────
const RegisterIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center select-none">
    {/* Floating badges */}
    {[
      { icon: '✅', label: 'CO Mapping', top: '6%', left: '4%', delay: 0 },
      { icon: '📈', label: 'Analytics', top: '6%', right: '4%', delay: 0.5 },
      { icon: '🏆', label: 'NBA Accred.', bottom: '16%', left: '2%', delay: 1 },
      { icon: '💡', label: 'AI Insights', bottom: '16%', right: '2%', delay: 1.5 },
    ].map((badge, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ delay: badge.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg border"
        style={{
          top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom,
          borderColor: '#e8c9a0', fontSize: 12, fontWeight: 600,
          color: '#7c3a1e', whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: 16 }}>{badge.icon}</span>
        {badge.label}
      </motion.div>
    ))}

    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
      {/* Desk */}
      <rect x="60" y="260" width="300" height="16" rx="6" fill="#c8762a" opacity="0.9"/>
      <rect x="90" y="276" width="12" height="50" rx="4" fill="#a0522d"/>
      <rect x="318" y="276" width="12" height="50" rx="4" fill="#a0522d"/>

      {/* Laptop */}
      <rect x="110" y="212" width="200" height="50" rx="8" fill="#3d1a0a"/>
      <rect x="118" y="218" width="184" height="38" rx="5" fill="#fdf6ee" opacity="0.95"/>

      {/* Screen — bar chart animation */}
      {[0,1,2,3].map(i => (
        <motion.rect
          key={i}
          x={130 + i * 38} y={240}
          width={20} height={0}
          rx={3}
          fill={['#c8762a','#a0522d','#7c3a1e','#e8a87c'][i]}
          animate={{ height: [0, 10 + i * 5, 0], y: [240, 230 - i * 5, 240] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Hinge */}
      <rect x="110" y="258" width="200" height="6" rx="3" fill="#5c2a0e"/>

      {/* Body */}
      <rect x="175" y="168" width="70" height="62" rx="12" fill="#c8762a"/>
      <path d="M210 168 L200 182 L210 187 L220 182 Z" fill="#fdf6ee" opacity="0.6"/>

      {/* Arms typing */}
      <motion.g animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 0.7, repeat: Infinity }}
        style={{ transformOrigin: '185px 178px' }}>
        <rect x="148" y="178" width="40" height="13" rx="7" fill="#e8a87c"/>
        <ellipse cx="148" cy="184" rx="10" ry="7" fill="#e8a87c"/>
        <rect x="140" y="180" width="6" height="9" rx="3" fill="#d4956a"/>
        <rect x="147" y="178" width="6" height="11" rx="3" fill="#d4956a"/>
        <rect x="154" y="179" width="6" height="10" rx="3" fill="#d4956a"/>
      </motion.g>
      <motion.g animate={{ rotate: [4, -4, 4] }} transition={{ duration: 0.7, repeat: Infinity }}
        style={{ transformOrigin: '235px 178px' }}>
        <rect x="232" y="178" width="40" height="13" rx="7" fill="#e8a87c"/>
        <ellipse cx="272" cy="184" rx="10" ry="7" fill="#e8a87c"/>
        <rect x="266" y="180" width="6" height="9" rx="3" fill="#d4956a"/>
        <rect x="273" y="178" width="6" height="11" rx="3" fill="#d4956a"/>
        <rect x="280" y="179" width="6" height="10" rx="3" fill="#d4956a"/>
      </motion.g>

      {/* Neck */}
      <rect x="202" y="148" width="16" height="22" rx="6" fill="#e8a87c"/>

      {/* Head */}
      <ellipse cx="210" cy="130" rx="32" ry="34" fill="#e8a87c"/>

      {/* Hair */}
      <path d="M178 120 Q180 94 210 92 Q240 94 242 120 Q235 104 210 102 Q185 104 178 120Z" fill="#3d1a0a"/>

      {/* Eyes */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '210px 128px' }}>
        <ellipse cx="200" cy="128" rx="5" ry="5" fill="#3d1a0a"/>
        <ellipse cx="220" cy="128" rx="5" ry="5" fill="#3d1a0a"/>
      </motion.g>
      <circle cx="202" cy="126" r="1.5" fill="white"/>
      <circle cx="222" cy="126" r="1.5" fill="white"/>

      {/* Eyebrows */}
      <path d="M194 119 Q200 115 206 119" stroke="#3d1a0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M214 119 Q220 115 226 119" stroke="#3d1a0a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Smile */}
      <path d="M202 141 Q210 148 218 141" stroke="#c8762a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Glasses */}
      <rect x="192" y="123" width="14" height="11" rx="5" stroke="#5c2a0e" strokeWidth="2" fill="none"/>
      <rect x="214" y="123" width="14" height="11" rx="5" stroke="#5c2a0e" strokeWidth="2" fill="none"/>
      <line x1="206" y1="128" x2="214" y2="128" stroke="#5c2a0e" strokeWidth="2"/>
      <line x1="192" y1="128" x2="186" y2="126" stroke="#5c2a0e" strokeWidth="2"/>
      <line x1="228" y1="128" x2="234" y2="126" stroke="#5c2a0e" strokeWidth="2"/>

      {/* Sparkles */}
      {[{cx:320,cy:110,r:4,d:0},{cx:340,cy:82,r:3,d:0.6},{cx:90,cy:100,r:4,d:0.3},{cx:70,cy:78,r:3,d:0.9}].map((s,i)=>(
        <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fcd34d"
          animate={{ opacity:[0.2,1,0.2], scale:[0.8,1.3,0.8] }}
          transition={{ duration:2, delay:s.d, repeat:Infinity }}/>
      ))}

      {/* Typing dots */}
      {[0,1,2].map(i=>(
        <motion.circle key={i} cx={200+i*12} cy={206} r={3} fill="#c8762a"
          animate={{ y:[0,-6,0] }} transition={{ duration:0.8, delay:i*0.2, repeat:Infinity }}/>
      ))}
    </svg>
  </div>
);

// ── Register Page ────────────────────────────────────────────────
const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', department: '', employeeId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validateStep1 = () => {
    if (!formData.name || !formData.email) { toast.error('Please fill all required fields'); return false; }
    if (!formData.email.includes('@')) { toast.error('Please enter a valid email'); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) { toast.error('Please fill all password fields'); return false; }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return false; }
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: '#e8c9a0',
    transition: 'border-color 0.2s'
  };
  const inputFocus = (e) => e.target.style.borderColor = '#c8762a';
  const inputBlur = (e) => e.target.style.borderColor = '#e8c9a0';

  return (
    <div className="min-h-screen flex" style={{ background: '#fdf6ee' }}>

      {/* ── LEFT — Illustration ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden p-10"
        style={{ background: 'linear-gradient(160deg, #7c3a1e 0%, #a0522d 50%, #c8762a 100%)' }}>

        <div className="absolute top-8 left-8 flex items-center gap-3">
          <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2 border-yellow-300" />
          <div>
            <p className="text-yellow-300 font-bold text-sm leading-tight">VIGNAN'S</p>
            <p className="text-white text-xs opacity-80">OBE AI System</p>
          </div>
        </div>

        <div className="w-full max-w-md mt-8">
          <RegisterIllustration />
        </div>

        <div className="text-center mt-2 px-6">
          <h2 className="text-2xl font-bold text-white mb-2">Join Vignan OBE Platform</h2>
          <p className="text-sm opacity-80" style={{ color: '#fde8c8' }}>
            Create your faculty account and start automating your OBE workflow today
          </p>
        </div>

        {/* Benefits list */}
        <div className="mt-5 space-y-2 w-full max-w-xs">
          {['AI-powered CO generation', 'Automatic attainment calculation', 'NBA-ready report export'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-yellow-300 flex-shrink-0" />
              <span className="text-sm text-white opacity-90">{item}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
      </div>

      {/* ── RIGHT — Register Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2" style={{ borderColor: '#a0522d' }} />
            <div>
              <p className="font-bold" style={{ color: '#7c3a1e' }}>VIGNAN'S OBE AI</p>
              <p className="text-xs text-gray-500">Outcome Based Education System</p>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#7c3a1e' }}>Create Account</h1>
            <p className="text-gray-500 text-sm">Join our OBE automation platform</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border p-8" style={{ borderColor: '#e8c9a0' }}>

            {/* Step indicator */}
            <div className="flex items-center mb-7">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                      style={{
                        background: step >= s ? 'linear-gradient(135deg, #7c3a1e, #c8762a)' : '#f3e8d8',
                        color: step >= s ? 'white' : '#a0522d'
                      }}>
                      {step > s ? '✓' : s}
                    </div>
                    <span className="text-sm font-medium" style={{ color: step >= s ? '#7c3a1e' : '#c9a07a' }}>
                      {s === 1 ? 'Personal Info' : 'Security'}
                    </span>
                  </div>
                  {s < 2 && (
                    <div className="flex-1 h-1 mx-3 rounded-full transition-all"
                      style={{ background: step >= 2 ? 'linear-gradient(90deg, #7c3a1e, #c8762a)' : '#f3e8d8' }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Full Name *</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required
                        placeholder="Dr. John Smith"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Email Address *</label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required
                        placeholder="faculty@vignan.ac.in"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Department</label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select name="department" value={formData.department} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none appearance-none bg-white"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur}>
                        <option value="">Select Department</option>
                        <option>Computer Science</option>
                        <option>Information Technology</option>
                        <option>Electronics</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                      </select>
                    </div>
                  </div>

                  {/* Employee ID */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Employee ID</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange}
                      placeholder="EMP001"
                      className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none"
                      style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>

                  <button type="button" onClick={() => validateStep1() && setStep(2)}
                    className="w-full mt-2 py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #7c3a1e, #c8762a)' }}>
                    Next Step →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Password *</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                        onChange={handleChange} required placeholder="Min. 6 characters"
                        className="w-full pl-10 pr-10 py-3 border rounded-lg text-sm focus:outline-none"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#7c3a1e' }}>Confirm Password *</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                        value={formData.confirmPassword} onChange={handleChange} required placeholder="Re-enter password"
                        className="w-full pl-10 pr-10 py-3 border rounded-lg text-sm focus:outline-none"
                        style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    {/* Password match indicator */}
                    {formData.confirmPassword && (
                      <p className="text-xs mt-1" style={{ color: formData.password === formData.confirmPassword ? '#16a34a' : '#dc2626' }}>
                        {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 py-3 border-2 rounded-lg font-semibold text-sm transition-all hover:bg-amber-50"
                      style={{ borderColor: '#a0522d', color: '#7c3a1e' }}>
                      ← Back
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-3 text-white font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                      style={{ background: 'linear-gradient(135deg, #7c3a1e, #c8762a)' }}>
                      {loading ? (
                        <><div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating...</>
                      ) : 'Create Account'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: '#a0522d' }}>Sign in</Link>
            </p>
          </div>

          <div className="text-center mt-5">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
