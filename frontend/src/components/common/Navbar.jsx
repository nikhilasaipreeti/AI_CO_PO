import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AcademicCapIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import vignanLogo from '../../assets/images/vignan.jpeg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top info bar — like Vignan portal */}
      <div className="text-white text-xs py-1.5 px-4 flex justify-between items-center" style={{ background: '#5c2a0e' }}>
        <span>Vignan's Foundation for Science, Technology & Research</span>
        <div className="hidden sm:flex gap-4">
          <a href="#" className="hover:text-yellow-300 transition-colors">Admissions</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">NBA Accreditation</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Quick Links</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'} bg-white border-b-4`}
        style={{ borderBottomColor: '#a0522d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2" style={{ borderColor: '#a0522d' }} />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-base" style={{ color: '#7c3a1e' }}>VIGNAN'S</span>
                <span className="text-xs text-gray-500 tracking-wide">OBE AI System</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors">Testimonials</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all hover:scale-105"
                style={{ color: '#7c3a1e', borderColor: '#a0522d' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fdf6ee'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:scale-105 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #7c3a1e, #c8762a)' }}
              >
                Sign Up Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg" style={{ color: '#7c3a1e' }} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-3 bg-white" style={{ borderTopColor: '#e8c9a0' }}>
            <a href="#features" className="block text-sm font-medium text-gray-600">Features</a>
            <a href="#how-it-works" className="block text-sm font-medium text-gray-600">How It Works</a>
            <Link to="/login" className="block text-sm font-medium" style={{ color: '#7c3a1e' }}>Login</Link>
            <Link to="/register" className="block text-sm font-semibold text-white text-center py-2 rounded-lg" style={{ background: '#a0522d' }}>Sign Up Free</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
