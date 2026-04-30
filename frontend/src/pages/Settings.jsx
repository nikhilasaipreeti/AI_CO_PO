import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cog6ToothIcon, BellIcon, MoonIcon, SunIcon,
  GlobeAltIcon, LockClosedIcon, BellAlertIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    desktopNotifications: true,
    language: 'en',
    timezone: 'IST',
    autoSave: true,
    twoFactorAuth: false
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  const handleSelect = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved!', { icon: '⚙️' });
    }, 800);
  };

  const card = `rounded-xl shadow-md p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`;
  const rowBorder = `border-b last:border-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`;
  const labelColor = isDarkMode ? 'text-gray-100' : 'text-gray-700';
  const descColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const selectClass = `px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-700'}`;

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${checked ? 'bg-blue-600' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const Section = ({ title, icon: Icon, children }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={card}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
          <Icon className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <h3 className={`ml-3 text-lg font-semibold ${labelColor}`}>{title}</h3>
      </div>
      <div className="space-y-1">{children}</div>
    </motion.div>
  );

  const Row = ({ label, desc, children }) => (
    <div className={`flex items-center justify-between py-3 px-2 rounded-lg ${rowBorder}`}>
      <div>
        <p className={`font-medium text-sm ${labelColor}`}>{label}</p>
        {desc && <p className={`text-xs mt-0.5 ${descColor}`}>{desc}</p>}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
          <Cog6ToothIcon className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Settings</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Manage your application preferences</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <Section title="Appearance" icon={isDarkMode ? MoonIcon : SunIcon}>
          <Row label="Dark Mode" desc="Switch between light and dark theme">
            <ToggleSwitch checked={isDarkMode} onChange={toggleTheme} />
          </Row>
          <Row label="Current Theme" desc="">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </span>
          </Row>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={BellIcon}>
          <Row label="Email Notifications" desc="Receive updates via email">
            <ToggleSwitch checked={settings.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
          </Row>
          <Row label="Push Notifications" desc="Browser push notifications">
            <ToggleSwitch checked={settings.pushNotifications} onChange={() => handleToggle('pushNotifications')} />
          </Row>
          <Row label="Desktop Notifications" desc="System notifications">
            <ToggleSwitch checked={settings.desktopNotifications} onChange={() => handleToggle('desktopNotifications')} />
          </Row>
        </Section>

        {/* Language & Region */}
        <Section title="Language & Region" icon={GlobeAltIcon}>
          <Row label="Language" desc="Select your preferred language">
            <select value={settings.language} onChange={e => handleSelect('language', e.target.value)} className={selectClass}>
              <option value="en">🇺🇸 English</option>
              <option value="hi">🇮🇳 Hindi</option>
              <option value="te">🇮🇳 Telugu</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
            </select>
          </Row>
          <Row label="Timezone" desc="Your local timezone">
            <select value={settings.timezone} onChange={e => handleSelect('timezone', e.target.value)} className={selectClass}>
              <option value="IST">🇮🇳 IST (UTC+5:30)</option>
              <option value="EST">🇺🇸 EST (UTC-5:00)</option>
              <option value="PST">🇺🇸 PST (UTC-8:00)</option>
              <option value="GMT">🇬🇧 GMT (UTC+0:00)</option>
            </select>
          </Row>
        </Section>

        {/* Security */}
        <Section title="Security" icon={ShieldCheckIcon}>
          <Row label="Two-Factor Authentication" desc="OTP sent to your Gmail on login">
            <ToggleSwitch checked={settings.twoFactorAuth} onChange={() => handleToggle('twoFactorAuth')} />
          </Row>
          <Row label="Change Password" desc="Update your account password">
            <button className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              Change
            </button>
          </Row>
          <Row label="Auto Save" desc="Automatically save changes">
            <ToggleSwitch checked={settings.autoSave} onChange={() => handleToggle('autoSave')} />
          </Row>
        </Section>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center space-x-2"
        >
          {isSaving ? (
            <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /><span>Saving...</span></>
          ) : (
            <><Cog6ToothIcon className="h-5 w-5" /><span>Save Settings</span></>
          )}
        </button>
      </div>

      {/* Info */}
      <div className={`border rounded-lg p-4 flex items-start ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <BellAlertIcon className={`h-5 w-5 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <p className={`ml-3 text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          <span className="font-medium">Note:</span> Dark mode applies instantly. Other settings save on button click.
        </p>
      </div>
    </div>
  );
};

export default Settings;
