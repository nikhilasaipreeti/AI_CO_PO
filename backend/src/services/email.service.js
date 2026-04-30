const nodemailer = require('nodemailer');

// In-memory OTP store: key = "email:purpose"
const otpStore = new Map();

// ── Transporter ──────────────────────────────────────────────────
const createTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// ── Generate 6-digit OTP ─────────────────────────────────────────
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ── Store OTP (purpose: 'login' | 'reset') ───────────────────────
const storeOTP = (email, otp, purpose = 'reset') => {
    const key = `${email.toLowerCase()}:${purpose}`;
    otpStore.set(key, {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000
    });
};

// ── Verify OTP ───────────────────────────────────────────────────
const verifyOTP = (email, otp, purpose = 'reset') => {
    const key = `${email.toLowerCase()}:${purpose}`;
    const record = otpStore.get(key);
    if (!record) return {
        valid: false,
        message: 'OTP not found. Please request a new one.'
    };
    if (Date.now() > record.expiresAt) {
        otpStore.delete(key);
        return {
            valid: false,
            message: 'OTP has expired. Please request a new one.'
        };
    }
    if (record.otp !== otp) return {
        valid: false,
        message: 'Invalid OTP. Please try again.'
    };
    otpStore.delete(key);
    return {
        valid: true
    };
};

// ── Shared HTML email wrapper ────────────────────────────────────
const emailWrapper = (headerTitle, headerSub, bodyContent) => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; background: #fdf6ee; margin: 0; padding: 0; }
  .container { max-width: 520px; margin: 40px auto; background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(124,58,30,0.12); }
  .header { background: linear-gradient(135deg, #7c3a1e, #c8762a); padding: 28px 30px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 22px; }
  .header p { color: #fde8c8; margin: 6px 0 0; font-size: 13px; }
  .body { padding: 30px; color: #3d1a0a; }
  .otp-box { background: linear-gradient(135deg, #fdf6ee, #fef3c7); border: 2px dashed #c8762a; border-radius: 12px; padding: 24px; text-align: center; margin: 22px 0; }
  .otp-code { font-size: 46px; font-weight: bold; letter-spacing: 12px; color: #7c3a1e; font-family: monospace; }
  .otp-label { font-size: 12px; color: #a0522d; margin-top: 8px; }
  .warning { background: #fef3c7; border-left: 4px solid #c8762a; padding: 12px 16px; border-radius: 6px; margin: 20px 0; font-size: 13px; color: #7c3a1e; }
  .footer { background: #fdf6ee; padding: 18px; text-align: center; font-size: 12px; color: #a0522d; border-top: 1px solid #e8c9a0; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 OBE AI System</h1>
      <p>Vignan University — ${headerSub}</p>
    </div>
    <div class="body">${bodyContent}</div>
    <div class="footer">
      <p>© 2025 OBE AI System — Vignan's University, Guntur</p>
      <p>This is an automated email. Do not reply.</p>
    </div>
  </div>
</body>
</html>`;

// ── Send Login OTP Email ──────────────────────────────────────────
const sendLoginOTPEmail = async (email, otp, name = 'User') => {
    const transporter = createTransporter();
    const expiry = new Date(Date.now() + 10 * 60 * 1000)
        .toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata'
        });

    const body = `
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your login verification code for <strong>OBE AI System</strong> is:</p>
      <div class="otp-box">
        <div class="otp-code">${otp}</div>
        <div class="otp-label">⏱ Valid for <strong>10 minutes</strong> (expires at ${expiry} IST)</div>
      </div>
      <div class="warning">
        🔒 <strong>Security Notice:</strong> This code is for your login only. 
        Never share it with anyone. If you did not attempt to login, please change your password immediately.
      </div>
      <p style="font-size:13px;color:#a0522d;">Enter this code on the login page to complete sign-in.</p>`;

    await transporter.sendMail({
        from: `"OBE AI System - Vignan University" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `🔐 ${otp} — Your Login OTP for OBE AI System`,
        html: emailWrapper('Login Verification', 'Login Verification', body)
    });
    console.log(`✅ Login OTP email sent to ${email}`);
};

// ── Send Password Reset OTP Email ────────────────────────────────
const sendOTPEmail = async (email, otp, name = 'User') => {
    const transporter = createTransporter();
    const expiry = new Date(Date.now() + 10 * 60 * 1000)
        .toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata'
        });

    const body = `
      <p>Hello <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Use the OTP below:</p>
      <div class="otp-box">
        <div class="otp-code">${otp}</div>
        <div class="otp-label">⏱ Valid for <strong>10 minutes</strong> (expires at ${expiry} IST)</div>
      </div>
      <div class="warning">
        ⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone. 
        If you didn't request a password reset, please ignore this email.
      </div>`;

    await transporter.sendMail({
        from: `"OBE AI System - Vignan University" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `🔑 ${otp} — Password Reset OTP for OBE AI System`,
        html: emailWrapper('Password Reset', 'Password Reset', body)
    });
    console.log(`✅ Password reset OTP sent to ${email}`);
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    sendLoginOTPEmail,
    storeOTP,
    verifyOTP
};