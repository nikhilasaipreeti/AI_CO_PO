import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import vignanLogo from '../../assets/images/vignan.jpeg';

const Footer = () => {
  return (
    <footer style={{ background: '#3d1a0a' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400" />
              <div>
                <p className="font-bold text-white">VIGNAN'S</p>
                <p className="text-xs" style={{ color: '#e8c9a0' }}>OBE AI System</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: '#c9a07a' }}>
              AI-powered Outcome Based Education management for NBA accreditation and academic excellence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: '#fcd34d' }}>Product</h3>
            <ul className="space-y-2">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors" style={{ color: '#c9a07a' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c9a07a'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: '#fcd34d' }}>Resources</h3>
            <ul className="space-y-2">
              {['OBE Guidelines', 'NBA Accreditation', 'Bloom\'s Taxonomy', 'CO Writing Guide'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors" style={{ color: '#c9a07a' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c9a07a'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: '#fcd34d' }}>Contact</h3>
            <ul className="space-y-2 text-sm" style={{ color: '#c9a07a' }}>
              <li>support@vignan.ac.in</li>
              <li>+91 98765 43210</li>
              <li>Vignan's University, Guntur</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTopColor: '#5c2a0e' }}>
          <p className="text-sm" style={{ color: '#c9a07a' }}>
            © 2025 Vignan's OBE AI System. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm" style={{ color: '#c9a07a' }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
