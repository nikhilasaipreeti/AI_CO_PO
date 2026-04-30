import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  CameraIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Dr. John Smith',
    email: user?.email || 'faculty@college.edu',
    department: user?.department || 'Computer Science',
    employeeId: user?.employeeId || 'FAC001',
    phone: '+91 98765 43210',
    bio: 'Professor with 10+ years of experience in Computer Science education.'
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <UserIcon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile Picture */}
        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-end">
            <div className="relative -mt-16">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                <img
                  src={`https://ui-avatars.com/api/?name=${profileData.name}&background=3b82f6&color=fff&size=128`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <CameraIcon className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <PencilSquareIcon className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg text-gray-800">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
              {isEditing ? (
                <select
                  name="department"
                  value={profileData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                </select>
              ) : (
                <p className="text-lg text-gray-800">{profileData.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Employee ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="employeeId"
                  value={profileData.employeeId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg text-gray-800">{profileData.employeeId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-lg text-gray-800">{profileData.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;