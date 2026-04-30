import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, ShieldCheckIcon, ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from '../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.data.success) {
        toast.success(res.data.message);
        // Dev mode: show OTP in toast if returned
        if (res.data.devOtp) toast(`Dev OTP: ${res.data.devOtp}`, { icon: '🔑', duration: 10000 });
        setStep(2);
        startResendTimer();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) return toast.error('Please enter the complete 6-digit OTP');
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp: otpString });
      if (res.data.success) {
        setResetToken(res.data.resetToken);
        toast.success('OTP verified! Set your new password.');
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', { resetToken, newPassword });
      if (res.data.success) {
        toast.success('Password reset successfully!');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) setOtp(pasted.split(''));
  };

  const steps = [
    { num: 1, label: 'Email' },
    { num: 2, label: 'OTP' },
    { num: 3, label: 'Password' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheckIcon className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">Reset Password</h2>
          <p className="text-blue-100 text-sm mt-1">Secure OTP verification via Gmail</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center px-6 pt-5 pb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step > s.num ? 'bg-green-500 text-white' : step === s.num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-xs mt-1 ${step === s.num ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === 1 && (
              <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Enter your email</h3>
                  <p className="text-sm text-gray-500">We'll send a 6-digit OTP to your registered Gmail</p>
                </div>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />Sending OTP...</> : 'Send OTP to Gmail'}
                </button>
              </motion.form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Enter OTP</h3>
                  <p className="text-sm text-gray-500">6-digit OTP sent to <span className="font-medium text-blue-600">{email}</span></p>
                </div>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  ))}
                </div>
                <button type="submit" disabled={loading || otp.join('').length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />Verifying...</> : 'Verify OTP'}
                </button>
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">Resend OTP in <span className="font-medium text-blue-600">{resendTimer}s</span></p>
                  ) : (
                    <button type="button" onClick={handleSendOTP} className="text-sm text-blue-600 hover:underline font-medium">
                      Resend OTP
                    </button>
                  )}
                </div>
              </motion.form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <motion.form key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Set New Password</h3>
                  <p className="text-sm text-gray-500">Choose a strong password (min. 6 characters)</p>
                </div>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    placeholder="New password" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
                </div>
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
                <button type="submit" disabled={loading || newPassword !== confirmPassword}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />Resetting...</> : '✓ Reset Password'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center gap-1">
              <ArrowLeftIcon className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
